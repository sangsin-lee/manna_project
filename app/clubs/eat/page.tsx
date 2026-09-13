import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import RecipeCard from "@/components/RecipeCard";
import { getRecipesBySlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "EAT 요리동아리 | 수육과 숙주 계란 라면",
  description:
    "15명이 함께 만드는 수육 한 상과 숙주 계란 라면의 준비물, 역할 분담, 조리 시간표와 상세 레시피입니다.",
  alternates: {
    canonical: "/clubs/eat",
  },
};

const clubRecipeSlugs = [
  "club-suyuk-platter",
  "club-bean-sprout-egg-ramyeon",
] as const;

const roles = [
  {
    people: "5명",
    title: "수육팀",
    description:
      "고기와 향신 재료를 두 냄비로 나누고, 온도 확인·휴지·썰기까지 담당합니다.",
    tasks: ["고기 계량", "육수 준비", "중심온도 확인", "수육 썰기"],
  },
  {
    people: "5명",
    title: "라면팀",
    description:
      "숙주와 계란을 세 묶음으로 나누고 라면을 4봉씩 세 번 조리해 바로 배식합니다.",
    tasks: ["숙주 세척", "계란 풀기", "3회 분할 조리", "국물 배식"],
  },
  {
    people: "5명",
    title: "상차림·정리팀",
    description:
      "알배추와 김치, 양념을 소분하고 그릇·수저·배식 동선을 준비합니다.",
    tasks: ["곁들임 소분", "그릇 배치", "테이블 세팅", "중간 설거지"],
  },
] as const;

const timeline = [
  {
    time: "0~15분",
    title: "재료 확인과 팀 분담",
    description:
      "손을 씻고 도마와 칼을 구분합니다. 수육 냄비 2개, 라면 냄비 2개와 15인용 그릇을 배치합니다.",
  },
  {
    time: "15~25분",
    title: "수육 삶기 시작",
    description:
      "향신 육수를 끓이고 고기를 넣습니다. 다시 끓으면 거품을 걷고 중약불로 낮춥니다.",
  },
  {
    time: "25~65분",
    title: "곁들임과 라면 재료 준비",
    description:
      "수육이 익는 동안 알배추·김치·무말랭이를 담고 숙주, 계란과 대파를 세 회차로 나눕니다.",
  },
  {
    time: "65~80분",
    title: "수육 확인과 휴지",
    description:
      "가장 두꺼운 부위의 중심온도를 확인한 뒤 고기를 건져 10~15분 휴지합니다.",
  },
  {
    time: "78~93분",
    title: "라면 4봉씩 세 번 조리",
    description:
      "수육을 써는 시간에 첫 냄비를 시작하고, 완성된 라면은 기다리지 않도록 즉시 나눕니다.",
  },
  {
    time: "93~100분",
    title: "최종 상차림과 식사",
    description:
      "수육 접시, 곁들임과 라면을 동시에 내고 뜨거운 냄비와 버너 주변을 정리합니다.",
  },
] as const;

const shoppingGroups = [
  {
    title: "핵심 메뉴",
    items: [
      "돼지고기 3.2kg",
      "봉지라면 12봉",
      "숙주 1kg",
      "계란 8개",
    ],
  },
  {
    title: "수육 육수",
    items: [
      "된장 6큰술",
      "양파 3개",
      "대파 4대",
      "통마늘 30쪽",
      "생강 50g",
      "맛술 250ml",
    ],
  },
  {
    title: "곁들임",
    items: [
      "알배추 3통",
      "김치 1.2kg",
      "무말랭이 600g",
      "쌈장 500g",
      "새우젓 250g",
    ],
  },
] as const;

const equipment = [
  "10L 안팎 큰 냄비 2개",
  "라면용 냄비 2개",
  "가열기구 2대 이상",
  "고기용 도마·칼 1세트",
  "채소용 도마·칼 1세트",
  "집게 4개와 국자 3개",
  "중심온도계 1개",
  "큰 접시 4개와 개인 그릇 15개",
] as const;

