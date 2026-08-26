import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "세계 레시피 | 만나의 식탁",
  description:
    "세계 각지의 음식에 담긴 문화적 배경을 알아보고, 한국에서 구할 수 있는 재료로 직접 만들어 보세요.",
};

const recipeCategories = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: "breakfast",
    label: "아침 식사",
  },
  {
    value: "main",
    label: "메인 요리",
  },
  {
    value: "street-food",
    label: "시장·거리 음식",
  },
  {
    value: "dessert",
    label: "디저트",
  },
  {
    value: "drink",
    label: "음료",
  },
] as const;

const countryFilters = [
  {
    value: "all",
    label: "전체 지역",
  },
  {
    value: "korea",
    label: "한국",
  },
  {
    value: "japan",
    label: "일본",
  },
  {
    value: "china",
    label: "중국",
  },
  {
    value: "hong-kong",
    label: "홍콩",
  },
  {
    value: "vietnam",
    label: "베트남",
  },
  {
    value: "italy",
    label: "이탈리아",
  },
] as const;

type RecipeCategoryValue = (typeof recipeCategories)[number]["value"];
type RecipeCategory = Exclude<RecipeCategoryValue, "all">;

type CountryFilterValue = (typeof countryFilters)[number]["value"];
type RecipeCountry = Exclude<CountryFilterValue, "all">;

type RecipeDifficulty = "쉬움" | "보통" | "어려움";

type Recipe = {
  slug: string;
  title: string;
  country: RecipeCountry;
  countryEn: string;
  category: RecipeCategory;
  summary: string;
  culturalNote: string;
  cookingTime: number;
  difficulty: RecipeDifficulty;
  servings: number;
  keywords: string[];
  featuredIngredients: string[];
  visualLabel: string;
  visualCaption: string;
  gradient: string;
  published: boolean;
};

