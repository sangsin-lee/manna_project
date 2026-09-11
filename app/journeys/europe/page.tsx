import type { Metadata } from "next";
import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import {
  getCountry,
  getRecipe,
  getStory,
  type Country,
  type Recipe,
  type Story,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "유럽 여행 식탁 기록",
  description:
    "파리, 슈투트가르트, 융프라우, 로마와 바티칸에서 시작된 음식·문화 기록을 나라별 이야기와 레시피로 이어서 살펴보세요.",
  alternates: {
    canonical: "/journeys/europe",
  },
  openGraph: {
    type: "article",
    title: "유럽 여행 식탁 기록 | 만나의 식탁",
    description:
      "파리에서 로마까지, 직접 다녀온 유럽 지역의 식탁을 문화 이야기와 레시피로 연결합니다.",
    url: `${siteConfig.url}/journeys/europe`,
  },
};

type JourneyStop = {
  number: string;
  city: string;
  country: Country;
  story: Story;
  recipe: Recipe;
  note: string;
};

function requireCountry(slug: string): Country {
  const country = getCountry(slug);

  if (!country) {
    throw new Error(`유럽 여행 국가 데이터가 없습니다: ${slug}`);
  }

  return country;
}

function requireStory(slug: string): Story {
  const story = getStory(slug);

  if (!story) {
    throw new Error(`유럽 여행 문화 이야기 데이터가 없습니다: ${slug}`);
  }

  return story;
}

function requireRecipe(slug: string): Recipe {
  const recipe = getRecipe(slug);

  if (!recipe) {
    throw new Error(`유럽 여행 레시피 데이터가 없습니다: ${slug}`);
  }

  return recipe;
}

const journeyStops: JourneyStop[] = [
  {
    number: "01",
    city: "파리",
    country: requireCountry("france"),
    story: requireStory("paris-boulangerie-cafe-daily-life"),
    recipe: requireRecipe("french-croque-monsieur"),
    note: "불랑주리와 카페, 비스트로를 통해 도시 생활 안에서 빵과 한 접시 식사가 어떤 역할을 하는지 살펴봅니다.",
  },
  {
    number: "02",
    city: "슈투트가르트",
    country: requireCountry("germany"),
    story: requireStory("stuttgart-swabian-table"),
    recipe: requireRecipe("swabian-maultaschen"),
    note: "독일 전체를 한 가지 맛으로 묶지 않고 슈바벤 지역의 마울타셴, 슈페츨레와 시장 문화를 중심으로 기록합니다.",
  },
  {
    number: "03",
    city: "융프라우 지역",
    country: requireCountry("switzerland"),
    story: requireStory("jungfrau-alpine-cuisine"),
    recipe: requireRecipe("swiss-rosti"),
    note: "산악 열차와 전망 식당, 알프스의 보존 식재료가 감자와 치즈 중심의 든든한 식탁으로 이어지는 과정을 봅니다.",
  },
  {
    number: "04",
    city: "로마·바티칸",
    country: requireCountry("italy"),
    story: requireStory("rome-vatican-food-route"),
    recipe: requireRecipe("roman-cacio-e-pepe"),
    note: "로마의 거리와 바티칸 주변 동선에서 적은 재료로 완성하는 파스타, 카페와 관광 식사의 관계를 정리합니다.",
  },
];

const journeyItemList = journeyStops.map((stop, index) => ({
  "@type": "ListItem",
  position: index + 1,
  name: `${stop.country.nameKo} ${stop.city}`,
  url: `${siteConfig.url}/countries/${stop.country.slug}`,
}));

