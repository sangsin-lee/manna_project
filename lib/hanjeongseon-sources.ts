import type { SourceLink } from "./content";

// Menu descriptions and cooking references reviewed October 28, 2026.
export const hanjeongseonSources = {
  shop: { label: "서울관광재단 Visit Seoul — 한정선의 생과일·홍시·앙버터·두바이 스타일 찹쌀떡 (2026년 9월 안내)", url: "https://korean.visitseoul.net/area/hanjungsun/KOPp1q4s4" },
  dough: { label: "Maangchi — 전자레인지 찹쌀떡 반죽 조리 참고", url: "https://www.maangchi.com/recipe/chapssaltteok" },
  fruitHistory: { label: "나미사토 — 일본 딸기 다이후쿠의 유행 시기와 여러 기원설", url: "https://www.namisato.co.jp/trivia/309/" },
  dubaiCulture: { label: "게티 미술관 — 두바이 초콜릿을 응용한 디저트 (2025년 8월)", url: "https://www.getty.edu/news/dubai-chocolate-at-the-getty-villa-museum/" },
  filling: { label: "King Arthur Baking — 카다이프 굽기와 피스타치오 필링 조리 참고", url: "https://www.kingarthurbaking.com/recipes/dubai-chocolate-brownies-recipe" },
  flour: { label: "미국 FDA — 생가루를 먹지 않고 충분히 가열하기", url: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know" },
  fruit: { label: "미국 FDA — 과일을 흐르는 물에 씻고 깨끗하게 준비하기", url: "https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables" },
  storage: { label: "미국 FDA — 상하기 쉬운 음식의 냉장 보관", url: "https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely" },
} satisfies Record<string, SourceLink>;
