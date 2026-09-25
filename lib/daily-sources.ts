import type { SourceLink } from "./content";

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
