import type { SourceLink } from "./content";

// Verona's rice country, adapted with Korean short-grain rice, reviewed October 8.
export const pumpkinRisottoSources = {
  table: { label: "Visit Verona — 지역 쌀과 호박·살시차 리소토", url: "https://www.visitverona.it/it/esplora/degustare-verona" },
  rice: { label: "비알로네 나노 베로네세 보호협회 — 생산 지역과 초가을 수확", url: "https://www.risovialonenanoveronese.it/" },
  history: { label: "유럽연합 집행위 농업 — 비알로네 나노의 역사와 지역성", url: "https://agriculture.ec.europa.eu/farming/geographical-indications-and-quality-schemes/geographical-indications-food-and-drink/riso-nano-vialone-veronese-pgi_en" },
  korea: { label: "농촌진흥청 — 재배 방식별 국내 단호박 수확기", url: "https://rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=2042" },
  temperature: { label: "FoodSafety.gov — 다진 돼지고기 71°C와 재가열 74°C", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "FoodSafety.gov — 교차오염 예방과 신속한 소분 냉장", url: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety" },
} satisfies Record<string, SourceLink>;

// Bangkok crab curry adapted to Korean autumn crab, reviewed October 7.
export const crabCurrySources = {
  history: { label: "Somboon Seafood — 방콕 삼얀·반탓통 식당의 자체 연혁", url: "https://www.somboonseafood.com/en/about" },
  recipe: { label: "Thai SELECT — 커리 가루·게·달걀로 만드는 뿌팟퐁커리", url: "https://www.thaiselect.com/th/thai-cuisine/recipes/detail/25" },
  season: { label: "정책브리핑 · 해양수산부 자료 — 10월 제철 꽃게", url: "https://www.korea.kr/news/healthView.do?newsId=148906649" },
  seafood: { label: "미국 FDA — 해산물 해동·익힘·보관", url: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely" },
  temperature: { label: "FoodSafety.gov — 달걀 요리 71°C와 재가열 74°C", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
} satisfies Record<string, SourceLink>;

// Yamagata's inland imoni and the Korean taro harvest, reviewed October 6.
export const imoniSources = {
  culture: { label: "일본 농림수산성 — 야마가타 이모니의 지역 차이·유래·조리", url: "https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/imoni_yamagata.html" },
  season: { label: "야마가타시 — 가을에 즐기는 이모니와 지역 행사", url: "https://www.yamagatakara.jp/takara/specialties/imoni.html" },
  korea: { label: "농촌진흥청 — 토란의 가을 수확·조숙 재배·손질", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1702" },
  safety: { label: "FoodSafety.gov — 소고기 중심온도와 휴지·재가열", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "FoodSafety.gov — 교차오염 예방과 신속 냉장", url: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety" },
} satisfies Record<string, SourceLink>;

// Bavarian bread dumplings and the autumn mushroom table, reviewed October 5.
export const bavarianDumplingSources = {
  recipe: { label: "동바이에른관광협회 — 제멜크뇌델의 재료와 삶는 방법", url: "https://www.bayerischer-wald.de/aktivitaeten/essen-trinken/bayerische-rezepte/bayerische-semmelknoedel" },
  mushrooms: { label: "바이에른 산림소유자협회 — 버섯 크림과 빵 경단", url: "https://www.bayer-waldbesitzerverband.de/wald-genuss/rahmschwammerl-mit-semmelknoedel.html" },
  culture: { label: "바이에른 식문화 유산 — 빵 경단과 지역의 식탁", url: "https://www.genusserbe.bayern.de/352492/index.php" },
  bread: { label: "바이에른 식문화 유산 — 19세기 뮌헨의 문트제멜", url: "https://www.genusserbe.bayern.de/350502/index.php" },
  season: { label: "독일 연방영양센터 BZfE — 버섯의 계절·손질·보관", url: "https://www.bzfe.de/kueche-und-alltag/kochen/how-to-obst-und-gemuese/how-to-pilze" },
  korea: { label: "농촌진흥청 — 느타리버섯의 연중 환경 관리 재배", url: "https://www.rda.go.kr/middlePopOpenPopNongsaroDBView.do?no=1729" },
  safety: { label: "FoodSafety.gov — 달걀 요리 71°C와 재가열 74°C", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "미국 USDA — 신속 냉장과 안전한 재가열", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe" },
} satisfies Record<string, SourceLink>;

// Wuhan's autumn lotus-root table and household adaptation, reviewed October 3.
export const lotusRibSoupSources = {
  autumn: { label: "우한시 상무국 — 가을 연근 요리와 가족의 탕 문화", url: "https://sw.wuhan.gov.cn/xwdt/mtbd/202509/t20250915_2647333.shtml" },
  region: { label: "우한시 농업농촌국 · 장강일보 취재 — 차이뎬 연근과 새해의 탕", url: "https://nyncj.wuhan.gov.cn/xwzx_25/whsn/202501/t20250123_2524798.html" },
  korea: { label: "농촌진흥청 농사로 — 국내 연근의 작형별 출하와 수시 수확", url: "https://www.nongsaro.go.kr/portal/ps/psb/psbl/workScheduleDtl.ps?cntntsNo=30635&menuId=PS00087" },
  safety: { label: "FoodSafety.gov — 돼지고기 중심온도·휴지와 재가열", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "미국 USDA — 남은 국물 요리의 소분·냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;

// Normandy's apple harvest and household adaptation, reviewed September 30.
export const normandyChickenSources = {
  apples: { label: "노르망디관광청 — 사과 재배의 역사, 식용·양조용 품종과 수확기", url: "https://en.normandie-tourisme.fr/lifestyle-well-being/gastronomy/apple-speciality/" },
  harvest: { label: "노르망디관광청 — 페이드오주의 가을 사과 농장과 2026년 체험", url: "https://en.normandie-tourisme.fr/experience/making-organic-apple-juice-in-pays-dauge/" },
  regional: { label: "AREA Normandie — 지역 유제품과 닭·사과·크림 요리 (PDF)", url: "https://www.saveurs-de-normandie.fr/wp-content/uploads/2019/05/BROCHURE_GD_PUBLIC_ANGLAIS.pdf" },
  recipe: { label: "Milk Street · 2026.02.24 — 푸레 발레 도주의 구성과 브레이즈 소개", url: "https://www.177milkstreet.com/recipes/braised-chicken-apples-cream" },
  korea: { label: "농촌진흥청 — 국내 홍로 사과의 통상 숙기와 고르는 법", url: "https://www.rda.go.kr/webzine/2022/09/sub1-6.html" },
  safety: { label: "FoodSafety.gov — 닭고기의 안전 중심온도 74°C", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "미국 USDA — 남은 음식의 소분·냉장과 재가열", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;

// Tuscany's autumn table and household adaptation, reviewed September 28.
export const ribollitaSources = {
  recipe: { label: "토스카나관광청 — 리볼리타의 구성과 농가의 음식 문화", url: "https://www.visittuscany.com/en/recipes/reboiled-soup-a.k.a.-ribollita-recipe/" },
  autumn: { label: "토스카나관광청 — 가을 식탁의 리볼리타", url: "https://www.visittuscany.com/en/ideas/autumn-on-the-table-3-traditional-recipes/" },
  florence: { label: "토스카나관광청 — 피렌체의 빵 수프와 계절", url: "https://www.visittuscany.com/en/ideas/florence-food-guide/" },
  kale: { label: "토스카나관광청 — 겨울 카볼로 네로와 지역 요리", url: "https://www.visittuscany.com/en/ideas/3-tuscan-kale-recipes/" },
  beans: { label: "캐나다 보건부 — 건조 콩과 완전 조리 통조림의 차이", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/chemical-contaminants/natural-toxins/lectins-legumes.html" },
  storage: { label: "미국 USDA — 수프의 소분·냉장과 안전한 재가열", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;

// New Mexico's September harvest and household adaptation, reviewed September 27.
export const calabacitasSources = {
  recipe: { label: "뉴멕시코관광청 — 호박·옥수수·풋고추의 칼라바시타스", url: "https://www.newmexico.org/things-to-do/cuisine/recipes/calabacitas/" },
  culture: { label: "NMFMA 생산자시장협회 — 칼라바시타스와 밀파의 농업 문화", url: "https://farmersmarketsnm.org/recipes/calabacitas-de-milpa/" },
  season: { label: "NMFMA — 뉴멕시코 남부의 월별 제철 목록", url: "https://farmersmarketsnm.org/resources/shopper-resources/whats-in-season/southern-nm/" },
  seasonalMenu: { label: "NMFMA · 2026년 8월 — 풋고추 수확과 로스팅 시즌", url: "https://farmersmarketsnm.org/chile-roasting-season-is-here/" },
  beans: { label: "캐나다 보건부 — 강낭콩의 렉틴과 완전 조리 통조림", url: "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/chemical-contaminants/natural-toxins/lectins-legumes.html" },
  safety: { label: "FoodSafety.gov — 남은 음식의 안전 재가열 온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "미국 USDA — 남은 음식의 소분과 냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;

// Ishikari's salmon season and household cooking references reviewed September 26.
export const chanchanyakiSources = {
  culture: { label: "일본 농림수산성 — 이시카리의 연어 찬찬야키와 전승 이야기", url: "https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/sakenochanchanyaki_hokkaido.html" },
  season: { label: "홋카이도청 — 백연어의 지역별 어획기", url: "https://www.pref.hokkaido.lg.jp/sr/gid/fis019.html" },
  recipe: { label: "홋카이도 어업협동조합연합회 — 연어와 채소를 함께 익히는 방법", url: "https://www.gyoren.or.jp/cooking/howto/sake06.html" },
  seasonalMenu: { label: "CGC 2026년 9월호 — 가을 연어 찬찬야키 메뉴 제안", url: "https://cgc-kitchen365.jp/search/detail/6a72f13b3ae008af26848061" },
  safety: { label: "FoodSafety.gov — 생선의 안전 중심온도와 재가열", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  handling: { label: "미국 FDA — 냉장 해동과 생선 취급", url: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely" },
  storage: { label: "미국 USDA — 남은 음식의 소분과 냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;

// Primary references reviewed for the September 23 dinner.
export const onionTartSources = {
  region: { label: "슈투트가르트관광청 — 슈바벤 음식 사전의 양파 타르트", url: "https://www.stuttgart-tourist.de/en/eat-and-drink/glossary-for-swabian-cuisine" },
  recipe: { label: "바덴뷔르템베르크 MBW — 슈바벤식 츠비벨쿠헨 조리법", url: "https://www.schmeck-den-sueden.de/rezept/schwabischer-zwiebelkuchen/" },
  history: { label: "바덴뷔르템베르크 MBW — 빵 굽는 날의 양파 타르트 이야기", url: "https://www.schmeck-den-sueden.de/spezialitaet/zwiebelkuchen/" },
  culture: { label: "독일와인협회 — 가을 포도 수확과 양파 타르트", url: "https://www.deutscheweine.de/weinerzeugnis/169/federwei%C3%9Fer" },
  season: { label: "독일 연방영양센터 BZfE — 양파의 계절과 저장·유통", url: "https://www.bzfe.de/presse/pressemeldungen-archiv/ein-gemuese-das-zu-traenen-ruehrt" },
  safety: { label: "FoodSafety.gov — 달걀 요리와 캐서롤의 안전 중심온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  flour: { label: "미국 FDA — 생밀가루와 익히지 않은 반죽의 취급", url: "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts" },
} satisfies Record<string, SourceLink>;

// Regional producers, seasonal calendars and cooking references for September 25.
export const barleySoupSources = {
  region: { label: "그라우뷘덴관광청 — 뷘트너 보리 수프 조리법", url: "https://www.graubuenden.ch/sites/graubuenden/files/2024-01/rezept-buendner-gerstensuppe.pdf" },
  farming: { label: "Gran Alpin 생산자협동조합 — 그라우뷘덴의 산지 곡물 농업", url: "https://www.granalpin.ch/home" },
  barley: { label: "Gran Alpin — 지역 보리와 도정 보리 제품", url: "https://www.granalpin.ch/produkte/produktpalette/koerner" },
  leek: { label: "스위스 채소생산자협회 — 리크의 연중 공급", url: "https://www.gemuese.ch/gemuesearten/lauch" },
  celery: { label: "스위스 채소생산자협회 — 줄기셀러리의 5~12월 제철", url: "https://www.gemuese.ch/gemuesearten/stangensellerie" },
  celeriac: { label: "스위스 채소생산자협회 — 뿌리셀러리와 저장 시기", url: "https://www.gemuese.ch/gemuesearten/knollensellerie" },
  recipe: { label: "Migros Migusto — 보리·채소·크림을 활용한 수프", url: "https://migusto.migros.ch/de/rezepte/buendner-gerstensuppe" },
  safety: { label: "FoodSafety.gov — 남은 음식의 안전 재가열 온도", url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures" },
  storage: { label: "미국 USDA — 남은 수프의 소분·냉장 보관", url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety" },
} satisfies Record<string, SourceLink>;
