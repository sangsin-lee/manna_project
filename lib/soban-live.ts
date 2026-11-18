import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { SobanRow, SobanStore } from "./soban-store";
import { createEmailProof, readProofId, sendEmailProof, verifyEmailProof } from "./soban-verification";
import { siteConfig } from "./site";

const DAY = 86_400_000;
const regions = ["서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충북","충남","전북","전남","경북","경남","제주"];
const kst = (time:number) => new Date(time + 9*3_600_000).toISOString().slice(0,10);
type Kind = "request" | "offer";
type Input = Record<string,unknown>;
type Pair = {offer:string; requestAccepted:boolean; offerAccepted:boolean; declined:boolean};
type Entry = {
  kind:Kind; product:"class"|"local_trip"; region:string; date:string; slot:"morning"|"afternoon"|"evening";
  language:"ko"|"en"; amount:number; people:number; paidIntent:boolean; matching:boolean;
  email:string; source:string; verified:boolean; pairs:Pair[];
};
type Item = {row:SobanRow; entry:Entry};

export class SobanError extends Error {
  constructor(message:string, public status=400) { super(message); }
}
function check(condition:unknown, message:string, status=400):asserts condition {
  if (!condition) throw new SobanError(message,status);
}
function choose<T extends string>(value:unknown, options:readonly T[]):T {
  check(options.some(x=>x===value),"선택 항목을 확인해 주세요.");
  return value as T;
}
function integer(value:unknown, min:number, max:number) {
  check(typeof value==="number" && Number.isSafeInteger(value) && value>=min && value<=max,"인원과 1인당 금액을 확인해 주세요.");
  return value;
}
function digest(value:string) {
  return createHash("sha256").update(value).digest("hex");
}
function mac(value:string) {
  const secret = process.env.RESERVATION_ADMIN_TOKEN || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Soban signing key unavailable");
  return createHmac("sha256",secret).update("stay-soban/v1/"+value).digest("base64url");
}
function uuid(value:string) {
  const h=digest(value);
  return [h.slice(0,8),h.slice(8,12),"4"+h.slice(13,16),"8"+h.slice(17,20),h.slice(20,32)].join("-");
}
function receiptId(key:unknown) {
  check(typeof key==="string" && /^[a-f0-9]{64}$/.test(key),"개인 관리 링크를 확인해 주세요.");
  return uuid("soban:receipt:"+key);
}
function tombstone(id:string) { return uuid("soban:withdrawn:"+id); }
function matchId(request:string, offer:string) { return mac("pair:"+request+":"+offer); }
function cohort(e:Entry) {
  return digest(JSON.stringify([e.product,e.region,e.date,e.slot,e.language])).slice(0,28);
}
function identityId(e:Entry) {
  return uuid("soban:identity:"+mac(JSON.stringify([e.kind,cohort(e),e.email])));
}
function validate(input:Input, now:number):Entry {
  const kind=choose(input.kind,["request","offer"] as const);
  const email=typeof input.email==="string" ? input.email.trim().toLowerCase() : "";
  check(email.length<=254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email),"이메일 주소를 확인해 주세요.");
  const date=input.date;
  check(typeof date==="string" && /^\d{4}-\d{2}-\d{2}$/.test(date),"날짜를 확인해 주세요.");
  const stamp=Date.parse(date+"T00:00:00Z");
  check(Number.isFinite(stamp) && new Date(stamp).toISOString().slice(0,10)===date &&
    date>=kst(now) && date<=kst(now+365*DAY),"오늘부터 1년 이내의 날짜를 선택해 주세요.");
  check(input.consent===true && typeof input.matching==="boolean" && typeof input.paidIntent==="boolean","개인정보 안내와 선택한 연결 방식을 확인해 주세요.");
  const raw=String(input.source||"direct").toLowerCase();
  const source=["ig","insta","instagram","manna_table","manna-table"].includes(raw)?"instagram":
    ["youtube","yt","shorts"].includes(raw)?"youtube":raw==="direct"?"direct":"referral";
  return {
    kind,product:choose(input.product,["class","local_trip"] as const),region:choose(input.region,regions),date,
    slot:choose(input.slot,["morning","afternoon","evening"] as const),language:choose(input.language,["ko","en"] as const),
    people:integer(input.people,1,30),amount:integer(input.amount,0,10000000),paidIntent:kind==="request" && input.paidIntent,
    matching:input.matching,email,source,verified:false,pairs:[],
  };
}

