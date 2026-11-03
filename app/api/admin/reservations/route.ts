import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import { decodeBooking } from "@/lib/reservation-policy";
import {
  adminToken,
  equal,
  noStore,
  safeOrigin,
} from "@/lib/reservation-server";
import { POST as manage } from "@/app/api/reservations/manage/route";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: noStore });
function authorized(r: Request) {
  const expected = process.env.RESERVATION_ADMIN_TOKEN;
  return Boolean(
    expected &&
      equal(
        (r.headers.get("authorization") || "").replace(/^Bearer /, ""),
        expected,
      ),
  );
}
export async function GET(request: Request) {
  if (!authorized(request))
    return json({ message: "운영자 전용 링크로 접속해 주세요." }, 401);
  try {
    const { data, error } = await createSupabaseAdmin()
      .from("inquiries")
      .select("id,name,phone,preferred_date,guests,message,created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw Error();
    return json({
      bookings: (data || []).flatMap((row) => {
        const meta = decodeBooking(row.message);
        return meta
          ? [
              {
                id: row.id,
                name: row.name,
                phone: row.phone,
                date: row.preferred_date,
                guests: row.guests,
                createdAt: row.created_at,
                status: meta.status,
                theme: meta.theme,
                time: meta.time,
                note: meta.note,
                location: meta.location,
                finalTime: meta.finalTime,
                price: meta.price,
                reply: meta.reply,
              },
            ]
          : [];
      }),
    });
  } catch {
    return json({ message: "예약 목록을 읽지 못했습니다." }, 503);
  }
}
export async function POST(request: Request) {
  if (!authorized(request) || !safeOrigin(request))
    return json({ message: "운영자 인증이 필요합니다." }, 401);
  if (Number(request.headers.get("content-length") || 0) > 6000)
    return json({ message: "입력 내용이 너무 깁니다." }, 413);
  try {
    const b = await request.json();
    if (!b || typeof b.id !== "string")
      return json({ message: "신청을 선택해 주세요." }, 400);
    const body = new URLSearchParams({
      id: b.id,
      token: adminToken(b.id),
      action: String(b.action || ""),
      location: String(b.location || ""),
      finalTime: String(b.finalTime || ""),
      price: String(b.price || ""),
      reply: String(b.reply || ""),
      agreed: b.agreed === true ? "on" : "",
    });
    const response = await manage(
      new Request(new URL("/api/reservations/manage", request.url), {
        method: "POST",
        headers: { Origin: new URL(request.url).origin },
        body,
      }),
    );
    return json(
      {
        message: response.ok
          ? "예약 상태를 저장했습니다. 신청자에게도 직접 안내해 주세요."
          : "입력한 확정 조건과 신청자 동의, 현재 상태를 확인해 주세요.",
      },
      response.status,
    );
  } catch {
    return json({ message: "처리하지 못했습니다. 다시 확인해 주세요." }, 503);
  }
}
