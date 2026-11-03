import {
  adminToken,
  equal,
  escape,
  noStore,
  readBooking,
  safeOrigin,
  validId,
} from "@/lib/reservation-server";
import {
  dateError,
  statusLabels,
  type BookingMeta,
} from "@/lib/reservation-policy";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function page(content: string, status = 200) {
  return new Response(
    `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>만나의 식탁 · 예약 관리</title><style>body{font:16px/1.8 system-ui;background:#f6f0e7;color:#292820;padding:25px}main{max-width:650px;margin:30px auto;padding:30px;background:white;border-radius:20px}label{display:block;margin:20px 0}input,textarea,button{box-sizing:border-box;width:100%;padding:12px;font:inherit}button{background:#713b25;color:white;border:0;margin:8px 0;cursor:pointer}.secondary{background:#666}a{color:#713b25}</style><main>${content}</main></html>`,
    {
      status,
      headers: {
        ...noStore,
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'",
      },
    },
  );
}
async function authorize(id: string, token: string) {
  if (!validId(id) || !equal(token, adminToken(id))) return null;
  return readBooking(id);
}
export async function GET(request: Request) {
  const u = new URL(request.url),
    id = u.searchParams.get("id") || "",
    token = u.searchParams.get("token") || "";
  try {
    const b = await authorize(id, token);
    if (!b) return page("<h1>유효한 운영자 링크가 필요합니다.</h1>", 404);
    const m = b.meta,
      r = b.row;
    return page(
      `<p>MANNA TABLE · 운영자 전용</p><h1>예약 신청 확인</h1><p>상태: <strong>${statusLabels[m.status]}</strong></p><p>${escape(r.name)} · ${escape(r.phone)}<br>${escape(r.preferred_date)} · ${escape(m.time)} · ${r.guests}명<br>나라·음식: ${escape(m.theme)}</p><p>${escape(m.note)}</p>${m.status === "pending" ? `<p>신청자와 장소·시간·최종 메뉴·인원·총비용을 먼저 협의하세요. 아래 확정 정보는 신청자의 상태 확인 화면에 표시됩니다.</p><form method="post"><input type="hidden" name="id" value="${id}"><input type="hidden" name="token" value="${token}"><label>확정 장소·주소<input name="location" maxlength="180"></label><label>확정 시간 (예: 14:00–17:00)<input name="finalTime" maxlength="60"></label><label>합의한 총비용·결제 안내<input name="price" maxlength="120"></label><label>최종 메뉴·확정 인원·전달 사항<textarea name="reply" maxlength="300"></textarea></label><label><input type="checkbox" name="agreed" style="width:auto"> 신청자에게 연락해 위 조건의 동의를 받았습니다.</label><button name="action" value="confirmed">협의한 조건으로 예약 확정</button><button class="secondary" name="action" value="declined">진행 불가로 안내 (전달 사항 입력)</button></form>` : `<p>${escape(m.location)}<br>${escape(m.finalTime)}<br>${escape(m.price)}<br>${escape(m.reply)}</p><p>이미 처리된 신청입니다. 변경이 필요하면 신청자와 직접 연락해 주세요.</p>`}`,
    );
  } catch {
    return page("<h1>잠시 후 다시 확인해 주세요.</h1>", 503);
  }
}
export async function POST(request: Request) {
  if (!safeOrigin(request)) return page("<h1>다시 접속해 주세요.</h1>", 403);
  if (Number(request.headers.get("content-length") || 0) > 6000)
    return page("<h1>입력 내용이 너무 깁니다.</h1>", 413);
  try {
    const f = await request.formData(),
      id = String(f.get("id") || ""),
      token = String(f.get("token") || ""),
      b = await authorize(id, token);
    if (!b) return page("<h1>유효한 운영자 링크가 필요합니다.</h1>", 404);
    if (b.meta.status !== "pending")
      return page("<h1>이미 처리된 신청입니다.</h1>", 409);
    const action = f.get("action"),
      location = String(f.get("location") || "").trim(),
      finalTime = String(f.get("finalTime") || "").trim(),
      price = String(f.get("price") || "").trim(),
      reply = String(f.get("reply") || "").trim();
    if (action !== "confirmed" && action !== "declined")
      return page("<h1>처리 방식을 확인해 주세요.</h1>", 400);
    if (
      location.length > 180 ||
      finalTime.length > 60 ||
      price.length > 120 ||
      reply.length > 300
    )
      return page("<h1>내용을 짧게 입력해 주세요.</h1>", 400);
    if (
      action === "confirmed" &&
      (!location ||
        !finalTime ||
        !price ||
        !reply ||
        f.get("agreed") !== "on" ||
        dateError(b.row.preferred_date))
    )
      return page(
        "<h1>확정 조건을 확인해 주세요.</h1><p>장소, 시간, 총비용, 최종 메뉴·인원을 입력하고 신청자의 동의를 확인해야 합니다. 지난 날짜는 확정할 수 없습니다.</p><p>브라우저 뒤로 가기로 입력 화면에 돌아갈 수 있습니다.</p>",
        400,
      );
    if (action === "declined" && !reply)
      return page("<h1>진행 불가 사유와 안내를 입력해 주세요.</h1>", 400);
    const meta: BookingMeta = {
        ...b.meta,
        status: action,
        location,
        finalTime,
        price,
        reply,
      },
      message = JSON.stringify(meta);
    if (message.length > 2000)
      return page("<h1>확정 안내를 더 짧게 작성해 주세요.</h1>", 400);
    const { data, error } = await b.db
      .from("inquiries")
      .update({ message })
      .eq("id", id)
      .eq("message", b.row.message)
      .select("id")
      .maybeSingle();
    if (error) throw Error();
    if (!data)
      return page(
        "<h1>다른 화면에서 먼저 처리됐습니다. 새로 확인해 주세요.</h1>",
        409,
      );
    return page(
      `<h1>${statusLabels[action]} 처리했습니다.</h1><p>신청자의 상태 확인 화면에도 반영됐습니다. 전화·문자 등으로 신청자에게 직접 안내해 주세요.</p><a href="?id=${id}&token=${token}">처리 결과 확인</a>`,
    );
  } catch {
    return page("<h1>저장하지 못했습니다. 다시 확인해 주세요.</h1>", 503);
  }
}