// Ordinary public inquiries use this same table. Authenticate the complete
// registration and its ID so a crafted inquiry cannot pose as a verified lead.
function encode(row:Pick<SobanRow,"id"|"name"|"phone"|"created_at">,entry:Entry) {
  const content=JSON.stringify(entry);
  const signature=mac(JSON.stringify([row.id,row.name,row.phone,Date.parse(row.created_at),content]));
  return JSON.stringify([signature,entry]);
}
export function decodeEntry(row:SobanRow,now=Date.now()):Entry|null {
  if (!["soban:request","soban:offer"].includes(row.name) || Date.parse(row.created_at)<=now-90*DAY) return null;
  try {
    const [signature,entry]=JSON.parse(row.message);
    if (typeof signature!=="string" || !entry || entry.date<kst(now) || "soban:"+entry.kind!==row.name) return null;
    const expected=JSON.parse(encode(row,entry))[0] as string;
    const a=Buffer.from(signature), b=Buffer.from(expected);
    return a.length===b.length && timingSafeEqual(a,b) ? entry : null;
  } catch { return null; }
}
function active(rows:SobanRow[],now:number):Item[] {
  return rows.flatMap(row=>{const entry=decodeEntry(row,now);return entry?[{row,entry}]:[];});
}
function publicConditions(e:Entry) {
  const {kind,product,region,date,slot,language,amount,people,paidIntent,matching,verified}=e;
  return {kind,product,region,date,slot,language,amount,people,paidIntent,matching,verified};
}
async function required(store:SobanStore,id:string,now:number):Promise<Item> {
  const row=await store.get(id);
  const entry=row && decodeEntry(row,now);
  check(row && entry,"유효한 접수를 찾을 수 없습니다. 관리 링크와 희망 날짜를 확인해 주세요.",404);
  return {row,entry};
}

// Two different private links can register the same address before either is
// verified. Only the first proven matching receipt may represent that address
// in this cohort. The claim itself contains no contact information.
async function claimIdentity(store:SobanStore,item:Item,now:number) {
  const id=identityId(item.entry);
  for (let i=0;i<5;i++) {
    const claim=await store.get(id);
    if(!claim) {
      if(await store.insert({id,name:"soban:identity",phone:"verified-id",guests:null,preferred_date:null,
        message:item.row.id,created_at:new Date(now).toISOString()})) return;
      continue;
    }
    check(claim.name==="soban:identity","본인 확인을 처리할 수 없습니다.",503);
    if(claim.message===item.row.id) return;
    const prior=await store.get(claim.message);
    if(prior && decodeEntry(prior,now))
      throw new SobanError("이 이메일로 같은 일정에 확인된 접수가 있습니다. 기존 개인 관리 링크를 이용해 주세요.",409);
    await store.remove(claim);
  }
  throw new SobanError("본인 확인 상태가 변경되었습니다. 다시 시도해 주세요.",409);
}
async function change(store:SobanStore,id:string,now:number,update:(e:Entry)=>boolean):Promise<Item> {
  for (let attempt=0;attempt<6;attempt++) {
    const item=await required(store,id,now);
    if (!update(item.entry)) return item;
    const next=encode(item.row,item.entry);
    if (await store.cas(item.row,next)) return {entry:item.entry,row:{...item.row,message:next}};
  }
  throw new SobanError("동시에 접수 상태가 바뀌었습니다. 다시 시도해 주세요.",409);
}
function eligible(r:Item,o:Item) {
  const a=r.entry,b=o.entry;
  return a.kind==="request" && b.kind==="offer" && a.matching && b.matching && a.verified && b.verified &&
    a.email!==b.email && a.product===b.product && a.region===b.region && a.date===b.date && a.slot===b.slot &&
    a.language===b.language && a.people<=b.people && b.amount<=a.amount && (b.amount===0 || a.paidIntent);
}
function byAge(a:Item,b:Item) {
  return Date.parse(a.row.created_at)-Date.parse(b.row.created_at) || a.row.id.localeCompare(b.row.id);
}
function uniqueVerified(items:Item[]) {
  const seen=new Set<string>();
  return items.filter(x=>x.entry.verified && x.entry.matching).sort(byAge).filter(x=>{
    if(seen.has(x.entry.email)) return false;
    seen.add(x.entry.email);return true;
  });
}
async function reconcile(store:SobanStore,phone:string,now:number) {
  const [requests,offers]=await Promise.all([store.list("soban:request",phone),store.list("soban:offer",phone)]);
  const candidates=active(offers,now).sort((a,b)=>a.entry.amount-b.entry.amount || byAge(a,b));
  const leads=uniqueVerified(active(requests,now));
  for (const lead of leads) {
    if (lead.entry.pairs.length>=2) continue;
    const options=candidates.filter(x=>eligible(lead,x));
    if (!options.length) continue;
    try {
      await change(store,lead.row.id,now,e=>{
        const current={row:lead.row,entry:e};
        const emails=new Set(e.pairs.map(p=>candidates.find(c=>c.row.id===p.offer)?.entry.email));
        let changed=false;
        for (const option of options) {
          if(e.pairs.length>=2) break;
          if (!eligible(current,option) || emails.has(option.entry.email) || e.pairs.some(p=>p.offer===option.row.id)) continue;
          e.pairs.push({offer:option.row.id,requestAccepted:false,offerAccepted:false,declined:false});
          emails.add(option.entry.email);changed=true;
        }
        return changed;
      });
    } catch(e) {
      if (!(e instanceof SobanError && e.status===404)) throw e;
    }
  }
}

