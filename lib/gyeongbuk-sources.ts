import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Primary regional and seasonal references reviewed 2026-09-22.
export const gyeongbukSources = {
  apple: koreaSources.apple,
  appleSeason: { label: "농촌진흥청 — 홍로 사과의 9월 수확기와 품종 차이", url: "https://rda.go.kr/board/board.do?dataNo=100000807183&mode=view&prgId=day_farmprmninfoEntry" },
  ginseng: { label: "한국관광공사 — 영주 풍기 인삼박물관과 지역 인삼 문화", url: "https://data.visitkorea.or.kr/resource/2406210" },
  ginsengHarvest: { label: "영주시의회 2024년 회의록 — 축제용 인삼 채굴 시기와 농가별 차이", url: "https://council.yeongju.go.kr/Conference/Retrieval2/index.php?daesu=9&hfile=9C3010287042.html" },
  chili: { label: "한국관광공사 — 영양고추홍보전시관과 고추 재배 문화", url: "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=4b9d7b5b-50aa-4412-a418-85e459c86877" },
  chiliHarvest: { label: "농촌진흥청 — 홍고추 수확과 건조, 8~9월 수확기 관리", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1042" },
  crab: { label: "울진군 — 지역 붉은대게로 만드는 다리살·몸통살 가공품", url: "https://www.uljin.go.kr/agro/index.uljin?menuCd=DOM_000001003005008000" },
  crabSeason: { label: "해양수산부 — 겨울 별미 붉은대게, 12월 수산물 선정", url: "https://www.mof.go.kr/doc/ko/selectDoc.do?bbsSeq=10&docSeq=14080&menuSeq=971" },
  safety: { label: "식품의약품안전처·정책브리핑 — 육류·어패류의 중심온도와 교차오염 예방", url: "https://www.korea.kr/multi/visualNewsView.do?newsId=148894718" },
  eggSafety: { label: "FoodSafety.gov — 달걀 요리를 포함한 식품별 안전 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
} satisfies Record<string, SourceLink>;
