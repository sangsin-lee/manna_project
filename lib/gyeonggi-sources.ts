import type { SourceLink } from "./content";

// Regional identity and harvest references reviewed on 2026-09-21.
// Recipes are household adaptations, not reproductions of a historical formula.
export const gyeonggiSources = {
  sweetPotato: { label: "경기도농업기술원 — 여주·이천 고구마 주산지", url: "https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=38943" },
  sweetPotatoHarvest: { label: "농촌진흥청 — 고구마 수확 시기와 수확 후 관리", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1226" },
  pear: { label: "경기도 — 안성장의 역사와 9~10월 배", url: "https://gnews.gg.go.kr/news/news_detail.do?number=201905281414323053C059&s_code=C059" },
  pineNut: { label: "경기도 — 가평 잣을 활용한 지역 음식", url: "https://gnews.gg.go.kr/news/news_view.do?number=202403081312106781C109&s_code=C401&type_m=main" },
  pineNutHarvest: { label: "동아일보 현장 취재 — 가평의 가을 잣 수확 (2010)", url: "https://www.donga.com/news/Society/article/all/20100910/31093743/1" },
  jangdan: { label: "파주시 — 장단이라는 지명과 장단콩 식문화", url: "https://www.paju.go.kr/news/user/BD_newsView.do?newsSeq=869&q_ctgCd=1002" },
  beanHarvest: { label: "경기농림진흥재단 보도자료 — 장단콩 수확과 두부 만들기 (2011)", url: "https://www.newswire.co.kr/newsRead.php?no=578416" },
  safety: { label: "FoodSafety.gov — 닭고기와 새우의 안전한 익힘", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
} satisfies Record<string, SourceLink>;
