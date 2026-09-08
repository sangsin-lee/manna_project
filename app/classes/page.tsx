import type { Metadata } from "next";
import Link from "next/link";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "클래스",
  description:
    "세계 음식과 식문화를 함께 경험하는 만나의 식탁 클래스와 소규모 모임을 살펴보세요.",
  alternates: {
    canonical: "/classes",
  },
};

const classes = [
  {
    label: "HONG KONG",
    title: "홍콩 딤섬과 차찬텡 클래스",
    description:
      "딤섬의 기본 구조와 홍콩식 밀크티를 만들며 차찬텡과 얌차 문화를 함께 살펴봅니다.",
    duration: "약 2시간 30분",
    people: "4~8명",
    includes: ["문화 이야기", "실습", "함께 먹는 식사"],
  },
  {
    label: "ITALY",
    title: "이탈리아 식탁 모임",
    description:
      "지역별 파스타의 차이를 알아보고 한 가지 파스타와 디저트를 만들어 대화를 나눕니다.",
    duration: "약 3시간",
    people: "4~8명",
    includes: ["지역 음식 소개", "요리 실습", "테이블 모임"],
  },
  {
    label: "WORLD DESSERT",
    title: "세계 디저트 체험",
    description:
      "나라별 디저트에 담긴 재료와 이야기를 알아보고 계절에 맞는 한 가지 디저트를 완성합니다.",
    duration: "약 2시간",
    people: "4~10명",
    includes: ["디저트 스토리", "실습", "포장"],
  },
];

const process = [
  {
    number: "01",
    title: "문의 남기기",
    description: "관심 주제, 희망 날짜와 예상 인원을 적어 주세요.",
  },
  {
    number: "02",
    title: "구성 협의",
    description:
      "참여자와 공간, 예산에 맞춰 메뉴와 진행 방식을 조정합니다.",
  },
  {
    number: "03",
    title: "일정 확정",
    description: "운영 가능 일정과 준비 사항을 확인한 뒤 예약을 확정합니다.",
  },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            EXPERIENCE THE TABLE
          </p>
          <h1 className="mt-5 max-w-3xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            만들고, 먹고,
            <br />
            문화까지 나누는 시간
          </h1>
          <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
            만나의 식탁 클래스는 레시피만 배우는 수업이 아닙니다. 음식이
            태어난 배경을 알아보고 함께 조리한 뒤 한 식탁에서 경험을
            나눕니다.
          </p>
          <Link
            href="#class-inquiry"
            className="mt-9 inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white transition hover:bg-[#943706]"
          >
            클래스 문의하기
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          PROGRAMS
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          클래스 예시
        </h2>
        <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
          아래 내용은 기본 구성 예시이며, 실제 일정과 메뉴는 문의 후
          조정합니다.
        </p>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {classes.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-[1.75rem] border border-[#dfd5c9] bg-white p-7 shadow-[0_16px_50px_rgba(70,50,25,0.05)]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                {item.label}
              </p>
              <h2 className="mt-4 break-keep text-2xl font-black leading-8">
                {item.title}
              </h2>
              <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                {item.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f7f3ed] p-4">
                  <dt className="text-xs text-neutral-500">진행 시간</dt>
                  <dd className="mt-1 text-sm font-black">{item.duration}</dd>
                </div>
                <div className="rounded-xl bg-[#f7f3ed] p-4">
                  <dt className="text-xs text-neutral-500">권장 인원</dt>
                  <dd className="mt-1 text-sm font-black">{item.people}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.includes.map((include) => (
                  <span
                    key={include}
                    className="rounded-full border border-stone-200 px-3 py-2 text-xs font-semibold text-neutral-600"
                  >
                    {include}
                  </span>
                ))}
              </div>

              <Link
                href="#class-inquiry"
                className="mt-auto pt-8 text-sm font-black !text-[#943706]"
              >
                이 구성으로 문의하기 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            RESERVATION PROCESS
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            예약 진행 방식
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {process.map((item) => (
              <article
                key={item.number}
                className="rounded-[1.5rem] border border-stone-200 bg-white p-7"
              >
                <p className="text-sm font-black tracking-[0.2em] text-[#b9480c]">
                  {item.number}
                </p>
                <h3 className="mt-8 text-xl font-black">{item.title}</h3>
                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="class-inquiry"
        className="scroll-mt-32 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            CLASS INQUIRY
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            클래스 문의
          </h2>
          <p className="mt-4 break-keep leading-7 text-neutral-600">
            관심 있는 프로그램과 원하는 메뉴를 문의 내용에 적어 주세요.
          </p>
        </div>
        <ReservationForm />
      </section>
    </main>
  );
}