async function pairsFor(store:SobanStore,item:Item,now:number) {
  if (!item.entry.verified || !item.entry.matching) return [];
  const customer=item.entry.kind==="request";
  const requests=customer?[item]:active(await store.list("soban:request",item.row.phone),now);
  const offers=customer?active(await store.list("soban:offer",item.row.phone),now):[item];
  const offerById=new Map(offers.map(x=>[x.row.id,x]));
  return requests.flatMap(request=>request.entry.pairs.flatMap(pair=>{
    const offer=offerById.get(pair.offer);
    if(!offer || !eligible(request,offer)) return [];
    return [{id:matchId(request.row.id,offer.row.id),request,offer,pair}];
  }));
}

async function summary(store:SobanStore,item:Item,now:number) {
  const customer=item.entry.kind==="request";
  const found=await pairsFor(store,item,now);
  return {record:publicConditions(item.entry),matches:found.map(({id,request,offer,pair})=>{
    const accepted=pair.requestAccepted && pair.offerAccepted && !pair.declined;
    const myAcceptance=customer?pair.requestAccepted:pair.offerAccepted;
    const {product,region,date,slot,language,people}=request.entry;
    return {id,product,region,date,slot,language,people,amount:offer.entry.amount,
      status:pair.declined?"declined":accepted?"accepted":myAcceptance?"waiting":"pending",
      ...(accepted?{contact:customer?offer.entry.email:request.entry.email}:{})};
  })};
}

export async function demandSummary(store:SobanStore,now=Date.now()) {
  await store.cleanup(new Date(now-90*DAY).toISOString());
  const buckets=new Map<string,Set<string>>();
  for (const {entry:e} of active(await store.list("soban:request"),now)) {
    if(!e.verified || !e.paidIntent || e.amount<=0 || e.product!=="class") continue;
    const key=cohort(e)+":"+e.amount;
    const contacts=buckets.get(key) ?? new Set<string>();
    contacts.add(e.email);
    if(contacts.size>=6) return {reviewReady:true};
    buckets.set(key,contacts);
  }
  return {reviewReady:false};
}

// The fixed ID serializes a rolling window for one recipient or network even
// when a caller creates several unrelated registration keys.
async function throttle(store:SobanStore,label:string,identity:string,limit:number,windowMs:number,now:number) {
  const id=uuid("soban:rate:"+mac(label+":"+identity));
  for (let i=0;i<6;i++) {
    const existing=await store.get(id);
    if (!existing) {
      if(await store.insert({id,name:"soban:rate",phone:"soban-rate",preferred_date:null,guests:null,
        message:JSON.stringify({start:now,count:1}),created_at:new Date(now).toISOString()})) return;
      continue;
    }
    check(existing.name==="soban:rate","요청 제한을 확인할 수 없습니다.",503);
    const state=JSON.parse(existing.message) as {start:number;count:number};
    if(state.start+windowMs<=now) {
      await store.remove(existing);
      continue;
    }
    check(state.count<limit,"요청이 많습니다. 잠시 후 다시 시도해 주세요.",429);
    if(await store.cas(existing,JSON.stringify({start:state.start,count:state.count+1}))) return;
  }
  throw new SobanError("잠시 후 다시 시도해 주세요.",429);
}
async function register(store:SobanStore,input:Input,now:number,ip:string) {
  const id=receiptId(input.key);
  const entry=validate(input,now);
  const phone=cohort(entry);
  check(!await store.get(tombstone(id)),"철회한 관리 링크입니다. 새 접수를 만들어 주세요.",410);
  const previous=await store.get(id);
  if (!previous) {
    await throttle(store,"registration-ip",ip,18,10*60_000,now);
    const row:SobanRow={id,name:"soban:"+entry.kind,phone,preferred_date:entry.date,guests:entry.people,
      created_at:new Date(now).toISOString(),message:""};
    row.message=encode(row,entry);
    if(await store.insert(row)) return {ok:true};
  }
  const {entry:existing}=await required(store,id,now);
  const pristine={...existing,verified:false,pairs:[]};
  check(JSON.stringify(pristine)===JSON.stringify(entry),"같은 관리 링크로 다른 접수를 저장할 수 없습니다.",409);
  if(existing.verified && existing.matching) await reconcile(store,phone,now);
  return {ok:true};
}

