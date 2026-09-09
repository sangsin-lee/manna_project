import type { Metadata } from "next";
import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import StoryCard from "@/components/StoryCard";
import {
  countries,
  getCountry,
  stories,
  storyCategoryLabels,
  type CountrySlug,
  type StoryCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "문화 이야기",
  description:
    "세계 각지의 음식에 담긴 역사, 생활방식, 식사 문화와 사람들의 이야기를 살펴보세요.",
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

type CountryFilter = "all" | CountrySlug;

function buildStoriesHref({
  category,
  country,
}: {
  category: "all" | StoryCategory;
  country: CountryFilter;
}) {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  if (country !== "all") query.set("country", country);
  const queryString = query.toString();

  return queryString
    ? `/stories?${queryString}#story-archive`
    : "/stories#story-archive";
}

type StoriesPageProps = {
  searchParams: Promise<{
    category?: string;
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

  const activeCountry: CountryFilter = countries.some(
    (country) => country.slug === params.country,
  )
    ? (params.country as CountrySlug)
    : "all";

  const filteredStories = stories.filter((story) => {
    const categoryMatches =
      activeCategory === "all" || story.category === activeCategory;
    const countryMatches =
      activeCountry === "all" || story.country === activeCountry;
    return categoryMatches && countryMatches;
  });

  const featuredStory = stories[0];
  const featuredCountry = getCountry(featuredStory.country);
  const isUnfiltered =
    activeCategory === "all" && activeCountry === "all";

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
              음식 뒤에 놓인
              <br />
              사람들의 이야기
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              한 접시의 음식은 조리법만으로 완성되지 않습니다. 지역의
              기후와 역사, 사람들의 일상과 관계가 모여 하나의 식문화를
              만듭니다.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-[#ddd2c5] bg-white/80 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
              EDITORIAL PRINCIPLE
            </p>
            <p className="mt-4 break-keep text-xl font-bold leading-8">
              무엇을 먹는지만 소개하지 않고, 왜 그렇게 먹게 되었는지
              기록합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["역사", "지역", "생활", "시장", "사람"].map((item) => (
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
                <span className="text-stone-300">·</span>
                <span className="text-neutral-500">
                  {storyCategoryLabels[featuredStory.category]}
                </span>
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
                주제와 나라·지역을 선택해 관련 이야기를 살펴보세요.
              </p>
            </div>
            <p className="text-sm text-neutral-500">
              조건에 맞는 이야기 {filteredStories.length}개
            </p>
          </div>

          <div className="mt-10">
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
              aria-label="나라 및 지역"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              <Link
                href={buildStoriesHref({
                  category: activeCategory,
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
              {countries.map((country) => {
                const active = country.slug === activeCountry;
                return (
                  <Link
                    key={country.slug}
                    href={buildStoriesHref({
                      category: activeCategory,
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
