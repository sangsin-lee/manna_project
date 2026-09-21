import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Primary references reviewed 2026-09-22. Cooking quantities are household adaptations.
export const jeonbukSources = {
  berry: koreaSources.berry,
  sweetPotato: { label: "전북농촌여행 참참 — 익산 죽청대파니마을 고구마 수확 체험과 운영 시기", url: "https://www.chamchamtrip.com/site/expr/item/view.do?exItId=EXP_0000000000001465&menuCd=MENU_000000000000006" },
  mushroom: { label: "진안군 성수면 — 지역 특산품 표고버섯", url: "https://www.jinan.go.kr/town/index.jinan?menuCd=DOM_000000307004000000" },
  mushroomGrowing: { label: "농촌진흥청 농사로 — 표고버섯 재배와 시설을 이용한 연중 생산", url: "https://www.nongsaro.go.kr/cms_contents/937/100227_MF_ATTACH_01.pdf" },
  apple: { label: "장수군 — 고원에서 재배하는 장수 홍로사과와 9월 출하 사례", url: "https://www.jangsu.go.kr/mayor/board/view.jangsu?boardId=BBS_0000134&dataSid=405702&menuCd=DOM_000000301001000000&paging=ok&startPage=15" },
  appleSeason: { label: "농촌진흥청 — 홍로 사과의 9월 수확기와 품종 차이", url: "https://rda.go.kr/board/board.do?dataNo=100000807183&mode=view&prgId=day_farmprmninfoEntry" },
  meatSafety: { label: "식품의약품안전처·정책브리핑 — 육류 중심온도 75°C에서 1분 이상 가열", url: "https://www.korea.kr/multi/visualNewsView.do?newsId=148894718" },
} satisfies Record<string, SourceLink>;
