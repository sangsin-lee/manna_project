import type { Metadata } from "next";
import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import StoryCard from "@/components/StoryCard";
import {
  continentLabels,
  countries,
  experienceStatusLabels,
  getCountry,
  getStory,
  stories,
  storyCategoryLabels,
  type Continent,
  type CountrySlug,
  type StoryCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "문화 이야기",
  description:
    "파리, 슈투트가르트, 융프라우, 로마와 바티칸을 포함해 세계 각지의 음식에 담긴 역사와 생활방식을 살펴보세요.",
  alternates: {
    canonical: "/stories",
  },
};

const categoryOptions: Array<{
  value: "all" | StoryCategory;
  label: string;
}> = [
  { value: "all", label: "전체" },
  ...Object.entries(storyCategoryLabels).map(([value, label]) => ({
    value: value as StoryCategory,
    label,
  })),
];

const continentOptions: Array<{
  value: "all" | Continent;
  label: string;
}> = [
  { value: "all", label: "전체 대륙" },
  ...Object.entries(continentLabels).map(([value, label]) => ({
    value: value as Continent,
    label,
  })),
];

type CountryFilter = "all" | CountrySlug;
type ContinentFilter = "all" | Continent;

function buildStoriesHref({
  category,
  continent,
  country,
}: {
  category: "all" | StoryCategory;
  continent: ContinentFilter;
  country: CountryFilter;
}) {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  if (continent !== "all") query.set("continent", continent);
  if (country !== "all") query.set("country", country);
  const queryString = query.toString();

  return queryString
    ? `/stories?${queryString}#story-archive`
    : "/stories#story-archive";
}

type StoriesPageProps = {
  searchParams: Promise<{
    category?: string;
    continent?: string;
    country?: string;
  }>;
};

