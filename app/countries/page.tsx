import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "나라별 식탁 | 만나의 식탁",
  description:
    "한국, 일본, 중국, 홍콩, 베트남, 이탈리아의 음식과 식문화를 나라별로 살펴보세요.",
};

type Country = {
  slug: string;
  nameKo: string;
  nameEn: string;
  flag: string;
  type: "COUNTRY" | "REGION";
  headline: string;
  description: string;
  keywords: string[];
  foods: string[];
  background: string;
  published: boolean;
};

const countries: Country[] = [
  {
    slug: "korea",
    nameKo: "한국",
    nameEn: "KOREA",
    flag: "🇰🇷",
    type: "COUNTRY",
    headline: "함께 나누는 반찬과 발효의 식탁",
    description:
      "한국의 식탁은 밥과 국, 여러 반찬을 함께 놓고 나누어 먹는 구조를 중심으로 발전했습니다. 발효 음식과 계절 재료, 시장 음식에도 한국인의 생활방식이 담겨 있습니다.",
    keywords: ["반찬 문화", "발효 음식", "함께 먹는 식사"],
    foods: ["김치", "비빔밥", "불고기"],
    background:
      "linear-gradient(135deg, #f5e3d7 0%, #e7eee5 55%, #d8e3dc 100%)",
    published: false,
  },
  {
    slug: "japan",
    nameKo: "일본",
    nameEn: "JAPAN",
    flag: "🇯🇵",
    type: "COUNTRY",
    headline: "계절과 재료 본연의 맛을 담은 식탁",
    description:
      "일본의 식문화는 제철 재료와 정갈한 구성, 재료 본연의 맛을 중요하게 여깁니다. 가정식부터 이자카야, 지역별 향토 음식까지 다양한 식탁 문화를 만날 수 있습니다.",
    keywords: ["제철 재료", "가정식", "이자카야"],
    foods: ["스시", "라멘", "오코노미야키"],
    background:
      "linear-gradient(135deg, #f4dfdc 0%, #f3ece5 55%, #e8d8d2 100%)",
    published: false,
  },
  {
    slug: "china",
    nameKo: "중국",
    nameEn: "CHINA",
    flag: "🇨🇳",
    type: "COUNTRY",
    headline: "넓은 지역만큼 다양하게 발전한 맛",
    description:
      "중국 음식은 하나의 맛으로 설명하기 어렵습니다. 지역의 기후와 재료에 따라 매운맛, 담백한 맛, 향신료의 사용법과 조리 방식이 서로 다르게 발전했습니다.",
    keywords: ["지역별 음식", "향신료", "불과 볶음"],
    foods: ["마라샹궈", "딤섬", "훠궈"],
    background:
      "linear-gradient(135deg, #efd9c2 0%, #e9c9af 50%, #dcb99c 100%)",
    published: false,
  },
  {
    slug: "hong-kong",
    nameKo: "홍콩",
    nameEn: "HONG KONG",
    flag: "🇭🇰",
    type: "REGION",
    headline: "동서양 문화가 함께 놓인 도시의 식탁",
    description:
      "홍콩의 식문화에는 중국 남부의 전통과 영국 문화의 영향이 함께 담겨 있습니다. 차찬텡, 얌차, 딤섬과 밀크티는 홍콩의 빠른 도시 생활을 보여줍니다.",
    keywords: ["차찬텡", "얌차", "동서양의 만남"],
    foods: ["딤섬", "완탕면", "밀크티"],
    background:
      "linear-gradient(135deg, #ead9c4 0%, #e2d7c8 55%, #ced9cf 100%)",
    published: false,
  },
  {
    slug: "vietnam",
    nameKo: "베트남",
    nameEn: "VIETNAM",
    flag: "🇻🇳",
    type: "COUNTRY",
    headline: "쌀과 허브가 만드는 산뜻한 균형",
    description:
      "베트남의 식탁에서는 쌀과 면, 신선한 허브와 채소를 폭넓게 사용합니다. 피시소스의 감칠맛과 산미, 단맛이 어우러진 균형 잡힌 맛이 특징입니다.",
    keywords: ["쌀과 면", "신선한 허브", "피시소스"],
    foods: ["쌀국수", "반미", "분짜"],
    background:
      "linear-gradient(135deg, #dce8ce 0%, #d7e3c8 50%, #c4d5b3 100%)",
    published: false,
  },
  {
    slug: "italy",
    nameKo: "이탈리아",
    nameEn: "ITALY",
    flag: "🇮🇹",
    type: "COUNTRY",
    headline: "지역성과 가족의 시간이 담긴 식탁",
    description:
      "이탈리아 음식은 지역마다 사용하는 재료와 조리법이 뚜렷하게 다릅니다. 가족과 함께 천천히 식사하며 대화를 나누는 시간도 중요한 식문화로 자리 잡고 있습니다.",
    keywords: ["지역 음식", "가족 식사", "단순한 재료"],
    foods: ["파스타", "리소토", "티라미수"],
    background:
      "linear-gradient(135deg, #e8dfc9 0%, #e1e4cf 50%, #d5ddc7 100%)",
    published: false,
  },
];