const recipes: Recipe[] = [
  {
    slug: "hong-kong-macaroni-soup",
    title: "홍콩식 마카로니 수프",
    country: "hong-kong",
    countryEn: "HONG KONG",
    category: "breakfast",
    summary:
      "부드러운 마카로니와 햄, 달걀을 따뜻한 국물에 담아 먹는 홍콩 차찬텡의 대표적인 아침 메뉴입니다.",
    culturalNote:
      "서양에서 전해진 마카로니가 홍콩의 식재료와 조리 방식에 맞게 변형되면서 오늘날의 차찬텡식 아침 메뉴로 자리 잡았습니다.",
    cookingTime: 25,
    difficulty: "쉬움",
    servings: 2,
    keywords: ["홍콩조식", "차찬텡", "간단요리"],
    featuredIngredients: ["마카로니", "햄", "달걀", "치킨스톡"],
    visualLabel: "港式早餐",
    visualCaption: "MACARONI SOUP",
    gradient: "linear-gradient(135deg, #eedbc4 0%, #e3cfb5 48%, #d6c0a4 100%)",
    published: false,
  },
  {
    slug: "japanese-beef-bean-sprout-stir-fry",
    title: "일본식 차돌박이 숙주볶음",
    country: "japan",
    countryEn: "JAPAN",
    category: "main",
    summary:
      "얇은 차돌박이와 아삭한 숙주를 간장 양념에 빠르게 볶아 만드는 간단한 일본식 볶음 요리입니다.",
    culturalNote:
      "일본의 전통 향토 음식이라기보다 일본 가정식과 이자카야식 볶음 요리에서 영감을 받아 구성한 창작 메뉴입니다.",
    cookingTime: 20,
    difficulty: "쉬움",
    servings: 2,
    keywords: ["이자카야", "숙주볶음", "소고기"],
    featuredIngredients: ["차돌박이", "숙주", "대파", "간장"],
    visualLabel: "牛肉もやし",
    visualCaption: "BEEF & BEAN SPROUT",
    gradient: "linear-gradient(135deg, #eedbd6 0%, #e5cdc7 48%, #d8bbb4 100%)",
    published: false,
  },
  {
    slug: "mala-xiang-guo",
    title: "집에서 만드는 마라샹궈",
    country: "china",
    countryEn: "CHINA",
    category: "main",
    summary:
      "고기와 채소, 버섯과 두부를 화자오와 매운 양념에 볶아 만드는 향이 강하고 얼얼한 중국식 요리입니다.",
    culturalNote:
      "마라샹궈는 쓰촨과 충칭 지역의 마라 풍미를 바탕으로 발전한 요리로, 원하는 재료를 직접 선택해 볶아 먹는 방식이 특징입니다.",
    cookingTime: 40,
    difficulty: "보통",
    servings: 3,
    keywords: ["마라", "화자오", "중국요리"],
    featuredIngredients: ["마라소스", "화자오", "청경채", "푸주"],
    visualLabel: "麻辣香锅",
    visualCaption: "MALA XIANG GUO",
    gradient: "linear-gradient(135deg, #ebcdb6 0%, #dda987 50%, #cc8969 100%)",
    published: false,
  },
  {
    slug: "osam-bulgogi",
    title: "매콤한 오삼불고기",
    country: "korea",
    countryEn: "KOREA",
    category: "main",
    summary:
      "오징어와 삼겹살을 고추장 양념에 함께 볶아 해산물의 감칠맛과 돼지고기의 고소함을 살린 한국식 볶음 요리입니다.",
    culturalNote:
      "오징어와 삼겹살을 함께 사용하는 오삼불고기는 여러 재료를 한 번에 볶아 밥과 나누어 먹는 한국의 식사 방식과 잘 어울립니다.",
    cookingTime: 35,
    difficulty: "보통",
    servings: 3,
    keywords: ["오삼불고기", "매운음식", "밥반찬"],
    featuredIngredients: ["오징어", "삼겹살", "고추장", "양파"],
    visualLabel: "오삼불고기",
    visualCaption: "SPICY SQUID & PORK",
    gradient: "linear-gradient(135deg, #ead8c5 0%, #ddbea5 50%, #cf9f82 100%)",
    published: false,
  },
  {
    slug: "vietnamese-banh-mi",
    title: "베트남식 반미 샌드위치",
    country: "vietnam",
    countryEn: "VIETNAM",
    category: "street-food",
    summary:
      "바삭한 바게트에 고기와 절인 채소, 오이와 고수를 넣어 산뜻하고 풍성하게 즐기는 베트남식 샌드위치입니다.",
    culturalNote:
      "프랑스 식문화의 영향을 받은 바게트에 베트남식 고기와 채소, 소스를 결합해 탄생한 음식으로 베트남의 대표적인 거리 음식입니다.",
    cookingTime: 35,
    difficulty: "보통",
    servings: 2,
    keywords: ["반미", "길거리음식", "샌드위치"],
    featuredIngredients: ["바게트", "돼지고기", "당근", "고수"],
    visualLabel: "BÁNH MÌ",
    visualCaption: "VIETNAMESE SANDWICH",
    gradient: "linear-gradient(135deg, #dae6ca 0%, #cadbb7 50%, #b6cc9e 100%)",
    published: false,
  },
  {
    slug: "italian-tiramisu",
    title: "커피 향을 담은 티라미수",
    country: "italy",
    countryEn: "ITALY",
    category: "dessert",
    summary:
      "에스프레소에 적신 비스킷과 부드러운 마스카르포네 크림을 층층이 쌓아 만드는 이탈리아 디저트입니다.",
    culturalNote:
      "티라미수는 비교적 현대에 등장한 이탈리아 디저트로 알려져 있으며, 커피와 크림의 조합을 통해 진한 맛과 부드러운 식감을 함께 즐깁니다.",
    cookingTime: 50,
    difficulty: "보통",
    servings: 4,
    keywords: ["티라미수", "이탈리아디저트", "커피"],
    featuredIngredients: ["마스카르포네", "에스프레소", "레이디핑거", "코코아"],
    visualLabel: "TIRAMISÙ",
    visualCaption: "COFFEE DESSERT",
    gradient: "linear-gradient(135deg, #e6dac4 0%, #d8c5a8 50%, #c9ad8a 100%)",
    published: false,
  },
  {
    slug: "korean-sundae-bokkeum",
    title: "시장식 순대볶음",
    country: "korea",
    countryEn: "KOREA",
    category: "street-food",
    summary:
      "순대와 채소, 쫄면을 매콤한 양념에 볶아 만드는 푸짐한 한국식 시장 음식입니다.",
    culturalNote:
      "순대볶음은 전통시장과 분식집에서 여러 사람이 함께 나누어 먹는 음식으로 발전했으며, 지역과 가게에 따라 재료와 양념이 다양합니다.",
    cookingTime: 30,
    difficulty: "쉬움",
    servings: 3,
    keywords: ["순대볶음", "시장음식", "분식"],
    featuredIngredients: ["순대", "양배추", "깻잎", "쫄면"],
    visualLabel: "市場料理",
    visualCaption: "SUNDAE BOKKEUM",
    gradient: "linear-gradient(135deg, #ead8c7 0%, #dec3aa 50%, #cca98c 100%)",
    published: false,
  },
  {
    slug: "hong-kong-milk-tea",
    title: "홍콩식 밀크티",
    country: "hong-kong",
    countryEn: "HONG KONG",
    category: "drink",
    summary:
      "진하게 우린 홍차와 연유 또는 무가당 연유를 섞어 부드럽고 묵직한 맛을 내는 홍콩의 대표적인 음료입니다.",
    culturalNote:
      "영국식 홍차 문화가 홍콩의 식재료와 차찬텡 문화 속에서 변화하면서 진하고 부드러운 홍콩식 밀크티가 발전했습니다.",
    cookingTime: 15,
    difficulty: "쉬움",
    servings: 2,
    keywords: ["밀크티", "홍콩음료", "차찬텡"],
    featuredIngredients: ["홍차", "무가당 연유", "설탕", "얼음"],
    visualLabel: "絲襪奶茶",
    visualCaption: "HONG KONG MILK TEA",
    gradient: "linear-gradient(135deg, #e9d9c6 0%, #ddc7aa 50%, #ceb28e 100%)",
    published: false,
  },
];

