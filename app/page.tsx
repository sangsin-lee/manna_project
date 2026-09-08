import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import CountryCard from "@/components/CountryCard";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import ReservationForm from "@/components/ReservationForm";
import StoryCard from "@/components/StoryCard";
import { countries, recipes, stories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const featuredCountries = countries.slice(0, 4);
const featuredStories = stories.slice(0, 3);
const featuredRecipes = recipes.slice(0, 3);
const heroStory = stories[0];

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
              FOOD · CULTURE · STORY
            </p>
            <h1 className="mt-5 max-w-2xl break-keep text-4xl font-black leading-[1.14] tracking-tight sm:text-5xl lg:text-6xl">
              한 끼로 만나는
              <br />
              세계 문화
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              음식에는 그곳에서 살아온 사람들의 역사와 생활방식이 담겨
              있습니다. 만나의 식탁은 무엇을 먹는지만 알려 주지 않고, 왜
              그렇게 먹게 되었는지 함께 기록합니다.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/countries"
                className="rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706]"
              >
                나라별 식탁 둘러보기
              </Link>
              <Link
                href="/recipes"
                className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 no-underline transition hover:border-neutral-950"
              >
                세계 레시피 보기
              </Link>
            </div>
          </div>

          <Link
            href={`/stories/${heroStory.slug}`}
            className="block overflow-hidden rounded-[2.25rem] border border-[#dfd4c7] bg-[#eee2d0] p-5 no-underline shadow-[0_24px_70px_rgba(70,50,25,0.08)] transition hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <ContentVisual
                eyebrow="FEATURED STORY · HONG KONG"
                label={heroStory.visualLabel}
                caption={heroStory.visualCaption}
                palette={heroStory.palette}
                size="feature"
              />
              <div className="p-6 sm:p-7">
                <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                  이번 주의 문화 이야기
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

      <section className="border-b border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                EXPLORE BY COUNTRY
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                나라별 식탁
              </h2>
              <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
                지역의 기후와 재료, 역사와 생활방식이 어떻게 음식의
                특징으로 이어지는지 살펴보세요.
              </p>
            </div>
            <Link
              href="/countries"
              className="text-sm font-black !text-[#943706] no-underline"
            >
              모든 나라 보기 →
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
              CULTURE STORIES
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              음식 뒤에 놓인 이야기
            </h2>
          </div>
          <Link
            href="/stories"
            className="text-sm font-black !text-[#943706] no-underline"
          >
            모든 이야기 보기 →
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
                COOK AT HOME
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                직접 만드는 세계 음식
              </h2>
              <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
                문화적 배경과 조리 시간, 대체 재료까지 확인하고 나의
                식탁에서 직접 만들어 보세요.
              </p>
            </div>
            <Link
              href="/recipes"
              className="text-sm font-black !text-[#943706] no-underline"
            >
              모든 레시피 보기 →
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
              직접 만들고 먹는 경험, 자료를 바탕으로 정리한 문화 이야기,
              현장에서 발견한 기록을 하나의 흐름으로 연결합니다.
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
