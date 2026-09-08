import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "브랜드 소개",
  description:
    "음식 한 끼를 통해 세계의 문화와 사람을 연결하는 만나의 식탁의 방향과 콘텐츠 원칙을 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

const principles = [
  {
    number: "01",
    title: "음식보다 먼저 맥락을 봅니다",
    description:
      "재료와 조리법을 나열하기 전에 그 음식이 어떤 기후, 역사, 생활환경에서 만들어졌는지 살펴봅니다.",
  },
  {
    number: "02",
    title: "지역과 시대의 차이를 구분합니다",
    description:
      "한 메뉴를 한 나라 전체의 고정된 모습으로 일반화하지 않고 지역, 세대, 가정에 따른 차이를 함께 기록합니다.",
  },
  {
    number: "03",
    title: "전통과 창작을 명확히 나눕니다",
    description:
      "현지의 전통 음식인지, 현대적으로 변형된 음식인지, 만나의 식탁이 재구성한 레시피인지 분명하게 표시합니다.",
  },
  {
    number: "04",
    title: "출처와 경험을 함께 남깁니다",
    description:
      "공식 기관과 신뢰할 수 있는 자료를 확인하고, 직접 경험한 내용은 자료에 근거한 설명과 구분합니다.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            ABOUT MANNA TABLE
          </p>
          <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            식탁 위에서
            <br />
            세계를 이해하는 방법
          </h1>
          <p className="mt-7 max-w-3xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
            만나의 식탁은 세계 음식을 단순히 소비하는 데서 멈추지 않고,
            한 끼에 담긴 지역의 환경과 역사, 사람들의 생활방식을 함께
            이해하는 음식·문화 프로젝트입니다.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            OUR QUESTION
          </p>
          <h2 className="mt-3 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            “왜 이곳에서는
            <br />
            이 음식을 먹게 되었을까?”
          </h2>
        </div>
        <div className="article-copy">
          <p>
            레시피에는 재료의 양과 조리 순서가 적혀 있지만, 그 음식이
            사람들의 삶에서 어떤 역할을 했는지는 충분히 설명되지 않는
            경우가 많습니다.
          </p>
          <p>
            만나의 식탁은 음식 이름에서 출발해 시장과 가정, 계절과
            지역, 이주와 문화 교류까지 연결합니다. 글로 배경을 읽고
            레시피로 직접 만들어 본 뒤, 클래스와 영상에서 경험을
            나누는 구조를 지향합니다.
          </p>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            EDITORIAL PRINCIPLES
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            콘텐츠 원칙
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="rounded-[1.5rem] border border-stone-200 bg-white p-7"
              >
                <p className="text-sm font-black tracking-[0.2em] text-[#b9480c]">
                  {principle.number}
                </p>
                <h3 className="mt-6 text-xl font-black">{principle.title}</h3>
                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="rounded-[2.25rem] bg-neutral-950 px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#ef9d6d]">
              EXPLORE
            </p>
            <h2 className="mt-4 break-keep text-3xl font-black leading-tight sm:text-4xl">
              관심 있는 나라의 식탁에서
              <br className="hidden sm:block" />
              이야기를 시작해 보세요.
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
            <Link
              href="/countries"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-black !text-neutral-950"
            >
              나라별 식탁
            </Link>
            <Link
              href="/classes"
              className="rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-black !text-white"
            >
              클래스 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
