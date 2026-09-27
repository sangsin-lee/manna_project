import type { SourceLink } from "./content";

// Origins, American foodways and cooking safety reviewed September 27, 2026.
export const usMexicanSources = {
  tortilla: { label: "멕시코 농업부 — 옥수수 토르티야와 니스타말화", url: "https://www.gob.mx/agricultura/articulos/del-maiz-a-la-tortilla-y-el-proceso-de-nixtamalizacion?idiom=es" },
  migration: { label: "스미스소니언 — 이주 공동체와 미국의 토르티야 문화", url: "https://amhistory.si.edu/docs/FOOD_Latin_Flavors.pdf" },
  pepper: { label: "멕시코 농식품정보기관 — 할라페뇨를 훈연·건조한 치폴레", url: "https://www.gob.mx/agricultura%7Cdgsiap/articulos/ahumado-y-deshidratado-el-chipotle-sigue-siendo-apreciado" },
  brand: { label: "Chipotle 공식 자료 — 1993년 덴버의 첫 매장과 미션 지구의 영향", url: "https://newsroom.chipotle.com/2017-09-07-chipotle-reopens-doors-to-restaurant-no-1-following-first-renovation-in-24-years" },
  quesadilla: { label: "Chipotle 공식 자료 — 밀 토르티야·치즈를 사용하는 퀘사디아", url: "https://newsroom.chipotle.com/2021-03-09-Chipotle-Launches-New-Hand-Crafted-Quesadilla-As-Its-First-Customizable-Digital-Only-Entree" },
  safety: { label: "FoodSafety.gov — 닭고기와 남은 음식의 안전 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  beans: { label: "캐나다 보건부 — 강낭콩의 렉틴과 완전 조리 통조림", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/chemical-contaminants/natural-toxins/lectins-legumes.html" },
  storage: { label: "USDA — 남은 음식의 소분과 냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;
