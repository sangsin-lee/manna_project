import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentVisual from "@/components/ContentVisual";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import StoryCard from "@/components/StoryCard";
import {
  getCountry,
  getCountryRecipes,
  getRecipe,
  getStoriesBySlugs,
  recipeCategoryLabels,
  recipes,
  type Recipe,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

type RecipePageProps = {
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

function getRelatedRecipes(currentRecipe: Recipe) {
  const sameCountry = recipes.filter(
    (recipe) =>
      recipe.slug !== currentRecipe.slug &&
      recipe.country === currentRecipe.country,
  );

  const sameCategory = recipes.filter(
    (recipe) =>
      recipe.slug !== currentRecipe.slug &&
      recipe.category === currentRecipe.category &&
      recipe.country !== currentRecipe.country,
  );

  const fallback = recipes.filter(
    (recipe) => recipe.slug !== currentRecipe.slug,
  );

  return [...sameCountry, ...sameCategory, ...fallback]
    .filter(
      (recipe, index, list) =>
        list.findIndex((candidate) => candidate.slug === recipe.slug) === index,
    )
    .slice(0, 3);
}

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(normalizeSlug(slug));

  if (!recipe) {
    return {};
  }

  const country = getCountry(recipe.country);
  const canonicalPath = `/recipes/${recipe.slug}`;

  return {
    title: `${recipe.title} 레시피`,
    description: recipe.summary,
    keywords: [
      country?.nameKo ?? "세계 음식",
      recipeCategoryLabels[recipe.category],
      ...recipe.keywords,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: `${recipe.title} 레시피 | ${siteConfig.name}`,
      description: recipe.summary,
      url: `${siteConfig.url}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: "ko_KR",
      publishedTime: recipe.publishedAt,
      tags: recipe.keywords,
    },
    twitter: {
      card: "summary",
      title: `${recipe.title} 레시피`,
      description: recipe.summary,
    },
  };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipe(normalizeSlug(slug));

  if (!recipe) {
    notFound();
  }

  const country = getCountry(recipe.country);
  const relatedStories = getStoriesBySlugs(recipe.relatedStorySlugs);
  const relatedRecipes = getRelatedRecipes(recipe);
  const countryRecipes = getCountryRecipes(recipe.country).filter(
    (item) => item.slug !== recipe.slug,
  );

  const currentIndex = recipes.findIndex((item) => item.slug === recipe.slug);
  const previousRecipe =
    recipes[(currentIndex + recipes.length - 1) % recipes.length]!;
  const nextRecipe = recipes[(currentIndex + 1) % recipes.length]!;
  const canonicalUrl = `${siteConfig.url}/recipes/${recipe.slug}`;
  const allIngredients = recipe.ingredientGroups.flatMap(
    (group) => group.items,
  );
  const ingredientCount = allIngredients.length;

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.summary,
            datePublished: recipe.publishedAt,
            totalTime: `PT${recipe.cookingTime}M`,
            recipeYield: `${recipe.servings}인분`,
            recipeCategory: recipeCategoryLabels[recipe.category],
            recipeCuisine: country?.nameKo,
            keywords: recipe.keywords.join(", "),
            recipeIngredient: allIngredients,
            recipeInstructions: recipe.steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.tip
                ? `${step.description} 팁: ${step.tip}`
                : step.description,
            })),
            author: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntityOfPage: canonicalUrl,
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
                name: "세계 레시피",
                item: `${siteConfig.url}/recipes`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: recipe.title,
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
              <Link href="/recipes" className="hover:!text-neutral-950">
                세계 레시피
              </Link>
              <span aria-hidden="true">/</span>
              <span className="line-clamp-1 max-w-[min(56vw,34rem)] font-bold text-neutral-950">
                {recipe.title}
              </span>
            </nav>

            <div className="mt-9 grid overflow-hidden rounded-[2.25rem] border border-[#ddd2c5] bg-white shadow-[0_24px_75px_rgba(70,50,25,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
              <ContentVisual
                eyebrow={country?.nameEn ?? "WORLD RECIPE"}
                label={recipe.visualLabel}
                caption={recipe.visualCaption}
                palette={recipe.palette}
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
                    {recipeCategoryLabels[recipe.category]}
                  </span>
                </div>

                <h1 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {recipe.title}
                </h1>

                <p className="mt-6 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
                  {recipe.summary}
                </p>

                <dl className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                    <dt className="text-xs text-neutral-500">총 조리 시간</dt>
                    <dd className="mt-1 text-sm font-black">
                      {recipe.cookingTime}분
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                    <dt className="text-xs text-neutral-500">난이도</dt>
                    <dd className="mt-1 text-sm font-black">
                      {recipe.difficulty}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-[#f7f3ed] px-4 py-4">
                    <dt className="text-xs text-neutral-500">기준 인분</dt>
                    <dd className="mt-1 text-sm font-black">
                      {recipe.servings}인분
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-2">
                  {recipe.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-xs text-neutral-500">
                  레시피 등록일 {formatDate(recipe.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <nav
          aria-label="레시피 페이지 목차"
          className="border-b border-stone-200 bg-white lg:sticky lg:top-20 lg:z-40"
        >
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
            {[
              ["culture", "음식의 배경"],
              ["ingredients", "재료"],
              ["method", "만드는 순서"],
              ["notes", "대체 재료·조리 메모"],
              ["sources", "참고 자료"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)]">
              <p className="text-xs font-black tracking-[0.18em] text-[#b9480c]">
                INGREDIENTS
              </p>
              <p className="mt-3 text-3xl font-black">{ingredientCount}</p>
              <p className="mt-2 text-sm text-neutral-500">표기된 재료 항목</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)]">
              <p className="text-xs font-black tracking-[0.18em] text-[#b9480c]">
                GROUPS
              </p>
              <p className="mt-3 text-3xl font-black">
                {recipe.ingredientGroups.length}
              </p>
              <p className="mt-2 text-sm text-neutral-500">재료 구성 그룹</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)]">
              <p className="text-xs font-black tracking-[0.18em] text-[#b9480c]">
                STEPS
              </p>
              <p className="mt-3 text-3xl font-black">{recipe.steps.length}</p>
              <p className="mt-2 text-sm text-neutral-500">조리 단계</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)]">
              <p className="text-xs font-black tracking-[0.18em] text-[#b9480c]">
                TABLE
              </p>
              <p className="mt-3 text-3xl font-black">
                {country?.nameKo ?? "세계"}
              </p>
              <p className="mt-2 text-sm text-neutral-500">이 음식의 지역</p>
            </div>
          </div>
        </section>

        <section
          id="culture"
          className="scroll-mt-40 border-y border-stone-200 bg-[#fff8f1]"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:py-20">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                FOOD &amp; CULTURE
              </p>
              <h2 className="mt-3 break-keep text-3xl font-black tracking-tight sm:text-4xl">
                이 음식의 배경
              </h2>
            </div>

            <div className="rounded-[1.75rem] border border-[#e2d8cc] bg-white p-7 shadow-[0_18px_50px_rgba(70,50,25,0.05)] sm:p-9">
              <p className="break-keep text-base leading-8 text-neutral-700 sm:text-[1.05rem] sm:leading-9">
                {recipe.culturalNote}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 border-t border-stone-200 pt-6">
                {country && (
                  <Link
                    href={`/countries/${country.slug}`}
                    className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
                  >
                    {country.nameKo}의 식탁 보기
                  </Link>
                )}
                {relatedStories[0] && (
                  <Link
                    href={`/stories/${relatedStories[0].slug}`}
                    className="inline-flex rounded-full bg-[#b9480c] px-5 py-3 text-sm font-black !text-white transition hover:bg-[#943706]"
                  >
                    관련 문화 이야기 읽기
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f2ec]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.78fr_1.22fr] lg:py-28">
            <section id="ingredients" className="scroll-mt-40">
              <div className="lg:sticky lg:top-40">
                <p className="text-xs font-black tracking-[0.24em] text-[#b9480c]">
                  INGREDIENTS
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  재료
                </h2>
                <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                  {recipe.servings}인분 기준입니다. 제품의 염도와 재료 크기에
                  따라 마지막 간은 조금씩 조절하세요.
                </p>

                <div className="mt-8 space-y-6">
                  {recipe.ingredientGroups.map((group) => (
                    <section
                      key={group.title}
                      className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white"
                    >
                      <h3 className="border-b border-stone-200 bg-[#fffaf5] px-5 py-4 text-base font-black">
                        {group.title}
                      </h3>
                      <ul className="divide-y divide-stone-200 px-5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="grid grid-cols-[1rem_1fr] gap-3 py-3.5 text-sm leading-6 text-neutral-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-2 w-2 rounded-full bg-[#b9480c]"
                            />
                            <span className="break-keep">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </section>

            <section id="method" className="scroll-mt-40">
              <p className="text-xs font-black tracking-[0.24em] text-[#b9480c]">
                METHOD
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                만드는 순서
              </h2>
              <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                조리 전에 모든 재료를 계량하고 손질한 뒤 순서대로 진행하면
                맛과 식감을 안정적으로 맞추기 쉽습니다.
              </p>

              <ol className="mt-8 space-y-6">
                {recipe.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-5 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_40px_rgba(70,50,25,0.04)] sm:grid-cols-[56px_1fr] sm:p-7"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="break-keep text-xl font-black leading-8">
                        {step.title}
                      </h3>
                      <p className="mt-3 break-keep text-sm leading-7 text-neutral-700 sm:text-base sm:leading-8">
                        {step.description}
                      </p>
                      {step.tip && (
                        <div className="mt-5 rounded-2xl border border-[#ead7c8] bg-[#fff8f1] px-5 py-4">
                          <p className="text-xs font-black tracking-[0.16em] text-[#b9480c]">
                            COOKING TIP
                          </p>
                          <p className="mt-2 break-keep text-sm leading-7 text-neutral-600">
                            {step.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </section>

        <section
          id="notes"
          className="scroll-mt-40 border-y border-stone-200 bg-[#fffdf9]"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[1.75rem] border border-stone-200 bg-[#f7f3ed] p-7 sm:p-8">
                <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                  SUBSTITUTIONS
                </p>
                <h2 className="mt-3 text-2xl font-black">대체 재료</h2>
                <ul className="mt-6 space-y-4">
                  {recipe.substitutions.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1rem_1fr] gap-3 break-keep text-sm leading-7 text-neutral-700"
                    >
                      <span aria-hidden="true" className="font-black text-[#b9480c]">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[1.75rem] border border-stone-200 bg-[#f7f3ed] p-7 sm:p-8">
                <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                  COOKING NOTES
                </p>
                <h2 className="mt-3 text-2xl font-black">조리 메모</h2>
                <ul className="mt-6 space-y-4">
                  {recipe.tips.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1rem_1fr] gap-3 break-keep text-sm leading-7 text-neutral-700"
                    >
                      <span aria-hidden="true" className="font-black text-[#b9480c]">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="text-xs font-black tracking-[0.18em] text-amber-900">
                FOOD SAFETY
              </p>
              <p className="mt-2 max-w-4xl break-keep text-sm leading-7 text-amber-900">
                알레르기 유발 성분, 제품별 보관·가열 지침과 식재료 상태를
                확인하세요. 육류와 해산물은 중심부까지 충분히 익히고, 완성한
                음식은 적절한 온도에서 보관해야 합니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="sources"
          className="scroll-mt-40 bg-[#f6f2ec]"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-xs font-black tracking-[0.24em] text-[#b9480c]">
                  SOURCES
                </p>
                <h2 className="mt-3 text-3xl font-black">참고 자료</h2>
                <p className="mt-4 max-w-xl break-keep text-sm leading-7 text-neutral-600">
                  문화적 배경을 확인하는 데 참고한 자료입니다. 실제 조리법은
                  가정에서 실행하기 쉽도록 조정한 버전이며, 하나의 유일한
                  현지 표준을 의미하지 않습니다.
                </p>
              </div>

              {recipe.sources.length > 0 ? (
                <ol className="space-y-3">
                  {recipe.sources.map((source, index) => (
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
                <p className="text-sm text-neutral-500">
                  참고 자료를 정리하고 있습니다.
                </p>
              )}
            </div>
          </div>
        </section>
      </article>

      {relatedStories.length > 0 && (
        <section className="border-y border-stone-200 bg-[#fffdf9]">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                  RELATED STORIES
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  이 음식의 문화 이야기
                </h2>
              </div>
              <Link
                href={`/stories?country=${recipe.country}#story-archive`}
                className="text-sm font-black !text-[#943706]"
              >
                이 지역 이야기 전체 보기 →
              </Link>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedRecipes.length > 0 && (
        <section className="border-b border-stone-200 bg-[#f6f2ec]">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                  MORE RECIPES
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  이어서 만들어 볼 음식
                </h2>
              </div>
              <Link
                href={`/recipes?country=${recipe.country}#recipe-archive`}
                className="text-sm font-black !text-[#943706]"
              >
                {country?.nameKo ?? "이 지역"} 레시피 전체 보기 →
              </Link>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedRecipes.map((relatedRecipe) => (
                <RecipeCard key={relatedRecipe.slug} recipe={relatedRecipe} />
              ))}
            </div>

            {countryRecipes.length === 0 && country && (
              <p className="mt-8 text-sm text-neutral-500">
                현재 {country.nameKo} 레시피는 이 콘텐츠 한 편이며, 새로운
                레시피가 순차적으로 추가될 예정입니다.
              </p>
            )}
          </div>
        </section>
      )}

      <section className="bg-[#fffdf9]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`/recipes/${previousRecipe.slug}`}
              className="group rounded-[1.5rem] border border-stone-200 bg-white p-6 no-underline transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                ← PREVIOUS RECIPE
              </p>
              <p className="mt-3 break-keep text-lg font-black leading-7 text-neutral-950 transition group-hover:text-[#943706]">
                {previousRecipe.title}
              </p>
            </Link>

            <Link
              href={`/recipes/${nextRecipe.slug}`}
              className="group rounded-[1.5rem] border border-stone-200 bg-white p-6 text-right no-underline transition hover:-translate-y-0.5 hover:border-[#b9480c]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                NEXT RECIPE →
              </p>
              <p className="mt-3 break-keep text-lg font-black leading-7 text-neutral-950 transition group-hover:text-[#943706]">
                {nextRecipe.title}
              </p>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/recipes#recipe-archive"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
            >
              세계 레시피 목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
