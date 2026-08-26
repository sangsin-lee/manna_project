import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문화 이야기 | 만나의 식탁",
  description:
    "세계 각지의 음식에 담긴 역사, 생활방식, 식사 문화와 사람들의 이야기를 만나보세요.",
};

const categories = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: "food-culture",
    label: "식문화",
  },
  {
    value: "food-origin",
    label: "음식의 탄생",
  },
  {
    value: "daily-life",
    label: "일상과 식탁",
  },
  {
    value: "table-manners",
    label: "식사 예절",
  },
  {
    value: "market",
    label: "시장과 거리",
  },
  {
    value: "drinks",
    label: "술과 음료",
  },
] as const;

type CategoryValue = (typeof categories)[number]["value"];
type StoryCategory = Exclude<CategoryValue, "all">;

type Story = {
  slug: string;
  title: string;
  region: string;
  regionEn: string;
  countryAnchor: string;
  category: StoryCategory;
  summary: string;
  readTime: string;
  keywords: string[];
  visualLabel: string;
  visualCaption: string;
  gradient: string;
  published: boolean;
};

const stories: Story[] = [
  {
    slug: "hong-kong-cha-chaan-teng",
    title: "차찬텡은 왜 홍콩 사람들의 일상적인 식당이 되었을까?",
    region: "홍콩",
    regionEn: "HONG KONG",
    countryAnchor: "hong-kong",
    category: "food-culture",
    summary:
      "밀크티와 토스트, 마카로니 수프와 볶음밥이 한 메뉴판에 놓이는 차찬텡. 동서양 문화와 빠른 도시 생활이 만나 형성된 홍콩의 대중적인 식사 공간을 살펴봅니다.",
    readTime: "약 7분",
    keywords: ["차찬텡", "도시문화", "대중식당"],
    visualLabel: "茶餐廳",
    visualCaption: "CHA CHAAN TENG",
    gradient: "linear-gradient(135deg, #eedac2 0%, #e1cfb8 45%, #cfd9cc 100%)",
    published: false,
  },
  {
    slug: "hong-kong-macaroni-soup",
    title: "홍콩 사람들은 왜 아침에 마카로니 수프를 먹을까?",
    region: "홍콩",
    regionEn: "HONG KONG",
    countryAnchor: "hong-kong",
    category: "food-origin",
    summary:
      "서양식 마카로니와 중국식 국물, 햄과 달걀이 만나 완성된 홍콩식 아침 메뉴입니다. 익숙하지 않은 조합이 도시의 일상식으로 자리 잡은 배경을 알아봅니다.",
    readTime: "약 6분",
    keywords: ["마카로니수프", "홍콩조식", "차찬텡"],
    visualLabel: "MACARONI",
    visualCaption: "BREAKFAST SOUP",
    gradient: "linear-gradient(135deg, #f0dfca 0%, #e7d3b8 50%, #d9c3a7 100%)",
    published: false,
  },
  {
    slug: "korean-banchan-culture",
    title: "한국의 식탁에는 왜 여러 반찬이 함께 놓일까?",
    region: "한국",
    regionEn: "KOREA",
    countryAnchor: "korea",
    category: "food-culture",
    summary:
      "밥과 국, 김치와 여러 반찬을 한 상에 차리는 한국의 식사 구조를 살펴봅니다. 저장 음식과 계절 재료, 함께 나누어 먹는 방식이 식탁에 어떤 영향을 주었는지 알아봅니다.",
    readTime: "약 8분",
    keywords: ["반찬문화", "한상차림", "발효음식"],
    visualLabel: "飯床",
    visualCaption: "KOREAN TABLE",
    gradient: "linear-gradient(135deg, #eee3d6 0%, #dfe7dc 48%, #cad8cf 100%)",
    published: false,
  },
  {
    slug: "japanese-izakaya-culture",
    title: "일본의 이자카야에서는 왜 작은 요리를 나누어 먹을까?",
    region: "일본",
    regionEn: "JAPAN",
    countryAnchor: "japan",
    category: "drinks",
    summary:
      "술과 함께 여러 종류의 작은 요리를 주문하는 이자카야의 식사 방식을 소개합니다. 음식의 순서와 분위기, 직장인 문화와 가벼운 모임의 관계를 함께 살펴봅니다.",
    readTime: "약 7분",
    keywords: ["이자카야", "술안주", "회식문화"],
    visualLabel: "居酒屋",
    visualCaption: "IZAKAYA",
    gradient: "linear-gradient(135deg, #edd8d4 0%, #e5ccc8 45%, #d9c2bd 100%)",
    published: false,
  },
  {
    slug: "chinese-regional-spiciness",
    title: "중국의 매운맛은 지역마다 어떻게 다를까?",
    region: "중국",
    regionEn: "CHINA",
    countryAnchor: "china",
    category: "food-culture",
    summary:
      "화자오의 얼얼함, 고추의 직접적인 매운맛, 향신료의 깊은 향까지 중국의 매운맛은 하나로 설명하기 어렵습니다. 지역 환경에 따라 달라진 맛의 특징을 비교합니다.",
    readTime: "약 9분",
    keywords: ["마라", "화자오", "지역음식"],
    visualLabel: "麻辣",
    visualCaption: "MÁLÀ",
    gradient: "linear-gradient(135deg, #eccfb8 0%, #dfb69a 50%, #cf9e83 100%)",
    published: false,
  },
  {
    slug: "vietnamese-breakfast-culture",
    title: "베트남의 아침 식사는 왜 거리에서 시작될까?",
    region: "베트남",
    regionEn: "VIETNAM",
    countryAnchor: "vietnam",
    category: "daily-life",
    summary:
      "쌀국수와 반미, 죽과 커피처럼 베트남의 아침 식사는 다양한 형태로 나타납니다. 길거리 식당과 시장이 사람들의 출근길 식탁이 되는 생활문화를 살펴봅니다.",
    readTime: "약 6분",
    keywords: ["아침식사", "길거리음식", "쌀국수"],
    visualLabel: "PHỞ",
    visualCaption: "MORNING TABLE",
    gradient: "linear-gradient(135deg, #dce7cd 0%, #ccdcb9 50%, #b9cea4 100%)",
    published: false,
  },
  {
    slug: "italian-family-table",
    title: "이탈리아의 식탁에서 대화는 왜 중요한가?",
    region: "이탈리아",
    regionEn: "ITALY",
    countryAnchor: "italy",
    category: "table-manners",
    summary:
      "음식을 빠르게 해결하기보다 여러 코스와 대화를 함께 즐기는 이탈리아의 식사 문화를 소개합니다. 지역 음식과 가족 식사의 관계도 함께 살펴봅니다.",
    readTime: "약 7분",
    keywords: ["가족식사", "코스요리", "지역문화"],
    visualLabel: "TAVOLA",
    visualCaption: "FAMILY TABLE",
    gradient: "linear-gradient(135deg, #e7ddc5 0%, #dce1cc 48%, #c9d6bd 100%)",
    published: false,
  },
  {
    slug: "korean-market-food",
    title: "한국의 전통시장은 어떻게 하나의 식당이 되었을까?",
    region: "한국",
    regionEn: "KOREA",
    countryAnchor: "korea",
    category: "market",
    summary:
      "떡볶이와 순대, 전과 국수처럼 한국의 시장에서는 장보기와 식사가 한 공간에서 이루어집니다. 시장 음식이 지역 주민의 일상과 연결되는 방식을 살펴봅니다.",
    readTime: "약 6분",
    keywords: ["전통시장", "분식", "시장음식"],
    visualLabel: "市場",
    visualCaption: "MARKET FOOD",
    gradient: "linear-gradient(135deg, #ead8c6 0%, #dfc7b2 50%, #d2b79e 100%)",
    published: false,
  },
];

