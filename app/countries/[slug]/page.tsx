import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentVisual from "@/components/ContentVisual";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import {
  continentLabels,
  countries,
  getCountry,
  getRecipesBySlugs,
  getStoriesBySlugs,
  visitStatusLabels,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

type CountryPageProps = {
  params: Promise<{ slug: string }>;
};

// 이 페이지에 등록된 나라만 정적으로 생성합니다.
export const dynamicParams = false;

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

const sectionLinks = [
  { href: "#overview", label: "개요" },
  { href: "#table-scenes", label: "식탁의 장면" },
  { href: "#regional-notes", label: "지역과 공간" },
  { href: "#stories", label: "문화 이야기" },
  { href: "#recipes", label: "레시피" },
  { href: "#sources", label: "참고 자료" },
] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${date}T00:00:00+09:00`));
}

export function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountry(normalizeSlug(slug));

  if (!country) {
    return {};
  }

  return {
    title: `${country.nameKo}의 식탁`,
    description: country.summary,
    keywords: [
      `${country.nameKo} 음식`,
      `${country.nameKo} 식문화`,
      continentLabels[country.continent],
      ...(country.visit?.places ?? []),
      ...country.representativeFoods,
      ...country.foodCulture,
    ],
    alternates: {
      canonical: `/countries/${country.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${country.nameKo}의 식탁 | 만나의 식탁`,
      description: country.summary,
      url: `${siteConfig.url}/countries/${country.slug}`,
      modifiedTime: country.updatedAt,
    },
  };
}

export default async function CountryDetailPage({
  params,
}: CountryPageProps) {
  const { slug } = await params;
  const country = getCountry(normalizeSlug(slug));

  if (!country) {
    notFound();
  }

  const relatedStories = getStoriesBySlugs(country.storySlugs);
  const relatedRecipes = getRecipesBySlugs(country.recipeSlugs);
  const currentIndex = countries.findIndex((item) => item.slug === country.slug);
  const previousCountry =
    countries[(currentIndex + countries.length - 1) % countries.length]!;
  const nextCountry = countries[(currentIndex + 1) % countries.length]!;
  const firstStory = relatedStories[0];
  const firstRecipe = relatedRecipes[0];

  const overviewGroups = [
    {
      number: "01",
      title: "대표적인 맛",
      description: "이 식탁을 처음 만났을 때 느끼기 쉬운 맛의 방향",
      items: country.representativeFlavors,
    },
    {
      number: "02",
      title: "주요 재료",
      description: "여러 음식에 반복해서 등장하는 기본 재료",
      items: country.mainIngredients,
    },
    {
      number: "03",
      title: "식문화 키워드",
      description: "음식이 놓이는 공간과 사람들의 생활 방식",
      items: country.foodCulture,
    },
    {
      number: "04",
      title: "대표 음식",
      description: "다음 콘텐츠를 탐색할 때 출발점이 되는 메뉴",
      items: country.representativeFoods,
    },
  ];

  const contentItems = [
    ...relatedStories.map((story) => ({
      name: story.title,
      url: `${siteConfig.url}/stories/${story.slug}`,
    })),
    ...relatedRecipes.map((recipe) => ({
      name: recipe.title,
      url: `${siteConfig.url}/recipes/${recipe.slug}`,
    })),
  ];

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${country.nameKo}의 식탁`,
            description: country.summary,
            url: `${siteConfig.url}/countries/${country.slug}`,
            dateModified: country.updatedAt,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
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
                name: "나라별 식탁",
                item: `${siteConfig.url}/countries`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: country.nameKo,
                item: `${siteConfig.url}/countries/${country.slug}`,
              },
            ],
          },
          ...(contentItems.length > 0
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  name: `${country.nameKo} 관련 콘텐츠`,
                  itemListElement: contentItems.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    url: item.url,
                  })),
                },
              ]
            : []),
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
            <Link href="/countries" className="hover:!text-neutral-950">
              나라별 식탁
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-neutral-950">{country.nameKo}</span>
          </nav>

          <div className="mt-9 grid overflow-hidden rounded-[2.25rem] border border-[#ddd2c5] bg-white shadow-[0_24px_75px_rgba(70,50,25,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
            <ContentVisual
              eyebrow={country.eyebrow}
              label={country.nameEn}
              caption={country.representativeFoods.join(" · ")}
              palette={country.palette}
              size="hero"
            />

            <div className="flex flex-col justify-center p-8 sm:p-11 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
                  {country.placeType === "region" ? "REGION TABLE" : "COUNTRY TABLE"}
                </p>
                <span className="rounded-full border border-stone-200 bg-[#fffdf9] px-3 py-1 text-[11px] font-black text-neutral-600">
                  {continentLabels[country.continent]}
                </span>
                {country.visit && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-stone-300" />
                    <span className="rounded-full border border-[#e5b596] bg-[#fff3ea] px-3 py-1 text-[11px] font-black tracking-normal text-[#943706]">
                      {visitStatusLabels[country.visit.status]}
                    </span>
                  </>
                )}
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <p className="text-xs font-semibold text-neutral-500">
                  최근 검토 {formatDate(country.updatedAt)}
                </p>
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                {country.nameKo}의 식탁
              </h1>
              <p className="mt-5 break-keep text-2xl font-bold leading-9">
                {country.headline}
              </p>
              <p className="mt-5 max-w-2xl break-keep leading-8 text-neutral-600">
                {country.summary}
              </p>

              {country.visit && (
                <aside className="mt-7 rounded-2xl border border-[#e6d9cc] bg-[#fffaf5] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                      TRAVEL RECORD
                    </p>
                    <span className="text-xs font-bold text-neutral-500">
                      {country.visit.places.join(" · ")}
                    </span>
                  </div>
                  <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                    {country.visit.note}
                  </p>
                  {country.visit.sourceUrl && (
                    <a
                      href={country.visit.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black !text-[#943706] underline decoration-[#d9a487] underline-offset-4"
                    >
                      {country.visit.sourceLabel ?? "개인 여행 기록 보기"}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </aside>
              )}

              <dl className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">문화 이야기</dt>
                  <dd className="mt-1 text-xl font-black">
                    {relatedStories.length}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">레시피</dt>
                  <dd className="mt-1 text-xl font-black">
                    {relatedRecipes.length}
                  </dd>
                </div>
                <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                  <dt className="text-xs text-neutral-500">대표 음식</dt>
                  <dd className="mt-1 text-xl font-black">
                    {country.representativeFoods.length}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/stories?country=${country.slug}#story-archive`}
                  className="inline-flex rounded-full bg-[#b9480c] px-6 py-3 text-sm font-black !text-white transition hover:bg-[#943706]"
                >
                  문화 이야기 보기
                </Link>
                <Link
                  href={`/recipes?country=${country.slug}#recipe-archive`}
                  className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                >
                  레시피 보기
                </Link>
                {country.continent === "europe" && (
                  <Link
                    href="/journeys/europe"
                    className="inline-flex rounded-full border border-[#d9a487] bg-[#fff7f1] px-6 py-3 text-sm font-black !text-[#943706] transition hover:border-[#b9480c] hover:bg-[#f8e8dc]"
                  >
                    유럽 여행 기록 보기
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label={`${country.nameKo} 페이지 목차`}
        className="border-b border-stone-200 bg-white lg:sticky lg:top-20 lg:z-40"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="overview"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr]">
          <article>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              FOOD CULTURE OVERVIEW
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              먼저, 이 식탁을 이해하기
            </h2>
            <div className="article-copy mt-7">
              {country.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="rounded-[1.75rem] border border-[#ded3c7] bg-[#f7f3ed] p-7 sm:p-8">
            <p className="text-xs font-black tracking-[0.22em] text-[#b9480c]">
              RECOMMENDED ROUTE
            </p>
            <h3 className="mt-3 text-2xl font-black">처음 방문했다면</h3>
            <ol className="mt-7 space-y-5">
              <li className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-xs font-black text-white">
                  1
                </span>
                <div>
                  <p className="font-black">식문화 개요 읽기</p>
                  <p className="mt-1 break-keep text-sm leading-6 text-neutral-600">
                    대표적인 맛과 재료가 어떤 생활 환경에서 연결되는지 먼저
                    확인합니다.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-xs font-black text-white">
                  2
                </span>
                <div>
                  <p className="font-black">문화 이야기로 맥락 넓히기</p>
                  {firstStory ? (
                    <Link
                      href={`/stories/${firstStory.slug}`}
                      className="mt-1 inline-block break-keep text-sm leading-6 !text-[#943706] underline decoration-[#d9a487] underline-offset-4"
                    >
                      {firstStory.title}
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm text-neutral-600">
                      관련 이야기를 준비하고 있습니다.
                    </p>
                  )}
                </div>
              </li>
              <li className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-xs font-black text-white">
                  3
                </span>
                <div>
                  <p className="font-black">한 가지 음식 직접 만들기</p>
                  {firstRecipe ? (
                    <Link
                      href={`/recipes/${firstRecipe.slug}`}
                      className="mt-1 inline-block break-keep text-sm leading-6 !text-[#943706] underline decoration-[#d9a487] underline-offset-4"
                    >
                      {firstRecipe.title}
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm text-neutral-600">
                      관련 레시피를 준비하고 있습니다.
                    </p>
                  )}
                </div>
              </li>
            </ol>
          </aside>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {overviewGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-7 shadow-[0_14px_40px_rgba(70,50,25,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                    {group.number}
                  </p>
                  <h3 className="mt-3 text-xl font-black">{group.title}</h3>
                </div>
                <span className="rounded-full bg-[#f7f3ed] px-3 py-1.5 text-xs font-bold text-neutral-500">
                  {group.items.length}개
                </span>
              </div>
              <p className="mt-3 break-keep text-sm leading-6 text-neutral-500">
                {group.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-300 bg-[#fffdf9] px-3 py-2 text-xs font-semibold text-neutral-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="table-scenes"
        className="scroll-mt-40 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              SCENES FROM THE TABLE
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
              음식이 실제 생활에 놓이는 세 가지 장면
            </h2>
            <p className="mt-5 break-keep leading-7 text-neutral-600">
              대표 음식 이름만 외우기보다 언제, 어디에서, 누구와 먹는지
              살펴보면 식문화의 성격이 더 선명하게 보입니다.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {country.tableScenes.map((scene, index) => (
              <article
                key={scene.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-[#ded3c7] bg-white p-7 sm:p-8"
              >
                <span className="absolute right-6 top-5 text-5xl font-black text-[#efe7dd]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="relative text-xs font-black tracking-[0.22em] text-[#b9480c]">
                  {scene.eyebrow}
                </p>
                <h3 className="relative mt-12 break-keep text-xl font-black leading-8">
                  {scene.title}
                </h3>
                <p className="relative mt-4 break-keep text-sm leading-7 text-neutral-600">
                  {scene.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="regional-notes"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              REGION &amp; PLACE
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
              지역과 식사 공간에서 달라지는 맛
            </h2>
            <p className="mt-5 max-w-2xl break-keep leading-7 text-neutral-600">
              아래 구분은 전체를 단정하는 규칙이 아니라 차이를 발견하기 위한
              출발점입니다. 같은 지역 안에서도 도시, 계절과 가정에 따라
              조리법은 달라질 수 있습니다.
            </p>

            <div className="mt-10 space-y-4">
              {country.regionalNotes.map((note, index) => (
                <article
                  key={note.name}
                  className="rounded-[1.5rem] border border-stone-200 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6e4d9] text-sm font-black text-[#943706]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-black">{note.name}</h3>
                      <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                        {note.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {note.foods.map((food) => (
                          <span
                            key={food}
                            className="rounded-full bg-[#f7f3ed] px-3 py-1.5 text-xs font-bold text-neutral-600"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] bg-neutral-950 p-7 text-white sm:p-9 lg:sticky lg:top-40">
            <p className="text-xs font-black tracking-[0.25em] text-[#f1a678]">
              DINING NOTES
            </p>
            <h2 className="mt-3 break-keep text-2xl font-black">
              현지 식탁을 이해할 때 기억할 점
            </h2>
            <div className="mt-8 space-y-7">
              {country.diningNotes.map((note, index) => (
                <section
                  key={note.title}
                  className="border-t border-neutral-700 pt-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex gap-4">
                    <span className="text-sm font-black text-[#f1a678]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-black text-white">{note.title}</h3>
                      <p className="mt-2 break-keep text-sm leading-7 text-neutral-300">
                        {note.description}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="stories"
        className="scroll-mt-40 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                CULTURE STORIES
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {country.nameKo} 문화 이야기
              </h2>
              <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
                음식이 태어난 배경과 사람들이 실제로 먹는 장면을 더 깊게
                읽어 보세요.
              </p>
            </div>
            <Link
              href={`/stories?country=${country.slug}#story-archive`}
              className="inline-flex w-fit rounded-full border border-[#b9480c] px-5 py-2.5 text-sm font-black !text-[#943706] transition hover:bg-[#b9480c] hover:!text-white"
            >
              전체 이야기 보기 →
            </Link>
          </div>

          {relatedStories.length > 0 ? (
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[1.5rem] border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
              <p className="font-bold text-neutral-700">
                관련 문화 이야기를 준비하고 있습니다.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="recipes"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              COOK THE CULTURE
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {country.nameKo} 레시피
            </h2>
            <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
              문화적 배경을 읽었다면 한 가지 음식을 직접 만들며 재료와
              조리법의 관계를 확인해 보세요.
            </p>
          </div>
          <Link
            href={`/recipes?country=${country.slug}#recipe-archive`}
            className="inline-flex w-fit rounded-full border border-[#b9480c] px-5 py-2.5 text-sm font-black !text-[#943706] transition hover:bg-[#b9480c] hover:!text-white"
          >
            전체 레시피 보기 →
          </Link>
        </div>

        {relatedRecipes.length > 0 ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {relatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.5rem] border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
            <p className="font-bold text-neutral-700">
              관련 레시피를 준비하고 있습니다.
            </p>
          </div>
        )}
      </section>

      <section
        id="sources"
        className="scroll-mt-40 border-t border-stone-200 bg-white"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              SOURCES &amp; REVIEW
            </p>
            <h2 className="mt-3 text-2xl font-black">참고 자료</h2>
            <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
              문화 설명은 지역과 시대에 따라 달라질 수 있습니다. 공식 기관과
              문화유산 자료를 기준으로 내용을 검토하고, 단정적인 표현을
              최소화했습니다.
            </p>
          </div>

          <ol className="space-y-3">
            {country.sources.map((source, index) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-stone-200 bg-[#fffdf9] px-5 py-4 transition hover:border-[#b9480c]"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="text-xs font-black text-[#b9480c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="break-keep text-sm font-bold text-neutral-700 group-hover:text-[#943706]">
                      {source.label}
                    </span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-neutral-400">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:py-16">
          <p className="text-center text-xs font-black tracking-[0.25em] text-[#b9480c]">
            CONTINUE EXPLORING
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Link
              href={`/countries/${previousCountry.slug}`}
              className="group rounded-[1.5rem] border border-[#ddd2c5] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-bold text-neutral-500">← 이전 식탁</p>
              <p className="mt-2 text-xl font-black transition group-hover:text-[#b9480c]">
                {previousCountry.nameKo}
              </p>
              <p className="mt-2 line-clamp-2 break-keep text-sm leading-6 text-neutral-600">
                {previousCountry.headline}
              </p>
            </Link>
            <Link
              href={`/countries/${nextCountry.slug}`}
              className="group rounded-[1.5rem] border border-[#ddd2c5] bg-white p-6 text-right transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-bold text-neutral-500">다음 식탁 →</p>
              <p className="mt-2 text-xl font-black transition group-hover:text-[#b9480c]">
                {nextCountry.nameKo}
              </p>
              <p className="mt-2 line-clamp-2 break-keep text-sm leading-6 text-neutral-600">
                {nextCountry.headline}
              </p>
            </Link>
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/countries"
              className="inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-black !text-white transition hover:bg-[#b9480c]"
            >
              모든 나라의 식탁 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
