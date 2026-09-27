import type { SourceLink } from "./content";

// Regional histories and cooking guidance reviewed September 27, 2026.
export const usChickenSources = {
  southernHistory: { label: "Virginia Humanities — 1872년 고든스빌 철도역의 음식 판매 기록", url: "https://encyclopediavirginia.org/waiter-carriers/" },
  southernCulture: { label: "버지니아 오렌지카운티 · 2026년 9월 — 고든스빌의 프라이드치킨 유산", url: "https://newsletter.orangecountyva.gov/september2026/32/" },
  buffalo: { label: "Visit Buffalo — 앵커 바와 버팔로 윙의 지역 이야기", url: "https://visitbuffalo.com/how-it-all-began-the-story-of-buffalo-wings/" },
  wingPioneer: { label: "Visit Buffalo — 존 영과 버팔로의 여러 윙 전통", url: "https://visitbuffalo.com/honoring-a-wing-pioneer/" },
  wingRecipe: { label: "Frank’s RedHot — 오븐에 구운 윙과 핫소스·버터 조합", url: "https://www.franksredhot.com/en-ca/recipes/franks-redhot-original-buffalo-chicken-wings" },
  temperature: { label: "FoodSafety.gov — 닭고기와 남은 음식의 안전 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  frying: { label: "USDA — 뜨거운 기름의 취급과 튀김 안전", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/deep-fat-frying" },
  storage: { label: "USDA — 남은 음식의 소분과 냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;
