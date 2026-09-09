import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentVisual from "@/components/ContentVisual";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import {
  experienceStatusLabels,
  getCountry,
  getRecipesBySlugs,
  getStory,
  stories,
  storyCategoryLabels,
  type Story,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${date}T00:00:00+09:00`));
}

function getSectionId(index: number) {
  return `section-${index + 1}`;
}

function getRelatedStories(currentStory: Story) {
  const sameCountry = stories.filter(
    (story) =>
      story.slug !== currentStory.slug &&
      story.country === currentStory.country,
  );

  const sameCategory = stories.filter(
    (story) =>
      story.slug !== currentStory.slug &&
      story.category === currentStory.category &&
      story.country !== currentStory.country,
  );

  return [...sameCountry, ...sameCategory]
    .filter(
      (story, index, list) =>
        list.findIndex((candidate) => candidate.slug === story.slug) === index,
    )
    .slice(0, 3);
}

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(normalizeSlug(slug));

  if (!story) {
    return {};
  }

  const country = getCountry(story.country);
  const canonicalPath = `/stories/${story.slug}`;

  return {
    title: story.title,
    description: story.summary,
    keywords: [
      country?.nameKo ?? "세계 음식",
      storyCategoryLabels[story.category],
      ...story.keywords,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: `${story.title} | ${siteConfig.name}`,
      description: story.summary,
      url: `${siteConfig.url}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: "ko_KR",
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
      tags: story.keywords,
    },
    twitter: {
      card: "summary",
      title: story.title,
      description: story.summary,
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(normalizeSlug(slug));

  if (!story) {
    notFound();
  }

  const country = getCountry(story.country);
  const relatedRecipes = getRecipesBySlugs(story.relatedRecipeSlugs);
  const relatedStories = getRelatedStories(story);
  const currentIndex = stories.findIndex((item) => item.slug === story.slug);
  const previousStory =
    stories[(currentIndex + stories.length - 1) % stories.length]!;
  const nextStory = stories[(currentIndex + 1) % stories.length]!;
  const canonicalUrl = `${siteConfig.url}/stories/${story.slug}`;

  const tableOfContents = story.sections.map((section, index) => ({
    id: getSectionId(index),
    number: String(index + 1).padStart(2, "0"),
    label: section.heading,
  }));

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.title,
            description: story.summary,
            datePublished: story.publishedAt,
            dateModified: story.updatedAt,
            mainEntityOfPage: canonicalUrl,
            articleSection: story.sections.map((section) => section.heading),
            keywords: story.keywords.join(", "),
            author: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            about: country
              ? {
                  "@type": "Place",
                  name: country.nameKo,
                }
              : undefined,
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
                name: "문화 이야기",
                item: `${siteConfig.url}/stories`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: story.title,
                item: canonicalUrl,
              },
            ],
          },
        ]}
      />

      <article>
        <header className="border-b border-stone-200 bg-[#f4efe7]">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
            <nav
              aria-label="현재 위치"
              className="flex flex-wrap items-center gap-2 text-sm text-neutral-500"
            >
              <Link href="/" className="hover:!text-neutral-950">
                홈
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/stories" className="hover:!text-neutral-950">
                문화 이야기
              </Link>
              <span aria-hidden="true">/</span>
              <span className="line-clamp-1 max-w-[min(56vw,34rem)] font-bold text-neutral-950">
                {story.title}
              </span>
            </nav>

            <div className="mt-9 grid overflow-hidden rounded-[2.25rem] border border-[#ddd2c5] bg-white shadow-[0_24px_75px_rgba(70,50,25,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
              <ContentVisual
                eyebrow={country?.nameEn ?? "WORLD TABLE"}
                label={story.visualLabel}
                caption={story.visualCaption}
                palette={story.palette}
                size="hero"
              />

              <div className="flex flex-col justify-center p-8 sm:p-11 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs font-black tracking-[0.16em]">
                  {country ? (
                    <Link
                      href={`/countries/${country.slug}`}
                      className="!text-[#b9480c] transition hover:!text-[#943706]"
                    >
                      {country.nameKo}
                    </Link>
                  ) : (
                    <span className="text-[#b9480c]">세계</span>
                  )}
                  <span className="text-stone-300">·</span>
                  <span className="text-neutral-500">
                    {storyCategoryLabels[story.category]}
                  </span>
                  {story.experienceStatus && (
                    <span className="rounded-full border border-[#e5b596] bg-[#fff3ea] px-3 py-1.5 text-[11px] font-black tracking-normal text-[#943706]">
                      {experienceStatusLabels[story.experienceStatus]}
                    </span>
                  )}
                </div>

                <h1 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {story.title}
                </h1>

                <p className="mt-6 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
                  {story.lead}
                </p>

                {story.experienceStatus === "visit-based" && (
                  <p className="mt-5 rounded-2xl border border-[#ead8c9] bg-[#fffaf5] px-5 py-4 break-keep text-sm leading-7 text-neutral-600">
                    직접 다녀온 지역의 기억을 출발점으로 공식 자료와 문화적
                    맥락을 함께 검토해 정리한 이야기입니다.
                  </p>
                )}

                <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                    <dt className="text-xs text-neutral-500">읽는 시간</dt>
                    <dd className="mt-1 text-sm font-black">
                      약 {story.readTime}분
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                    <dt className="text-xs text-neutral-500">글의 주제</dt>
                    <dd className="mt-1 text-sm font-black">
                      {storyCategoryLabels[story.category]}
                    </dd>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-[#f7f3ed] px-4 py-4 sm:col-span-1">
                    <dt className="text-xs text-neutral-500">최근 검토</dt>
                    <dd className="mt-1 text-sm font-black">
                      {formatDate(story.updatedAt)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-2">
                  {story.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav
          aria-label="문화 이야기 목차"
          className="border-b border-stone-200 bg-white lg:sticky lg:top-20 lg:z-40"
        >
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
            <a
              href="#summary"
              className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
            >
              핵심 내용
            </a>
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
              >
                {item.number} {item.label}
              </a>
            ))}
            <a
              href="#sources"
              className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
            >
              참고 자료
            </a>
          </div>
        </nav>

        <section
          id="summary"
          className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                STORY AT A GLANCE
              </p>
              <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
                이 이야기에서 살펴볼 내용
              </h2>
              <p className="mt-5 max-w-xl break-keep leading-8 text-neutral-600">
                음식의 형태만 보지 않고, 그 음식이 놓인 공간과 사람들의
                생활방식, 시대에 따른 변화까지 순서대로 읽습니다.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {story.sections.map((section, index) => (
                <li
                  key={section.heading}
                  className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)]"
                >
                  <a href={`#${getSectionId(index)}`} className="block no-underline">
                    <span className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 break-keep text-lg font-black leading-7">
                      {section.heading}
                    </h3>
                    <p className="mt-3 line-clamp-3 break-keep text-sm leading-7 text-neutral-600">
                      {section.paragraphs[0]}
                    </p>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 rounded-[1.5rem] border border-[#e2d8cc] bg-[#fff8f1] p-6 sm:p-7">
            <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
              EDITORIAL NOTE
            </p>
            <p className="mt-3 max-w-4xl break-keep text-sm leading-7 text-neutral-600 sm:text-base">
              한 나라나 지역의 식문화는 도시, 세대, 계절과 가정에 따라
              달라집니다. 이 글은 하나의 고정된 규칙을 제시하기보다 음식이
              만들어지고 소비되는 배경을 이해하기 위한 출발점으로 작성했습니다.
            </p>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-[#f6f2ec]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-28">
            <div>
              {story.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={getSectionId(index)}
                  className={`scroll-mt-40 ${
                    index === 0
                      ? ""
                      : "mt-16 border-t border-stone-300 pt-16"
                  }`}
                >
                  <p className="text-xs font-black tracking-[0.22em] text-[#b9480c]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 break-keep text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    {section.heading}
                  </h2>

                  <div className="mt-7 space-y-6">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="break-keep text-base leading-8 text-neutral-700 sm:text-[1.05rem] sm:leading-9"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section
                id="sources"
                className="scroll-mt-40 mt-16 border-t border-stone-300 pt-16"
              >
                <p className="text-xs font-black tracking-[0.22em] text-[#b9480c]">
                  SOURCES
                </p>
                <h2 className="mt-3 text-2xl font-black">참고 자료</h2>
                <p className="mt-4 max-w-3xl break-keep text-sm leading-7 text-neutral-600">
                  문화와 방문 정보는 시간이 지나며 달라질 수 있습니다. 아래
                  자료를 바탕으로 내용을 정리했으며, 실제 방문 전에는 원문과
                  공식 채널에서 최신 정보를 다시 확인하는 것이 좋습니다.
                </p>

                {story.sources.length > 0 ? (
                  <ol className="mt-7 space-y-3">
                    {story.sources.map((source, index) => (
                      <li
                        key={source.url}
                        className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-stone-200 bg-white p-4"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4e8de] text-xs font-black text-[#943706]">
                          {index + 1}
                        </span>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="self-center break-all text-sm font-bold !text-[#943706] underline decoration-[#d7a68a] underline-offset-4"
                        >
                          {source.label} ↗
                        </a>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-6 text-sm text-neutral-500">
                    참고 자료를 정리하고 있습니다.
                  </p>
                )}
              </section>
            </div>

            <aside className="h-fit rounded-[1.5rem] border border-stone-200 bg-white p-6 lg:sticky lg:top-40">
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                ON THIS PAGE
              </p>
              <ol className="mt-5 space-y-3">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="grid grid-cols-[1.75rem_1fr] gap-2 break-keep text-sm leading-6 !text-neutral-600 transition hover:!text-[#943706]"
                    >
                      <span className="font-black text-[#b9480c]">
                        {item.number}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-6 border-t border-stone-200 pt-6">
                <p className="text-xs font-bold text-neutral-500">
                  이 글의 지역
                </p>
                {country && (
                  <Link
                    href={`/countries/${country.slug}`}
                    className="mt-2 inline-flex text-sm font-black !text-neutral-950 transition hover:!text-[#943706]"
                  >
                    {country.nameKo}의 식탁 보기 →
                  </Link>
                )}
              </div>

              <Link
                href="/stories#story-archive"
                className="mt-6 inline-flex w-full justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
              >
                이야기 목록으로
              </Link>
            </aside>
          </div>
        </section>
      </article>

      {relatedRecipes.length > 0 && (
        <section className="border-b border-stone-200 bg-[#fffdf9]">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                  RELATED RECIPES
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  이야기 속 음식 만들기
                </h2>
              </div>
              <Link
                href={`/recipes?country=${story.country}#recipe-archive`}
                className="text-sm font-black !text-[#943706]"
              >
                이 지역 레시피 전체 보기 →
              </Link>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedStories.length > 0 && (
        <section className="border-b border-stone-200 bg-[#f6f2ec]">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                  KEEP READING
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  이어서 읽을 문화 이야기
                </h2>
              </div>
              <Link
                href="/stories#story-archive"
                className="text-sm font-black !text-[#943706]"
              >
                모든 이야기 보기 →
              </Link>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((relatedStory) => (
                <StoryCard key={relatedStory.slug} story={relatedStory} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#fffdf9]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`/stories/${previousStory.slug}`}
              className="group rounded-[1.5rem] border border-stone-200 bg-white p-6 no-underline transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                ← PREVIOUS STORY
              </p>
              <p className="mt-3 break-keep text-lg font-black leading-7 text-neutral-950 transition group-hover:text-[#943706]">
                {previousStory.title}
              </p>
            </Link>

            <Link
              href={`/stories/${nextStory.slug}`}
              className="group rounded-[1.5rem] border border-stone-200 bg-white p-6 text-right no-underline transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                NEXT STORY →
              </p>
              <p className="mt-3 break-keep text-lg font-black leading-7 text-neutral-950 transition group-hover:text-[#943706]">
                {nextStory.title}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
