import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보 처리 안내",
  description: "만나의 식탁 문의 폼의 개인정보 수집 및 이용 안내입니다.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:py-24">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            PRIVACY NOTICE
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            개인정보 처리 안내
          </h1>
          <p className="mt-6 break-keep leading-8 text-neutral-600">
            만나의 식탁은 클래스 및 모임 문의를 처리하기 위해 아래
            정보를 수집합니다.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-black">1. 수집 항목</h2>
            <p className="mt-4 break-keep leading-8 text-neutral-600">
              필수 항목은 이름과 연락처입니다. 희망 날짜, 예상 인원,
              문의 내용은 사용자가 필요에 따라 입력할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">2. 이용 목적</h2>
            <p className="mt-4 break-keep leading-8 text-neutral-600">
              입력한 정보는 문의 내용 확인, 일정 및 프로그램 안내,
              예약 관련 연락을 위해 사용합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">3. 보관과 삭제</h2>
            <p className="mt-4 break-keep leading-8 text-neutral-600">
              문의 정보는 상담과 예약 관리에 필요한 기간 동안 보관한 뒤
              삭제합니다. 실제 운영 전 사업 형태와 관련 의무에 맞춰
              구체적인 보관 기간을 확정하고 이 문구를 수정해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">4. 동의 거부</h2>
            <p className="mt-4 break-keep leading-8 text-neutral-600">
              개인정보 수집에 동의하지 않을 수 있으나, 이름과 연락처가
              없으면 문의 답변과 예약 안내가 어렵습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black">5. 문의</h2>
            <p className="mt-4 break-keep leading-8 text-neutral-600">
              개인정보 관련 문의는 사이트 운영자에게 요청할 수 있습니다.
            </p>
            {siteConfig.contactEmail ? (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-4 inline-flex font-bold !text-[#943706] underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
            ) : (
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 break-keep text-sm leading-6 text-amber-900">
                공개 전 NEXT_PUBLIC_CONTACT_EMAIL 환경변수에 운영자 연락처를
                설정하세요.
              </p>
            )}
          </section>
        </div>

        <p className="mt-16 border-t border-stone-200 pt-8 break-keep text-xs leading-6 text-neutral-500">
          이 페이지는 초기 운영을 위한 기본 초안입니다. 사업자 정보,
          실제 보관 기간, 처리 위탁 관계가 생기면 운영 형태에 맞게
          검토·수정해야 합니다.
        </p>
      </div>
    </main>
  );
}