const recipePrinciples = [
  {
    number: "01",
    title: "문화적 배경부터 이해하기",
    description:
      "재료와 조리법만 전달하지 않고 음식이 어떤 지역과 생활환경에서 발전했는지 함께 소개합니다.",
  },
  {
    number: "02",
    title: "구하기 쉬운 재료 활용하기",
    description:
      "현지의 맛을 최대한 유지하면서도 한국에서 비교적 쉽게 구할 수 있는 재료와 대체 방법을 제안합니다.",
  },
  {
    number: "03",
    title: "실제로 따라 할 수 있게 만들기",
    description:
      "조리 시간과 난이도, 인분과 핵심 과정을 명확하게 표시해 처음 만드는 음식도 쉽게 도전할 수 있도록 구성합니다.",
  },
];

function getCategoryLabel(category: RecipeCategory) {
  return (
    recipeCategories.find((item) => item.value === category)?.label ??
    "세계 레시피"
  );
}

function getCountryLabel(country: RecipeCountry) {
  return (
    countryFilters.find((item) => item.value === country)?.label ?? "세계 음식"
  );
}

function buildRecipesHref({
  category,
  country,
}: {
  category: RecipeCategoryValue;
  country: CountryFilterValue;
}) {
  const query = new URLSearchParams();

  if (category !== "all") {
    query.set("category", category);
  }

  if (country !== "all") {
    query.set("country", country);
  }

  const queryString = query.toString();

  return queryString
    ? `/recipes?${queryString}#recipe-archive`
    : "/recipes#recipe-archive";
}

function RecipeVisual({
  recipe,
  large = false,
}: {
  recipe: Recipe;
  large?: boolean;
}) {
  const sizeClass = large ? "min-h-[420px] lg:min-h-[560px]" : "min-h-60";

  return (
    <div
      className={`relative overflow-hidden ${sizeClass}`}
      style={{ background: recipe.gradient }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.9), transparent 28%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.45), transparent 30%)",
        }}
      />

      <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full border border-white/60 bg-white/20" />
      <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full border border-white/50 bg-white/15" />

      <div
        className={`relative z-10 flex ${sizeClass} flex-col justify-between p-7 sm:p-9`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold tracking-[0.25em] text-neutral-600">
            {recipe.countryEn}
          </p>

          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-[11px] font-bold text-neutral-600 backdrop-blur-sm">
            {getCategoryLabel(recipe.category)}
          </span>
        </div>

        <div>
          <p
            className={`max-w-full break-keep font-black leading-tight tracking-tight text-neutral-900/90 ${
              large
                ? "text-5xl sm:text-6xl lg:text-7xl"
                : "text-4xl sm:text-5xl"
            }`}
          >
            {recipe.visualLabel}
          </p>

          <p className="mt-3 text-xs font-bold tracking-[0.26em] text-neutral-600">
            {recipe.visualCaption}
          </p>
        </div>
      </div>
    </div>
  );
}

