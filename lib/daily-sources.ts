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
