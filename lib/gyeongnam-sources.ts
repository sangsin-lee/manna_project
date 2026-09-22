import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Primary regional and seasonal references reviewed 2026-09-22.
export const gyeongnamSources = {
  persimmon: koreaSources.persimmon,
  persimmonHarvest: { label: "농촌진흥청 — 단감 품종별 숙기와 수확 후 관리", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1996" },
  chestnut: { label: "하동군 농특산물 쇼핑몰·생산자 — 하동의 밤과 가을 수확", url: "https://www.hadongshop.co.kr/shop/item.php?it_id=1704824132" },
  yullan: { label: "한식진흥원 — 밤을 빚어 만드는 다과, 율란", url: "https://www.hansik.or.kr/magazines/list/magazineDetail/89/3706?menuSn=429" },
  oyster: { label: "한국관광공사 — 통영 굴의 출하 시기와 겨울 굴 요리", url: "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=c27b446b-c96a-4ce7-8557-90c5794e6377" },
  spinach: { label: "남해군 — 겨울 노지 시금치와 보물초 브랜드", url: "https://www.namhae.go.kr/depart/Index.do?c=DE0604011500" },
  spinachSeason: { label: "남해문화관광 — 신흥해바리마을의 11~2월 시금치 수확 체험", url: "https://www.namhae.go.kr/tour/00007/00023/00261.web?amode=view&category=V0100&idx=40&tord=name" },
  safety: { label: "식품의약품안전처·정책브리핑 — 육류·어패류의 중심온도와 교차오염 예방", url: "https://www.korea.kr/multi/visualNewsView.do?newsId=148894718" },
} satisfies Record<string, SourceLink>;