export default async function StoriesPage({
  searchParams,
}: StoriesPageProps) {
  const params = await searchParams;

  const activeCategory: "all" | StoryCategory = categoryOptions.some(
    (item) => item.value === params.category,
  )
    ? (params.category as StoryCategory)
    : "all";

  const activeContinent: ContinentFilter = continentOptions.some(
    (item) => item.value === params.continent,
  )
    ? (params.continent as Continent)
    : "all";

  const requestedCountry: CountryFilter = countries.some(
    (country) => country.slug === params.country,
  )
    ? (params.country as CountrySlug)
    : "all";

  const requestedCountryData =
    requestedCountry === "all" ? undefined : getCountry(requestedCountry);

  const activeCountry: CountryFilter =
    requestedCountryData &&
    activeContinent !== "all" &&
    requestedCountryData.continent !== activeContinent
      ? "all"
      : requestedCountry;

  const visibleCountries = countries.filter(
    (country) =>
      activeContinent === "all" || country.continent === activeContinent,
  );

  const filteredStories = stories.filter((story) => {
    const storyCountry = getCountry(story.country);
    const categoryMatches =
      activeCategory === "all" || story.category === activeCategory;
    const continentMatches =
      activeContinent === "all" ||
      storyCountry?.continent === activeContinent;
    const countryMatches =
      activeCountry === "all" || story.country === activeCountry;

    return categoryMatches && continentMatches && countryMatches;
  });

  const featuredStory = getStory("rome-vatican-food-route") ?? stories[0]!;
  const featuredCountry = getCountry(featuredStory.country);
  const isUnfiltered =
    activeCategory === "all" &&
    activeContinent === "all" &&
    activeCountry === "all";

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b9480c]" />
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                STORIES FROM THE TABLE
              </p>
            </div>
            <h1 className="max-w-3xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              여행의 한 장면에서
              <br />
              식문화의 맥락까지
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              개인 여행 기록은 실제 방문 경험으로, 문화 설명은 공식 자료로
              구분해 정리합니다. 음식이 어느 장소와 생활 방식에서
              만들어졌는지 차근히 살펴보세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#story-archive"
                className="inline-flex rounded-full bg-[#b9480c] px-6 py-3 text-sm font-black !text-white transition hover:bg-[#943706]"
              >
                이야기 찾아보기
              </a>
              <Link
                href="/journeys/europe"
                className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
              >
                유럽 여행 기록
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#ddd2c5] bg-white/80 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
              EDITORIAL PRINCIPLE
            </p>
            <p className="mt-4 break-keep text-xl font-bold leading-8">
              무엇을 먹는지만 소개하지 않고, 어디에서 왜 그렇게 먹게
              되었는지 기록합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["방문지", "역사", "지역", "생활", "사람"].map((item) => (
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

      {isUnfiltered && (
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            FEATURED STORY
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            이번 주의 문화 이야기
          </h2>

          <Link
            href={`/stories/${featuredStory.slug}`}
            className="mt-10 grid overflow-hidden rounded-[2rem] border border-[#ded3c7] bg-white no-underline shadow-[0_22px_70px_rgba(70,50,25,0.08)] transition hover:-translate-y-1 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <ContentVisual
              eyebrow={featuredCountry?.nameEn ?? "WORLD TABLE"}
              label={featuredStory.visualLabel}
              caption={featuredStory.visualCaption}
              palette={featuredStory.palette}
              size="feature"
            />
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-black tracking-[0.16em]">
                <span className="text-[#b9480c]">
                  {featuredCountry?.nameKo}
                </span>
                {featuredCountry && (
                  <>
                    <span className="text-stone-300">·</span>
                    <span className="text-neutral-500">
                      {continentLabels[featuredCountry.continent]}
                    </span>
                  </>
                )}
                <span className="text-stone-300">·</span>
                <span className="text-neutral-500">
                  {storyCategoryLabels[featuredStory.category]}
                </span>
                {featuredStory.experienceStatus && (
                  <span className="rounded-full border border-[#e5b596] bg-[#fff3ea] px-3 py-1.5 text-[11px] font-black tracking-normal text-[#943706]">
                    {experienceStatusLabels[featuredStory.experienceStatus]}
                  </span>
                )}
              </div>
              <h3 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {featuredStory.title}
              </h3>
              <p className="mt-6 break-keep text-base leading-8 text-neutral-600">
                {featuredStory.lead}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-6">
                <span className="text-sm text-neutral-500">
                  읽는 시간 약 {featuredStory.readTime}분
                </span>
                <span className="text-sm font-black text-[#943706]">
                  이야기 읽기 →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section
        id="story-archive"
        className="scroll-mt-32 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                STORY ARCHIVE
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                문화 이야기 모아보기
              </h2>
              <p className="mt-4 break-keep leading-7 text-neutral-600">
                대륙, 이야기 주제와 나라·지역을 선택해 관련 콘텐츠를
                살펴보세요.
              </p>
            </div>
            <p className="text-sm text-neutral-500">
              조건에 맞는 이야기 {filteredStories.length}개
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-xs font-black tracking-[0.18em] text-neutral-500">
              대륙
            </p>
            <nav
              aria-label="문화 이야기 대륙 필터"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              {continentOptions.map((option) => {
                const active = option.value === activeContinent;
                const nextCountry =
                  activeCountry === "all" ||
                  option.value === "all" ||
                  getCountry(activeCountry)?.continent === option.value
                    ? activeCountry
                    : "all";

                return (
                  <Link
                    key={option.value}
                    href={buildStoriesHref({
                      category: activeCategory,
                      continent: option.value,
                      country: nextCountry,
                    })}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold no-underline transition ${
                      active
                        ? "border-[#b9480c] bg-[#b9480c] !text-white"
                        : "border-stone-300 bg-white !text-neutral-600 hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-7">
            <p className="mb-4 text-xs font-black tracking-[0.18em] text-neutral-500">
              이야기 주제
            </p>
            <nav
              aria-label="문화 이야기 주제"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              {categoryOptions.map((option) => {
                const active = option.value === activeCategory;
                return (
                  <Link
                    key={option.value}
                    href={buildStoriesHref({
                      category: option.value,
                      continent: activeContinent,
                      country: activeCountry,
                    })}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold no-underline transition ${
                      active
                        ? "border-[#b9480c] bg-[#b9480c] !text-white"
                        : "border-stone-300 bg-white !text-neutral-600 hover:border-[#b9480c] hover:!text-[#943706]"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-7">
            <p className="mb-4 text-xs font-black tracking-[0.18em] text-neutral-500">
              나라·지역
            </p>
            <nav
              aria-label="문화 이야기 나라 및 지역 필터"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              <Link
                href={buildStoriesHref({
                  category: activeCategory,
                  continent: activeContinent,
                  country: "all",
                })}
                aria-current={activeCountry === "all" ? "page" : undefined}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold no-underline transition ${
                  activeCountry === "all"
                    ? "border-[#b9480c] bg-[#b9480c] !text-white"
                    : "border-stone-300 bg-white !text-neutral-600 hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                }`}
              >
                전체 지역
              </Link>
              {visibleCountries.map((country) => {
                const active = country.slug === activeCountry;
                return (
                  <Link
                    key={country.slug}
                    href={buildStoriesHref({
                      category: activeCategory,
                      continent: activeContinent,
                      country: country.slug,
                    })}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold no-underline transition ${
                      active
                        ? "border-[#b9480c] bg-[#b9480c] !text-white"
                        : "border-stone-300 bg-white !text-neutral-600 hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                    }`}
                  >
                    {country.nameKo}
                  </Link>
                );
              })}
            </nav>
          </div>

          {activeContinent === "europe" && (
            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-[#e5d1c2] bg-[#fff8f2] px-5 py-5 sm:flex-row sm:items-center">
              <p className="break-keep text-sm leading-7 text-neutral-700">
                파리 → 슈투트가르트 → 융프라우 → 로마·바티칸의 여행
                순서로 콘텐츠를 보고 싶다면 유럽 여행 기록 페이지를
                이용하세요.
              </p>
              <Link
                href="/journeys/europe"
                className="shrink-0 text-sm font-black !text-[#943706] no-underline"
              >
                유럽 기록 보기 →
              </Link>
            </div>
          )}

          {filteredStories.length > 0 ? (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredStories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[1.75rem] border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
              <p className="text-lg font-bold text-neutral-800">
                조건에 맞는 이야기가 없습니다.
              </p>
              <Link
                href="/stories#story-archive"
                className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-black !text-white"
              >
                전체 이야기 보기
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
