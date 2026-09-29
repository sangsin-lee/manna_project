import type { SourceLink } from "./content";

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