export default function EuropeJourneyPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "유럽 여행 식탁 기록",
            description:
              "파리, 슈투트가르트, 융프라우, 로마와 바티칸에서 시작된 음식·문화 기록",
            url: `${siteConfig.url}/journeys/europe`,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: journeyItemList,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: siteConfig.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "유럽 여행 식탁 기록",
                item: `${siteConfig.url}/journeys/europe`,
              },
            ],
          },
        ]}
      />

      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
          <nav
            aria-label="현재 위치"
            className="flex flex-wrap items-center gap-2 text-sm text-neutral-500"
          >
            <Link href="/" className="hover:!text-neutral-950">
              홈
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-neutral-950">유럽 여행 기록</span>
          </nav>

          <div className="mt-9 grid overflow-hidden rounded-[2.25rem] border border-[#ddd2c5] bg-white shadow-[0_24px_75px_rgba(70,50,25,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
            <ContentVisual
              eyebrow="PARIS · STUTTGART · JUNGFRAU · ROME"
              label="EUROPE"
              caption="TRAVEL · FOOD · CULTURE"
              palette={{
                from: "#efe5d7",
                mid: "#d9d5c2",
                to: "#c5d4d6",
                ink: "#31454a",
              }}
              size="hero"
            />

            <div className="flex flex-col justify-center p-8 sm:p-11 lg:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
                  EUROPE JOURNEY
                </p>
                <span className="rounded-full border border-[#e5b596] bg-[#fff3ea] px-3 py-1 text-[11px] font-black text-[#943706]">
                  방문지 기반
                </span>
              </div>
              <h1 className="mt-4 break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                파리에서 로마까지,
                <br />
                네 지역의 식탁 기록
              </h1>
              <p className="mt-6 max-w-2xl break-keep text-base leading-8 text-neutral-600">
                프랑스 파리, 독일 슈투트가르트, 스위스 융프라우 지역,
                이탈리아 로마와 바티칸에서 남긴 여행 기억을 나라별 식문화,
                문화 이야기와 집에서 시도할 수 있는 레시피로 확장합니다.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">방문 지역</dt>
                  <dd className="mt-1 text-xl font-black">4</dd>
                </div>
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">연결 이야기</dt>
                  <dd className="mt-1 text-xl font-black">8</dd>
                </div>
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">연결 레시피</dt>
                  <dd className="mt-1 text-xl font-black">8</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-black !text-white no-underline transition hover:bg-[#943706]"
                >
                  Instagram 여행 기록 ↗
                </a>
                <Link
                  href="/countries?continent=europe#country-archive"
                  className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 no-underline transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                >
                  유럽 나라별 식탁
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="유럽 여행 식탁 목차"
        className="border-b border-stone-200 bg-white lg:sticky lg:top-20 lg:z-40"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
          <a
            href="#route"
            className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
          >
            여행 동선
          </a>
          <a
            href="#method"
            className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
          >
            기록 방법
          </a>
          <a
            href="#stories"
            className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
          >
            문화 이야기
          </a>
          <a
            href="#recipes"
            className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
          >
            레시피
          </a>
        </div>
      </nav>

      <section
        id="route"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            FOUR STOPS
          </p>
          <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
            도시의 일상에서 산악 식탁과 로마 파스타까지
          </h2>
          <p className="mt-5 break-keep leading-7 text-neutral-600">
            각 방문지는 해당 나라 전체를 대표하는 표본이 아니라, 더 넓은
            식문화를 탐색하기 위한 개인적인 출발점입니다.
          </p>
        </div>

        <ol className="mt-12 space-y-8">
          {journeyStops.map((stop) => (
            <li
              key={stop.city}
              className="grid overflow-hidden rounded-[2rem] border border-[#ded3c7] bg-white shadow-[0_18px_55px_rgba(70,50,25,0.055)] lg:grid-cols-[0.72fr_1.28fr]"
            >
              <ContentVisual
                eyebrow={`${stop.number} · ${stop.country.nameEn}`}
                label={stop.city}
                caption={stop.country.representativeFoods.slice(0, 3).join(" · ")}
                palette={stop.country.palette}
              />
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                    {stop.country.nameKo}
                  </span>
                  <span className="rounded-full bg-[#f7f3ed] px-3 py-1.5 text-[11px] font-black text-neutral-600">
                    {stop.city}
                  </span>
                </div>
                <h3 className="mt-4 break-keep text-2xl font-black leading-9">
                  {stop.country.headline}
                </h3>
                <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                  {stop.note}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={`/stories/${stop.story.slug}`}
                    className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-4 no-underline transition hover:border-[#b9480c]"
                  >
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#b9480c]">
                      CULTURE STORY
                    </p>
                    <p className="mt-2 break-keep text-sm font-black leading-6 !text-neutral-900">
                      {stop.story.title}
                    </p>
                  </Link>
                  <Link
                    href={`/recipes/${stop.recipe.slug}`}
                    className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-4 no-underline transition hover:border-[#b9480c]"
                  >
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#b9480c]">
                      RECIPE
                    </p>
                    <p className="mt-2 break-keep text-sm font-black leading-6 !text-neutral-900">
                      {stop.recipe.title}
                    </p>
                  </Link>
                </div>

                <div className="mt-7">
                  <Link
                    href={`/countries/${stop.country.slug}`}
                    className="inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706]"
                  >
                    {stop.country.nameKo}의 식탁 자세히 보기
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="method"
        className="scroll-mt-40 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              EDITORIAL METHOD
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
              여행 기억과 문화 정보를 섞지 않는 방법
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="rounded-[1.75rem] border border-[#ded3c7] bg-white p-7">
              <p className="text-sm font-black tracking-[0.2em] text-[#b9480c]">
                01 · PERSONAL RECORD
              </p>
              <h3 className="mt-7 text-xl font-black">하이라이트는 여행 기록</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                직접 촬영한 장소와 메뉴, 당시의 인상을 개인 기록으로
                표시합니다. 실제로 먹었다고 확인되지 않은 메뉴에는 현지 체험
                배지를 붙이지 않습니다.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-[#ded3c7] bg-white p-7">
              <p className="text-sm font-black tracking-[0.2em] text-[#b9480c]">
                02 · OFFICIAL CONTEXT
              </p>
              <h3 className="mt-7 text-xl font-black">공식 자료로 문화 맥락 검토</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                지역 관광기관과 문화유산 자료를 통해 음식의 지역성, 식사
                방식과 역사적 배경을 확인하고 과도한 일반화를 피합니다.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-[#ded3c7] bg-white p-7">
              <p className="text-sm font-black tracking-[0.2em] text-[#b9480c]">
                03 · RECIPE STATUS
              </p>
              <h3 className="mt-7 text-xl font-black">조리 경험 상태를 구분</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                조사한 레시피, 직접 재현한 메뉴와 현지에서 맛본 메뉴를 서로
                다른 상태로 표시해 콘텐츠의 근거를 분명하게 남깁니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              JOURNEY STORIES
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              도시별 문화 이야기
            </h2>
          </div>
          <Link
            href="/stories?continent=europe#story-archive"
            className="text-sm font-black !text-[#943706] no-underline"
          >
            유럽 이야기 전체 보기 →
          </Link>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {journeyStops.map((stop) => (
            <StoryCard key={stop.story.slug} story={stop.story} />
          ))}
        </div>
      </section>

      <section
        id="recipes"
        className="scroll-mt-40 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                JOURNEY RECIPES
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                여행에서 이어진 레시피
              </h2>
            </div>
            <Link
              href="/recipes?continent=europe#recipe-archive"
              className="text-sm font-black !text-[#943706] no-underline"
            >
              유럽 레시피 전체 보기 →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {journeyStops.map((stop) => (
              <RecipeCard key={stop.recipe.slug} recipe={stop.recipe} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="rounded-[2.25rem] bg-neutral-950 px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#f1a678]">
              CONTINUE THE JOURNEY
            </p>
            <h2 className="mt-4 max-w-2xl break-keep text-3xl font-black leading-tight sm:text-4xl">
              사진 속 정확한 메뉴를 확인한 뒤
              <br className="hidden sm:block" />
              개인 여행 기록을 더 구체화합니다.
            </h2>
            <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-neutral-300">
              이후 직접 촬영한 사진, 식당명과 주문 메뉴를 연결하면 각 도시의
              콘텐츠를 일반 정보가 아닌 실제 여행 아카이브로 확장할 수 있습니다.
            </p>
          </div>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 no-underline transition hover:bg-neutral-200 lg:mt-0 lg:shrink-0"
          >
            {siteConfig.instagramHandle} 보기 ↗
          </a>
        </div>
      </section>
    </main>
  );
}
