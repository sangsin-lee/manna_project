import type { SourceLink } from "./content";

// Primary regional and seasonal references reviewed 2026-09-22.
export const jeonnamSources = {
  yuja: { label: "한국관광공사 — 고흥의 11월 유자밭과 수확·유자청 체험", url: "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=27120" },
  fig: { label: "농촌진흥청·전남농업기술원 — 영암 무화과와 재배 방식별 수확 시기", url: "https://www.rda.go.kr/board/board.do?boardId=farmlcltinfo&currPage=687&dataNo=100000774742&mode=updateCnt&prgId=day_farmlcltinfoEntry&searchEDate=&searchKey=&searchSDate=&searchVal=" },
  octopus: { label: "한국관광공사 — 무안의 낙지 식문화와 연포탕", url: "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=11881ab4-fb6c-462c-9f2d-d02206118a89" },
  octopusSeason: { label: "해양수산부 — 가을을 대표하는 10월 수산물, 낙지", url: "https://www.mof.go.kr/doc/ko/selectDoc.do?bbsSeq=10&docSeq=27476&menuSeq=971" },
  cockle: { label: "한국관광공사 — 벌교 꼬막의 늦가을·겨울 식문화와 종류", url: "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=1e854ef9-be7f-437f-8bac-b2851e39f7ad" },
  fishSafety: { label: "FoodSafety.gov — 연어 등 생선 필레의 안전한 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  seafoodSafety: { label: "식품의약품안전처·정책브리핑 — 어패류 85°C에서 1분 이상 가열과 도구 구분", url: "https://www.korea.kr/multi/visualNewsView.do?newsId=148894718" },
} satisfies Record<string, SourceLink>;
