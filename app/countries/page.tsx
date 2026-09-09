import type { Metadata } from "next";
import Link from "next/link";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/lib/content";

export const metadata: Metadata = {
  title: "나라별 식탁",
  description:
    "직접 다녀온 나라와 지역의 음식, 식문화, 문화 이야기와 레시피를 함께 살펴보세요.",
  alternates: {
    canonical: "/countries",
  },
};

const explorationSteps = [
  {
    number: "01",
    eyebrow: "UNDERSTAND",
    title: "식문화의 기본 구조 읽기",
    description:
      "대표적인 맛과 재료, 식사 공간을 살펴보며 그 나라의 식탁이 어떤 환경에서 만들어졌는지 이해합니다.",
  },
  {
    number: "02",
    eyebrow: "DISCOVER",
    title: "한 가지 문화 이야기 깊게 읽기",
    description:
      "시장, 아침 식사, 술과 음료처럼 구체적인 장면을 통해 음식과 사람들의 생활 방식을 연결합니다.",
  },
  {
    number: "03",
    eyebrow: "COOK",
    title: "대표 음식 직접 만들어 보기",
    description:
      "문화적 배경을 확인한 뒤 한국에서 구할 수 있는 재료와 대체 방법으로 한 가지 음식을 완성합니다.",
  },
] as const;

export default function CountriesPage() {
  const totalStories = countries.reduce(
    (sum, country) => sum + country.storySlugs.length,
    0,
  );
  const totalRecipes = countries.reduce(
    (sum, country) => sum + country.recipeSlugs.length,
    0,
  );
  const visitedCountries = countries.filter(
    (country) => country.visit?.status === "visited",
  );
  const totalContents = totalStories + totalRecipes;
  const featuredCountry =
    countries.find((country) => country.slug === "usa") ?? countries[0]!;

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b9480c]" />
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                EXPLORE THE TABLE
              </p>
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              나라별 식탁
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              직접 다녀온 나라와 지역의 식탁에서 출발해 기후와 역사,
              사람들이 살아온 방식을 기록합니다. 방문한 장소와 문화 이야기,
              직접 따라 할 수 있는 레시피를 하나의 흐름으로 만나보세요.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#country-list"
                className="inline-flex rounded-full bg-[#b9480c] px-6 py-3 text-sm font-black !text-white transition hover:bg-[#943706]"
              >
                나라 선택하기
              </a>
              <Link
                href={`/countries/${featuredCountry.slug}`}
                className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
              >
                추천 식탁: {featuredCountry.nameKo}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#ddd2c5] bg-white/85 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
              CONTENT STATUS
            </p>
            <p className="mt-4 break-keep text-xl font-bold leading-8">
              여행의 기억을 문화 설명과 레시피로 확장하는 방문지 기반
              콘텐츠 아카이브입니다.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f7f3ed] p-4 text-center">
                <dt className="text-xs text-neutral-500">나라·지역</dt>
                <dd className="mt-2 text-2xl font-black">{countries.length}</dd>
              </div>
              <div className="rounded-2xl bg-[#fff3ea] p-4 text-center">
                <dt className="text-xs text-[#943706]">직접 방문</dt>
                <dd className="mt-2 text-2xl font-black text-[#943706]">
                  {visitedCountries.length}
                </dd>
              </div>
              <div className="rounded-2xl bg-[#f7f3ed] p-4 text-center">
                <dt className="text-xs text-neutral-500">문화 이야기</dt>
                <dd className="mt-2 text-2xl font-black">{totalStories}</dd>
              </div>
              <div className="rounded-2xl bg-[#f7f3ed] p-4 text-center">
                <dt className="text-xs text-neutral-500">전체 콘텐츠</dt>
                <dd className="mt-2 text-2xl font-black">{totalContents}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <nav
        aria-label="나라 바로가기"
        className="border-b border-stone-200 bg-white"
      >
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-5">
          {countries.map((country) => (
            <a
              key={country.slug}
              href={`#${country.slug}`}
              className="shrink-0 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold !text-neutral-700 no-underline transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
            >
              {country.nameKo}
            </a>
          ))}
        </div>
      </nav>

      <section className="border-b border-stone-200 bg-[#fffdf9]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              HOW TO EXPLORE
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
              한 나라의 식탁을 보는 세 단계
            </h2>
            <p className="mt-5 break-keep leading-7 text-neutral-600">
              상세 페이지는 짧은 국가 소개로 끝나지 않고 문화적 맥락, 지역의
              차이, 실제 레시피로 이어지도록 구성했습니다.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {explorationSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-[1.75rem] border border-stone-200 bg-white p-7 shadow-[0_14px_40px_rgba(70,50,25,0.04)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black tracking-[0.22em] text-[#b9480c]">
                    {step.eyebrow}
                  </p>
                  <span className="text-3xl font-black text-[#e9ded1]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-8 break-keep text-xl font-black leading-8">
                  {step.title}
                </h3>
                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="country-list"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              COUNTRY &amp; REGION
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
              어느 나라의 식탁을 만나볼까요?
            </h2>
          </div>
          <p className="max-w-md break-keep text-sm leading-7 text-neutral-600">
            ‘직접 다녀온 곳’ 배지와 방문 지역을 확인한 뒤 대표적인 맛과
            재료, 문화 이야기와 레시피를 함께 볼 수 있습니다.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {countries.map((country) => (
            <div
              key={country.slug}
              id={country.slug}
              className="scroll-mt-40"
            >
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
