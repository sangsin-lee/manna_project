"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Discovery, Opportunity } from "@/lib/opportunities";

const publicSource = "https://touraz.kr/announcementList";
const intake = "/stay-soban?for=request&utm_source=business";
const offers = "/stay-soban?for=offer&utm_source=business";
const muted = "mt-2 text-base leading-7 text-[#526259]";
const linkStyle = "inline-flex min-h-11 items-center font-semibold text-[#26513b] underline decoration-[#9aab96] underline-offset-4";
const action = "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-[#8ea48d] bg-white px-4 py-2 text-sm font-semibold text-[#244936] hover:bg-[#edf2e9]";
const dateTime = new Intl.DateTimeFormat("ko-KR", {timeZone:"Asia/Seoul", year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"});
function koreaTime(value: string | null) {
  if (!value) return "";
  const instant = Date.parse(value);
  return Number.isFinite(instant) ? dateTime.format(instant) : "";
}
function officialUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol === "https:" && (url.hostname === "touraz.kr" || url.hostname === "www.touraz.kr") && !url.username && !url.password) return url.href;
  } catch { /* A malformed source has no outgoing link. */ }
  return null;
}

function CopyText({label, text}: {label:string; text:()=>string}) {
  const [feedback,setFeedback] = useState("");
  const [manual,setManual] = useState("");
  async function copy() {
    const value = text();
    setManual("");
    try { await navigator.clipboard.writeText(value); setFeedback("복사했습니다."); }
    catch { setManual(value); setFeedback("아래 내용을 선택해 복사해 주세요."); }
  }
  return <div>
    <button type="button" className={action} onClick={()=>void copy()}>{label}</button>
    <span role="status" className="ml-2 text-sm text-[#526259]">{feedback}</span>
    {manual&&<textarea readOnly aria-label="복사할 내용" className="mt-2 block min-h-24 w-full rounded border border-[#afbaad] bg-white p-3" value={manual} onFocus={e=>e.currentTarget.select()}/>}
  </div>;
}

function CallCard({call,reviewReady}: {call:Opportunity; reviewReady:boolean}) {
  const url = officialUrl(call.url);
  const deadline = koreaTime(call.deadlineAt);
  return <article className="rounded-xl border border-[#ced7c9] bg-white p-5 sm:p-7">
    <p className="text-sm font-semibold text-[#785035]">{call.kind==="collaboration"?"협력 모집":"지원사업"} · {call.organization}</p>
    <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight">{call.title}</h3>
    <p className="mt-3 text-sm text-[#4d5d53]">접수 {call.startDate} ~ {call.endDate}{deadline&&<> · 마감 {deadline} (한국시간)</>}</p>
    <p className={muted}>{call.matchReason}</p>
    {url&&<a className={linkStyle} href={url} target="_blank" rel="noopener noreferrer">공고 원문 보기</a>}
    {reviewReady&&<details className="mt-2 border-t border-[#dce2d7] pt-3">
      <summary className="cursor-pointer font-semibold">협업 제안 초안</summary>
      <p className={muted}>{call.nextStep}</p><p className="my-3 whitespace-pre-line bg-[#f4f5ee] p-4 text-base leading-7">{call.pitch}</p>
      <CopyText label="검토용 문안 복사" text={()=>call.pitch}/>
    </details>}
  </article>;
}

