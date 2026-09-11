import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import CountryCard from "@/components/CountryCard";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import ReservationForm from "@/components/ReservationForm";
import StoryCard from "@/components/StoryCard";
import { getCountry, getRecipe, getStory, stories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

const featuredCountries = ["france", "germany", "switzerland", "italy"]
  .map((slug) => getCountry(slug))
  .filter(isDefined);

const featuredStories = [
  "paris-boulangerie-cafe-daily-life",
  "stuttgart-swabian-table",
  "jungfrau-alpine-cuisine",
]
  .map((slug) => getStory(slug))
  .filter(isDefined);

const featuredRecipes = [
  "french-croque-monsieur",
  "swabian-maultaschen",
  "roman-cacio-e-pepe",
]
  .map((slug) => getRecipe(slug))
  .filter(isDefined);

const heroStory = getStory("rome-vatican-food-route") ?? stories[0]!;
const heroCountry = getCountry(heroStory.country);

const europeStops = [
  {
    number: "01",
    country: "프랑스",
    place: "파리",
    description: "불랑주리와 카페, 비스트로에서 도시의 일상 식탁을 읽습니다.",
    href: "/countries/france",
  },
  {
    number: "02",
    country: "독일",
    place: "슈투트가르트",
    description: "마울타셴과 슈페츨레로 슈바벤 지역의 반죽 문화를 살펴봅니다.",
    href: "/countries/germany",
  },
  {
    number: "03",
    country: "스위스",
    place: "융프라우",
    description: "산악 이동 동선과 감자·치즈 중심의 알프스 식탁을 연결합니다.",
    href: "/countries/switzerland",
  },
  {
    number: "04",
    country: "이탈리아",
    place: "로마·바티칸",
    description: "적은 재료와 정확한 조리로 완성되는 로마 파스타를 기록합니다.",
    href: "/countries/italy",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          alternateName: siteConfig.englishName,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />

      <section className="border-b border-stone-200 bg-[#fffdf9]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              FOOD · CULTURE · JOURNEY
            </p>
            <h1 className="mt-5 max-w-2xl break-keep text-4xl font-black leading-[1.14] tracking-tight sm:text-5xl lg:text-6xl">
              여행의 한 끼를
              <br />
              문화와 레시피로
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              파리, 슈투트가르트, 융프라우, 로마와 바티칸에서 남긴 여행
              기록을 출발점으로 지역의 역사와 생활방식을 정리합니다. 개인
              기록과 공식 자료, 직접 따라 할 수 있는 레시피를 구분해
              연결합니다.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/journeys/europe"
                className="rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706]"
              >
                유럽 여행 기록 보기
              </Link>
              <Link
                href="/countries?continent=europe#country-archive"
                className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 no-underline transition hover:border-neutral-950"
              >
                유럽의 식탁 둘러보기
              </Link>
            </div>
          </div>

          <Link
            href={`/stories/${heroStory.slug}`}
            className="block overflow-hidden rounded-[2.25rem] border border-[#dfd4c7] bg-[#eee2d0] p-5 no-underline shadow-[0_24px_70px_rgba(70,50,25,0.08)] transition hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <ContentVisual
                eyebrow={`FEATURED JOURNEY · ${heroCountry?.nameEn ?? "EUROPE"}`}
                label={heroStory.visualLabel}
                caption={heroStory.visualCaption}
                palette={heroStory.palette}
                size="feature"
              />
              <div className="p-6 sm:p-7">
                <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                  이번 주의 여행 문화 이야기
                </p>
                <h2 className="mt-3 break-keep text-xl font-black leading-8">
                  {heroStory.title}
                </h2>
                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {heroStory.summary}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#f1a678]">
                EUROPE JOURNEY
              </p>
              <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
                파리에서 로마까지,
                <br className="hidden sm:block" />
                네 도시의 식탁을 잇습니다.
              </h2>
              <p className="mt-5 max-w-2xl break-keep text-sm leading-7 text-neutral-300">
                인스타그램 하이라이트는 개인 여행 기록의 출발점으로
                연결하고, 문화 설명은 공식 관광·문화 기관 자료로 별도
                검토했습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/journeys/europe"
                className="rounded-full bg-white px-6 py-3 text-sm font-black !text-neutral-950 no-underline transition hover:bg-neutral-200"
              >
                여행 동선 자세히 보기
              </Link>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-neutral-600 px-6 py-3 text-sm font-black !text-white no-underline transition hover:border-white"
              >
                Instagram 기록 ↗
              </a>
            </div>
          </div>

          <ol className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {europeStops.map((stop) => (
              <li key={stop.place}>
                <Link
                  href={stop.href}
                  className="group block h-full rounded-[1.5rem] border border-neutral-700 bg-neutral-900 p-6 no-underline transition hover:-translate-y-0.5 hover:border-[#f1a678]"
                >
                  <p className="text-xs font-black tracking-[0.18em] text-[#f1a678]">
                    {stop.number} · {stop.country}
                  </p>
                  <h3 className="mt-4 text-xl font-black !text-white">
                    {stop.place}
                  </h3>
                  <p className="mt-3 break-keep text-sm leading-7 text-neutral-300">
                    {stop.description}
                  </p>
                  <p className="mt-6 text-sm font-black !text-white transition group-hover:text-[#f1a678]">
                    식탁 보기 →
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                EXPLORE EUROPE
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                유럽의 나라별 식탁
              </h2>
              <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
                프랑스 파리, 독일 슈투트가르트, 스위스 융프라우, 이탈리아
                로마·바티칸의 방문 기록을 지역 식문화와 연결했습니다.
              </p>
            </div>
            <Link
              href="/countries?continent=europe#country-archive"
              className="text-sm font-black !text-[#943706] no-underline"
            >
              유럽 전체 보기 →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {featuredCountries.map((country) => (
              <CountryCard key={country.slug} country={country} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              EUROPE STORIES
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              여행지에서 시작한 문화 이야기
            </h2>
          </div>
          <Link
            href="/stories?continent=europe#story-archive"
            className="text-sm font-black !text-[#943706] no-underline"
          >
            유럽 이야기 전체 보기 →
          </Link>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                COOK EUROPE
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                유럽의 한 끼를 직접 만들기
              </h2>
              <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
                현지에서 본 식탁의 맥락을 읽고, 한국에서 구할 수 있는
                재료와 대체 방법으로 다시 구성합니다.
              </p>
            </div>
            <Link
              href="/recipes?continent=europe#recipe-archive"
              className="text-sm font-black !text-[#943706] no-underline"
            >
              유럽 레시피 전체 보기 →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-10 rounded-[2.25rem] bg-neutral-950 px-7 py-12 text-white sm:px-12 sm:py-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#ef9d6d]">
              ABOUT MANNA TABLE
            </p>
            <h2 className="mt-4 break-keep text-3xl font-black leading-tight sm:text-4xl">
              음식 한 접시를 넘어
              <br />
              그 나라의 문화와 사람을 만납니다.
            </h2>
            <p className="mt-5 max-w-2xl break-keep text-sm leading-7 text-neutral-300">
              직접 다녀온 곳의 기록, 공식 자료를 바탕으로 정리한 문화
              이야기, 집에서 재현할 수 있는 레시피를 하나의 흐름으로
              연결합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/about"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 no-underline transition hover:bg-neutral-200"
            >
              브랜드 소개
            </Link>
            <Link
              href="/classes"
              className="rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:border-white"
            >
              클래스 살펴보기
            </Link>
          </div>
        </div>
      </section>

      <section
        id="reservation"
        className="scroll-mt-32 border-t border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              RESERVATION
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              클래스 및 모임 문의
            </h2>
            <p className="mt-4 break-keep leading-7 text-neutral-600">
              관심 있는 나라와 메뉴, 희망 날짜와 인원을 남겨 주시면 운영
              가능 일정과 구성을 확인한 뒤 연락드립니다.
            </p>
          </div>
          <ReservationForm />
        </div>
      </section>
    </main>
  );
}
