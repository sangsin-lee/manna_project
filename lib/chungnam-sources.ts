import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Regional identity and typical harvest windows reviewed on 2026-09-21.
// Quantities and household adaptations are written by Manna Table.
export const chungnamSources = {
  chestnut: koreaSources.chestnut,
  shrimp: { label: "태안군 — 백사장항의 가을 대하 문화", url: "https://tv.taean.go.kr/_prog/video/?idx=2863&mode=v&slv=02" },
  shrimpSeason: { label: "해양수산부 — 가을 대하·흰다리새우와 소금구이", url: "https://www.mof.go.kr/doc/ko/selectDoc.do?bbsSeq=10&docSeq=62991&menuSeq=971" },
  ginger: { label: "충청남도농업기술원 — 서산·태안 생강의 재배 역사", url: "https://cnnongup.chungnam.go.kr/board/B0005.cs?act=read&articleId=230822&m=&pageIndex=66&pageUnit=10&searchCondition=&searchEndDt=&searchKeyword=&searchStartDt=" },
  gingerHarvest: { label: "농촌진흥청 — 생강의 수확 시기", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1060" },
  apple: { label: "예산군 — 홍로 사과 수확과 지역 특산물 안내", url: "https://www.yesan.go.kr/bbs/BBSMSTR_000000000049/list.do?pageIndex=64" },
  seafoodSafety: { label: "FoodSafety.gov — 새우의 안전한 익힘 상태", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  meatSafety: { label: "식품의약품안전처 — 음식의 중심까지 충분히 익히기", url: "https://mfds.go.kr/brd/m_61/view.do?company_cd=&company_nm=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&page=2&seq=54290&srchFr=&srchTo=&srchTp=&srchWord=" },
} satisfies Record<string, SourceLink>;
