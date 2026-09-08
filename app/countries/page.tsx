import type { Metadata } from "next";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/lib/content";

export const metadata: Metadata = {
  title: "나라별 식탁",
  description:
    "한국, 일본, 중국, 홍콩, 베트남, 이탈리아의 음식과 식문화를 나라별로 살펴보세요.",
  alternates: {
    canonical: "/countries",
  },
};

export default function CountriesPage() {
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
              한 나라의 음식에는 기후와 역사, 사람들이 살아온 방식이
              담겨 있습니다. 관심 있는 나라를 선택해 문화 이야기와
              레시피를 한 흐름으로 만나보세요.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-[#ddd2c5] bg-white/80 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
              CONTENT STATUS
            </p>
            <p className="mt-4 break-keep text-xl font-bold leading-8">
              {countries.length}개 나라·지역의 식탁과 연결된 콘텐츠를
              확인할 수 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["문화", "역사", "대표 음식", "레시피"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-neutral-600"
                >
                  {item}
                </span>
              ))}
            </div>
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
              className="shrink-0 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold !text-neutral-700 no-underline transition hover:border-[#b9480c] hover:!text-[#943706]"
            >
              {country.nameKo}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            COUNTRY &amp; REGION
          </p>
          <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
            어느 나라의 식탁을 만나볼까요?
          </h2>
          <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
            각 상세 페이지에서 식문화의 기본 특징, 관련 문화 이야기와
            실제로 따라 할 수 있는 레시피를 함께 볼 수 있습니다.
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