const explorationMethods = [
  {
    number: "01",
    title: "문화 이야기",
    description:
      "식사 예절과 시장, 명절, 가정식처럼 음식 주변의 생활문화를 알아봅니다.",
  },
  {
    number: "02",
    title: "음식 이야기",
    description:
      "대표 음식이 어떤 환경에서 탄생했고 현지에서 어떻게 먹는지 살펴봅니다.",
  },
  {
    number: "03",
    title: "세계 레시피",
    description:
      "한국에서 구할 수 있는 재료를 활용해 세계 각지의 음식을 직접 만들어 봅니다.",
  },
];

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#bf4f10]" />
              <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
                EXPLORE THE TABLE
              </p>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              나라별 식탁
            </h1>

            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              한 나라의 음식에는 기후와 역사, 사람들이 살아온 방식이 담겨
              있습니다. 관심 있는 나라를 선택하고 음식에서 시작되는 문화
              이야기를 만나보세요.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#ded3c5] bg-white/75 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-bold tracking-[0.25em] text-[#bf4f10]">
              HOW TO EXPLORE
            </p>

            <p className="mt-4 text-xl font-semibold leading-8">
              음식의 이름만 아는 것에서
              <br />그 음식이 태어난 이유를 아는 것으로
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["문화", "역사", "재료", "생활", "레시피"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-neutral-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Country quick navigation */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-5">
          {countries.map((country) => (
            <a
              key={country.slug}
              href={`#${country.slug}`}
              className="shrink-0 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950"
            >
              <span className="mr-2" aria-hidden="true">
                {country.flag}
              </span>
              {country.nameKo}
            </a>
          ))}
        </div>
      </section>

      {/* Country cards */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
              COUNTRY &amp; REGION
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              어느 나라의 식탁을 만나볼까요?
            </h2>
          </div>

          <p className="max-w-md break-keep text-sm leading-7 text-neutral-500">
            각 나라의 식문화 소개와 대표 음식, 관련 레시피를 하나의 페이지에서
            이어서 볼 수 있도록 구성합니다.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {countries.map((country) => (
            <article
              key={country.slug}
              id={country.slug}
              className="scroll-mt-40 overflow-hidden rounded-[2rem] border border-[#dfd5c9] bg-white shadow-[0_20px_60px_rgba(70,50,25,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(70,50,25,0.1)]"
            >
              {/* Visual area */}
              <div
                className="relative min-h-60 overflow-hidden p-7 sm:p-8"
                style={{ background: country.background }}
              >
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.85), transparent 28%), radial-gradient(circle at 85% 85%, rgba(255,255,255,0.45), transparent 30%)",
                  }}
                />

                <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full border border-white/50 bg-white/20" />
                <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full border border-white/40 bg-white/10" />

                <div className="relative z-10 flex min-h-44 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-[0.25em] text-neutral-600">
                        {country.type}
                      </p>

                      <p className="mt-2 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
                        {country.nameEn}
                      </p>
                    </div>

                    <span
                      className="text-5xl drop-shadow-sm"
                      role="img"
                      aria-label={`${country.nameKo} 국기`}
                    >
                      {country.flag}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {country.foods.map((food) => (
                      <span
                        key={food}
                        className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text area */}
              <div className="p-7 sm:p-8">
                <p className="text-xs font-bold tracking-[0.24em] text-[#bf4f10]">
                  FOOD CULTURE
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  {country.nameKo}
                </h3>

                <p className="mt-3 break-keep text-lg font-semibold leading-7 text-neutral-850">
                  {country.headline}
                </p>

                <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                  {country.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {country.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-[#f5f1ea] px-3 py-2 text-xs font-medium text-neutral-600"
                    >
                      #{keyword.replaceAll(" ", "")}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-stone-200 pt-6">
                  {country.published ? (
                    <Link
                      href={`/countries/${country.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-neutral-950 transition hover:text-[#bf4f10]"
                    >
                      이 식탁 자세히 보기
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-neutral-500">
                        상세 콘텐츠 준비 중
                      </span>

                      <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-500">
                        COMING SOON
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Exploration methods */}
      <section className="border-y border-stone-200 bg-[#f5f1ea]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
              CONTENT GUIDE
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              한 나라의 식탁을 보는 세 가지 방법
            </h2>

            <p className="mt-5 break-keep leading-7 text-neutral-600">
              문화적 배경을 읽고, 대표 음식을 알아본 뒤 직접 만드는 레시피까지
              자연스럽게 이어지도록 콘텐츠를 구성합니다.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {explorationMethods.map((method) => (
              <article
                key={method.number}
                className="rounded-[1.75rem] border border-[#dfd5c9] bg-white p-7"
              >
                <p className="text-sm font-black tracking-[0.2em] text-[#bf4f10]">
                  {method.number}
                </p>

                <h3 className="mt-8 text-xl font-bold">{method.title}</h3>

                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {method.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="overflow-hidden rounded-[2.25rem] bg-neutral-950 px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-[#e9a06f]">
              TABLE OF THE WORLD
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              음식 한 접시에서 시작해
              <br className="hidden sm:block" />그 나라의 문화까지 만나보세요.
            </h2>

            <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-neutral-300">
              새로운 나라와 음식 이야기는 순차적으로 추가됩니다. 문화 이야기와
              레시피를 통해 세계의 식탁을 기록합니다.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link
              href="/stories"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
            >
              문화 이야기 보기
            </Link>

            <Link
              href="/recipes"
              className="rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              레시피 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
