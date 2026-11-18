import { createHmac, timingSafeEqual } from "node:crypto";
import { createSupabaseAdmin } from "./supabaseAdmin";

export type SobanRow = {
  id: string;
  name: string;
  phone: string;
  preferred_date: string | null;
  guests: number | null;
  message: string;
  created_at: string;
};

export interface SobanStore {
  get(id: string): Promise<SobanRow | null>;
  list(name: string, phone?: string): Promise<SobanRow[]>;
  insert(row: SobanRow): Promise<boolean>;
  cas(row: SobanRow, value: string): Promise<boolean>;
  remove(row: SobanRow): Promise<boolean>;
  cleanup(beforeISO: string): Promise<void>;
}

const intakeNamespaces = ["soban:request","soban:offer","soban:withdrawn","soban:identity"];
const namespaces = [...intakeNamespaces,"soban:rate"];
const columns = "id,name,phone,preferred_date,guests,message,created_at";
const day = 86400000;
export function isReservedSobanName(name: string) {
  return namespaces.includes(name);
}
function requireNamespace(name: string) {
  if (!isReservedSobanName(name)) throw new Error("잘못된 스테이소반 저장 구분입니다.");
}
function assertSuccess(error: {code: string} | null) {
  if (error) throw new Error("스테이소반 저장소 처리에 실패했습니다.");
}

// The namespaces share a table with historical visitor-entered names. A
// server signature distinguishes actual platform rows, including retention markers.
function signature(row: SobanRow, message: string) {
  const secret = process.env.RESERVATION_ADMIN_TOKEN || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("스테이소반 저장소 설정을 확인해 주세요.");
  const signed = [row.id,row.name,row.phone,row.preferred_date,row.guests,Date.parse(row.created_at),message];
  return createHmac("sha256",secret).update("soban/storage/v1\n"+JSON.stringify(signed)).digest("base64url");
}
function seal(row: SobanRow, message = row.message) {
  return "SB1."+signature(row,message)+"."+message;
}
function open(row: SobanRow | null): SobanRow | null {
  if (!row || typeof row.message !== "string" || !row.message.startsWith("SB1.")) return null;
  const match = /^SB1\.([A-Za-z0-9_-]{43})\.([\s\S]*)$/.exec(row.message);
  if (!match || !timingSafeEqual(Buffer.from(match[1]), Buffer.from(signature(row,match[2])))) return null;
  return {...row,message:match[2]};
}

export function createSobanStore(): SobanStore {
  const db = createSupabaseAdmin();
  const store: SobanStore = {
    async get(id) {
      const result = await db.from("inquiries").select(columns).eq("id",id).in("name",namespaces).maybeSingle();
      assertSuccess(result.error);
      return open(result.data as SobanRow | null);
    },
    async list(name, phone) {
      requireNamespace(name);
      const rows: SobanRow[] = [];
      let cursor: string | null = null;
      while (true) {
        let query = db.from("inquiries").select(columns).eq("name", name)
          .order("id",{ascending:true}).limit(250);
        if (phone !== undefined) query = query.eq("phone",phone);
        if (cursor !== null) query = query.gt("id",cursor);
        const result = await query;
        assertSuccess(result.error);
        const page = result.data as SobanRow[];
        if (!page.length) return rows;
        const last = page[page.length-1].id;
        if (cursor !== null && last <= cursor) throw new Error("스테이소반 조회 순서가 올바르지 않습니다.");
        for (const sealedRow of page) {
          const row = open(sealedRow);
          if (row) rows.push(row);
        }
        cursor = last;
      }
    },
    async insert(row) {
      requireNamespace(row.name);
      const {error} = await db.from("inquiries").insert({...row,message:seal(row)});
      if (error?.code === "23505") return false;
      assertSuccess(error);
      return true;
    },
    async cas(row,value) {
      requireNamespace(row.name);
      const result = await db.from("inquiries").update({message:seal(row,value)})
        .eq("id",row.id).eq("name",row.name).eq("message",seal(row)).select("id").maybeSingle();
      assertSuccess(result.error);
      return result.data !== null;
    },
    async remove(row) {
      requireNamespace(row.name);
      const result = await db.from("inquiries").delete()
        .eq("id",row.id).eq("name",row.name).eq("message",seal(row)).select("id").maybeSingle();
      assertSuccess(result.error);
      return result.data !== null;
    },
    async cleanup(beforeISO) {
      const before = Date.parse(beforeISO);
      if (!Number.isFinite(before)) throw new Error("스테이소반 보관 기한을 확인해 주세요.");
      const now = Date.now();
      const cutoff = new Date(Math.min(before,now-90*day)).toISOString();
      async function expire(names: string[], time: string) {
        let cursor: string | null = null;
        while (true) {
          let query = db.from("inquiries").select(columns).in("name",names).lt("created_at",time)
            .like("message","SB1.%").order("id",{ascending:true}).limit(100);
          if (cursor !== null) query = query.gt("id",cursor);
          const result = await query;
          assertSuccess(result.error);
          const page = result.data as SobanRow[];
          if (!page.length) return;
          // Compare-and-delete each verified payload; forged historical inquiries stay intact.
          for (const sealedRow of page) {
            const row = open(sealedRow);
            if (row) await store.remove(row);
          }
          cursor = page[page.length-1].id;
        }
      }
      await Promise.all([
        expire(intakeNamespaces,cutoff),
        expire(["soban:rate"],new Date(now-day).toISOString()),
      ]);
    },
  };
  return store;
}
