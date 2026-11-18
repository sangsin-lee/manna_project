import { equal, noStore, safeOrigin } from "@/lib/reservation-server";
import { createSobanStore } from "@/lib/soban-store";
import { getSobanOperations } from "@/lib/soban-operations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => Response.json(body,{status,headers:{...noStore,"X-Robots-Tag":"noindex, nofollow"}});

export async function POST(request: Request) {
  const header = request.headers.get("authorization") || "";
  const expected = process.env.RESERVATION_ADMIN_TOKEN;
  if (!safeOrigin(request) || !expected || !header.startsWith("Bearer ") || !equal(header.slice(7),expected)) {
    return json({error:"운영 키를 확인해 주세요."},401);
  }
  try {
    return json(await getSobanOperations(createSobanStore()));
  } catch {
    return json({error:"지금은 운영 현황을 조회할 수 없습니다."},503);
  }
}