export default function EatClubPage() {
  const recipes = getRecipesBySlugs([...clubRecipeSlugs]);
  const pageUrl = `${siteConfig.url}/clubs/eat`;

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "EAT 요리동아리 수육과 숙주 계란 라면",
            description:
              "15명 단체 조리를 위한 수육과 숙주 계란 라면 운영안과 상세 레시피 모음입니다.",
            url: pageUrl,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            hasPart: recipes.map((recipe) => ({
              "@type": "Recipe",
              name: recipe.title,
              url: `${siteConfig.url}/recipes/${recipe.slug}`,
            })),
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
                name: "레시피",
                item: `${siteConfig.url}/recipes`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "EAT 요리동아리",
                item: pageUrl,
              },
            ],
          },
        ]}
      />

      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
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
            <span className="font-bold text-neutral-950">EAT 요리동아리</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
                EAT COOKING CLUB
              </p>
              <h1 className="mt-5 max-w-4xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                수육 한 상과
                <br />
                숙주 계란 라면
              </h1>
              <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
                15명이 함께 조리할 때 필요한 분량과 순서, 역할을 한곳에
                정리했습니다. 단체방에는 이 페이지 주소만 공유하고 각 팀은
                아래 상세 레시피를 열어 작업하면 됩니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#club-recipes"
                  className="inline-flex rounded-full bg-[#b9480c] px-6 py-3.5 text-sm font-black !text-white transition hover:bg-[#943706]"
                >
                  상세 레시피 보기
                </a>
                <span className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-700">
                  브라우저 인쇄: Ctrl + P
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              {[
                ["참여 인원", "15명"],
                ["전체 소요", "약 100분"],
                ["조리 메뉴", "2가지"],
                ["권장 팀", "3개 팀"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#dfd3c6] bg-white p-5"
                >
                  <dt className="text-xs font-bold text-neutral-500">
                    {label}
                  </dt>
                  <dd className="mt-2 text-xl font-black">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <nav className="border-b border-stone-200 bg-white lg:sticky lg:top-20 lg:z-40">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4">
          {[
            ["roles", "역할 분담"],
            ["timeline", "진행 시간표"],
            ["shopping", "통합 장보기"],
            ["equipment", "준비 도구"],
            ["club-recipes", "상세 레시피"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-black !text-neutral-600 transition hover:border-[#b9480c] hover:!text-[#943706]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="roles"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-24"
      >
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          TEAM ROLES
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          15명 역할 분담
        </h2>
        <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
          수육이 익는 동안 다른 준비가 동시에 진행되도록 5명씩 세 팀으로
          나누는 구성입니다.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-7 shadow-[0_16px_50px_rgba(70,50,25,0.05)]"
            >
              <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
                {role.people}
              </p>
              <h3 className="mt-4 text-2xl font-black">{role.title}</h3>
              <p className="mt-4 break-keep text-sm leading-7 text-neutral-600">
                {role.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {role.tasks.map((task) => (
                  <span
                    key={task}
                    className="rounded-full bg-[#f5f1ea] px-3 py-2 text-xs font-bold text-neutral-600"
                  >
                    {task}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="timeline"
        className="scroll-mt-40 border-y border-stone-200 bg-[#f6f2ec]"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            100 MINUTE PLAN
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            조리 진행 시간표
          </h2>

          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {timeline.map((item, index) => (
              <li
                key={item.time}
                className="grid gap-5 rounded-[1.5rem] border border-stone-200 bg-white p-6 sm:grid-cols-[70px_1fr]"
              >
                <div>
                  <p className="text-xs font-black tracking-[0.14em] text-[#b9480c]">
                    STEP {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-black">{item.time}</p>
                </div>
                <div>
                  <h3 className="text-lg font-black">{item.title}</h3>
                  <p className="mt-2 break-keep text-sm leading-7 text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="shopping"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-24"
      >
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          SHOPPING SUMMARY
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          통합 장보기 핵심 목록
        </h2>
        <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
          향신 재료와 세부 양념은 수육 상세 페이지에서 확인하고, 구매 담당자는
          아래 핵심 수량부터 확보하면 됩니다.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {shoppingGroups.map((group) => (
            <section
              key={group.title}
              className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white"
            >
              <h3 className="border-b border-stone-200 bg-[#fff8f1] px-6 py-4 text-lg font-black">
                {group.title}
              </h3>
              <ul className="divide-y divide-stone-200 px-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1rem_1fr] gap-3 py-4 text-sm leading-6 text-neutral-700"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#b9480c]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section
        id="equipment"
        className="scroll-mt-40 border-y border-stone-200 bg-[#fff8f1]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            EQUIPMENT
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            준비 도구
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#e2d5c8] bg-white px-5 py-4 text-sm font-bold text-neutral-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="club-recipes"
        className="scroll-mt-40 mx-auto max-w-6xl px-6 py-20 lg:py-28"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              CLUB RECIPES
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              팀별 상세 레시피
            </h2>
            <p className="mt-4 max-w-2xl break-keep leading-7 text-neutral-600">
              각 카드를 열면 재료 전체 목록, 단계별 조리법과 대체 재료를 볼
              수 있습니다.
            </p>
          </div>
          <Link
            href="/recipes?country=korea#recipe-archive"
            className="text-sm font-black !text-[#943706]"
          >
            한국 레시피 전체 보기 →
          </Link>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <p className="text-xs font-black tracking-[0.24em] text-[#efab7f]">
              BEFORE COOKING
            </p>
            <h2 className="mt-3 break-keep text-2xl font-black sm:text-3xl">
              조리 당일에는 상세 레시피를 다시 확인하세요.
            </h2>
            <p className="mt-3 max-w-2xl break-keep text-sm leading-7 text-neutral-300">
              제품별 라면 물 양과 조리시간, 고기 덩어리 두께와 냄비 크기에
              따라 실제 시간은 달라질 수 있습니다.
            </p>
          </div>
          <Link
            href="/recipes/club-suyuk-platter"
            className="mt-7 inline-flex shrink-0 rounded-full bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 sm:mt-0"
          >
            첫 레시피 열기
          </Link>
        </div>
      </section>
    </main>
  );
}