export default function BusinessPage() {
  const [feed,setFeed] = useState<Discovery|null>(null);
  const [reviewReady,setReviewReady] = useState(false);
  const [request,setRequest] = useState(0);
  const [channel,setChannel] = useState("instagram");
  const [target,setTarget] = useState("request");
  useEffect(()=>{
    const controller = new AbortController();
    const options:RequestInit = {cache:"no-store",signal:controller.signal};
    async function readCalls() {
      try {
        const res=await fetch("/api/opportunities",options);
        if (!res.ok) throw new Error();
        const data=await res.json() as Discovery;
        if (!Array.isArray(data.opportunities) || !["ready","stale","unavailable"].includes(data.status)) throw new Error();
        if (!controller.signal.aborted) setFeed(data);
      } catch {
        if (!controller.signal.aborted) setFeed({status:"unavailable",checkedAt:null,sourceName:"한국관광공사 투어라즈",sourceUrl:publicSource,opportunities:[]});
      }
    }
    async function readDemand() {
      try {
        const res=await fetch("/api/stay-soban",options);
        const data = res.ok ? await res.json() as {reviewReady?:unknown} : null;
        if (!controller.signal.aborted) setReviewReady(data?.reviewReady===true);
      } catch { if (!controller.signal.aborted) setReviewReady(false); }
    }
    void readCalls(); void readDemand();
    return ()=>controller.abort();
  },[request]);
  function campaign() {
    const url=new URL("/stay-soban",location.origin);
    url.searchParams.set("for",target);
    url.searchParams.set("utm_source",channel);
    const message=target==="offer" ? "지역 식재료로 진행하는 요리 수업이나 동네 미식 여행을 운영하시나요? 스테이소반에 가능한 지역·일정·가격을 남겨 주세요. 조건이 맞는 여행자와 연결을 검토할 수 있어요." : "게스트하우스에서 함께 요리하거나 동네 시장을 걷고 싶은 분을 찾습니다. 스테이소반에 희망 지역, 날짜, 인원과 예산을 남겨 주세요. 무료 사전 관심 등록이며 일정과 가격은 추후 협의합니다.";
    return message+"\n\n"+url.href;
  }
  const ready = Boolean(feed&&feed.status!=="unavailable");
  const currentCalls=ready&&feed ? feed.opportunities.filter(call=>!call.deadlineAt||Date.parse(call.deadlineAt)>Date.now()) : [];
  return <main className="mx-auto max-w-5xl px-5 py-9 font-sans text-[#203d30] sm:px-10 sm:py-14">
    <Link href="/stay-soban" className={linkStyle}>스테이소반 홈</Link>
    <header className="max-w-3xl pb-7 pt-3 sm:pb-10">
      <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">지역 미식 협업 기회</h1>
      <p className={muted}>한국관광공사 투어라즈의 최근 접수 중인 공고에서 숙소, 지역 식문화와 체험 운영에 맞는 기회를 찾습니다.</p>
    </header>
    <section aria-labelledby="public-calls">
      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-[#bac7b6] pt-5">
        <div><h2 id="public-calls" className="text-2xl font-bold tracking-tight">공개 모집 공고</h2>
        {feed?.checkedAt&&<p className="mt-1 text-sm text-[#526259]">{feed.status==="stale"?"이전 확인 결과":"마지막 확인"} · {koreaTime(feed.checkedAt)} (한국시간)</p>}</div>
        <button type="button" className={action} disabled={!feed} onClick={()=>{setFeed(null);setReviewReady(false);setRequest(n=>n+1);}}>다시 확인</button>
      </div>
      <div className="mt-5 grid gap-4" aria-busy={!feed}>
        {!feed&&<p role="status" className={muted}>공고를 불러오는 중입니다.</p>}
        {feed&&(!ready||!currentCalls.length)&&<p role="status" className="rounded-lg bg-[#eff2e9] p-5 text-base leading-7">{!ready?"현재 공고를 불러오지 못했습니다. 투어라즈에서 전체 목록을 확인할 수 있어요.":"최근 확인한 목록에 현재 조건에 맞는 공고가 없습니다."}</p>}
        {currentCalls.map(call=><CallCard key={call.id} call={call} reviewReady={reviewReady}/>)}
      </div>
      <a className={linkStyle+" mt-2"} href={officialUrl(feed?.sourceUrl||"")||publicSource} target="_blank" rel="noopener noreferrer">투어라즈 전체 공고 보기</a>
    </section>
    <section aria-labelledby="sns-share" className="mt-9 rounded-2xl border border-[#d4dfce] bg-[#f1f4eb] p-5 sm:p-7">
      <h2 id="sns-share" className="text-2xl font-bold tracking-tight">관심 등록을 소개하세요</h2>
      <p className={muted}>공유할 대상과 채널에 맞춰 등록 링크가 포함된 문안을 복사할 수 있어요.</p>
      <div className="my-4 grid gap-3 sm:max-w-xl sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">공유 대상<select value={target} onChange={e=>setTarget(e.target.value)} className="min-h-11 rounded-md border border-[#9bac96] bg-white px-3 text-base"><option value="request">여행자</option><option value="offer">협업을 희망하는 파트너</option></select></label>
        <label className="grid gap-1 text-sm font-semibold">유입 채널<select value={channel} onChange={e=>setChannel(e.target.value)} className="min-h-11 rounded-md border border-[#9bac96] bg-white px-3 text-base"><option value="instagram">인스타그램</option><option value="youtube">유튜브</option><option value="referral">지인·파트너 추천</option></select></label>
      </div>
      <CopyText key={target+channel} label="소개 문안과 링크 복사" text={campaign}/>
    </section>
    <nav aria-label="스테이소반 등록" className="mt-6 flex flex-wrap gap-x-6"><Link href={intake} className={linkStyle}>여행자 관심 등록</Link><Link href={offers} className={linkStyle}>파트너 제안 등록</Link></nav>
  </main>;
}