export async function runSoban(store:SobanStore,input:Input,now=Date.now(),ip="local") {
  await store.cleanup(new Date(now-90*DAY).toISOString());
  if (input.action==="register") return register(store,input,now,ip);
  if (input.action==="verify") {
    const token=typeof input.token==="string"?input.token:"";
    const id=readProofId(token);
    check(id,"이메일 확인 링크가 만료되었거나 유효하지 않습니다.");
    const pending=await required(store,id,now);
    check(verifyEmailProof(token,pending.entry.email)===id,"이메일 확인 링크가 유효하지 않습니다.");
    if(pending.entry.matching) await claimIdentity(store,pending,now);
    const verified=await change(store,id,now,e=>{
      check(verifyEmailProof(token,e.email)===id,"이메일 확인 링크가 유효하지 않습니다.");
      if(e.verified) return false;
      e.verified=true;return true;
    });
    if(verified.entry.matching) await reconcile(store,verified.row.phone,now);
    return {ok:true};
  }
  const id=receiptId(input.key);
  if (input.action==="withdraw") {
    for (let i=0;i<6;i++) {
      const row=await store.get(id);
      if(!row) return {ok:true};
      check(row.name==="soban:request" || row.name==="soban:offer","접수를 찾을 수 없습니다.",404);
      const entry=decodeEntry(row,now);
      await store.insert({id:tombstone(id),name:"soban:withdrawn",phone:"withdrawn",preferred_date:null,
        guests:null,message:"{}",created_at:new Date(now).toISOString()});
      if(await store.remove(row)) {
        if(entry?.matching) {
          const claim=await store.get(identityId(entry));
          if(claim?.name==="soban:identity" && claim.message===row.id) await store.remove(claim);
        }
        return {ok:true};
      }
    }
    throw new SobanError("접수 상태가 바뀌었습니다. 다시 시도해 주세요.",409);
  }
  const item=await required(store,id,now);
  if(input.action==="status") {
    if(item.entry.matching && item.entry.verified) await reconcile(store,item.row.phone,now);
    return summary(store,await required(store,id,now),now);
  }
  if(input.action==="sendVerification") {
    if(item.entry.verified) return {ok:true};
    const token=createEmailProof(id,item.entry.email);
    const origin=new URL(siteConfig.url).origin;
    await throttle(store,"mail-ip",ip,8,15*60_000,now);
    await throttle(store,"mail-to",item.entry.email,1,15*60_000,now);
    await sendEmailProof(item.entry.email,token,origin);
    return {ok:true};
  }
  const decision=choose(input.action,["accept","decline"] as const);
  check(item.entry.verified,"이메일을 확인한 후 제안에 응답해 주세요.",403);
  if(decision==="accept") check(input.shareEmail===true,"이 상대에게 이메일을 공유하는 데 동의해 주세요.");
  const found=(await pairsFor(store,item,now)).find(p=>p.id===input.matchId);
  check(found,"응답할 수 있는 제안을 찾을 수 없습니다.",404);
  await change(store,found.request.row.id,now,e=>{
    const pair=e.pairs.find(p=>p.offer===found.offer.row.id);
    check(pair,"이 제안은 종료되었습니다.",409);
    if(decision==="decline") {
      if(pair.declined) return false;
      pair.declined=true;pair.offerAccepted=false;pair.requestAccepted=false;return true;
    }
    check(!pair.declined,"이미 거절한 제안입니다.",409);
    const side=item.entry.kind==="request"?"requestAccepted":"offerAccepted";
    if(pair[side]) return false;
    pair[side]=true;return true;
  });
  return {ok:true};
}