const editorialValues = [
  {
    number: "01",
    title: "음식이 태어난 환경",
    description:
      "기후와 지형, 지역에서 구할 수 있었던 재료가 음식에 어떤 영향을 주었는지 살펴봅니다.",
  },
  {
    number: "02",
    title: "사람들의 생활방식",
    description:
      "가정과 시장, 직장과 거리에서 사람들이 음식을 언제, 누구와, 어떻게 먹는지 기록합니다.",
  },
  {
    number: "03",
    title: "오늘날의 변화",
    description:
      "전통적인 식문화가 현대의 도시 생활과 다른 지역의 문화 속에서 어떻게 변화하는지 알아봅니다.",
  },
];

function getCategoryLabel(category: StoryCategory) {
  return (
    categories.find((item) => item.value === category)?.label ?? "문화 이야기"
  );
}

function StoryVisual({
  story,
  large = false,
}: {
  story: Story;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${
        large ? "min-h-[360px] lg:min-h-[520px]" : "min-h-56"
      }`}
      style={{ background: story.gradient }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.9), transparent 28%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.45), transparent 30%)",
        }}
      />

      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/60 bg-white/20" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-white/50 bg-white/15" />

      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-7 sm:p-9">
        <p className="text-xs font-bold tracking-[0.25em] text-neutral-600">
          {story.regionEn}
        </p>

        <div>
          <p
            className={`font-black tracking-tight text-neutral-900/90 ${
              large
                ? "text-5xl sm:text-6xl lg:text-7xl"
                : "text-4xl sm:text-5xl"
            }`}
          >
            {story.visualLabel}
          </p>

          <p className="mt-3 text-xs font-bold tracking-[0.3em] text-neutral-600">
            {story.visualCaption}
          </p>
        </div>
      </div>
    </div>
  );
}

type StoriesPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;

  const requestedCategory = params.category;

  const activeCategory: CategoryValue = categories.some(
    (category) => category.value === requestedCategory,
  )
    ? (requestedCategory as CategoryValue)
    : "all";

  const featuredStory = stories[0];
  const generalStories = stories.slice(1);

  const filteredStories =
    activeCategory === "all"
      ? generalStories
      : generalStories.filter((story) => story.category === activeCategory);

  const activeCategoryLabel =
    categories.find((category) => category.value === activeCategory)?.label ??
    "전체";

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#bf4f10]" />

              <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
                STORIES FROM THE TABLE
              </p>
            </div>

            <h1 className="max-w-3xl break-keep text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              음식 뒤에 놓인
              <br />
              사람들의 이야기
            </h1>

            <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
              한 접시의 음식은 단순한 조리법으로 완성되지 않습니다. 지역의
              기후와 역사, 사람들의 일상과 관계가 모여 하나의 식문화를 만듭니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#ddd2c5] bg-white/75 p-7 shadow-[0_18px_50px_rgba(80,60,35,0.06)]">
            <p className="text-xs font-bold tracking-[0.25em] text-[#bf4f10]">
              MANNA EDITORIAL
            </p>

            <p className="mt-4 break-keep text-xl font-semibold leading-8">
              무엇을 먹는지만 소개하지 않고,
              <br />왜 그렇게 먹게 되었는지 기록합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["역사", "생활", "시장", "가정", "지역", "사람"].map(
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

      {/* Featured story */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
            FEATURED STORY
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            이번 주의 문화 이야기
          </h2>
        </div>

        <article className="grid overflow-hidden rounded-[2rem] border border-[#ded3c7] bg-white shadow-[0_22px_70px_rgba(70,50,25,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <StoryVisual story={featuredStory} large />

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-[0.16em]">
              <Link
                href={`/countries#${featuredStory.countryAnchor}`}
                className="text-[#bf4f10] transition hover:text-[#8e3908]"
              >
                {featuredStory.regionEn}
              </Link>

              <span className="text-stone-300">·</span>

              <span className="text-neutral-500">
                {getCategoryLabel(featuredStory.category)}
              </span>
            </div>

            <h3 className="mt-5 break-keep text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {featuredStory.title}
            </h3>

            <p className="mt-6 break-keep text-base leading-8 text-neutral-600">
              {featuredStory.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {featuredStory.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-[#f5f1ea] px-3 py-2 text-xs font-medium text-neutral-600"
                >
                  #{keyword}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
              <span className="text-sm text-neutral-500">
                읽는 시간 {featuredStory.readTime}
              </span>

              {featuredStory.published ? (
                <Link
                  href={`/stories/${featuredStory.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-700"
                >
                  이야기 읽기
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <span className="rounded-full bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-500">
                  상세 이야기 준비 중
                </span>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* Category filter */}
      <section
        id="story-list"
        className="scroll-mt-32 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
                STORY ARCHIVE
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                문화 이야기 모아보기
              </h2>

              <p className="mt-4 break-keep leading-7 text-neutral-600">
                관심 있는 주제를 선택해 관련 이야기를 살펴보세요.
              </p>
            </div>

            <p className="text-sm text-neutral-500">
              {activeCategoryLabel} · {filteredStories.length}개의 이야기
            </p>
          </div>

          <nav
            aria-label="문화 이야기 카테고리"
            className="mt-9 flex gap-3 overflow-x-auto pb-2"
          >
            {categories.map((category) => {
              const isActive = category.value === activeCategory;

              const href =
                category.value === "all"
                  ? "/stories#story-list"
                  : `/stories?category=${category.value}#story-list`;

              return (
                <Link
                  key={category.value}
                  href={href}
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

          {/* Story cards */}
          {filteredStories.length > 0 ? (
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredStories.map((story) => (
                <article
                  key={story.slug}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#ded4c8] bg-white shadow-[0_16px_50px_rgba(70,50,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(70,50,25,0.09)]"
                >
                  <StoryVisual story={story} />

                  <div className="flex min-h-[340px] flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/countries#${story.countryAnchor}`}
                        className="text-xs font-bold tracking-[0.18em] text-[#bf4f10] transition hover:text-[#8e3908]"
                      >
                        {story.regionEn}
                      </Link>

                      <span className="rounded-full bg-[#f5f1ea] px-3 py-1.5 text-[11px] font-semibold text-neutral-600">
                        {getCategoryLabel(story.category)}
                      </span>
                    </div>

                    <h3 className="mt-5 break-keep text-xl font-bold leading-8 tracking-tight">
                      {story.title}
                    </h3>

                    <p className="mt-4 line-clamp-4 break-keep text-sm leading-7 text-neutral-600">
                      {story.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {story.keywords.slice(0, 2).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs font-medium text-neutral-500"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-6">
                      <span className="text-xs text-neutral-500">
                        {story.readTime}
                      </span>

                      {story.published ? (
                        <Link
                          href={`/stories/${story.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-950 transition group-hover:text-[#bf4f10]"
                        >
                          읽기
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
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-stone-300 bg-white px-6 py-20 text-center">
              <p className="text-lg font-semibold text-neutral-800">
                아직 등록된 이야기가 없습니다.
              </p>

              <p className="mt-3 text-sm text-neutral-500">
                해당 주제의 콘텐츠를 준비하고 있습니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial values */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] text-[#bf4f10]">
            HOW WE TELL STORIES
          </p>

          <h2 className="mt-3 break-keep text-3xl font-bold tracking-tight sm:text-4xl">
            만나의 식탁이 문화를 기록하는 방법
          </h2>

          <p className="mt-5 break-keep leading-7 text-neutral-600">
            한 나라의 문화를 단순한 이미지로 설명하지 않고 음식이 만들어진
            배경과 실제 생활 속 모습을 함께 살펴봅니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {editorialValues.map((value) => (
            <article
              key={value.number}
              className="rounded-[1.75rem] border border-[#dfd5c9] bg-white p-7 shadow-[0_15px_45px_rgba(70,50,25,0.04)]"
            >
              <p className="text-sm font-black tracking-[0.2em] text-[#bf4f10]">
                {value.number}
              </p>

              <h3 className="mt-8 text-xl font-bold">{value.title}</h3>

              <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                {value.description}
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
              EXPLORE MORE
            </p>

            <h2 className="mt-4 max-w-2xl break-keep text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              이야기 속 음식이 궁금하다면
              <br className="hidden sm:block" />
              나라별 식탁에서 이어서 살펴보세요.
            </h2>

            <p className="mt-5 max-w-xl break-keep text-sm leading-7 text-neutral-300">
              나라별 식문화와 대표 음식, 관련 레시피를 하나의 흐름으로 만나볼 수
              있습니다.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link
              href="/countries"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
            >
              나라별 식탁 보기
            </Link>

            <Link
              href="/#reservation"
              className="rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white"
            >
              클래스 문의
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
