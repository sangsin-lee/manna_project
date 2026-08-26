import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

export const runtime = "nodejs";

type InquiryPayload = {
  name?: unknown;
  phone?: unknown;
  preferredDate?: unknown;
  guests?: unknown;
  message?: unknown;
};

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, "");

  return digits.length >= 8 && digits.length <= 15;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function sanitizeSubjectText(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    let body: InquiryPayload;

    try {
      body = (await req.json()) as InquiryPayload;
    } catch {
      return NextResponse.json(
        {
          message: "요청 데이터 형식이 올바르지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    const name = getString(body.name);
    const phone = getString(body.phone);

    const preferredDateValue = getString(body.preferredDate);
    const preferredDate = preferredDateValue || null;

    const messageValue = getString(body.message);
    const message = messageValue || null;

    if (!name) {
      return NextResponse.json(
        {
          message: "이름을 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        {
          message: "이름은 50자 이하로 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        {
          message: "연락처를 올바르게 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      return NextResponse.json(
        {
          message: "희망 날짜 형식이 올바르지 않습니다.",
        },
        {
          status: 400,
        },
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
          {
            message: "인원은 1명 이상 100명 이하로 입력해주세요.",
          },
          {
            status: 400,
          },
        );
      }

      guests = parsedGuests;
    }

    if (message && message.length > 2000) {
      return NextResponse.json(
        {
          message: "문의 내용은 2,000자 이하로 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * 파일이 import될 때 생성하는 것이 아니라
     * 실제 POST 요청이 들어온 시점에 생성합니다.
     */
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
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          message: "문의 저장에 실패했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    if (!data) {
      console.error("Supabase insert succeeded but no data returned.");

      return NextResponse.json(
        {
          message: "문의 저장 결과를 확인하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * 이메일 전송 실패가 문의 저장 실패로 이어지지 않도록
     * Supabase 저장과 Resend 전송을 분리해서 처리합니다.
     */
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const resendFromEmail =
      process.env.RESEND_FROM_EMAIL || "Reservation <onboarding@resend.dev>";

    if (resendApiKey && adminEmail) {
      try {
        const resend = new Resend(resendApiKey);

        const safeName = escapeHtml(name);
        const safePhone = escapeHtml(phone);
        const safePreferredDate = escapeHtml(preferredDate ?? "-");
        const safeGuests = escapeHtml(guests !== null ? `${guests}명` : "-");
        const safeMessage = escapeHtml(message ?? "-").replace(
          /\r?\n/g,
          "<br />",
        );
        const safeInquiryId = escapeHtml(String(data.id));
        const safeCreatedAt = escapeHtml(
          String(data.created_at ?? new Date().toISOString()),
        );

        const { error: emailError } = await resend.emails.send({
          from: resendFromEmail,
          to: adminEmail,
          subject: `[만나의 식탁] 새 예약 문의 - ${sanitizeSubjectText(name)}`,
          html: `
            <div
              style="
                max-width: 640px;
                margin: 0 auto;
                padding: 32px;
                font-family: Arial, sans-serif;
                color: #262626;
                line-height: 1.7;
              "
            >
              <div
                style="
                  padding-bottom: 20px;
                  border-bottom: 2px solid #bf4f10;
                "
              >
                <p
                  style="
                    margin: 0 0 6px;
                    color: #bf4f10;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                  "
                >
                  MANNA TABLE INQUIRY
                </p>

                <h2 style="margin: 0; font-size: 24px;">
                  새 예약 문의가 접수되었습니다.
                </h2>
              </div>

              <table
                style="
                  width: 100%;
                  margin-top: 24px;
                  border-collapse: collapse;
                "
              >
                <tbody>
                  <tr>
                    <th
                      style="
                        width: 120px;
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                        text-align: left;
                        vertical-align: top;
                        background: #faf8f5;
                      "
                    >
                      이름
                    </th>

                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                      "
                    >
                      ${safeName}
                    </td>
                  </tr>

                  <tr>
                    <th
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                        text-align: left;
                        vertical-align: top;
                        background: #faf8f5;
                      "
                    >
                      연락처
                    </th>

                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                      "
                    >
                      ${safePhone}
                    </td>
                  </tr>

                  <tr>
                    <th
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                        text-align: left;
                        vertical-align: top;
                        background: #faf8f5;
                      "
                    >
                      희망 날짜
                    </th>

                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                      "
                    >
                      ${safePreferredDate}
                    </td>
                  </tr>

                  <tr>
                    <th
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                        text-align: left;
                        vertical-align: top;
                        background: #faf8f5;
                      "
                    >
                      인원
                    </th>

                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                      "
                    >
                      ${safeGuests}
                    </td>
                  </tr>

                  <tr>
                    <th
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                        text-align: left;
                        vertical-align: top;
                        background: #faf8f5;
                      "
                    >
                      문의 내용
                    </th>

                    <td
                      style="
                        padding: 12px;
                        border-bottom: 1px solid #e5e5e5;
                      "
                    >
                      ${safeMessage}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style="
                  margin-top: 24px;
                  padding: 16px;
                  border-radius: 12px;
                  background: #f5f1ea;
                  color: #737373;
                  font-size: 13px;
                "
              >
                <p style="margin: 0 0 4px;">
                  <strong>문의 ID:</strong> ${safeInquiryId}
                </p>

                <p style="margin: 0;">
                  <strong>접수 시각:</strong> ${safeCreatedAt}
                </p>
              </div>
            </div>
          `,
        });

        if (emailError) {
          console.error("Resend email error:", emailError);
        }
      } catch (emailException) {
        /*
         * 이메일이 실패해도 문의는 이미 Supabase에 저장되었으므로
         * 사용자에게 500 오류를 반환하지 않습니다.
         */
        console.error("Resend email exception:", emailException);
      }
    } else {
      console.warn(
        "RESEND_API_KEY 또는 ADMIN_EMAIL이 없어 이메일 전송을 건너뜁니다.",
      );
    }

    return NextResponse.json(
      {
        message: "문의가 정상적으로 접수되었습니다.",
        inquiryId: data.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Inquiry route error:", error);

    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