type RecipesPageProps = {
  searchParams: Promise<{
    category?: string;
    country?: string;
  }>;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;

  const activeCategory: RecipeCategoryValue = recipeCategories.some(
    (category) => category.value === params.category,
  )
    ? (params.category as RecipeCategoryValue)
    : "all";

  const activeCountry: CountryFilterValue = countryFilters.some(
    (country) => country.value === params.country,
  )
    ? (params.country as CountryFilterValue)
    : "all";

  const featuredRecipe = recipes[0];

  const isUnfiltered = activeCategory === "all" && activeCountry === "all";

  const filteredRecipes = recipes.filter((recipe) => {
    const categoryMatches =
      activeCategory === "all" || recipe.category === activeCategory;

    const countryMatches =
      activeCountry === "all" || recipe.country === activeCountry;

    return categoryMatches && countryMatches;
  });

  const visibleRecipes = isUnfiltered
    ? filteredRecipes.filter((recipe) => recipe.slug !== featuredRecipe.slug)
    : filteredRecipes;

  const activeCategoryLabel =
    recipeCategories.find((category) => category.value === activeCategory)
      ?.label ?? "전체";

  const activeCountryLabel =
    countryFilters.find((country) => country.value === activeCountry)?.label ??
    "전체 지역";

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#bf4f10]" />

              <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
                RECIPES FROM THE WORLD
              </p>
            </div>

            <h1 className="max-w-3xl break-keep text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              세계의 음식을
              <br />
              나의 식탁에서
            </h1>

            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              음식이 태어난 문화적 배경을 알아보고, 한국에서 구할 수 있는 재료로
              세계 각지의 요리를 직접 만들어 보세요.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#ddd2c5] bg-white/75 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-bold tracking-[0.25em] text-[#bf4f10]">
              MANNA RECIPE
            </p>

            <p className="mt-4 break-keep text-xl font-semibold leading-8">
              조리법만 따라 하는 것이 아니라
              <br />
              음식에 담긴 이야기까지 이해합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["문화적 배경", "조리 시간", "난이도", "대체 재료"].map(
                (keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-neutral-600"
                  >
                    {keyword}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured recipe */}
      {isUnfiltered && (
        <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
              FEATURED RECIPE
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              이번 주의 세계 레시피
            </h2>
          </div>

          <article className="grid overflow-hidden rounded-[2rem] border border-[#ded3c7] bg-white shadow-[0_22px_70px_rgba(70,50,25,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
            <RecipeVisual recipe={featuredRecipe} large />

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-[0.16em]">
                <Link
                  href={`/countries#${featuredRecipe.country}`}
                  className="text-[#bf4f10] transition hover:text-[#8e3908]"
                >
                  {featuredRecipe.countryEn}
                </Link>

                <span className="text-stone-300">·</span>

                <span className="text-neutral-500">
                  {getCategoryLabel(featuredRecipe.category)}
                </span>
              </div>

              <h3 className="mt-5 break-keep text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {featuredRecipe.title}
              </h3>

              <p className="mt-6 break-keep text-base leading-8 text-neutral-600">
                {featuredRecipe.summary}
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">조리 시간</p>
                  <p className="mt-2 text-sm font-bold">
                    {featuredRecipe.cookingTime}분
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">난이도</p>
                  <p className="mt-2 text-sm font-bold">
                    {featuredRecipe.difficulty}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f6f2ec] p-4">
                  <p className="text-xs text-neutral-500">기준 인분</p>
                  <p className="mt-2 text-sm font-bold">
                    {featuredRecipe.servings}인분
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[#e2d8cc] bg-[#fffaf4] p-5">
                <p className="text-xs font-bold tracking-[0.16em] text-[#bf4f10]">
                  FOOD &amp; CULTURE
                </p>

                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {featuredRecipe.culturalNote}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
                <div className="flex flex-wrap gap-2">
                  {featuredRecipe.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs font-medium text-neutral-500"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>

                {featuredRecipe.published ? (
                  <Link
                    href={`/recipes/${featuredRecipe.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-700"
                  >
                    레시피 보기
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="rounded-full bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-500">
                    상세 레시피 준비 중
                  </span>
                )}
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Recipe archive */}
      <section
        id="recipe-archive"
        className="scroll-mt-32 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
                RECIPE ARCHIVE
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                세계 레시피 모아보기
              </h2>

              <p className="mt-4 break-keep leading-7 text-neutral-600">
                음식 종류와 나라를 선택해 원하는 레시피를 찾아보세요.
              </p>
            </div>

            <p className="text-sm text-neutral-500">
              {activeCountryLabel} · {activeCategoryLabel} ·{" "}
              {filteredRecipes.length}개의 레시피
            </p>
          </div>

          {/* Category filter */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-bold tracking-[0.18em] text-neutral-500">
              음식 종류
            </p>

            <nav
              aria-label="레시피 종류"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              {recipeCategories.map((category) => {
                const isActive = activeCategory === category.value;

                return (
                  <Link
                    key={category.value}
                    href={buildRecipesHref({
                      category: category.value,
                      country: activeCountry,
                    })}
                    aria-current={isActive ? "page" : undefined}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "border-[#bf4f10] bg-[#bf4f10] !text-white"
                        : "border-stone-300 bg-white text-neutral-600 hover:border-[#bf4f10] hover:text-[#bf4f10]"
                    }`}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Country filter */}
          <div className="mt-7">
            <p className="mb-4 text-xs font-bold tracking-[0.18em] text-neutral-500">
              나라·지역
            </p>

            <nav
              aria-label="나라 및 지역"
              className="flex gap-3 overflow-x-auto pb-2"
            >
              {countryFilters.map((country) => {
                const isActive = activeCountry === country.value;

                return (
                  <Link
                    key={country.value}
                    href={buildRecipesHref({
                      category: activeCategory,
                      country: country.value,
                    })}
                    aria-current={isActive ? "page" : undefined}
                    className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "border-[#bf4f10] bg-[#bf4f10] text-white"
                        : "border-stone-300 bg-white text-neutral-600 hover:border-[#bf4f10] hover:text-[#bf4f10]"
                    }`}
                  >
                    {country.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Recipe cards */}
          {visibleRecipes.length > 0 ? (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {visibleRecipes.map((recipe) => (
                <article
                  key={recipe.slug}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#ded4c8] bg-white shadow-[0_16px_50px_rgba(70,50,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(70,50,25,0.09)]"
                >
                  <RecipeVisual recipe={recipe} />

                  <div className="flex min-h-[430px] flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/countries#${recipe.country}`}
                        className="text-xs font-bold tracking-[0.18em] text-[#bf4f10] transition hover:text-[#8e3908]"
                      >
                        {recipe.countryEn}
                      </Link>

                      <span className="rounded-full bg-[#f5f1ea] px-3 py-1.5 text-[11px] font-semibold text-neutral-600">
                        {getCategoryLabel(recipe.category)}
                      </span>
                    </div>

                    <h3 className="mt-5 break-keep text-xl font-bold leading-8 tracking-tight">
                      {recipe.title}
                    </h3>

                    <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                      {recipe.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
                        <p className="text-[10px] text-neutral-500">시간</p>
                        <p className="mt-1 text-xs font-bold">
                          {recipe.cookingTime}분
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
                        <p className="text-[10px] text-neutral-500">난이도</p>
                        <p className="mt-1 text-xs font-bold">
                          {recipe.difficulty}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
                        <p className="text-[10px] text-neutral-500">인분</p>
                        <p className="mt-1 text-xs font-bold">
                          {recipe.servings}인분
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-bold text-neutral-500">
                        주요 재료
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {recipe.featuredIngredients.map((ingredient) => (
                          <span
                            key={ingredient}
                            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-neutral-600"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-6">
                      <span className="text-xs text-neutral-500">
                        {getCountryLabel(recipe.country)}
                      </span>

                      {recipe.published ? (
                        <Link
                          href={`/recipes/${recipe.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-950 transition group-hover:text-[#bf4f10]"
                        >
                          레시피 보기
                          <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-neutral-400">
                          준비 중
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[1.75rem] border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
              <p className="text-lg font-semibold text-neutral-800">
                조건에 맞는 레시피가 없습니다.
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                다른 나라나 음식 종류를 선택해 주세요.
              </p>

              <Link
                href="/recipes#recipe-archive"
                className="mt-7 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-700"
              >
                전체 레시피 보기
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recipe principles */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
            HOW WE COOK
          </p>

          <h2 className="mt-3 break-keep text-3xl font-bold tracking-tight sm:text-4xl">
            만나의 식탁이 레시피를 만드는 방법
          </h2>

          <p className="mt-5 break-keep leading-7 text-neutral-600">
            현지 음식을 단순하게 재현하는 데 그치지 않고 문화적 맥락과 실제 조리
            가능성을 함께 고려합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {recipePrinciples.map((principle) => (
            <article
              key={principle.number}
              className="rounded-[1.75rem] border border-[#dfd5c9] bg-white p-7 shadow-[0_15px_45px_rgba(70,50,25,0.04)]"
            >
              <p className="text-sm font-black tracking-[0.2em] text-[#bf4f10]">
                {principle.number}
              </p>

              <h3 className="mt-8 text-xl font-bold">{principle.title}</h3>

              <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20 lg:pb-28">
        <div className="overflow-hidden rounded-[2.25rem] bg-neutral-950 px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-[#e9a06f]">
              BEYOND THE RECIPE
            </p>

            <h2 className="mt-4 max-w-2xl break-keep text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              요리를 만들기 전에
              <br className="hidden sm:block" />그 음식의 이야기를 만나보세요.
            </h2>

            <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-neutral-300">
              문화 이야기에서는 음식이 탄생한 지역과 역사, 사람들의 생활방식을
              더 자세하게 살펴볼 수 있습니다.
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
              href="/countries"
              className="rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              나라별 식탁 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
