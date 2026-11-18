import { demandSummary, runSoban, SobanError } from "@/lib/soban-live";
import { createSobanStore } from "@/lib/soban-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (data:unknown,status=200) => Response.json(data,{status,headers:{
  "Cache-Control":"private, no-store","Referrer-Policy":"no-referrer",
}});

export async function GET() {
  try {
    return json(await demandSummary(createSobanStore()));
  } catch {
    return json({error:"현재 참여 현황을 확인할 수 없습니다."},503);
  }
}

export async function POST(request:Request) {
  const origin=request.headers.get("origin");
  if ((origin && origin!==new URL(request.url).origin) ||
      !request.headers.get("content-type")?.startsWith("application/json"))
    return json({error:"이 사이트에서 다시 시도해 주세요."},403);
  if (Number(request.headers.get("content-length"))>12000)
    return json({error:"요청이 너무 큽니다."},413);
  try {
    const raw=await request.text();
    if(raw.length>6000) return json({error:"요청이 너무 큽니다."},413);
    const input=JSON.parse(raw);
    if(!input || typeof input!=="object" || Array.isArray(input))
      throw new SobanError("요청 형식을 확인해 주세요.");
    const ip=request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() || "local";
    return json(await runSoban(createSobanStore(),input,Date.now(),ip));
  } catch(e) {
    if(e instanceof SobanError) return json({error:e.message},e.status);
    if(e instanceof SyntaxError) return json({error:"요청 형식을 확인해 주세요."},400);
    return json({error:"요청을 처리하지 못했습니다. 개인 연결함에서 상태를 확인한 뒤 다시 시도해 주세요."},503);
  }
}
