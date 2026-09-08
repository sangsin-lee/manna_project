import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryPayload = {
  name?: unknown;
  phone?: unknown;
  preferredDate?: unknown;
  guests?: unknown;
  message?: unknown;
  privacyAgreed?: unknown;
  website?: unknown;
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validateDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (contentLength > 20_000) {
      return NextResponse.json(
        { message: "요청 데이터가 너무 큽니다." },
        { status: 413 },
      );
    }

    let body: InquiryPayload;

    try {
      body = (await request.json()) as InquiryPayload;
    } catch {
      return NextResponse.json(
        { message: "요청 데이터 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }

    // 사람이 보지 않는 허니팟 필드입니다. 값이 있으면 봇 요청으로 처리합니다.
    if (getText(body.website)) {
      return NextResponse.json(
        { message: "문의가 정상적으로 접수되었습니다." },
        { status: 201 },
      );
    }

    const name = getText(body.name);
    const phone = getText(body.phone);
    const preferredDateText = getText(body.preferredDate);
    const messageText = getText(body.message);

    if (!name || name.length > 50) {
      return NextResponse.json(
        { message: "이름은 1자 이상 50자 이하로 입력해 주세요." },
        { status: 400 },
      );
    }

    if (!phone || !validatePhone(phone) || phone.length > 30) {
      return NextResponse.json(
        { message: "연락처를 올바르게 입력해 주세요." },
        { status: 400 },
      );
    }

    if (
      preferredDateText &&
      !validateDate(preferredDateText)
    ) {
      return NextResponse.json(
        { message: "희망 날짜 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }

    let guests: number | null = null;

    if (
      body.guests !== undefined &&
      body.guests !== null &&
      body.guests !== ""
    ) {
      const parsedGuests = Number(body.guests);

      if (
        !Number.isInteger(parsedGuests) ||
        parsedGuests < 1 ||
        parsedGuests > 100
      ) {
        return NextResponse.json(
          { message: "인원은 1명 이상 100명 이하로 입력해 주세요." },
          { status: 400 },
        );
      }

      guests = parsedGuests;
    }

    if (messageText.length > 2000) {
      return NextResponse.json(
        { message: "문의 내용은 2,000자 이하로 입력해 주세요." },
        { status: 400 },
      );
    }

    if (body.privacyAgreed !== true) {
      return NextResponse.json(
        { message: "개인정보 수집 안내에 동의해 주세요." },
        { status: 400 },
      );
    }

    const preferredDate = preferredDateText || null;
    const message = messageText || null;
    const supabaseAdmin = createSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .insert({
        name,
        phone,
        preferred_date: preferredDate,
        guests,
        message,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase inquiry insert error:", {
        code: error.code,
        message: error.message,
        details: error.details,
      });

      return NextResponse.json(
        { message: "문의 저장에 실패했습니다." },
        { status: 500 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const adminEmail = process.env.ADMIN_EMAIL?.trim();

    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const from =
          process.env.RESEND_FROM_EMAIL?.trim() ||
          "Manna Table <onboarding@resend.dev>";

        const safeMessage = escapeHtml(message ?? "-").replace(
          /\r?\n/g,
          "<br />",
        );

        const { error: emailError } = await resend.emails.send({
          from,
          to: adminEmail,
          subject: `[만나의 식탁] 새 클래스 문의 - ${oneLine(name)}`,
          html: `
            <div style="max-width:640px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#262626;line-height:1.7">
              <p style="margin:0 0 8px;color:#b9480c;font-size:12px;font-weight:700;letter-spacing:.12em">
                MANNA TABLE INQUIRY
              </p>
              <h2 style="margin:0 0 24px;font-size:24px">새 문의가 접수되었습니다.</h2>
              <table style="width:100%;border-collapse:collapse">
                <tbody>
                  <tr>
                    <th style="width:120px;padding:12px;text-align:left;vertical-align:top;background:#faf8f5;border-bottom:1px solid #e5e5e5">이름</th>
                    <td style="padding:12px;border-bottom:1px solid #e5e5e5">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <th style="padding:12px;text-align:left;vertical-align:top;background:#faf8f5;border-bottom:1px solid #e5e5e5">연락처</th>
                    <td style="padding:12px;border-bottom:1px solid #e5e5e5">${escapeHtml(phone)}</td>
                  </tr>
                  <tr>
                    <th style="padding:12px;text-align:left;vertical-align:top;background:#faf8f5;border-bottom:1px solid #e5e5e5">희망 날짜</th>
                    <td style="padding:12px;border-bottom:1px solid #e5e5e5">${escapeHtml(preferredDate ?? "-")}</td>
                  </tr>
                  <tr>
                    <th style="padding:12px;text-align:left;vertical-align:top;background:#faf8f5;border-bottom:1px solid #e5e5e5">인원</th>
                    <td style="padding:12px;border-bottom:1px solid #e5e5e5">${guests ? `${guests}명` : "-"}</td>
                  </tr>
                  <tr>
                    <th style="padding:12px;text-align:left;vertical-align:top;background:#faf8f5;border-bottom:1px solid #e5e5e5">문의 내용</th>
                    <td style="padding:12px;border-bottom:1px solid #e5e5e5">${safeMessage}</td>
                  </tr>
                </tbody>
              </table>
              <p style="margin:24px 0 0;padding:16px;border-radius:12px;background:#f5f1ea;color:#737373;font-size:13px">
                문의 ID: ${escapeHtml(String(data.id))}<br />
                접수 시각: ${escapeHtml(String(data.created_at))}
              </p>
            </div>
          `,
        });

        if (emailError) {
          console.error("Resend inquiry email error:", emailError);
        }
      } catch (emailError) {
        // 메일 실패가 이미 저장된 문의의 실패로 처리되지 않게 분리합니다.
        console.error("Resend inquiry email exception:", emailError);
      }
    }

    return NextResponse.json(
      {
        message: "문의가 정상적으로 접수되었습니다.",
        inquiryId: data.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Inquiry route error:", error);

    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
