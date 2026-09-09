import type { Metadata } from "next";
import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import RecipeCard from "@/components/RecipeCard";
import {
  countries,
  getCountry,
  recipeCategoryLabels,
  recipes,
  type CountrySlug,
  type RecipeCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "세계 레시피",
  description:
    "세계 각지의 음식에 담긴 문화적 배경을 알아보고, 한국에서 구할 수 있는 재료로 직접 만들어 보세요.",
  alternates: {
    canonical: "/recipes",
  },
};

const categoryOptions: Array<{
  value: "all" | RecipeCategory;
  label: string;
}> = [
  { value: "all", label: "전체" },
  ...Object.entries(recipeCategoryLabels).map(([value, label]) => ({
    value: value as RecipeCategory,
    label,
  })),
];

type CountryFilter = "all" | CountrySlug;

function buildRecipesHref({
  category,
  country,
}: {
  category: "all" | RecipeCategory;
  country: CountryFilter;
}) {
  const query = new URLSearchParams();
  if (category !== "all") query.set("category", category);
  if (country !== "all") query.set("country", country);
  const queryString = query.toString();

  return queryString
    ? `/recipes?${queryString}#recipe-archive`
    : "/recipes#recipe-archive";
}

type RecipesPageProps = {
  searchParams: Promise<{
    category?: string;
    country?: string;
  }>;
};

export default async function RecipesPage({
  searchParams,
}: RecipesPageProps) {
  const params = await searchParams;

  const activeCategory: "all" | RecipeCategory = categoryOptions.some(
    (item) => item.value === params.category,
  )
    ? (params.category as RecipeCategory)
    : "all";

  const activeCountry: CountryFilter = countries.some(
    (country) => country.slug === params.country,
  )
    ? (params.country as CountrySlug)
    : "all";

  const filteredRecipes = recipes.filter((recipe) => {
    const categoryMatches =
      activeCategory === "all" || recipe.category === activeCategory;
    const countryMatches =
      activeCountry === "all" || recipe.country === activeCountry;
    return categoryMatches && countryMatches;
  });

  const featuredRecipe = recipes[0];
  const featuredCountry = getCountry(featuredRecipe.country);
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
                RECIPES FROM THE WORLD
              </p>
            </div>
            <h1 className="max-w-3xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              세계의 음식을
              <br />
              나의 식탁에서
            </h1>
            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              음식이 태어난 문화적 배경을 알아보고, 한국에서 구할 수
              있는 재료로 세계 각지의 요리를 직접 만들어 보세요.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-[#ddd2c5] bg-white/80 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-black tracking-[0.25em] text-[#b9480c]">
              MANNA RECIPE
            </p>
            <p className="mt-4 break-keep text-xl font-bold leading-8">
              조리법만 따라 하는 것이 아니라 음식에 담긴 이야기까지
              이해합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["문화적 배경", "조리 시간", "난이도", "대체 재료"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-neutral-600"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </aside>
        </div>
      </section>

      {isUnfiltered && (
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            FEATURED RECIPE
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            이번 주의 세계 레시피
          </h2>

          <Link
            href={`/recipes/${featuredRecipe.slug}`}
            className="mt-10 grid overflow-hidden rounded-[2rem] border border-[#ded3c7] bg-white no-underline shadow-[0_22px_70px_rgba(70,50,25,0.08)] transition hover:-translate-y-1 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <ContentVisual
              eyebrow={featuredCountry?.nameEn ?? "WORLD RECIPE"}
              label={featuredRecipe.visualLabel}
              caption={featuredRecipe.visualCaption}
              palette={featuredRecipe.palette}
              size="feature"
            />
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-black tracking-[0.16em]">
                <span className="text-[#b9480c]">
                  {featuredCountry?.nameKo}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-neutral-500">
                  {recipeCategoryLabels[featuredRecipe.category]}
                </span>
              </div>
              <h3 className="mt-5 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {featuredRecipe.title}
              </h3>
              <p className="mt-6 break-keep text-base leading-8 text-neutral-600">
                {featuredRecipe.summary}
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">조리 시간</p>
                  <p className="mt-2 text-sm font-black">
                    {featuredRecipe.cookingTime}분
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">난이도</p>
                  <p className="mt-2 text-sm font-black">
                    {featuredRecipe.difficulty}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">기준</p>
                  <p className="mt-2 text-sm font-black">
                    {featuredRecipe.servings}인분
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end border-t border-stone-200 pt-6">
                <span className="text-sm font-black text-[#943706]">
                  레시피 보기 →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section
        id="recipe-archive"
        className="scroll-mt-32 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                RECIPE ARCHIVE
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                세계 레시피 모아보기
              </h2>
              <p className="mt-4 break-keep leading-7 text-neutral-600">
                음식 종류와 나라·지역을 선택해 원하는 레시피를 찾아보세요.
              </p>
            </div>
            <p className="text-sm text-neutral-500">
              조건에 맞는 레시피 {filteredRecipes.length}개
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-xs font-black tracking-[0.18em] text-neutral-500">
              음식 종류
            </p>
            <nav
              aria-label="레시피 종류"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              {categoryOptions.map((option) => {
                const active = option.value === activeCategory;
                return (
                  <Link
                    key={option.value}
                    href={buildRecipesHref({
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
                href={buildRecipesHref({
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
                    href={buildRecipesHref({
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

          {filteredRecipes.length > 0 ? (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[1.75rem] border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
              <p className="text-lg font-bold text-neutral-800">
                조건에 맞는 레시피가 없습니다.
              </p>
              <Link
                href="/recipes#recipe-archive"
                className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-black !text-white"
              >
                전체 레시피 보기
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
