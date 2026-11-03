import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import {
  dateError,
  timeOptions,
  type BookingMeta,
} from "@/lib/reservation-policy";
import {
  adminToken,
  equal,
  escape,
  hash,
  noStore,
  readBooking,
  safeOrigin,
  validId,
} from "@/lib/reservation-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: noStore });
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
export async function POST(request: Request) {
  if (!safeOrigin(request))
    return json({ message: "사이트에서 다시 신청해 주세요." }, 403);
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return json({ message: "입력 내용이 너무 깁니다." }, 413);
  let b;
  try {
    const raw = await request.text();
    if (raw.length > 12000)
      return json({ message: "입력 내용이 너무 깁니다." }, 413);
    b = JSON.parse(raw);
    if (!b || Array.isArray(b)) throw Error();
  } catch {
    return json({ message: "입력 형식을 확인해 주세요." }, 400);
  }
  const name = text(b.name),
    phone = text(b.phone),
    date = text(b.preferredDate),
    theme = text(b.theme),
    time = text(b.time),
    note = text(b.message),
    id = text(b.requestId),
    token = text(b.trackingToken);
  if (text(b.website))
    return json({ message: "신청을 처리할 수 없습니다." }, 400);
  if (!validId(id) || !/^[a-f0-9]{64}$/.test(token))
    return json({ message: "화면을 새로 열어 신청해 주세요." }, 400);
  if (
    !name ||
    name.length > 50 ||
    !/^[0-9+()\s-]{8,30}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 8
  )
    return json({ message: "이름과 연락처를 확인해 주세요." }, 400);
  const issue = dateError(date);
  if (issue) return json({ message: issue }, 400);
  if (
    !theme ||
    theme.length > 80 ||
    !timeOptions.includes(time as (typeof timeOptions)[number]) ||
    note.length > 500 ||
    !Number.isInteger(b.guests) ||
    b.guests < 1 ||
    b.guests > 100 ||
    b.privacyAgreed !== true
  )
    return json(
      {
        message:
          "나라·음식, 시간대, 희망 인원과 개인정보 동의를 확인해 주세요.",
      },
      400,
    );
  try {
    const existing = await readBooking(id);
    if (existing)
      return equal(existing.meta.trackingHash, hash(token))
        ? json({
            reservationId: id,
            status: existing.meta.status,
            message: "이미 접수된 신청입니다.",
          })
        : json({ message: "다시 신청해 주세요." }, 409);
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL)
      return json(
        { message: "예약 접수 준비 중입니다. 잠시 후 다시 이용해 주세요." },
        503,
      );
    const db = createSupabaseAdmin();
    const { count, error: countError } = await db
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("phone", phone)
      .gte("created_at", new Date(Date.now() - 600000).toISOString());
    if (countError) {
      console.error("Reservation count failed", {
        code: countError.code,
        message: countError.message,
      });
      throw Error("Reservation count failed");
    }
    if ((count || 0) >= 3)
      return json(
        {
          message:
            "잠시 후 다시 신청해 주세요. 동일 연락처의 연속 신청을 제한합니다.",
        },
        429,
      );
    const meta: BookingMeta = {
      kind: "manna-reservation-v1",
      status: "pending",
      theme,
      time,
      note,
      trackingHash: hash(token),
    };
    const { error } = await db.from("inquiries").insert({
      id,
      name,
      phone,
      preferred_date: date,
      guests: b.guests,
      message: JSON.stringify(meta),
    });
    if (error) {
      console.error("Reservation insert failed", {
        code: error.code,
        message: error.message,
      });
      if (error.code === "23505")
        return json(
          { message: "접수 상태를 확인한 뒤 다시 시도해 주세요." },
          409,
        );
      throw Error();
    }
    let notified = false;
    try {
      const link = new URL("/api/reservations/manage", request.url);
      link.searchParams.set("id", id);
      link.searchParams.set("token", adminToken(id));
      const { error: mailError } = await new Resend(
        process.env.RESEND_API_KEY,
      ).emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          "Manna Table <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `[만나의 식탁] 예약 확인 요청 · ${date}`,
        html: `<h2>새 모임 신청 · 확인 대기</h2><p>${escape(name)} / ${escape(phone)}</p><p>${escape(date)} · ${escape(time)} · 희망 ${b.guests}명</p><p>나라·음식: ${escape(theme)}</p><p>${escape(note)}</p><p>서울 대여 키친, 메뉴·인원·비용 협의가 필요합니다. 신청자에게 연락해 합의한 뒤 확정하세요.</p><p><a href="${escape(link.href)}">신청 확인 및 확정·진행 불가 처리</a></p><p>접수번호 ${id}. 이 링크는 운영자 전용입니다. 다른 사람에게 전달하지 마세요.</p>`,
      });
      notified = !mailError;
    } catch {
      console.error("Reservation notification failed");
    }
    return json(
      {
        reservationId: id,
        status: "pending",
        message:
          "예약 신청이 저장되었습니다. 장소·메뉴·인원·비용 협의 후 운영자가 확정합니다.",
        notified,
      },
      201,
    );
  } catch (error) {
    console.error(
      "Reservation persistence unavailable",
      error instanceof Error ? error.message : "unknown",
    );
    return json(
      {
        message:
          "신청을 저장하지 못했습니다. 입력 내용을 유지하고 있으니 잠시 후 다시 시도해 주세요.",
      },
      503,
    );
  }
}
export async function GET(request: Request) {
  const u = new URL(request.url),
    id = u.searchParams.get("id") || "",
    token = (request.headers.get("authorization") || "").replace(
      /^Bearer /,
      "",
    );
  if (!/^[a-f0-9]{64}$/.test(token))
    return json({ message: "확인 링크가 올바르지 않습니다." }, 404);
  try {
    const b = await readBooking(id);
    if (!b || !equal(b.meta.trackingHash, hash(token)))
      return json({ message: "신청을 찾을 수 없습니다." }, 404);
    return json({
      reservationId: id,
      status: b.meta.status,
      date: b.row.preferred_date,
      guests: b.row.guests,
      theme: b.meta.theme,
      time: b.meta.time,
      location: b.meta.location,
      finalTime: b.meta.finalTime,
      price: b.meta.price,
      reply: b.meta.reply,
    });
  } catch {
    return json(
      { message: "상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요." },
      503,
    );
  }
}
export async function PATCH(request: Request) {
  if (!safeOrigin(request))
    return json({ message: "사이트에서 다시 시도해 주세요." }, 403);
  const id = new URL(request.url).searchParams.get("id") || "",
    token = (request.headers.get("authorization") || "").replace(
      /^Bearer /,
      "",
    );
  if (!/^[a-f0-9]{64}$/.test(token))
    return json({ message: "유효한 확인 링크가 필요합니다." }, 404);
  try {
    const b = await readBooking(id);
    if (!b || !equal(b.meta.trackingHash, hash(token)))
      return json({ message: "신청을 찾을 수 없습니다." }, 404);
    if (b.meta.status === "cancelled") return json({ status: "cancelled" });
    if (b.meta.status === "declined")
      return json({ message: "이미 진행 불가로 처리된 신청입니다." }, 409);
    const message = JSON.stringify({ ...b.meta, status: "cancelled" });
    const { data, error } = await b.db
      .from("inquiries")
      .update({ message })
      .eq("id", id)
      .eq("message", b.row.message)
      .select("id")
      .maybeSingle();
    if (error) throw Error();
    if (!data)
      return json(
        { message: "처리 상태가 변경됐습니다. 새로고침 후 확인해 주세요." },
        409,
      );
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await new Resend(process.env.RESEND_API_KEY).emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Manna Table <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL,
          subject: `[만나의 식탁] 예약 신청 취소 · ${b.row.preferred_date}`,
          html: `<p>접수번호 ${escape(id)} 신청자가 취소했습니다.</p><p>${escape(b.row.name)} · ${escape(b.row.phone)} · ${escape(b.meta.theme)}</p>`,
        });
      } catch {
        console.error("Reservation cancellation notification failed");
      }
    }
    return json({ status: "cancelled" });
  } catch {
    return json(
      { message: "취소를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요." },
      503,
    );
  }
}
