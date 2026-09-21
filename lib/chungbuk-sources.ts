import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Regional and seasonal references reviewed 2026-09-21. Recipes are household adaptations.
export const chungbukSources = {
  jujube: { label: "한국문화원연합회 — 보은대추의 지역 역사", url: "https://ncms.nculture.org/local-specialty/story/12247" },
  jujubeSeason: { label: "충청북도농업기술원 — 대추 수확 후 10월 과원 관리", url: "https://ares.chungbuk.go.kr/home/sub.php?menukey=1220&mod=view&no=11e69c1b0d12a3e8bfdc901b0e43d477&scode=99999999" },
  garlic: { label: "단양군 — 2026년 6월 마늘 수확과 지역 재배 환경", url: "https://www.danyang.go.kr/dy21/984?action=list&page=15" },
  cabbage: { label: "괴산군농업기술센터 — 지역 특산물 배추와 재배", url: "https://www.goesan.go.kr/gsat/contents.do?key=1527" },
  cabbageCulture: { label: "괴산군농업기술센터 — 시골절임배추", url: "https://www.goesan.go.kr/gsat/contents.do?key=777" },
  cabbageSeason: { label: "농림축산식품부·한국농촌경제연구원 — 가을 김장배추 출하 시기", url: "https://www.mafra.go.kr/bbs/mafra/68/257565/download.do" },
  grape: koreaSources.grape,
  poultrySafety: { label: "FoodSafety.gov — 닭고기의 안전한 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
} satisfies Record<string, SourceLink>;
