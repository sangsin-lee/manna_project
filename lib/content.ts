import { steakRecipes } from "./steak-recipes";
import { dailyRecipes } from "./daily-recipes";
import { jejuRecipes } from "./jeju-recipes";
import { gyeonggiRecipes } from "./gyeonggi-recipes";
import { gangwonRecipes } from "./gangwon-recipes";
import { chungnamRecipes } from "./chungnam-recipes";

export type CountrySlug =
  | "korea"
  | "japan"
  | "china"
  | "hong-kong"
  | "macau"
  | "vietnam"
  | "thailand"
  | "usa"
  | "france"
  | "germany"
  | "switzerland"
  | "italy";

export type StoryCategory =
  | "food-culture"
  | "food-origin"
  | "daily-life"
  | "table-manners"
  | "market"
  | "drinks";

export type RecipeCategory =
  | "breakfast"
  | "main"
  | "street-food"
  | "dessert"
  | "drink";

export type Difficulty = "쉬움" | "보통" | "어려움";

export type Palette = {
  from: string;
  mid: string;
  to: string;
  ink: string;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type PlaceType = "country" | "region";

export type Continent = "asia" | "europe" | "north-america";

export type VisitStatus = "home-base" | "visited";

export type ExperienceStatus =
  | "visit-based"
  | "tasted"
  | "recreated"
  | "researched";

export type VisitInfo = {
  status: VisitStatus;
  places: string[];
  note: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export type CountryTableScene = {
  eyebrow: string;
  title: string;
  description: string;
};

export type CountryRegionalNote = {
  name: string;
  description: string;
  foods: string[];
};

export type CountryDiningNote = {
  title: string;
  description: string;
};

export type Country = {
  slug: CountrySlug;
  nameKo: string;
  nameEn: string;
  placeType?: PlaceType;
  continent: Continent;
  visit?: VisitInfo;
  eyebrow: string;
  headline: string;
  summary: string;
  introduction: string[];
  representativeFlavors: string[];
  mainIngredients: string[];
  foodCulture: string[];
  representativeFoods: string[];
  tableScenes: CountryTableScene[];
  regionalNotes: CountryRegionalNote[];
  diningNotes: CountryDiningNote[];
  sources: SourceLink[];
  storySlugs: string[];
  recipeSlugs: string[];
  updatedAt: string;
  palette: Palette;
};

export type StorySection = {
  heading: string;
  paragraphs: string[];
};

export type Story = {
  slug: string;
  title: string;
  country: CountrySlug;
  category: StoryCategory;
  experienceStatus?: ExperienceStatus;
  summary: string;
  lead: string;
  readTime: number;
  visualLabel: string;
  visualCaption: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  sections: StorySection[];
  sources: SourceLink[];
  relatedRecipeSlugs: string[];
  palette: Palette;
};

export type IngredientGroup = {
  title: string;
  items: string[];
};

export type RecipeStep = {
  title: string;
  description: string;
  tip?: string;
};

export type Recipe = {
  domesticRegion?: string;
  localTable?: { region: string; ingredient: string; season: string; note: string };
  slug: string;
  title: string;
  country: CountrySlug;
  category: RecipeCategory;
  experienceStatus?: ExperienceStatus;
  summary: string;
  culturalNote: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  visualLabel: string;
  visualCaption: string;
  keywords: string[];
  ingredientGroups: IngredientGroup[];
  steps: RecipeStep[];
  substitutions: string[];
  tips: string[];
  publishedAt: string;
  relatedStorySlugs: string[];
  sources: SourceLink[];
  palette: Palette;
};

export const storyCategoryLabels: Record<StoryCategory, string> = {
  "food-culture": "식문화",
  "food-origin": "음식의 탄생",
  "daily-life": "일상과 식탁",
  "table-manners": "식사 방식",
  market: "시장과 거리",
  drinks: "술과 음료",
};

export const recipeCategoryLabels: Record<RecipeCategory, string> = {
  breakfast: "아침 식사",
  main: "메인 요리",
  "street-food": "시장·거리 음식",
  dessert: "디저트",
  drink: "음료",
};

export const experienceStatusLabels: Record<ExperienceStatus, string> = {
  "visit-based": "방문지 기반",
  tasted: "현지에서 맛봄",
  recreated: "직접 재현",
  researched: "자료 기반",
};

export const visitStatusLabels: Record<VisitStatus, string> = {
  "home-base": "기준 식탁",
  visited: "직접 다녀온 곳",
};

export const continentLabels: Record<Continent, string> = {
  asia: "아시아",
  europe: "유럽",
  "north-america": "북아메리카",
};

export const countries: Country[] = [
  {
    slug: "korea",
    nameKo: "한국",
    nameEn: "KOREA",
    placeType: "country",
    continent: "asia",
    visit: {
      status: "home-base",
      places: ["대한민국"],
      note: "만나의 식탁이 다른 지역의 음식을 비교하고 다시 만드는 기준점입니다.",
    },
    eyebrow: "RICE · SOUP · BANCHAN",
    headline: "밥과 국, 여러 반찬을 함께 나누는 식탁",
    summary:
      "한국의 식탁은 밥과 국, 김치와 반찬이 서로 관계를 이루는 한 상 차림을 중심으로 발전했습니다.",
    introduction: [
      "한국 음식은 한 가지 대표 메뉴만으로 설명하기 어렵습니다. 밥을 중심에 두고 국이나 찌개, 김치와 여러 반찬을 함께 놓는 구성 자체가 식사의 중요한 특징입니다.",
      "발효 장류와 저장 음식, 계절에 따라 달라지는 나물과 국물 요리는 지역과 가정의 생활방식을 보여 줍니다. 다만 오늘날의 식사는 1인 가구, 외식, 배달 문화의 영향으로 매우 다양한 형태를 갖습니다.",
    ],
    representativeFlavors: [
      "발효의 깊은 맛",
      "국물의 감칠맛",
      "매콤달콤한 양념",
    ],
    mainIngredients: ["쌀", "콩과 장류", "배추와 무", "제철 나물", "돼지고기"],
    foodCulture: [
      "한 상 차림",
      "반찬을 나누는 식사",
      "김장과 저장 음식",
      "시장 먹거리",
    ],
    representativeFoods: ["김치", "비빔밥", "불고기", "순대볶음", "수육"],
    tableScenes: [
      {
        eyebrow: "DAILY TABLE",
        title: "밥·국·반찬이 서로 역할을 나누는 한 끼",
        description:
          "밥을 중심으로 국이나 찌개, 김치와 반찬을 곁들이는 구조가 널리 알려져 있습니다. 한 접시보다 여러 맛의 관계를 읽는 것이 한국 식탁을 이해하는 출발점입니다.",
      },
      {
        eyebrow: "SEASONAL WORK",
        title: "함께 만들고 오래 두고 먹는 저장 음식",
        description:
          "김치와 장류, 말린 나물처럼 계절의 재료를 보존하는 방식은 조리 기술이면서 가족과 이웃이 노동을 나누는 문화이기도 합니다.",
      },
      {
        eyebrow: "MARKET & STREET",
        title: "장보기와 식사가 자연스럽게 이어지는 시장",
        description:
          "전통시장과 분식점에서는 떡볶이, 순대, 전, 국수처럼 빠르게 먹거나 여럿이 나눌 수 있는 음식이 일상적인 장보기 동선과 연결됩니다.",
      },
    ],
    regionalNotes: [
      {
        name: "강원 산지와 내륙",
        description:
          "산지가 많은 환경에서 메밀, 감자, 옥수수 같은 작물이 음식의 중요한 기반이 되었습니다.",
        foods: ["막국수", "감자옹심이", "메밀전"],
      },
      {
        name: "전라권의 여러 지역",
        description:
          "농수산물과 발효 재료를 폭넓게 활용하며, 지역과 계절에 따라 다양한 반찬과 해산물 음식이 발달했습니다.",
        foods: ["비빔밥", "젓갈", "남도식 해산물 음식"],
      },
      {
        name: "제주",
        description:
          "섬의 해산물과 보리, 돼지고기 등 지역에서 구할 수 있는 재료가 제주만의 식탁을 만듭니다.",
        foods: ["고기국수", "갈치 요리", "몸국"],
      },
    ],
    diningNotes: [
      {
        title: "한 상은 음식의 관계로 읽기",
        description:
          "국, 김치, 장류와 반찬은 각각 독립된 메뉴라기보다 밥과 함께 먹을 때 맛의 균형이 완성되는 경우가 많습니다.",
      },
      {
        title: "공유식과 개인식이 함께 존재하기",
        description:
          "반찬을 나누는 식사가 익숙하지만 오늘날에는 개인 접시, 1인 메뉴와 덜어 먹는 방식도 폭넓게 사용됩니다.",
      },
      {
        title: "지역과 가정의 차이를 남겨 두기",
        description:
          "같은 음식도 장의 종류와 간, 재료 손질법이 다릅니다. 하나의 조리법을 한국 전체의 유일한 방식으로 보지 않는 것이 중요합니다.",
      },
    ],
    sources: [
      {
        label: "한국관광공사 — 한국 전통 음식 안내",
        url: "https://english1.visitkorea.or.kr/enu/AKR/AK_ENG_2_3.jsp",
      },
      {
        label: "UNESCO — 김장, 김치를 담그고 나누는 문화",
        url: "https://ich.unesco.org/en/RL/kimjang-making-and-sharing-kimchi-in-the-republic-of-korea-00881",
      },
    ],
    storySlugs: ["korean-banchan-culture", "korean-market-food"],
    recipeSlugs: [
      ...chungnamRecipes.map((recipe) => recipe.slug),
      ...gangwonRecipes.map((recipe) => recipe.slug),
      ...gyeonggiRecipes.map((recipe) => recipe.slug),
      ...jejuRecipes.map((recipe) => recipe.slug),
      "osam-bulgogi",
      "korean-sundae-bokkeum",
      "club-suyuk-platter",
      "club-bean-sprout-egg-ramyeon",
    ],
    updatedAt: "2026-09-21",
    palette: {
      from: "#f1e4d6",
      mid: "#dfe8df",
      to: "#c7d7ce",
      ink: "#26342d",
    },
  },
  {
    slug: "japan",
    nameKo: "일본",
    nameEn: "JAPAN",
    placeType: "country",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["일본"],
      note: "직접 방문한 경험을 출발점으로 가정식과 이자카야의 식사 장면을 확장합니다.",
    },
    eyebrow: "SEASON · INGREDIENT · BALANCE",
    headline: "계절과 재료의 특징을 세심하게 살피는 식탁",
    summary:
      "일본의 전통적 식문화에서는 제철 재료, 조리법의 균형, 그릇과 배치를 중요하게 다루는 경향이 있습니다.",
    introduction: [
      "일본의 식문화는 쌀, 생선, 채소와 산나물 등 지역에서 얻은 재료를 활용해 왔습니다. 지역마다 기후와 생산물이 달라 향토 음식의 차이도 큽니다.",
      "가정식, 편의점 식사, 라멘 전문점, 이자카야처럼 현대 일본의 식사 공간은 매우 다양합니다. 이 페이지에서는 하나의 전형으로 단정하기보다 음식이 놓이는 상황과 지역 차이를 함께 살펴봅니다.",
    ],
    representativeFlavors: [
      "다시의 감칠맛",
      "간장과 된장의 풍미",
      "제철 재료의 담백함",
    ],
    mainIngredients: ["쌀", "생선", "다시 재료", "간장", "제철 채소"],
    foodCulture: ["와쇼쿠", "향토 음식", "이자카야", "도시형 간편식"],
    representativeFoods: ["스시", "미소시루", "오코노미야키", "라멘"],
    tableScenes: [
      {
        eyebrow: "SEASONAL TABLE",
        title: "제철 재료와 그릇으로 계절을 보여 주는 식사",
        description:
          "전통적인 와쇼쿠에서는 계절의 식재료뿐 아니라 색, 그릇과 배치까지 활용해 시기를 표현하는 경향이 있습니다.",
      },
      {
        eyebrow: "LOCAL SPECIALTY",
        title: "여행 경로가 곧 향토 음식 지도가 되는 나라",
        description:
          "기후와 생산물이 다른 지역마다 면, 초밥, 전골과 발효 음식의 형태가 달라집니다. 역 도시락과 지역 전문점도 향토 음식을 경험하는 통로입니다.",
      },
      {
        eyebrow: "AFTER WORK",
        title: "작은 요리와 술을 천천히 이어 가는 이자카야",
        description:
          "여러 종류의 안주를 나누어 주문하고 대화를 이어 가는 이자카야는 직장 모임과 친구 모임에서 볼 수 있는 현대적인 식사 장면입니다.",
      },
    ],
    regionalNotes: [
      {
        name: "홋카이도",
        description:
          "차가운 바다와 넓은 농지에서 얻은 해산물, 유제품, 감자와 옥수수 등이 지역 음식의 인상을 만듭니다.",
        foods: ["해산물 덮밥", "수프카레", "미소 라멘"],
      },
      {
        name: "간사이",
        description:
          "다시의 향과 비교적 부드러운 간을 살리는 요리, 밀가루를 활용한 대중 음식이 널리 알려져 있습니다.",
        foods: ["오코노미야키", "다코야키", "우동"],
      },
      {
        name: "규슈",
        description:
          "돼지고기와 발효 조미료, 지역별 면 요리와 닭 요리처럼 섬 안에서도 서로 다른 향토 음식이 발달했습니다.",
        foods: ["돈코츠 라멘", "미즈타키", "멘타이코"],
      },
    ],
    diningNotes: [
      {
        title: "‘와쇼쿠’와 오늘의 일본 식사를 구분하기",
        description:
          "와쇼쿠는 중요한 전통이지만 현대의 일상식은 양식, 중식, 편의점 음식과 지역 음식이 함께 섞인 매우 넓은 범위를 가집니다.",
      },
      {
        title: "젓가락 예절은 기본만 기억하기",
        description:
          "젓가락을 밥에 세워 두거나 젓가락에서 젓가락으로 음식을 건네는 행동은 피하는 것이 일반적입니다.",
      },
      {
        title: "면을 소리 내 먹는 것은 의무가 아니기",
        description:
          "면을 소리 내어 먹는 장면이 익숙한 곳도 있지만 반드시 따라야 하는 규칙은 아닙니다. 주변 분위기에 맞추면 됩니다.",
      },
    ],
    sources: [
      {
        label: "UNESCO — 와쇼쿠, 일본의 전통 식문화",
        url: "https://ich.unesco.org/en/RL/washoku-traditional-dietary-cultures-of-the-japanese-notably-for-the-celebration-of-new-year-00869",
      },
      {
        label: "일본정부관광국 — 이자카야 안내",
        url: "https://www.japan.travel/de/de/guide/izakaya-japan-essen/",
      },
    ],
    storySlugs: ["japanese-izakaya-culture"],
    recipeSlugs: ["chicken-mushroom-takikomi-gohan", "japanese-beef-bean-sprout-stir-fry"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#f2ded9",
      mid: "#ead0ca",
      to: "#d9b9b4",
      ink: "#4b2927",
    },
  },
  {
    slug: "china",
    nameKo: "중국",
    nameEn: "CHINA",
    placeType: "country",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["상하이"],
      note: "상하이 방문을 출발점으로 넓은 중국의 지역별 음식 차이를 함께 살펴봅니다.",
    },
    eyebrow: "REGION · FIRE · AROMA",
    headline: "넓은 지역만큼 다양한 재료와 조리법의 식탁",
    summary:
      "중국 음식은 지역의 기후와 산물에 따라 향신료, 기름, 발효, 불의 사용 방식이 크게 달라집니다.",
    introduction: [
      "중국의 식문화를 하나의 맛으로 묶기는 어렵습니다. 쓰촨의 복합적인 매운맛, 후난의 선명한 매운맛과 산미, 광둥의 재료 중심 조리처럼 지역별 특징이 뚜렷합니다.",
      "볶기, 찌기, 삶기, 튀기기와 같은 조리법은 같은 재료도 전혀 다른 음식으로 바꿉니다. 이 페이지에서는 특정 지역의 특징을 중국 전체의 보편적인 모습으로 확대하지 않도록 구분해 소개합니다.",
    ],
    representativeFlavors: [
      "마라의 얼얼함",
      "발효 조미료의 깊이",
      "센 불에서 만든 향",
    ],
    mainIngredients: ["쌀과 밀", "돼지고기", "두부", "채소", "향신료"],
    foodCulture: [
      "지역 요리",
      "공유하는 원형 식탁",
      "차 문화",
      "야시장과 길거리 음식",
    ],
    representativeFoods: ["마라샹궈", "훠궈", "딤섬", "면 요리"],
    tableScenes: [
      {
        eyebrow: "SHARED TABLE",
        title: "여러 요리를 가운데 놓고 각자의 그릇으로 옮기는 식사",
        description:
          "가족 식사와 모임에서는 여러 요리를 함께 주문해 나누는 장면이 흔합니다. 주식은 지역과 메뉴에 따라 밥, 면, 만터우 등으로 달라질 수 있습니다.",
      },
      {
        eyebrow: "FIRE & TECHNIQUE",
        title: "불의 세기와 조리법이 맛의 성격을 바꾸는 주방",
        description:
          "센 불의 볶음향, 약한 불로 오래 끓인 탕, 찜과 튀김처럼 조리 기술 자체가 음식의 정체성을 만드는 경우가 많습니다.",
      },
      {
        eyebrow: "TEA & SMALL BITES",
        title: "차와 작은 음식을 함께 즐기는 다양한 방식",
        description:
          "광둥권의 얌차와 딤섬부터 지역별 찻집과 간식까지 차는 식사, 휴식, 모임의 시간과 여러 방식으로 연결됩니다.",
      },
    ],
    regionalNotes: [
      {
        name: "쓰촨·충칭",
        description:
          "고추의 매운맛과 화자오의 얼얼함, 발효 조미료를 겹쳐 복합적인 향을 만드는 음식이 널리 알려져 있습니다.",
        foods: ["훠궈", "마파두부", "마라샹궈"],
      },
      {
        name: "광둥",
        description:
          "재료의 식감과 신선함을 살리는 찜과 구이, 맑은 국물과 딤섬 문화가 중요한 축을 이룹니다.",
        foods: ["딤섬", "차슈", "완탕면"],
      },
      {
        name: "장난 지역",
        description:
          "쌀과 수산물, 간장과 발효 재료를 활용하며 부드러운 단맛을 더하는 요리도 볼 수 있습니다.",
        foods: ["샤오롱바오", "홍샤오 요리", "민물고기 요리"],
      },
    ],
    diningNotes: [
      {
        title: "‘중국 음식’보다 먼저 지역 이름 보기",
        description:
          "중국은 매우 넓기 때문에 쓰촨, 광둥, 후난, 산둥처럼 지역을 함께 확인해야 맛과 조리법을 더 정확하게 이해할 수 있습니다.",
      },
      {
        title: "공유 접시와 개인 그릇의 역할 구분하기",
        description:
          "가운데 놓인 요리는 개인 그릇으로 덜어 먹는 경우가 많습니다. 식당에 공용 집게나 덜기용 젓가락이 있으면 사용하는 편이 좋습니다.",
      },
      {
        title: "매운맛을 한 단어로 묶지 않기",
        description:
          "마라, 샹라, 쏸라처럼 매운맛에 얼얼함, 향, 산미가 결합하는 방식이 다르므로 메뉴 설명을 함께 보는 것이 유용합니다.",
      },
    ],
    sources: [
      {
        label: "UNESCO 창의도시 네트워크 — 청두 미식 도시",
        url: "https://www.unesco.org/en/creative-cities/chengdu",
      },
      {
        label: "후난성 정부 — 후난 음식 문화",
        url: "https://www.enghunan.gov.cn/hneng/AboutHunan/HistoryCulture/CTC/index.html",
      },
    ],
    storySlugs: ["chinese-regional-spiciness"],
    recipeSlugs: ["mala-xiang-guo"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#efd6c0",
      mid: "#e2b596",
      to: "#cc8b6d",
      ink: "#542617",
    },
  },
  {
    slug: "hong-kong",
    nameKo: "홍콩",
    nameEn: "HONG KONG",
    placeType: "region",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["홍콩"],
      note: "차찬텡과 딤섬을 비롯한 도시의 식사 공간을 방문 경험과 연결해 기록합니다.",
    },
    eyebrow: "CANTONESE · BRITISH · CITY",
    headline: "동서양의 조리법이 빠른 도시 생활과 만난 식탁",
    summary:
      "홍콩에서는 광둥식 전통과 영국 통치기의 영향, 빠른 도시 생활이 한 메뉴판 안에서 교차합니다.",
    introduction: [
      "차찬텡에서는 밀크티, 토스트, 마카로니 수프, 면과 볶음밥을 함께 만날 수 있습니다. 서로 다른 문화권에서 시작된 재료가 홍콩의 속도와 취향에 맞게 재구성된 결과입니다.",
      "얌차와 딤섬, 광둥식 구이와 해산물 요리도 홍콩 식문화의 중요한 축입니다. 이 페이지에서는 관광용 이미지에 머물지 않고 일상적인 식사 공간과 메뉴 조합을 중심으로 살펴봅니다.",
    ],
    representativeFlavors: [
      "간장과 육수의 감칠맛",
      "차와 우유의 진한 풍미",
      "구이의 단짠 양념",
    ],
    mainIngredients: ["쌀과 면", "돼지고기", "해산물", "차", "연유와 무가당 연유"],
    foodCulture: [
      "차찬텡",
      "얌차와 딤섬",
      "도시형 아침 식사",
      "늦은 시간의 간편식",
    ],
    representativeFoods: ["딤섬", "완탕면", "마카로니 수프", "밀크티"],
    tableScenes: [
      {
        eyebrow: "MORNING RUSH",
        title: "토스트와 밀크티, 면과 수프가 함께 놓이는 아침",
        description:
          "차찬텡의 아침 메뉴는 서양식 재료와 광둥식 육수, 빠른 서비스가 한 식탁에 놓이는 홍콩의 도시성을 잘 보여 줍니다.",
      },
      {
        eyebrow: "YUM CHA",
        title: "차를 마시며 딤섬을 나누는 시간",
        description:
          "얌차에서는 차와 여러 종류의 딤섬을 주문해 함께 나눕니다. 가족 모임과 주말 식사처럼 사람을 만나는 시간이 식사의 중요한 일부가 됩니다.",
      },
      {
        eyebrow: "QUICK MEAL",
        title: "면가와 구이점에서 완성되는 빠른 한 그릇",
        description:
          "완탕면, 차슈와 거위구이 덮밥처럼 전문점의 빠른 한 끼는 밀도 높은 도시 생활 속에서 반복해 찾는 일상 음식입니다.",
      },
    ],
    regionalNotes: [
      {
        name: "차찬텡",
        description:
          "아침부터 늦은 시간까지 폭넓은 메뉴를 제공하며 홍콩식 밀크티와 토스트, 면과 볶음밥을 한곳에서 만날 수 있습니다.",
        foods: ["마카로니 수프", "홍콩식 밀크티", "프렌치토스트"],
      },
      {
        name: "딤섬 찻집",
        description:
          "차를 중심으로 찐 요리와 튀김, 구이와 디저트를 작은 접시에 나누어 주문하는 식사 공간입니다.",
        foods: ["하가우", "시우마이", "차슈바오"],
      },
      {
        name: "동네 면가와 구이점",
        description:
          "전문 메뉴를 빠르게 제공하는 작은 식당에서는 육수, 면, 구이 고기 조합으로 간결한 한 끼가 완성됩니다.",
        foods: ["완탕면", "차슈 덮밥", "거위구이"],
      },
    ],
    diningNotes: [
      {
        title: "메뉴의 혼합을 홍콩식 재해석으로 보기",
        description:
          "마카로니와 밀크티처럼 외부에서 들어온 재료도 현지의 조리법과 생활 리듬 속에서 새로운 일상 음식으로 자리 잡았습니다.",
      },
      {
        title: "차찬텡마다 대표 메뉴가 다르기",
        description:
          "차찬텡이라는 이름이 같은 메뉴 구성을 보장하지는 않습니다. 가게별 세트 메뉴와 주문 방식을 확인하는 편이 좋습니다.",
      },
      {
        title: "바쁜 시간의 합석과 빠른 회전을 이해하기",
        description:
          "인기 있는 오래된 식당에서는 합석이나 빠른 주문이 이루어질 수 있지만 모든 가게의 규칙은 아니므로 현장 안내를 따릅니다.",
      },
    ],
    sources: [
      {
        label: "홍콩관광청 — Wai Kee Noodle Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-wai-kee-noodle-cafe.html",
      },
      {
        label: "홍콩관광청 — Swiss Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-swiss-cafe.html",
      },
    ],
    storySlugs: ["hong-kong-cha-chaan-teng", "hong-kong-macaroni-soup"],
    recipeSlugs: ["hong-kong-macaroni-soup", "hong-kong-milk-tea"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#ecdac3",
      mid: "#dfcfb9",
      to: "#c8d6ca",
      ink: "#2e4137",
    },
  },
  {
    slug: "macau",
    nameKo: "마카오",
    nameEn: "MACAO",
    placeType: "region",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["마카오"],
      note: "중국 남부와 포르투갈 문화가 만난 도시의 식탁을 방문 경험에서 출발해 기록합니다.",
    },
    eyebrow: "PORTUGUESE · CANTONESE · MARITIME",
    headline: "포르투갈과 중국, 해양 교류의 흔적이 겹쳐진 식탁",
    summary:
      "마카오의 식문화에는 광둥권의 재료와 포르투갈 조리법, 항로를 따라 전해진 향신료와 제과 문화가 함께 남아 있습니다.",
    introduction: [
      "마카오 음식은 한쪽 문화가 다른 쪽을 그대로 대체한 결과라기보다, 오랜 교류 속에서 재료와 조리법이 현지 생활에 맞게 조정된 결과로 이해하는 편이 정확합니다. 다진 고기와 감자를 볶는 민치, 향신료와 코코넛 풍미가 겹치는 아프리칸 치킨처럼 여러 계보가 한 접시에 나타납니다.",
      "포르투갈식 에그타르트와 세라두라 같은 디저트는 오늘날 마카오 여행의 강한 이미지가 되었지만, 도시의 식탁은 광둥식 면과 딤섬, 동네 찻집과 가정식까지 훨씬 넓습니다. 이 페이지에서는 마카오식 음식과 포르투갈 음식을 구분하면서 서로 만나는 지점을 살펴봅니다.",
    ],
    representativeFlavors: [
      "간장과 고기의 짭짤한 감칠맛",
      "향신료와 코코넛의 따뜻한 향",
      "구운 커스터드의 진한 단맛",
    ],
    mainIngredients: ["돼지고기와 소고기", "감자", "달걀", "코코넛", "향신료"],
    foodCulture: [
      "마카오식 가정 음식",
      "포르투갈식 제과",
      "동네 찻집과 면가",
      "관광과 일상이 겹치는 음식 거리",
    ],
    representativeFoods: [
      "마카오식 민치",
      "아프리칸 치킨",
      "포르투갈식 에그타르트",
      "세라두라",
    ],
    tableScenes: [
      {
        eyebrow: "MIXED HERITAGE",
        title: "서로 다른 조리 언어가 한 가정식 안에서 만나는 장면",
        description:
          "광둥권에서 익숙한 간장과 쌀, 포르투갈식 고기 조리와 여러 항로에서 들어온 향신료가 함께 사용되며 마카오만의 가정 음식이 형성됐습니다.",
      },
      {
        eyebrow: "BAKERY STOP",
        title: "여행 동선과 일상의 간식이 겹치는 빵집",
        description:
          "에그타르트와 아몬드 쿠키 같은 제과는 관광객에게는 대표 간식이지만, 주민에게는 동네 빵집과 찻집에서 반복해 만나는 익숙한 음식이기도 합니다.",
      },
      {
        eyebrow: "SMALL CITY TABLE",
        title: "짧은 이동 안에서 광둥식과 포르투갈식을 오가는 식사",
        description:
          "도시 규모가 작아 오래된 주거지의 면가, 타이파의 음식 거리, 콜로안의 빵집과 해안 식당을 한 여행 안에서 연속적으로 경험할 수 있습니다.",
      },
    ],
    regionalNotes: [
      {
        name: "마카오 반도",
        description:
          "오래된 주거지와 상업 거리에서 광둥식 면, 죽, 찻집 음식과 마카오식 가정 요리를 폭넓게 만날 수 있습니다.",
        foods: ["완탕면", "죽과 국수", "마카오식 민치"],
      },
      {
        name: "타이파",
        description:
          "음식 거리와 옛 마을 주변에 마카오식·포르투갈식 식당과 제과점이 모여 있어 서로 다른 계보를 비교하기 좋습니다.",
        foods: ["아프리칸 치킨", "세라두라", "에그타르트"],
      },
      {
        name: "콜로안",
        description:
          "상대적으로 느린 해안 마을의 분위기 속에서 제과점과 소규모 식당을 중심으로 간식과 한 끼를 경험할 수 있습니다.",
        foods: ["포르투갈식 에그타르트", "해산물 요리", "구이 요리"],
      },
    ],
    diningNotes: [
      {
        title: "마카오식과 포르투갈식을 같은 말로 묶지 않기",
        description:
          "마카오식 음식은 현지에서 여러 문화가 결합한 별도의 계보를 가집니다. 포르투갈 본토 음식과 닮은 점이 있어도 재료와 조리 방식이 다를 수 있습니다.",
      },
      {
        title: "대표 디저트만으로 도시의 식탁을 설명하지 않기",
        description:
          "에그타르트는 강한 관광 이미지이지만 면, 죽, 딤섬, 가정식과 야식도 마카오의 일상 식문화를 이루는 중요한 축입니다.",
      },
      {
        title: "하나의 ‘정통’ 레시피보다 가정과 식당의 차이 보기",
        description:
          "민치와 아프리칸 치킨도 고기 종류, 감자 손질, 향신료 배합이 달라질 수 있습니다. 조리법이 어디에서 왔는지 함께 기록하는 편이 좋습니다.",
      },
    ],
    sources: [
      {
        label: "Macao Government Tourism Office — Macanese & Portuguese Dishes",
        url: "https://www.macaotourism.gov.mo/en/dining/taste-of-macao/macanese-and-portuguese-dishes",
      },
      {
        label: "UNESCO Creative Cities Network — Macao",
        url: "https://www.unesco.org/en/creative-cities/macao",
      },
    ],
    storySlugs: ["macau-portuguese-chinese-table", "macau-egg-tart-story"],
    recipeSlugs: ["macau-minchi", "macau-portuguese-egg-tart"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#f0dfc8",
      mid: "#e7c49d",
      to: "#c8d9d2",
      ink: "#3f3127",
    },
  },
  {
    slug: "vietnam",
    nameKo: "베트남",
    nameEn: "VIETNAM",
    placeType: "country",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["베트남"],
      note: "현지 교류와 식사 경험을 바탕으로 아침 식사, 허브와 거리 음식 문화를 살펴봅니다.",
    },
    eyebrow: "RICE · HERBS · BALANCE",
    headline: "쌀과 허브, 산미와 감칠맛이 균형을 이루는 식탁",
    summary:
      "베트남 음식은 쌀과 면, 신선한 허브, 피시소스를 바탕으로 지역별로 다른 균형을 만듭니다.",
    introduction: [
      "베트남의 북부, 중부, 남부는 기후와 역사적 교류가 달라 같은 음식도 국물, 허브, 단맛의 정도가 다르게 나타납니다.",
      "쌀국수와 반미는 아침이나 간단한 한 끼로 널리 접할 수 있지만, 모든 지역과 가정이 같은 방식으로 먹는 것은 아닙니다. 시장과 노점, 전문점, 가정식의 차이도 함께 볼 필요가 있습니다.",
    ],
    representativeFlavors: [
      "피시소스의 감칠맛",
      "라임과 식초의 산미",
      "생허브의 향",
    ],
    mainIngredients: ["쌀과 쌀국수", "피시소스", "허브", "돼지고기", "라임"],
    foodCulture: [
      "거리의 아침 식사",
      "지역별 쌀국수",
      "허브를 곁들이는 식사",
      "커피 문화",
    ],
    representativeFoods: ["퍼", "반미", "분짜", "고이꾸온"],
    tableScenes: [
      {
        eyebrow: "STREET BREAKFAST",
        title: "거리와 시장에서 빠르게 시작하는 아침",
        description:
          "퍼, 반미, 죽과 면 요리는 노점과 작은 전문점에서 아침 한 끼로 널리 만날 수 있습니다. 지역과 도시마다 대표 메뉴는 다릅니다.",
      },
      {
        eyebrow: "HERBS & CONDIMENTS",
        title: "허브와 소스로 마지막 맛을 직접 조절하는 식탁",
        description:
          "생허브, 라임, 고추와 피시소스 기반 소스를 곁들이며 한 그릇 안에서도 향과 산미, 매운맛을 개인 취향에 맞게 조절합니다.",
      },
      {
        eyebrow: "COFFEE BREAK",
        title: "진한 커피와 대화가 이어지는 도시의 휴식",
        description:
          "연유를 넣은 커피와 얼음 커피는 빠른 음료이면서도 사람들이 머물고 대화하는 카페 문화와 연결됩니다.",
      },
    ],
    regionalNotes: [
      {
        name: "북부",
        description:
          "맑은 육수와 향의 균형을 살리는 음식이 널리 알려져 있으며, 허브와 조미료를 비교적 절제해 사용하는 경향이 있습니다.",
        foods: ["퍼 박", "분짜", "짜까"],
      },
      {
        name: "중부",
        description:
          "선명한 향신료와 매운맛, 작은 접시의 섬세한 구성이 나타납니다. 후에와 꽝남의 음식은 서로 다른 특징을 지닙니다.",
        foods: ["분보후에", "미꽝", "반베오"],
      },
      {
        name: "남부",
        description:
          "풍부한 허브와 채소, 코코넛과 단맛을 활용하는 음식이 많으며 메콩델타의 농수산물이 식탁에 반영됩니다.",
        foods: ["껌땀", "후띠우", "반쎄오"],
      },
    ],
    diningNotes: [
      {
        title: "곁들임을 넣기 전에 국물부터 맛보기",
        description:
          "라임, 고추, 소스는 맛을 크게 바꿉니다. 먼저 기본 국물을 맛본 뒤 조금씩 더하면 음식의 원래 균형을 확인할 수 있습니다.",
      },
      {
        title: "피시소스도 지역과 용도에 따라 다르기",
        description:
          "찍어 먹는 느억쩜과 조리용 피시소스는 단맛, 산미와 농도가 다를 수 있으므로 하나의 맛으로 단정하기 어렵습니다.",
      },
      {
        title: "북부·중부·남부 구분은 출발점일 뿐",
        description:
          "세 지역 안에서도 도시와 민족, 가정에 따라 조리법이 달라집니다. 지역 구분은 차이를 이해하기 위한 첫 지도처럼 사용합니다.",
      },
    ],
    sources: [
      {
        label: "Vietnam Tourism — 꼭 맛봐야 할 베트남 음식",
        url: "https://beta-v2.vietnam.travel/things-to-do/21-must-try-vietnamese-dishes",
      },
      {
        label: "Vietnam Tourism — 다낭의 시장과 지역 음식",
        url: "https://vietnam.travel/things-to-do/da-nang-eat-play-relax-your-ultimate-coastal-escape",
      },
    ],
    storySlugs: ["vietnamese-breakfast-culture"],
    recipeSlugs: ["vietnamese-banh-mi"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#deead0",
      mid: "#cbdcb8",
      to: "#aec795",
      ink: "#2e4a24",
    },
  },
  {
    slug: "thailand",
    nameKo: "태국",
    nameEn: "THAILAND",
    placeType: "country",
    continent: "asia",
    visit: {
      status: "visited",
      places: ["태국"],
      note: "시장과 거리에서 만나는 한 끼를 출발점으로 지역별 향신료와 맛의 균형을 기록합니다.",
    },
    eyebrow: "HERBS · HEAT · STREET TABLE",
    headline: "허브와 산미, 매운맛이 시장의 속도와 만나는 식탁",
    summary:
      "태국 음식은 단맛·신맛·짠맛·매운맛과 향긋한 허브를 겹쳐 쓰지만, 그 비율은 지역과 음식의 역할에 따라 크게 달라집니다.",
    introduction: [
      "태국의 도시와 지역 시장에서는 국수, 볶음밥, 커리, 꼬치, 샐러드와 디저트를 짧은 시간 안에 고르고 주문할 수 있습니다. 길거리 음식은 관광용 간식만이 아니라 출근길 아침, 점심과 늦은 저녁까지 이어지는 일상적인 식사 방식의 하나입니다.",
      "다만 태국 음식을 항상 맵거나 항상 달다고 설명하면 지역 차이를 놓치기 쉽습니다. 중부의 볶음면과 커리, 이산의 찹쌀·쏨땀·구이, 남부의 해산물과 강한 향신료처럼 기후와 교류의 역사가 서로 다른 식탁을 만듭니다.",
    ],
    representativeFlavors: [
      "라임과 타마린드의 산미",
      "피시소스의 짠 감칠맛",
      "고추와 생허브의 선명한 향",
    ],
    mainIngredients: ["쌀과 쌀국수", "피시소스", "라임", "고추", "생허브"],
    foodCulture: [
      "시장과 길거리 식사",
      "즉석 볶음과 국수",
      "지역별 커리",
      "여러 접시를 나누는 식사",
    ],
    representativeFoods: ["팟타이", "쏨땀", "똠얌", "카오만가이"],
    tableScenes: [
      {
        eyebrow: "STREET MEAL",
        title: "노점과 작은 식당이 하루의 식사를 이어 주는 장면",
        description:
          "국수와 볶음 요리, 꼬치와 샐러드를 주문 즉시 조리하는 공간이 도시 생활의 식사 시간을 유연하게 만듭니다.",
      },
      {
        eyebrow: "CONDIMENT TABLE",
        title: "완성된 음식에 마지막 맛을 더하는 양념통",
        description:
          "설탕, 식초, 고춧가루, 피시소스 등을 소량 더해 개인 취향에 맞추는 장면을 볼 수 있지만 모든 음식에 같은 조미료를 넣는 것은 아닙니다.",
      },
      {
        eyebrow: "SHARED DISHES",
        title: "밥과 여러 요리를 함께 놓고 맛의 역할을 나누는 식사",
        description:
          "매운 샐러드, 볶음, 수프와 구이를 함께 주문하면 한 가지 접시보다 서로 다른 맛의 대비로 식사가 완성됩니다.",
      },
    ],
    regionalNotes: [
      {
        name: "중부와 방콕",
        description:
          "강과 도시 시장을 중심으로 쌀과 면, 볶음과 커리, 여러 지역에서 모인 음식이 함께 나타납니다.",
        foods: ["팟타이", "보트 누들", "그린 커리"],
      },
      {
        name: "이산·북동부",
        description:
          "찹쌀과 숯불구이, 산미와 매운맛이 강한 샐러드, 발효 재료를 활용하는 음식이 널리 알려져 있습니다.",
        foods: ["쏨땀", "라프", "가이양"],
      },
      {
        name: "남부",
        description:
          "해산물, 강황과 여러 향신료, 코코넛을 활용하며 지역의 무슬림·해양 교류 문화도 음식에 반영됩니다.",
        foods: ["깽솜", "마사만 커리", "로티"],
      },
    ],
    diningNotes: [
      {
        title: "매운 정도는 주문 전에 확인하기",
        description:
          "같은 메뉴명이라도 가게와 지역에 따라 고추 사용량이 크게 다를 수 있습니다. 처음에는 덜 맵게 요청하고 곁들임으로 조절하는 편이 안전합니다.",
      },
      {
        title: "단맛·신맛·짠맛을 고정 공식으로 보지 않기",
        description:
          "여러 맛을 함께 쓰는 경향은 있지만 모든 요리가 동일한 비율을 갖지는 않습니다. 음식의 종류와 지역을 함께 봐야 합니다.",
      },
      {
        title: "시장 음식도 위생과 회전율을 함께 보기",
        description:
          "재료가 덮여 있고 조리 공간이 정돈되어 있으며 손님 회전이 빠른 곳을 선택하고, 생식 재료는 보관 상태를 확인합니다.",
      },
    ],
    sources: [
      {
        label: "Tourism Authority of Thailand — Thai Foodie Map 2.0",
        url: "https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en",
      },
      {
        label: "Tourism Authority of Thailand — Signature Dishes of Buriram",
        url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-enjoy5signaturedishesofburiram",
      },
    ],
    storySlugs: ["thai-street-food-daily-life", "thai-flavor-balance"],
    recipeSlugs: ["thai-pad-thai", "thai-som-tam"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#e8dfb9",
      mid: "#cfd99f",
      to: "#a9c7a1",
      ink: "#34452c",
    },
  },
  {
    slug: "usa",
    nameKo: "미국",
    nameEn: "UNITED STATES",
    placeType: "country",
    continent: "north-america",
    visit: {
      status: "visited",
      places: ["하와이", "로스앤젤레스", "라스베이거스"],
      note: "서로 다른 세 지역의 여행 경험을 통해 미국 음식이 지역과 이민의 역사에 따라 달라지는 모습을 비교합니다.",
    },
    eyebrow: "MIGRATION · REGION · LOCAL FOOD",
    headline: "지역과 이민의 역사가 서로 다른 로컬 푸드를 만든 식탁",
    summary:
      "미국의 음식은 하나의 대표 메뉴보다 지역의 농산물, 이주 공동체, 도시의 노동과 관광 문화가 만든 수많은 로컬 푸드로 보는 편이 정확합니다.",
    introduction: [
      "미국은 지역 간 거리와 기후 차이가 매우 커 하나의 식문화로 설명하기 어렵습니다. 이번 페이지는 직접 다녀온 하와이, 로스앤젤레스와 라스베이거스를 중심으로 서로 다른 도시의 식사 장면을 비교합니다.",
      "하와이의 로컬 푸드는 원주민 하와이 문화와 여러 이주 공동체의 음식이 섬의 역사 속에서 만나 발전했고, 로스앤젤레스는 다양한 커뮤니티와 푸드트럭, 라스베이거스는 뷔페와 스테이크하우스, 셰프 레스토랑 같은 관광형 다이닝이 강한 인상을 만듭니다.",
    ],
    representativeFlavors: [
      "그릴과 로스팅의 고소한 향",
      "단짠 소스와 진한 그레이비",
      "신선한 해산물과 산뜻한 양념",
    ],
    mainIngredients: ["쌀", "소고기와 돼지고기", "해산물", "감자와 옥수수", "다양한 소스"],
    foodCulture: [
      "지역별 로컬 푸드",
      "이민 문화의 결합",
      "다이너와 푸드트럭",
      "뷔페와 엔터테인먼트형 식사",
    ],
    representativeFoods: ["로코모코", "포케", "플레이트 런치", "프렌치 딥"],
    tableScenes: [
      {
        eyebrow: "HAWAIʻI LOCAL FOOD",
        title: "밥과 여러 문화의 반찬이 한 접시에 모이는 섬의 한 끼",
        description:
          "플레이트 런치와 로코모코처럼 쌀을 중심으로 고기, 그레이비와 마카로니 샐러드를 구성하는 음식은 하와이 로컬 푸드의 혼합된 역사를 보여 줍니다.",
      },
      {
        eyebrow: "LOS ANGELES",
        title: "커뮤니티와 이동식 주방이 도시의 음식 지도를 만드는 장면",
        description:
          "멕시코계, 한인, 일본계 등 다양한 공동체의 식당과 푸드트럭이 서로 가까운 도시 안에서 독자적인 메뉴와 새로운 결합을 만듭니다.",
      },
      {
        eyebrow: "LAS VEGAS",
        title: "식사 자체가 공연과 여행 일정이 되는 도시",
        description:
          "뷔페, 스테이크하우스, 셰프 레스토랑과 테이블사이드 서비스처럼 식사가 관광과 엔터테인먼트의 일부로 설계되는 경우가 많습니다.",
      },
    ],
    regionalNotes: [
      {
        name: "하와이",
        description:
          "섬의 농수산물과 원주민 하와이 문화, 아시아·태평양 이주 공동체의 음식이 만나 독특한 로컬 푸드를 형성했습니다.",
        foods: ["로코모코", "포케", "플레이트 런치"],
      },
      {
        name: "로스앤젤레스",
        description:
          "여러 이민 공동체와 광대한 도시 구조가 지역별 식당가, 푸드트럭과 캐주얼 다이닝을 발달시켰습니다.",
        foods: ["타코", "프렌치 딥", "코리안 멕시칸 푸드"],
      },
      {
        name: "라스베이거스",
        description:
          "호텔과 공연, 관광 동선에 맞춘 대형 뷔페와 스테이크하우스, 유명 셰프 레스토랑이 도시의 식사 경험을 구성합니다.",
        foods: ["뷔페", "스테이크", "브런치 플레이트"],
      },
    ],
    diningNotes: [
      {
        title: "‘미국 음식’ 대신 도시와 지역을 함께 쓰기",
        description:
          "하와이 로컬 푸드, 남부 바비큐, 뉴잉글랜드 해산물처럼 지역 이름을 함께 표시해야 음식의 역사와 재료를 더 정확하게 설명할 수 있습니다.",
      },
      {
        title: "하와이 전통 음식과 로컬 푸드를 구분하기",
        description:
          "원주민 하와이 음식과 여러 이주 공동체의 영향으로 형성된 오늘날의 로컬 푸드는 겹치는 부분이 있지만 동일한 범주로 다루지 않는 것이 중요합니다.",
      },
      {
        title: "양과 토핑, 서비스 방식의 차이를 예상하기",
        description:
          "같은 메뉴도 지역과 매장에 따라 양과 토핑 선택이 크게 달라질 수 있습니다. 주문 전에 크기와 구성, 추가 비용을 확인합니다.",
      },
    ],
    sources: [
      {
        label: "Go Hawaiʻi — Culinary Experiences in Hawaiʻi",
        url: "https://www.gohawaii.com/culinary-experiences-in-hawaii",
      },
      {
        label: "Discover Los Angeles — 3 Days of Dining in LA",
        url: "https://www.discoverlosangeles.com/visit/3-days-of-dining-in-la",
      },
      {
        label: "Visit Las Vegas — Restaurants and Dining",
        url: "https://www.visitlasvegas.com/restaurants-and-nightlife/restaurants/",
      },
    ],
    storySlugs: ["hawaii-local-food-migration", "hawaii-plate-lunch-culture"],
    recipeSlugs: ["hawaii-loco-moco", "hawaii-poke-bowl"],
    updatedAt: "2026-09-09",
    palette: {
      from: "#d8e7e4",
      mid: "#b9d6d2",
      to: "#f0d8b5",
      ink: "#264743",
    },
  },

  {
    slug: "france",
    nameKo: "프랑스",
    nameEn: "FRANCE",
    placeType: "country",
    continent: "europe",
    visit: {
      status: "visited",
      places: ["파리"],
      note: "파리 방문 기록을 출발점으로 불랑주리, 카페와 비스트로의 일상적인 식사 장면을 정리합니다. 인스타그램 하이라이트의 사진과 실제 주문 메뉴는 개인 여행 기록으로 연결합니다.",
      sourceLabel: "manna._.project 유럽 여행 기록",
      sourceUrl: "https://www.instagram.com/manna._.project/",
    },
    eyebrow: "PARIS · BREAD · CAFÉ",
    headline: "지역의 재료와 일상의 빵, 식사의 순서를 함께 읽는 식탁",
    summary:
      "프랑스의 식문화는 하나의 고급 요리 이미지보다 지역 특산물, 계절 재료, 빵과 카페, 함께 식사하는 방식의 연결로 이해할 수 있습니다.",
    introduction: [
      "프랑스 음식은 파리의 카페와 비스트로뿐 아니라 브르타뉴, 알자스, 프로방스, 부르고뉴처럼 서로 다른 기후와 생산물이 만든 지역 요리의 집합입니다.",
      "빵과 치즈, 버터, 와인과 제철 농산물은 단순한 재료 목록이 아니라 생산지와 식사 순서를 설명하는 단서입니다. 오늘날의 일상식과 전통적인 정찬은 구분해서 살펴보는 것이 좋습니다.",
    ],
    representativeFlavors: [
      "버터와 치즈의 고소함",
      "허브와 와인의 향",
      "천천히 익힌 육수의 깊이",
    ],
    mainIngredients: ["밀과 빵", "버터와 크림", "치즈", "양파", "지역 채소"],
    foodCulture: ["불랑주리", "카페와 비스트로", "지역 특산물", "코스 식사"],
    representativeFoods: [
      "바게트",
      "크로크무슈",
      "프렌치 어니언 수프",
      "갈레트",
    ],
    tableScenes: [
      {
        eyebrow: "BOULANGERIE",
        title: "동네 빵집이 매일의 식사 동선에 들어오는 장면",
        description:
          "바게트와 비에누아즈리, 샌드위치는 아침과 간단한 점심, 장보기 동선에 자연스럽게 놓입니다. 빵집은 관광 명소이기 전에 생활권의 식품점으로 기능합니다.",
      },
      {
        eyebrow: "CAFÉ & BISTRO",
        title: "짧은 커피와 한 접시 식사가 공존하는 도시의 자리",
        description:
          "카페와 비스트로는 음료만 마시는 공간과 식사를 해결하는 공간의 경계를 넘나듭니다. 메뉴와 이용 방식은 도시와 가게에 따라 크게 달라집니다.",
      },
      {
        eyebrow: "REGIONAL TABLE",
        title: "지역 이름이 음식의 재료와 조리법을 설명하는 식탁",
        description:
          "해안, 평야, 산지와 포도 재배지에 따라 버터, 올리브오일, 해산물, 육류와 치즈의 비중이 달라집니다.",
      },
    ],
    regionalNotes: [
      {
        name: "파리와 일드프랑스",
        description:
          "카페, 비스트로, 시장과 세계 각지의 이민 음식이 한 도시권 안에서 겹쳐 보이는 지역입니다.",
        foods: ["크로크무슈", "어니언 수프", "파리식 페이스트리"],
      },
      {
        name: "브르타뉴와 대서양 연안",
        description:
          "메밀, 버터, 해산물을 활용한 음식이 지역 정체성과 연결됩니다.",
        foods: ["메밀 갈레트", "크레프", "해산물 요리"],
      },
      {
        name: "프로방스와 남부",
        description:
          "올리브오일, 토마토, 마늘과 허브를 사용하는 지중해권 조리법이 두드러집니다.",
        foods: ["라따뚜이", "부야베스", "타프나드"],
      },
    ],
    diningNotes: [
      {
        title: "프랑스 음식을 파리 음식과 동일시하지 않기",
        description:
          "지역마다 주재료와 지방 사용 방식, 치즈와 와인의 조합이 다르므로 음식 이름과 생산지를 함께 확인합니다.",
      },
      {
        title: "정찬 문화와 평일 일상식을 구분하기",
        description:
          "여러 코스로 이어지는 식사 전통이 알려져 있지만 모든 끼니가 정찬 형태인 것은 아닙니다.",
      },
      {
        title: "하이라이트 사진은 개인 기록으로 명확히 표시하기",
        description:
          "직접 촬영한 메뉴와 공식 자료로 조사한 대표 메뉴를 구분해 여행 기억과 일반 정보를 섞지 않습니다.",
      },
    ],
    sources: [
      {
        label: "France.fr — A journey to the heart of French gastronomy",
        url: "https://www.france.fr/en/",
      },
      {
        label: "UNESCO — Gastronomic meal of the French",
        url: "https://ich.unesco.org/en/RL/gastronomic-meal-of-the-french-00437",
      },
    ],
    storySlugs: [
      "paris-boulangerie-cafe-daily-life",
      "french-regional-gastronomy",
    ],
    recipeSlugs: ["french-croque-monsieur", "french-onion-soup"],
    updatedAt: "2026-09-11",
    palette: {
      from: "#ece4d5",
      mid: "#d8d9c9",
      to: "#c9d5dc",
      ink: "#2e3f4a",
    },
  },
  {
    slug: "germany",
    nameKo: "독일",
    nameEn: "GERMANY",
    placeType: "country",
    continent: "europe",
    visit: {
      status: "visited",
      places: ["슈투트가르트"],
      note: "슈투트가르트 방문 기록을 출발점으로 슈바벤 지역의 마울타셴, 슈페츨레와 빵 중심의 일상 식사를 정리합니다. 실제로 촬영한 메뉴는 인스타그램 하이라이트와 연결합니다.",
      sourceLabel: "manna._.project 유럽 여행 하이라이트",
      sourceUrl: "https://www.instagram.com/manna._.project/",
    },
    eyebrow: "STUTTGART · SWABIA · BREAD",
    headline: "슈바벤의 면과 만두, 빵과 지역 농산물이 이어지는 식탁",
    summary:
      "슈투트가르트의 식탁은 마울타셴과 슈페츨레 같은 슈바벤 향토 음식, 시장과 포도밭, 오늘날의 국제적인 도시 식문화가 함께 놓이는 공간입니다.",
    introduction: [
      "슈투트가르트는 바덴뷔르템베르크주의 중심 도시로, 슈바벤 지역의 밀가루 음식과 고기 요리, 감자와 육수를 활용한 향토 음식이 여행자의 식탁에 자주 등장합니다.",
      "독일 전체의 음식과 슈투트가르트에서 만난 지역 음식을 구분해 기록합니다. 마울타셴과 슈페츨레는 슈바벤을 설명하는 출발점이며, 빵·치즈·햄으로 구성하는 아벤트브로트는 일상 식사의 또 다른 장면입니다.",
    ],
    representativeFlavors: [
      "육수와 볶은 양파의 감칠맛",
      "달걀 반죽의 담백함",
      "식초와 겨자의 산미",
    ],
    mainIngredients: ["밀가루와 달걀", "감자", "돼지고기", "양파", "빵"],
    foodCulture: [
      "슈바벤 향토 음식",
      "마르크트할레와 시장",
      "아벤트브로트",
      "포도주와 비어가르텐",
    ],
    representativeFoods: [
      "마울타셴",
      "슈페츨레",
      "슈바벤식 감자 샐러드",
      "츠비벨로스트브라텐",
    ],
    tableScenes: [
      {
        eyebrow: "STUTTGART MARKET",
        title: "시장과 도심에서 지역 음식과 세계 음식이 함께 보이는 장면",
        description:
          "슈투트가르트 마르크트할레와 도심 식당에서는 슈바벤 향토 음식뿐 아니라 국제적인 식재료와 메뉴가 함께 보입니다. 여행 기록에는 식당 유형과 실제 주문 메뉴를 함께 남깁니다.",
      },
      {
        eyebrow: "SWABIAN DOUGH",
        title: "마울타셴과 슈페츨레가 반죽의 쓰임을 보여 주는 식탁",
        description:
          "속을 채운 큰 만두인 마울타셴과 달걀 반죽을 짧게 뽑아 익히는 슈페츨레는 같은 밀가루 재료가 서로 다른 한 끼로 발전한 사례입니다.",
      },
      {
        eyebrow: "ABENDBROT",
        title: "빵과 치즈, 햄과 피클로 간결하게 구성하는 저녁",
        description:
          "따뜻한 한 접시 대신 여러 빵과 차가운 곁들임을 놓는 아벤트브로트는 독일 일상식의 한 형태입니다. 모든 가정의 매일 저녁으로 일반화하지는 않습니다.",
      },
    ],
    regionalNotes: [
      {
        name: "슈투트가르트와 슈바벤",
        description:
          "마울타셴, 슈페츨레와 렌틸 요리처럼 반죽과 육수, 양파를 활용한 향토 음식이 지역 정체성과 연결됩니다.",
        foods: ["마울타셴", "렌틸과 슈페츨레", "츠비벨로스트브라텐"],
      },
      {
        name: "북부와 해안 지역",
        description:
          "북해와 발트해에 가까운 지역에서는 생선과 해산물이 전통 식재료로 중요한 위치를 차지합니다.",
        foods: ["피시브뢰트헨", "청어 요리", "해산물 수프"],
      },
      {
        name: "바이에른과 남동부",
        description:
          "지역 소시지, 만두류와 비어가르텐 식문화가 널리 알려져 있으며 슈바벤과도 구별되는 지역성이 있습니다.",
        foods: ["바이스부어스트", "크뇌델", "프레첼"],
      },
    ],
    diningNotes: [
      {
        title: "독일 음식과 슈바벤 음식을 구분하기",
        description:
          "마울타셴과 슈페츨레는 슈바벤 지역을 설명하는 메뉴입니다. 이를 독일 전역의 동일한 일상식으로 단정하지 않습니다.",
      },
      {
        title: "여행 사진에는 도시와 식당 유형 남기기",
        description:
          "하이라이트 사진을 사이트로 옮길 때 슈투트가르트, 시장·식당·카페 여부와 실제 주문 메뉴를 함께 기록합니다.",
      },
      {
        title: "감자 샐러드는 지역 방식 표시하기",
        description:
          "마요네즈를 쓰는 방식과 육수·식초를 쓰는 남부식 방식이 달라 레시피 제목에 슈바벤식임을 밝힙니다.",
      },
    ],
    sources: [
      {
        label: "Stuttgart Tourism — Restaurants, bars and cafés",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart",
      },
      {
        label: "Stuttgart Tourism — The culinary delights of Stuttgart",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart/schwaebische-restaurants-stuttgart",
      },
      {
        label: "Germany Travel — This is the taste of Germany",
        url: "https://www.germany.travel/en/experience-enjoy/german-cuisine.html",
      },
    ],
    storySlugs: ["stuttgart-swabian-table", "german-abendbrot-culture"],
    recipeSlugs: ["swabian-maultaschen", "swabian-potato-salad"],
    updatedAt: "2026-09-11",
    palette: {
      from: "#e7dfcf",
      mid: "#d7c7a8",
      to: "#bac8b5",
      ink: "#374032",
    },
  },
  {
    slug: "switzerland",
    nameKo: "스위스",
    nameEn: "SWITZERLAND",
    placeType: "country",
    continent: "europe",
    visit: {
      status: "visited",
      places: ["융프라우 지역"],
      note: "융프라우 지역 방문 기록을 출발점으로 산악 식당과 이동 동선에서 만나는 뢰스티, 앨플러마그로넨과 치즈 요리를 정리합니다. 현장 사진은 인스타그램 하이라이트와 연결합니다.",
      sourceLabel: "manna._.project 유럽 여행 하이라이트",
      sourceUrl: "https://www.instagram.com/manna._.project/",
    },
    eyebrow: "JUNGFRAU · ALPS · CHEESE",
    headline: "융프라우의 산악 식당과 치즈·감자 요리가 이어지는 식탁",
    summary:
      "융프라우 지역의 식탁은 알프스 이동 동선, 산장과 전망 식당, 든든한 감자·치즈 요리를 통해 산악 환경과 관광 생활권의 관계를 보여 줍니다.",
    introduction: [
      "스위스 음식은 독일어권, 프랑스어권과 이탈리아어권의 영향을 받으며 지역별로 크게 달라집니다. 융프라우가 속한 베르너 오버란트에서는 산악 관광 동선과 지역 식당에서 뢰스티, 앨플러마그로넨과 치즈 요리를 자주 만날 수 있습니다.",
      "여행지의 전망과 음식 이미지를 분리하지 않되, 관광지 메뉴가 스위스 전체 가정식을 대표한다고 단정하지 않습니다. 현장 경험과 공식 자료를 각각 표시해 기록합니다.",
    ],
    representativeFlavors: [
      "숙성 치즈의 진한 풍미",
      "감자와 빵의 담백함",
      "피클과 화이트와인의 산미",
    ],
    mainIngredients: ["지역 치즈", "감자", "빵", "우유와 크림", "말린 육류"],
    foodCulture: [
      "산악 식당",
      "치즈를 나누는 식사",
      "알프스식 한 끼",
      "언어권별 특산물",
    ],
    representativeFoods: ["뢰스티", "앨플러마그로넨", "치즈 퐁뒤", "라클렛"],
    tableScenes: [
      {
        eyebrow: "MOUNTAIN ROUTE",
        title: "열차와 케이블카 동선 사이에서 만나는 든든한 한 끼",
        description:
          "융프라우 지역의 산악 식당은 이동과 전망 감상 사이에 머무는 공간입니다. 뢰스티와 파스타·치즈 요리는 따뜻하고 에너지 밀도가 높은 식사로 제공됩니다.",
      },
      {
        eyebrow: "ALPINE PANTRY",
        title: "감자와 치즈, 말린 식품이 만드는 산악 지역의 식탁",
        description:
          "우유를 치즈로 보존하고 감자와 빵, 말린 육류를 조합하는 방식은 알프스 생활 환경과 연결되는 중요한 단서입니다.",
      },
      {
        eyebrow: "SHARED CHEESE",
        title: "한 냄비의 치즈를 함께 나누는 식사의 장면",
        description:
          "퐁뒤는 카클롱에 녹인 치즈를 두고 빵을 찍어 먹는 방식이며, 라클렛은 녹인 치즈를 감자와 피클에 얹습니다. 제공 방식의 차이도 함께 기록합니다.",
      },
    ],
    regionalNotes: [
      {
        name: "융프라우와 베르너 오버란트",
        description:
          "산악 관광과 목축 환경이 만나는 지역으로, 산장과 전망 식당에서 스위스식 감자·치즈 요리와 지역 메뉴를 접할 수 있습니다.",
        foods: ["뢰스티", "앨플러마그로넨", "치즈 퐁뒤"],
      },
      {
        name: "프랑스어권과 로망디",
        description:
          "그뤼예르와 바슈랭을 활용한 퐁뒤, 지역 소시지와 와인 문화가 이어집니다.",
        foods: ["퐁뒤 무아티에무아티에", "보주 소시지", "치즈 요리"],
      },
      {
        name: "티치노와 남부",
        description:
          "북이탈리아의 영향과 알프스 식재료가 만나 폴렌타와 리소토 등이 지역 식탁에 나타납니다.",
        foods: ["폴렌타", "리소토", "지역 치즈"],
      },
    ],
    diningNotes: [
      {
        title: "융프라우 여행 음식과 스위스 전체 식문화를 구분하기",
        description:
          "산악 관광지에서 만난 메뉴는 중요한 현장 기록이지만 다른 언어권과 도시의 식탁까지 대표하지는 않습니다.",
      },
      {
        title: "퐁뒤와 라클렛의 제공 방식 구분하기",
        description:
          "퐁뒤는 녹인 치즈 냄비에 빵을 찍고, 라클렛은 녹인 치즈를 감자와 피클 등에 얹어 먹습니다.",
      },
      {
        title: "고도와 이동 동선을 사진 설명에 남기기",
        description:
          "인스타그램 사진을 옮길 때 역·전망대·산장 등 장소 유형과 주문 메뉴를 함께 기록하면 여행 맥락이 선명해집니다.",
      },
    ],
    sources: [
      {
        label: "Jungfrau — Culinary journeys and Alpine cuisine",
        url: "https://www.jungfrau.ch/en-gb/schynige-platte/culinary-journeys/",
      },
      {
        label: "Jungfrau — Food and Drink",
        url: "https://www.jungfrau.ch/en-gb/food-drink/",
      },
      {
        label: "Switzerland Tourism — This is Swiss cuisine",
        url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/",
      },
    ],
    storySlugs: ["jungfrau-alpine-cuisine", "swiss-fondue-shared-table"],
    recipeSlugs: ["swiss-rosti", "swiss-cheese-fondue"],
    updatedAt: "2026-09-11",
    palette: {
      from: "#e8ede9",
      mid: "#d2dfd8",
      to: "#c7d3e1",
      ink: "#2d4148",
    },
  },
  {
    slug: "italy",
    nameKo: "이탈리아",
    nameEn: "ITALY",
    placeType: "country",
    continent: "europe",
    visit: {
      status: "visited",
      places: ["로마", "바티칸"],
      note: "로마와 바티칸 방문 기록을 출발점으로 지역 파스타와 카페 문화를 확장합니다. 인스타그램 하이라이트의 사진과 현장 메모는 사이트 콘텐츠의 개인 기록 축으로 연결합니다.",
      sourceLabel: "manna._.project 유럽 여행 기록",
      sourceUrl: "https://www.instagram.com/manna._.project/",
    },
    eyebrow: "REGION · SEASON · CONVIVIALITY",
    headline: "지역의 재료와 함께 식사하는 시간을 중시하는 식탁",
    summary:
      "이탈리아의 음식은 도시와 지역, 가정마다 다른 조리법을 지니며 식탁에서 나누는 시간과 긴밀하게 연결됩니다.",
    introduction: [
      "이탈리아 음식은 ‘파스타와 피자’라는 이미지보다 훨씬 넓습니다. 북부의 쌀과 버터, 중부의 밀과 육류, 남부의 토마토와 올리브오일처럼 지역 산물이 요리의 성격을 만듭니다.",
      "같은 이름의 음식도 지역과 가족에 따라 조리법이 달라질 수 있습니다. 식탁은 음식을 먹는 장소이면서 대화와 기억, 세대 간 기술 전승이 일어나는 공간으로 다뤄집니다.",
    ],
    representativeFlavors: [
      "올리브오일의 향",
      "치즈의 숙성 풍미",
      "토마토의 산미와 단맛",
    ],
    mainIngredients: ["밀과 파스타", "올리브오일", "토마토", "치즈", "지역 채소"],
    foodCulture: ["지역 요리", "가족 식사", "코스 구성", "커피와 디저트"],
    representativeFoods: [
      "카초 에 페페",
      "카르보나라",
      "리소토",
      "피자",
      "티라미수",
    ],
    tableScenes: [
      {
        eyebrow: "REGIONAL KITCHEN",
        title: "나라 이름보다 도시와 지역 이름이 먼저 나오는 음식",
        description:
          "같은 파스타도 면의 형태와 소스, 치즈가 지역에 따라 달라집니다. 음식 이름에 붙은 도시와 지역은 재료와 조리법을 읽는 중요한 단서입니다.",
      },
      {
        eyebrow: "COURSE & RHYTHM",
        title: "여러 코스로 식사의 흐름을 나누는 방식",
        description:
          "안티파스토, 프리모, 세콘도와 디저트의 구분이 알려져 있지만 모든 일상 식사가 완전한 코스로 구성되는 것은 아닙니다.",
      },
      {
        eyebrow: "BAR & COFFEE",
        title: "짧은 에스프레소 한 잔이 만드는 일상의 리듬",
        description:
          "바에 서서 빠르게 마시는 커피부터 식사 뒤의 에스프레소까지 커피는 이동과 휴식, 대화를 연결하는 일상적인 장면입니다.",
      },
    ],
    regionalNotes: [
      {
        name: "북부",
        description:
          "쌀, 폴렌타, 버터와 숙성 치즈를 활용하는 음식이 많고 알프스와 포 계곡의 환경이 지역 식재료에 반영됩니다.",
        foods: ["리소토", "폴렌타", "오소부코"],
      },
      {
        name: "로마와 라치오",
        description:
          "페코리노 로마노, 후추, 달걀과 염장육처럼 비교적 적은 재료를 조리 기술로 연결한 파스타가 로마 식탁의 중요한 축을 이룹니다.",
        foods: ["카초 에 페페", "카르보나라", "그리치아"],
      },
      {
        name: "남부와 섬",
        description:
          "듀럼밀, 토마토, 올리브오일과 해산물을 폭넓게 사용하며 풀리아, 캄파니아, 시칠리아도 서로 다른 식문화를 가집니다.",
        foods: ["오레키에테", "나폴리 피자", "아란치니"],
      },
    ],
    diningNotes: [
      {
        title: "전국 공통 레시피보다 지역 이름 확인하기",
        description:
          "같은 음식명도 지방과 가정마다 재료와 순서가 달라질 수 있습니다. 어느 지역의 방식인지 확인하면 차이를 더 잘 이해할 수 있습니다.",
      },
      {
        title: "코스는 규칙보다 식사의 구조로 이해하기",
        description:
          "정식 식사에서는 코스가 뚜렷하지만 가정의 평일 식사는 간결할 수 있습니다. 모든 끼니에 전체 코스를 기대할 필요는 없습니다.",
      },
      {
        title: "단순한 재료일수록 품질과 조리점이 중요하기",
        description:
          "재료 수가 적은 파스타와 샐러드는 소금, 익힘 정도, 올리브오일과 치즈의 선택이 완성도에 직접 영향을 줍니다.",
      },
    ],
    sources: [
      {
        label: "Italia.it — 이탈리아 지역 음식과 식탁 문화",
        url: "https://www.italia.it/it/italia/cosa-fare/cucina-italiana-patrimonio-unesco",
      },
      {
        label: "UNESCO — 지중해 식단과 공동체 문화",
        url: "https://ich.unesco.org/en/RL/mediterranean-diet-00884",
      },
      {
        label: "Turismo Roma — Spaghetti cacio e pepe",
        url: "https://www.turismoroma.it/en/1042013-spaghetti-cacio-e-pepe",
      },
    ],
    storySlugs: [
      "italian-family-table",
      "roman-pasta-simplicity",
      "rome-vatican-food-route",
    ],
    recipeSlugs: [
      "mantua-inspired-pumpkin-gnocchi",
      "italian-tiramisu",
      "roman-cacio-e-pepe",
      "roman-carbonara",
    ],
    updatedAt: "2026-09-20",
    palette: {
      from: "#e8dec8",
      mid: "#dce1ce",
      to: "#c6d4b9",
      ink: "#34432c",
    },
  },
];

export const stories: Story[] = [
  {
    slug: "hong-kong-cha-chaan-teng",
    experienceStatus: "visit-based",
    title: "차찬텡은 왜 홍콩 사람들의 일상적인 식당이 되었을까?",
    country: "hong-kong",
    category: "food-culture",
    summary:
      "밀크티와 토스트, 마카로니 수프와 볶음밥이 한 메뉴판에 놓이는 홍콩식 대중 식당의 성격을 살펴봅니다.",
    lead:
      "차찬텡은 ‘차를 파는 식당’이라는 이름보다 훨씬 넓은 역할을 합니다. 빠른 서비스와 폭넓은 메뉴, 비교적 부담 없는 한 끼가 홍콩의 도시 생활과 맞물려 만들어진 공간입니다.",
    readTime: 7,
    visualLabel: "茶餐廳",
    visualCaption: "CHA CHAAN TENG",
    keywords: ["차찬텡", "도시문화", "대중식당"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "차와 식사가 한 공간에 놓이다",
        paragraphs: [
          "차찬텡은 홍콩식 차와 간단한 식사부터 면, 밥, 샌드위치까지 폭넓게 제공하는 대중적인 식당을 가리킵니다. 홍콩관광청은 차찬텡을 빠른 서비스와 부담 없는 컴포트 푸드를 제공하는 홍콩의 상징적인 식사 경험으로 소개합니다.",
          "메뉴의 범위가 넓기 때문에 아침 식사, 점심, 간식, 늦은 시간의 한 끼처럼 여러 상황에서 이용됩니다. 다만 가게마다 대표 메뉴와 운영 방식은 상당히 다릅니다.",
        ],
      },
      {
        heading: "한 메뉴판 안의 동서양",
        paragraphs: [
          "밀크티, 프렌치토스트, 달걀 샌드위치, 마카로니는 서양식 식재료와 조리법의 흔적을 보여 줍니다. 여기에 광둥식 육수, 간장 양념, 볶음면과 덮밥이 함께 놓이면서 홍콩만의 조합이 만들어졌습니다.",
          "이러한 음식은 단순한 모방이라기보다 도시의 재료 수급과 노동 리듬, 손님의 취향에 맞게 변형된 결과로 보는 편이 정확합니다.",
        ],
      },
      {
        heading: "빠른 도시에서 반복되는 일상의 맛",
        paragraphs: [
          "차찬텡의 강점은 특별한 날의 고급 식사보다 반복해서 찾기 쉬운 익숙함에 있습니다. 주문과 식사가 빠르게 진행되고, 한 사람이 간단히 먹기에도 여럿이 여러 메뉴를 나누기에도 적합합니다.",
          "오늘날에는 오래된 인테리어를 유지하는 가게와 현대적으로 재해석한 가게가 공존합니다. 따라서 ‘전통 차찬텡’이라는 이미지도 시대와 동네에 따라 달라질 수 있습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Hong Kong Tourism Board — Wai Kee Noodle Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-wai-kee-noodle-cafe.html",
      },
      {
        label: "Hong Kong Tourism Board — Swiss Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-swiss-cafe.html",
      },
    ],
    relatedRecipeSlugs: ["hong-kong-macaroni-soup", "hong-kong-milk-tea"],
    palette: {
      from: "#edd9c1",
      mid: "#decdb8",
      to: "#cbd8cc",
      ink: "#304137",
    },
  },
  {
    slug: "hong-kong-macaroni-soup",
    experienceStatus: "visit-based",
    title: "홍콩에서는 왜 아침에 마카로니 수프를 먹을까?",
    country: "hong-kong",
    category: "food-origin",
    summary:
      "서양식 마카로니가 광둥식 국물과 햄, 달걀을 만나 차찬텡의 아침 메뉴가 된 과정을 살펴봅니다.",
    lead:
      "마카로니를 토마토소스나 치즈가 아니라 맑은 국물에 넣는 조합은 낯설 수 있습니다. 그러나 홍콩의 차찬텡에서는 빠르고 따뜻한 아침 식사를 구성하는 익숙한 선택지입니다.",
    readTime: 6,
    visualLabel: "通粉",
    visualCaption: "MACARONI SOUP",
    keywords: ["마카로니수프", "홍콩조식", "차찬텡"],
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "마카로니가 국물 요리가 되기까지",
        paragraphs: [
          "마카로니는 서양에서 들어온 식재료지만 홍콩에서는 현지의 면 요리 문법 안으로 들어왔습니다. 삶은 마카로니에 따뜻한 육수를 붓고 햄, 소시지, 달걀 같은 토핑을 더하면 짧은 시간 안에 든든한 한 그릇이 완성됩니다.",
          "정확한 ‘최초의 한 그릇’을 특정하기보다는 차찬텡이 외래 식재료를 지역의 조리 습관에 맞게 바꾸어 온 사례로 이해하는 편이 안전합니다.",
        ],
      },
      {
        heading: "아침 세트의 효율",
        paragraphs: [
          "마카로니 수프는 토스트와 달걀, 밀크티 또는 커피가 함께 나오는 세트로 접하기 쉽습니다. 탄수화물, 따뜻한 국물, 단백질을 한 번에 제공하면서도 조리와 서비스가 빠르다는 장점이 있습니다.",
          "가게에 따라 국물의 농도, 햄의 종류, 달걀 조리법이 달라 하나의 표준 레시피만 존재하는 음식은 아닙니다.",
        ],
      },
      {
        heading: "집에서 만들 때 지켜야 할 핵심",
        paragraphs: [
          "집에서는 마카로니를 따로 삶아 전분기를 줄이고, 너무 강하지 않은 닭 육수나 채소 육수를 사용하는 것이 좋습니다. 햄의 짠맛을 고려해 간은 마지막에 조절합니다.",
          "현지의 맛을 그대로 복제한다고 주장하기보다 차찬텡식 구성에서 영감을 받은 가정용 버전으로 소개하면 문화적 맥락과 레시피의 성격을 분명히 할 수 있습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Hong Kong Tourism Board — Wai Kee Noodle Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-wai-kee-noodle-cafe.html",
      },
      {
        label: "Hong Kong Tourism Board — Swiss Cafe",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-swiss-cafe.html",
      },
    ],
    relatedRecipeSlugs: ["hong-kong-macaroni-soup"],
    palette: {
      from: "#f0dfca",
      mid: "#e5cfb2",
      to: "#d4b897",
      ink: "#49321f",
    },
  },
  {
    slug: "korean-banchan-culture",
    title: "한국의 식탁에는 왜 여러 반찬이 함께 놓일까?",
    country: "korea",
    category: "food-culture",
    summary:
      "밥과 국, 김치와 반찬이 서로 역할을 나누는 한국식 한 상의 구조와 오늘날의 변화를 살펴봅니다.",
    lead:
      "한국 음식의 특징은 개별 메뉴뿐 아니라 음식들이 한 상에서 맺는 관계에도 있습니다. 밥을 중심으로 국과 반찬을 오가며 먹는 방식은 맛과 영양, 계절 재료를 한 끼 안에서 조절합니다.",
    readTime: 8,
    visualLabel: "飯床",
    visualCaption: "KOREAN TABLE",
    keywords: ["반찬문화", "한상차림", "발효음식"],
    publishedAt: "2026-09-03",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "한 그릇보다 한 상으로 이해하기",
        paragraphs: [
          "한국관광공사는 한식을 밥을 중심으로 국과 여러 반찬을 곁들이는 식사로 설명합니다. 밥의 담백함에 김치와 장아찌, 나물, 구이, 조림처럼 서로 다른 맛과 질감을 더하는 구조입니다.",
          "반찬의 수가 많아야만 한국식 식사가 되는 것은 아닙니다. 가정의 형편과 계절, 식사 목적에 따라 한두 가지 반찬만 놓이기도 하며 외식과 1인 식사에서는 구성 방식이 달라집니다.",
        ],
      },
      {
        heading: "저장과 발효가 만든 기본 맛",
        paragraphs: [
          "김치, 간장, 된장, 고추장 같은 발효 음식은 계절의 재료를 오래 활용하고 여러 요리에 깊은 맛을 더하는 역할을 해 왔습니다. 장류는 국, 찌개, 무침, 조림의 간을 연결하는 기반이 됩니다.",
          "같은 장을 사용하더라도 지역과 가정마다 염도, 숙성 기간, 배합이 달라 맛의 차이가 생깁니다.",
        ],
      },
      {
        heading: "함께 먹는 방식의 변화",
        paragraphs: [
          "여러 반찬을 가운데 두고 나누는 방식은 공동 식사의 성격을 강화하지만, 위생과 개인 취향을 고려해 개인 접시나 덜어 먹는 도구를 사용하는 경우도 늘고 있습니다.",
          "현대의 반찬 문화는 전통을 그대로 유지하는 고정된 형태라기보다 도시 생활, 배달, 간편식과 결합하며 계속 변하는 식사 시스템입니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Korea Tourism Organization — Traditional Korean Food",
        url: "https://english1.visitkorea.or.kr/enu/AKR/AK_ENG_2_3.jsp",
      },
    ],
    relatedRecipeSlugs: ["osam-bulgogi", "korean-sundae-bokkeum"],
    palette: {
      from: "#eee3d6",
      mid: "#dfe7dc",
      to: "#c8d7ce",
      ink: "#293a31",
    },
  },
  {
    slug: "japanese-izakaya-culture",
    experienceStatus: "visit-based",
    title: "일본의 이자카야에서는 왜 작은 요리를 나누어 먹을까?",
    country: "japan",
    category: "drinks",
    summary:
      "술과 함께 여러 작은 요리를 주문하는 이자카야의 구조와 주문 방식, 현대적 다양성을 알아봅니다.",
    lead:
      "이자카야는 단순히 술만 마시는 바가 아닙니다. 술의 흐름에 맞춰 구이, 튀김, 조림, 생선, 마무리 식사를 조금씩 주문하는 공간입니다.",
    readTime: 7,
    visualLabel: "居酒屋",
    visualCaption: "IZAKAYA",
    keywords: ["이자카야", "작은요리", "술문화"],
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "‘술집에 앉는다’는 이름",
        paragraphs: [
          "일본정부관광국은 이자카야라는 말이 술을 파는 가게에서 앉아 마시는 형태와 관련된다고 설명합니다. 오늘날에는 술과 함께 품질 좋은 작은 요리를 폭넓게 제공하는 식당 형태로 자리 잡았습니다.",
          "가게는 동네의 소규모 점포부터 체인점, 특정 식재료에 집중한 전문점까지 다양합니다.",
        ],
      },
      {
        heading: "한 번에 한 상보다 흐름에 따라 주문하기",
        paragraphs: [
          "차가운 전채, 회나 샐러드, 구이, 튀김, 따뜻한 조림, 밥이나 면을 순서대로 추가하는 방식이 흔합니다. 여러 사람이 작은 접시를 나누면 다양한 맛을 경험할 수 있습니다.",
          "모든 이자카야가 같은 순서나 예절을 요구하는 것은 아닙니다. 좌석료에 포함된 작은 기본 안주가 나오는 곳도 있고, 태블릿 주문이나 1인 손님 중심의 가게도 있습니다.",
        ],
      },
      {
        heading: "레시피에 적용할 때",
        paragraphs: [
          "‘이자카야 스타일’이라는 표현은 정해진 단일 레시피보다 술과 함께 먹기 좋은 크기, 강한 향과 간, 빠른 조리라는 맥락을 뜻하는 경우가 많습니다.",
          "따라서 창작 요리를 소개할 때는 전통 음식처럼 단정하지 않고 어느 조리법과 식사 상황에서 영감을 받았는지 밝히는 것이 좋습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Japan National Tourism Organization — Izakaya Guide",
        url: "https://www.japan.travel/de/de/guide/izakaya-japan-essen/",
      },
      {
        label: "UNESCO — Washoku, traditional dietary cultures of the Japanese",
        url: "https://ich.unesco.org/en/RL/washoku-traditional-dietary-cultures-of-the-japanese-notably-for-the-celebration-of-new-year-00869",
      },
    ],
    relatedRecipeSlugs: ["japanese-beef-bean-sprout-stir-fry"],
    palette: {
      from: "#ecd8d4",
      mid: "#e2c9c4",
      to: "#d2b2ad",
      ink: "#4d2927",
    },
  },
  {
    slug: "chinese-regional-spiciness",
    experienceStatus: "visit-based",
    title: "중국의 매운맛은 지역마다 어떻게 다를까?",
    country: "china",
    category: "food-culture",
    summary:
      "쓰촨의 마라와 후난의 선명한 매운맛을 비교하며 ‘중국식 매운맛’이라는 한 문장 뒤의 지역 차이를 살펴봅니다.",
    lead:
      "고추가 들어간다고 모두 같은 매운맛은 아닙니다. 향신료의 조합, 발효 재료, 산미, 기름의 사용 방식에 따라 매운맛의 방향이 달라집니다.",
    readTime: 9,
    visualLabel: "麻辣",
    visualCaption: "REGIONAL HEAT",
    keywords: ["마라", "쓰촨", "후난"],
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "쓰촨의 복합적인 맛",
        paragraphs: [
          "UNESCO 창의도시 네트워크는 청두를 쓰촨 요리의 중심지로 소개하며 단맛, 신맛, 쓴맛, 매운맛, 짠맛을 조합하는 다양한 풍미를 강조합니다.",
          "‘마라’는 화자오가 만드는 얼얼한 감각과 고추의 매운맛이 결합된 표현입니다. 두반장, 발효 콩, 향신료와 기름이 더해지면 단순히 맵기만 한 맛과 구분되는 층이 생깁니다.",
        ],
      },
      {
        heading: "후난의 매운맛과 산미",
        paragraphs: [
          "후난성 정부는 후난 요리를 뜨겁고 신맛이 나며 향이 선명한 지역 요리로 소개합니다. 생고추와 절인 고추, 훈연·절임 재료를 활용하는 방식이 쓰촨 요리와 다른 인상을 만듭니다.",
          "지역 안에서도 강과 호수, 산악 지역의 식재료와 조리법이 달라 하나의 공식으로 묶을 수 없습니다.",
        ],
      },
      {
        heading: "메뉴 이름보다 지역과 조리법 보기",
        paragraphs: [
          "한국에서 ‘마라맛’은 하나의 유행하는 양념처럼 사용되기도 하지만, 원래의 지역 요리에는 재료의 전처리와 볶는 순서, 향신료의 균형이 중요합니다.",
          "콘텐츠를 작성할 때는 ‘중국인은 매운 음식을 좋아한다’고 일반화하기보다 쓰촨, 충칭, 후난 등 구체적인 지역과 음식 이름을 함께 적는 것이 정확합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "UNESCO Creative Cities Network — Chengdu",
        url: "https://www.unesco.org/en/creative-cities/chengdu",
      },
      {
        label: "Hunan Government — Hunan Cuisine",
        url: "https://www.enghunan.gov.cn/hneng/AboutHunan/HistoryCulture/CTC/index.html",
      },
    ],
    relatedRecipeSlugs: ["mala-xiang-guo"],
    palette: {
      from: "#eccfb8",
      mid: "#dca482",
      to: "#c97d61",
      ink: "#542516",
    },
  },
  {
    slug: "vietnamese-breakfast-culture",
    experienceStatus: "visit-based",
    title: "베트남의 아침 식사는 왜 거리에서 시작될까?",
    country: "vietnam",
    category: "daily-life",
    summary:
      "쌀국수와 반미, 커피를 통해 시장과 노점, 출근길이 식탁이 되는 베트남의 아침 풍경을 살펴봅니다.",
    lead:
      "베트남의 아침 식사는 집 안에서만 이루어지지 않습니다. 이른 시간부터 문을 여는 노점과 작은 식당은 따뜻한 국수와 빠른 샌드위치를 제공하며 도시의 이동 동선과 연결됩니다.",
    readTime: 6,
    visualLabel: "BỮA SÁNG",
    visualCaption: "MORNING TABLE",
    keywords: ["아침식사", "거리음식", "쌀국수"],
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "거리에서 완성되는 한 끼",
        paragraphs: [
          "베트남 관광청은 퍼가 거리 곳곳에서 접할 수 있고 아침 식사로도 많이 먹는 음식이라고 소개합니다. 뜨거운 육수와 면을 빠르게 내는 전문점은 출근과 등교 전 식사에 잘 맞습니다.",
          "시장에서는 지역 면 요리, 죽, 찹쌀밥, 반미 등 선택지가 다양합니다. ‘베트남 사람은 모두 아침에 쌀국수를 먹는다’고 단정할 수는 없습니다.",
        ],
      },
      {
        heading: "북부와 남부의 차이",
        paragraphs: [
          "퍼는 지역에 따라 국물의 농도와 향신료, 곁들이는 허브가 달라집니다. 관광청은 북부식 퍼를 비교적 맑은 국물과 단순한 고명으로, 남부식 퍼를 다양한 생허브와 함께 먹는 형태로 설명합니다.",
          "같은 이름의 음식도 도시와 가게, 가정의 취향에 따라 달라지므로 현지식이라는 말에는 지역 정보를 덧붙이는 것이 좋습니다.",
        ],
      },
      {
        heading: "반미가 보여 주는 문화의 변형",
        paragraphs: [
          "바게트는 프랑스의 영향을 받았지만, 반미는 절인 채소와 허브, 돼지고기, 파테와 소스를 결합하며 베트남의 일상 음식으로 재구성됐습니다.",
          "한 끼가 이동 중에도 먹기 쉽고 재료 선택이 폭넓다는 점에서 도시형 거리 음식의 성격을 잘 보여 줍니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Vietnam Tourism — 21 must-try Vietnamese dishes",
        url: "https://beta-v2.vietnam.travel/things-to-do/21-must-try-vietnamese-dishes",
      },
      {
        label: "Vietnam Tourism — Da Nang local markets",
        url: "https://vietnam.travel/things-to-do/da-nang-eat-play-relax-your-ultimate-coastal-escape",
      },
    ],
    relatedRecipeSlugs: ["vietnamese-banh-mi"],
    palette: {
      from: "#dce8ce",
      mid: "#c8dab3",
      to: "#abc38f",
      ink: "#2f4925",
    },
  },
  {
    slug: "italian-family-table",
    experienceStatus: "visit-based",
    title: "이탈리아의 식탁에서 대화와 지역성은 왜 중요한가?",
    country: "italy",
    category: "table-manners",
    summary:
      "하나의 ‘이탈리아 음식’ 대신 지역과 가족마다 다른 조리법, 함께 먹는 시간의 의미를 살펴봅니다.",
    lead:
      "이탈리아의 식탁을 이해하려면 유명 메뉴 목록보다 지역의 재료와 가족의 조리 기억을 함께 봐야 합니다. 같은 음식 이름도 도시와 집에 따라 전혀 다른 모습을 가질 수 있습니다.",
    readTime: 7,
    visualLabel: "A TAVOLA",
    visualCaption: "REGION & CONVIVIALITY",
    keywords: ["지역음식", "가족식사", "함께먹기"],
    publishedAt: "2026-09-07",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "한 나라 안의 여러 식탁",
        paragraphs: [
          "이탈리아 공식 관광 사이트는 이탈리아 음식을 지역, 도시, 가족마다 다른 해석이 공존하는 모자이크로 설명합니다. 기후와 농산물, 역사적 교류가 지역 요리에 직접 반영됩니다.",
          "따라서 ‘정통 이탈리아식’이라는 표현을 사용할 때는 어느 지역의 전통인지, 현대 가정식인지, 해외에서 변형된 방식인지 구분할 필요가 있습니다.",
        ],
      },
      {
        heading: "식탁은 기술이 전해지는 장소",
        paragraphs: [
          "파스타 반죽의 수분, 소스의 농도, 남은 재료를 활용하는 방식은 계량표만으로 전달되지 않는 경우가 많습니다. 함께 만들고 먹는 과정에서 손의 감각과 순서가 세대 사이에 전해집니다.",
          "가족 식사를 낭만적인 하나의 모습으로만 그리기보다 현대의 노동시간과 도시 생활에 따라 식사 방식이 달라진다는 점도 함께 봐야 합니다.",
        ],
      },
      {
        heading: "코스보다 중요한 맥락",
        paragraphs: [
          "여러 코스로 천천히 먹는 식사는 특별한 날이나 지역 관습과 연결될 수 있지만, 일상의 모든 식사가 길고 복잡한 것은 아닙니다.",
          "핵심은 음식의 양보다 식사를 관계와 대화의 시간으로 인식하는 태도, 그리고 지역 재료와 조리법을 존중하는 방식에 있습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Italia.it — Italian cuisine, regional traditions and conviviality",
        url: "https://www.italia.it/it/italia/cosa-fare/cucina-italiana-patrimonio-unesco",
      },
    ],
    relatedRecipeSlugs: ["italian-tiramisu"],
    palette: {
      from: "#e7ddc6",
      mid: "#d9dfcb",
      to: "#c3d2b5",
      ink: "#34452d",
    },
  },
  {
    slug: "korean-market-food",
    title: "한국의 전통시장은 어떻게 하나의 식당이 되었을까?",
    country: "korea",
    category: "market",
    summary:
      "장보기와 간식, 식사가 한 공간에서 이어지는 한국 전통시장의 먹거리 문화를 살펴봅니다.",
    lead:
      "전통시장은 식재료를 사는 장소이면서 바로 조리된 음식을 먹는 장소입니다. 지역의 재료와 상인의 기술, 손님의 이동이 짧은 거리 안에서 연결됩니다.",
    readTime: 6,
    visualLabel: "市場",
    visualCaption: "MARKET FOOD",
    keywords: ["전통시장", "분식", "지역먹거리"],
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "장보기와 식사가 분리되지 않는 공간",
        paragraphs: [
          "시장에서는 채소와 고기, 건어물 같은 식재료를 사는 동선 사이에 국수, 전, 순대, 떡볶이, 지역 특산 음식을 파는 점포가 놓입니다. 손님은 장을 보다가 간식을 먹거나 한 끼를 해결할 수 있습니다.",
          "한국관광공사는 전통시장을 독특한 먹거리와 쇼핑, 사람과 문화의 교류가 결합된 관광 콘텐츠로 설명해 왔습니다.",
        ],
      },
      {
        heading: "지역마다 달라지는 대표 메뉴",
        paragraphs: [
          "통인시장의 기름떡볶이, 수원 남문시장의 통닭과 순대, 부산 시장의 당면국수와 씨앗호떡처럼 시장 음식은 지역의 재료와 방문객 흐름에 따라 달라집니다.",
          "최근에는 야시장과 청년몰, 관광형 메뉴가 늘면서 오래된 상권과 새로운 소비 방식이 함께 존재합니다.",
        ],
      },
      {
        heading: "시장 음식을 기록하는 방법",
        paragraphs: [
          "한 시장의 메뉴를 한국 전체의 전통으로 일반화하지 않고, 시장 이름과 지역, 가게의 운영 기간을 함께 기록하는 것이 좋습니다.",
          "가격과 영업시간은 자주 바뀌므로 방문 정보와 문화 설명을 분리하고, 최신 정보는 공식 채널에서 다시 확인하도록 안내해야 합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Korea Tourism Organization — Traditional market promotion material",
        url: "https://kto.visitkorea.or.kr/upload/flexer/upload/ktobiz/20180710/7b42845d-83c6-11e8-be15-b740af9dff37.hwp.files/Sections1.html",
      },
    ],
    relatedRecipeSlugs: ["korean-sundae-bokkeum"],
    palette: {
      from: "#ead9c7",
      mid: "#ddc3aa",
      to: "#cba889",
      ink: "#4a3021",
    },
  },
  {
    slug: "macau-portuguese-chinese-table",
    title: "마카오 음식에는 왜 포르투갈과 중국의 맛이 함께 담겼을까?",
    country: "macau",
    category: "food-culture",
    experienceStatus: "visit-based",
    summary:
      "광둥권의 재료와 포르투갈 조리법, 해양 교류의 향신료가 마카오의 가정식과 식당에서 만난 과정을 살펴봅니다.",
    lead:
      "마카오의 식탁은 두 나라의 음식을 단순히 반씩 섞은 모습이 아닙니다. 여러 세대가 재료를 바꾸고 조리법을 조정하며 생활 속에서 완성한 독자적인 음식 문화입니다.",
    readTime: 8,
    visualLabel: "土生菜",
    visualCaption: "MACANESE TABLE",
    keywords: ["마카오음식", "문화교류", "마카오식가정식"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "항구 도시의 부엌에서 만난 재료와 조리법",
        paragraphs: [
          "마카오는 중국 남부와 포르투갈 세계가 오랜 기간 교류한 항구 도시입니다. 광둥권에서 익숙한 쌀, 간장과 돼지고기에 포르투갈식 고기 조리, 향신료와 제과 기술이 더해지며 별도의 음식 계보가 형성됐습니다.",
          "이 과정은 한 번에 완성된 퓨전 요리가 아니라 가정과 공동체 안에서 반복해 조리되고 변형된 생활 문화로 보는 편이 정확합니다.",
        ],
      },
      {
        heading: "마카오식 음식과 포르투갈 음식의 차이",
        paragraphs: [
          "마카오에는 포르투갈 본토 요리를 제공하는 식당과 마카오에서 발전한 마카오식 음식을 제공하는 식당이 함께 있습니다. 둘은 재료와 역사에서 연결되지만 같은 범주로 단정할 수 없습니다.",
          "민치와 아프리칸 치킨처럼 마카오의 대표 음식은 간장, 감자, 코코넛과 향신료가 각기 다른 방식으로 결합합니다. 가정과 식당에 따라 배합이 달라 하나의 유일한 정답 레시피가 존재하지 않습니다.",
        ],
      },
      {
        heading: "오늘의 도시에서 이어지는 음식 유산",
        paragraphs: [
          "마카오 정부 관광청은 마카오식·포르투갈식 요리와 디저트를 도시의 주요 미식 경험으로 소개하고 있습니다. 유네스코도 마카오를 미식 창의도시 네트워크에 포함해 음식 문화가 교류와 도시 정체성에 기여하는 사례로 다룹니다.",
          "다만 방문자는 유명 디저트만 찾기보다 동네 면가, 찻집과 가정식 식당을 함께 살펴볼 때 도시의 식문화가 가진 폭을 더 잘 이해할 수 있습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Macao Government Tourism Office — Macanese & Portuguese Dishes",
        url: "https://www.macaotourism.gov.mo/en/dining/taste-of-macao/macanese-and-portuguese-dishes",
      },
      {
        label: "UNESCO Creative Cities Network — Macao",
        url: "https://www.unesco.org/en/creative-cities/macao",
      },
    ],
    relatedRecipeSlugs: ["macau-minchi", "macau-portuguese-egg-tart"],
    palette: {
      from: "#efdfca",
      mid: "#e3c39f",
      to: "#c8d7d0",
      ink: "#433226",
    },
  },
  {
    slug: "macau-egg-tart-story",
    title: "포르투갈식 에그타르트는 어떻게 마카오의 여행 음식이 되었을까?",
    country: "macau",
    category: "food-origin",
    experienceStatus: "visit-based",
    summary:
      "포르투갈 제과의 계보가 마카오의 빵집과 관광 동선 속에서 새로운 지역 이미지가 된 과정을 살펴봅니다.",
    lead:
      "겹겹의 페이스트리와 진한 커스터드, 윗면의 갈색 반점은 이제 마카오를 떠올리게 하는 강한 이미지입니다. 그러나 이 디저트의 이야기는 포르투갈의 제과 전통과 마카오의 현대적인 빵집 문화가 만나는 지점에 있습니다.",
    readTime: 7,
    visualLabel: "蛋撻",
    visualCaption: "PORTUGUESE EGG TART",
    keywords: ["에그타르트", "마카오디저트", "제과문화"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "포르투갈에서 시작된 커스터드 타르트의 계보",
        paragraphs: [
          "달걀노른자와 설탕을 활용한 포르투갈식 커스터드 제과는 수도원 제과 전통과 연결되어 알려져 있습니다. 마카오에서는 이 계보가 페이스트리 껍질과 강한 윗불로 구운 커스터드 형태로 널리 소비됐습니다.",
          "마카오 정부 관광 자료는 포르투갈식 에그타르트를 도시에서 가장 잘 알려진 디저트 가운데 하나로 소개합니다.",
        ],
      },
      {
        heading: "빵집 한 곳에서 도시 전체의 상징으로",
        paragraphs: [
          "따뜻한 타르트를 바로 먹을 수 있는 빵집과 카페가 여행 동선에 포함되면서 에그타르트는 간식이자 목적지가 되었습니다. 휴대하기 쉽고 향과 식감이 분명해 여행자의 기억에 남기 좋은 음식이라는 점도 확산에 유리했습니다.",
          "오늘날에는 여러 제과점이 서로 다른 페이스트리 층, 커스터드 농도와 굽기 정도를 내세우며 하나의 표준보다 다양한 스타일이 공존합니다.",
        ],
      },
      {
        heading: "대표 음식과 전체 식문화는 구분하기",
        paragraphs: [
          "에그타르트가 마카오 여행의 대표 이미지인 것은 분명하지만, 그것만으로 마카오의 식문화를 설명할 수는 없습니다. 광둥식 면과 딤섬, 마카오식 가정 요리와 포르투갈 식당이 함께 도시의 식탁을 이룹니다.",
          "집에서 만들 때는 현지 빵집의 정통 재현이라고 단정하기보다 냉동 페이스트리를 이용한 가정용 버전처럼 조리 조건을 분명히 밝히는 것이 좋습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Macao Government Tourism Office — Macanese & Portuguese Dishes",
        url: "https://www.macaotourism.gov.mo/en/dining/taste-of-macao/macanese-and-portuguese-dishes",
      },
      {
        label: "UNESCO Creative Cities Network — Macao",
        url: "https://www.unesco.org/en/creative-cities/macao",
      },
    ],
    relatedRecipeSlugs: ["macau-portuguese-egg-tart"],
    palette: {
      from: "#f1e1c7",
      mid: "#e8c18c",
      to: "#d59d5f",
      ink: "#4b311d",
    },
  },
  {
    slug: "hawaii-local-food-migration",
    title: "하와이의 로컬 푸드는 어떻게 여러 문화의 식탁이 되었을까?",
    country: "usa",
    category: "food-culture",
    experienceStatus: "visit-based",
    summary:
      "원주민 하와이 문화와 여러 이주 공동체의 음식이 섬의 노동과 일상 속에서 만나 로컬 푸드를 형성한 과정을 살펴봅니다.",
    lead:
      "하와이에서 ‘로컬 푸드’라고 부르는 음식은 한 문화의 전통만으로 설명하기 어렵습니다. 섬의 재료와 원주민 하와이 문화, 일본·중국·필리핀·한국·포르투갈계 공동체의 조리법이 오랜 시간 함께 놓였습니다.",
    readTime: 9,
    visualLabel: "LOCAL",
    visualCaption: "HAWAIʻI FOODWAYS",
    keywords: ["하와이", "로컬푸드", "이민문화"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "섬의 식탁에 여러 공동체가 모이다",
        paragraphs: [
          "하와이의 농장과 항구, 도시에는 다양한 지역에서 온 사람들이 함께 생활했습니다. 각 공동체가 가져온 밥, 면, 절임, 구이와 양념 방식은 서로 영향을 주고받으며 오늘날 로컬 푸드라고 불리는 조합을 만들었습니다.",
          "Go Hawaiʻi는 플레이트 런치, 로코모코, 포케, 말라사다와 셰이브 아이스 등을 섬에서 만날 수 있는 대표적인 로컬 음식 경험으로 소개합니다.",
        ],
      },
      {
        heading: "원주민 하와이 음식과 로컬 푸드 구분하기",
        paragraphs: [
          "칼루아 피그와 포이처럼 원주민 하와이 문화에 뿌리를 둔 음식과, 이주 공동체의 교류 속에서 형성된 플레이트 런치와 로코모코는 서로 연결되지만 동일한 범주가 아닙니다.",
          "사이트에서 하와이 음식을 소개할 때는 ‘하와이 전통 음식’, ‘하와이 로컬 푸드’, ‘현대적인 포케볼’처럼 맥락을 나누어 표기하는 것이 중요합니다.",
        ],
      },
      {
        heading: "오늘날의 식당과 마트에서 이어지는 혼합",
        paragraphs: [
          "로컬 식당과 푸드트럭, 마트의 포케 코너와 편의점 무스비처럼 하와이의 음식 문화는 고급 레스토랑보다 일상적인 구매 공간에서도 선명하게 드러납니다.",
          "새로운 조합이 계속 생기더라도 각 음식의 뿌리와 공동체를 함께 설명하면 단순한 ‘퓨전’이라는 말보다 더 구체적인 이야기를 전달할 수 있습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Go Hawaiʻi — Hawaiʻi Regional Cuisine",
        url: "https://www.gohawaii.com/experiences/culinary/regional-cuisine",
      },
      {
        label: "Go Hawaiʻi — Culinary Experiences in Hawaiʻi",
        url: "https://www.gohawaii.com/culinary-experiences-in-hawaii",
      },
    ],
    relatedRecipeSlugs: ["hawaii-loco-moco", "hawaii-poke-bowl"],
    palette: {
      from: "#d7e9e5",
      mid: "#b8d8d0",
      to: "#f0d2aa",
      ink: "#264640",
    },
  },
  {
    slug: "hawaii-plate-lunch-culture",
    title: "하와이 플레이트 런치에는 왜 밥과 마카로니 샐러드가 함께 놓일까?",
    country: "usa",
    category: "daily-life",
    experienceStatus: "visit-based",
    summary:
      "두 스쿱의 밥과 마카로니 샐러드, 다양한 단백질 메뉴가 한 접시에 놓이는 하와이 로컬 식사의 구조를 살펴봅니다.",
    lead:
      "플레이트 런치는 음식 몇 가지를 우연히 한 접시에 담은 메뉴가 아닙니다. 든든함과 휴대성, 여러 공동체의 입맛이 겹치며 하와이의 일상적인 한 끼가 된 조합입니다.",
    readTime: 7,
    visualLabel: "PLATE",
    visualCaption: "LOCAL LUNCH",
    keywords: ["플레이트런치", "하와이로컬", "한접시식사"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "밥 두 스쿱과 마카로니 샐러드의 기본 구조",
        paragraphs: [
          "Go Hawaiʻi는 플레이트 런치를 보통 밥, 마카로니 샐러드와 칼루아 포크, 치킨 가츠, 테리야키 비프, 생선 같은 단백질 메뉴를 조합하는 로컬 음식으로 설명합니다.",
          "밥은 소스와 고기의 짠맛을 받쳐 주고 차가운 마카로니 샐러드는 뜨거운 메인과 온도·질감의 대비를 만듭니다.",
        ],
      },
      {
        heading: "노동과 이동에 맞춘 든든한 한 끼",
        paragraphs: [
          "한 용기에 탄수화물과 단백질, 차가운 반찬을 담는 구성은 짧은 점심시간과 포장 식사에 적합합니다. 푸드트럭과 드라이브인, 작은 로컬 식당에서도 빠르게 제공할 수 있습니다.",
          "메인 메뉴가 하나로 고정되지 않기 때문에 지역과 가게의 정체성을 반영하기 쉽다는 점도 플레이트 런치의 특징입니다.",
        ],
      },
      {
        heading: "한 접시에 보이는 하와이의 문화적 층위",
        paragraphs: [
          "치킨 가츠, 갈비, 테리야키, 칼루아 포크가 같은 메뉴판에 놓이는 모습은 여러 공동체의 음식이 로컬 일상식으로 자리 잡은 과정을 보여 줍니다.",
          "집에서 재현할 때는 모든 요소를 ‘전통 하와이 음식’으로 부르기보다 하와이 로컬 플레이트의 구성에서 영감을 받은 한 접시라고 설명하는 편이 정확합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Go Hawaiʻi — Food Culture in Hawaiʻi",
        url: "https://www.gohawaii.com/kr/islands/hawaii-big-island/restaurants",
      },
      {
        label: "Go Hawaiʻi — Eating Well on a Budget",
        url: "https://www.gohawaii.com/how-to-eat-well-in-hawai%CA%BBi-without-breaking-the-budget",
      },
    ],
    relatedRecipeSlugs: ["hawaii-loco-moco"],
    palette: {
      from: "#d9ebe6",
      mid: "#c6d7ae",
      to: "#efd0a5",
      ink: "#2f493f",
    },
  },
  {
    slug: "thai-street-food-daily-life",
    title: "태국에서는 왜 길거리 음식이 일상적인 한 끼가 되었을까?",
    country: "thailand",
    category: "market",
    experienceStatus: "visit-based",
    summary:
      "국수와 볶음, 꼬치와 샐러드를 즉석에서 고르는 시장과 노점이 도시의 식사 리듬을 만드는 방식을 살펴봅니다.",
    lead:
      "태국의 길거리 음식은 여행자가 맛보는 간식에 그치지 않습니다. 출근 전 아침, 점심시간과 늦은 저녁까지 작은 노점과 시장이 일상적인 식사의 선택지가 됩니다.",
    readTime: 8,
    visualLabel: "ตลาด",
    visualCaption: "STREET TABLE",
    keywords: ["태국길거리음식", "시장", "즉석조리"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "작은 주방이 도시 곳곳에 놓이는 방식",
        paragraphs: [
          "노점과 작은 식당은 한두 가지 전문 메뉴에 집중해 빠르게 조리하고 회전시킬 수 있습니다. 국수, 볶음밥, 커리, 꼬치와 샐러드처럼 조리 방식이 분명한 음식이 짧은 주문 과정에 잘 맞습니다.",
          "관광청의 지역 음식 안내에서도 팟타이, 쏨땀, 구이와 야시장이 각 지역의 일상적인 음식 경험으로 반복해서 소개됩니다.",
        ],
      },
      {
        heading: "선택과 즉석 조절이 만드는 개인의 한 끼",
        paragraphs: [
          "면의 종류와 토핑, 고추의 양, 곁들이는 허브와 소스를 선택하면서 같은 메뉴도 개인 취향에 맞게 달라집니다. 주문 직후 조리되는 장면은 음식의 신선도와 조리법을 직접 확인하게 해 줍니다.",
          "다만 모든 노점이 같은 품질과 위생 기준을 갖는 것은 아니므로 재료 보관, 조리 공간의 청결과 손님 회전율을 함께 보는 것이 좋습니다.",
        ],
      },
      {
        heading: "시장 음식과 지역 음식의 연결",
        paragraphs: [
          "태국의 시장에서는 전국적으로 알려진 메뉴와 해당 지역의 특산 음식이 함께 판매됩니다. 한 시장 안에서도 이산식 쏨땀, 남부식 커리, 중부식 볶음면이 나란히 놓일 수 있습니다.",
          "따라서 길거리 음식이라는 형식만으로 맛을 단정하기보다 어느 지역의 조리법인지, 어떤 손님을 대상으로 하는지 함께 살펴봐야 합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Tourism Authority of Thailand — Thai Foodie Map 2.0",
        url: "https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en",
      },
      {
        label: "Tourism Authority of Thailand — Chumphon Night Market",
        url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-6-best-restaurants-in-chumphon",
      },
    ],
    relatedRecipeSlugs: ["thai-pad-thai", "thai-som-tam"],
    palette: {
      from: "#e7dfb5",
      mid: "#cfd99c",
      to: "#a8c7a0",
      ink: "#34462d",
    },
  },
  {
    slug: "thai-flavor-balance",
    title: "태국 음식은 왜 단맛·신맛·매운맛을 함께 사용할까?",
    country: "thailand",
    category: "food-culture",
    experienceStatus: "visit-based",
    summary:
      "타마린드와 라임, 피시소스, 설탕과 고추가 한 접시에서 서로 다른 역할을 나누는 방식을 살펴봅니다.",
    lead:
      "태국 음식의 맛을 ‘달고 맵다’는 두 단어로 줄이면 중요한 구조를 놓치기 쉽습니다. 산미와 짠맛, 향긋한 허브와 볶은 재료가 서로 균형을 조정하며 한 접시의 방향을 만듭니다.",
    readTime: 7,
    visualLabel: "รสชาติ",
    visualCaption: "BALANCED FLAVORS",
    keywords: ["맛의균형", "타마린드", "피시소스"],
    publishedAt: "2026-09-09",
    updatedAt: "2026-09-09",
    sections: [
      {
        heading: "맛을 더하는 재료마다 역할이 다르다",
        paragraphs: [
          "라임은 밝고 즉각적인 산미를, 타마린드는 더 둥글고 깊은 산미를 냅니다. 피시소스는 짠맛과 감칠맛을 더하고 설탕은 단맛뿐 아니라 신맛과 매운맛의 모서리를 조정합니다.",
          "고추도 생고추, 말린 고추와 볶은 고춧가루에 따라 향과 매운맛의 지속 시간이 달라집니다.",
        ],
      },
      {
        heading: "한 가지 공식보다 음식별 균형 보기",
        paragraphs: [
          "팟타이는 타마린드·피시소스·설탕의 균형이 중요하고, 쏨땀은 라임과 고추, 피시소스가 생채소의 수분과 직접 만납니다. 수프와 커리는 허브, 코코넛과 육수의 비중이 더 커집니다.",
          "따라서 모든 태국 음식에 단맛·신맛·짠맛·매운맛이 동일하게 들어간다는 공식은 실제 다양성을 설명하기 어렵습니다.",
        ],
      },
      {
        heading: "지역과 개인 취향이 마지막 맛을 바꾼다",
        paragraphs: [
          "이산의 샐러드와 남부의 커리, 중부의 면 요리는 사용하는 발효 재료와 허브, 매운 정도가 다릅니다. 같은 메뉴도 식당과 가정마다 비율이 달라질 수 있습니다.",
          "집에서 만들 때는 소스를 한 번에 모두 넣기보다 산미, 짠맛, 단맛 순으로 조금씩 조정하고 마지막에 매운맛을 맞추는 편이 실패를 줄입니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Tourism Authority of Thailand — Thai Foodie Map 2.0",
        url: "https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en",
      },
      {
        label: "Tourism Authority of Thailand — Signature Dishes of Buriram",
        url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-enjoy5signaturedishesofburiram",
      },
    ],
    relatedRecipeSlugs: ["thai-pad-thai", "thai-som-tam"],
    palette: {
      from: "#ece0b8",
      mid: "#d9c784",
      to: "#a8c49a",
      ink: "#3c4526",
    },
  },

  {
    slug: "paris-boulangerie-cafe-daily-life",
    experienceStatus: "visit-based",
    title: "파리에서는 왜 빵집과 카페가 일상의 식탁이 되었을까?",
    country: "france",
    category: "daily-life",
    summary:
      "불랑주리와 카페가 아침, 장보기, 짧은 휴식과 간단한 식사를 어떻게 연결하는지 살펴봅니다.",
    lead:
      "프랑스의 빵집과 카페는 여행자의 사진 속 배경이기 전에 주민의 생활 동선에 들어가는 공간입니다. 빵을 사고, 커피를 마시고, 가벼운 한 끼를 해결하는 여러 기능이 도시와 동네마다 다르게 겹칩니다.",
    readTime: 7,
    visualLabel: "BOULANGERIE",
    visualCaption: "PARIS · BREAD · DAILY LIFE",
    keywords: ["파리", "불랑주리", "카페"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "빵집은 식사의 출발점이다",
        paragraphs: [
          "바게트와 크루아상, 샌드위치는 아침과 점심, 장보기 동선에 자연스럽게 들어옵니다. 가게의 규모와 지역에 따라 판매 품목은 달라지지만 빵을 일상적으로 구매하는 공간이라는 성격은 중요한 출발점입니다.",
          "사이트에서는 직접 촬영한 빵집과 메뉴 사진을 개인 여행 기록으로 표시하고, 프랑스 전체의 일반적인 모습으로 확대 해석하지 않습니다.",
        ],
      },
      {
        heading: "카페는 머무는 시간과 이동 시간을 모두 담는다",
        paragraphs: [
          "짧게 에스프레소를 마시는 이용 방식과 테라스에 앉아 대화를 나누는 방식이 함께 존재합니다. 카페마다 식사 메뉴의 폭과 이용 시간이 다르므로 하나의 규칙으로 단정하기 어렵습니다.",
          "여행 하이라이트의 장소 사진은 그날의 경험을 설명하고, 문화 설명은 공식 자료와 별도로 근거를 표시하는 방식이 적절합니다.",
        ],
      },
      {
        heading: "관광 이미지와 생활 공간을 구분한다",
        paragraphs: [
          "유명한 카페나 페이스트리는 프랑스 식문화의 일부이지만 주민의 모든 식사를 대표하지는 않습니다. 슈퍼마켓, 시장, 구내식당과 가정식도 함께 보아야 일상의 식탁이 보입니다.",
        ],
      },
    ],
    sources: [
      {
        label: "France.fr — A journey to the heart of French gastronomy",
        url: "https://www.france.fr/en/",
      },
    ],
    relatedRecipeSlugs: ["french-croque-monsieur", "french-onion-soup"],
    palette: {
      from: "#eee5d8",
      mid: "#ddd3c4",
      to: "#ccd7dc",
      ink: "#334750",
    },
  },
  {
    slug: "french-regional-gastronomy",
    experienceStatus: "visit-based",
    title: "프랑스 음식에는 왜 지역 이름과 생산지가 중요할까?",
    country: "france",
    category: "food-culture",
    summary:
      "기후와 농산물, 해안과 산지가 프랑스의 지역별 음식과 조리 지방을 어떻게 나누는지 살펴봅니다.",
    lead:
      "프랑스 요리는 한 나라의 단일한 조리법보다 지역 생산물과 기술의 집합으로 보는 편이 정확합니다. 버터를 많이 쓰는 지역과 올리브오일이 중심인 지역, 해산물과 육류가 강한 지역이 서로 다릅니다.",
    readTime: 8,
    visualLabel: "TERROIR",
    visualCaption: "REGION & PRODUCE",
    keywords: ["테루아", "지역요리", "제철재료"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "지역의 재료가 요리의 방향을 만든다",
        paragraphs: [
          "프랑스 공식 관광 자료는 지역 특산물과 계절 음식, 생산자와 조리 기술을 프랑스 미식의 핵심 요소로 소개합니다. 바다와 평야, 산지와 포도 재배지는 사용되는 지방과 향신료, 저장 방식에 영향을 줍니다.",
          "따라서 음식 이름을 볼 때는 어느 지역의 조리법인지 함께 확인하는 것이 좋습니다.",
        ],
      },
      {
        heading: "같은 재료도 지역에 따라 다른 식사가 된다",
        paragraphs: [
          "메밀은 브르타뉴의 갈레트로, 토마토와 허브는 남부의 채소 요리로, 양파와 치즈는 도시의 수프와 그라탱으로 서로 다르게 나타납니다.",
          "이 차이를 살리기 위해 레시피에는 지역 스타일과 한국에서 사용한 대체 재료를 함께 표시합니다.",
        ],
      },
      {
        heading: "미식은 음식뿐 아니라 식사 방식도 포함한다",
        paragraphs: [
          "UNESCO가 등재한 프랑스인의 미식적 식사는 특별한 날에 사람들이 모여 순서와 조합을 고려해 식사를 나누는 사회적 관습을 다룹니다. 이를 매일의 식사 전체와 동일시하지 않는 구분이 필요합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "France.fr — French gastronomy and regional specialities",
        url: "https://www.france.fr/en/",
      },
      {
        label: "UNESCO — Gastronomic meal of the French",
        url: "https://ich.unesco.org/en/RL/gastronomic-meal-of-the-french-00437",
      },
    ],
    relatedRecipeSlugs: ["french-croque-monsieur", "french-onion-soup"],
    palette: {
      from: "#e9e1d1",
      mid: "#d5d9c8",
      to: "#becfd8",
      ink: "#30454f",
    },
  },
  {
    slug: "stuttgart-swabian-table",
    experienceStatus: "visit-based",
    title: "슈투트가르트의 식탁은 왜 마울타셴과 슈페츨레로 기억될까?",
    country: "germany",
    category: "food-culture",
    summary:
      "슈바벤 지역의 반죽 음식과 시장·포도밭이 슈투트가르트의 식문화에 어떻게 연결되는지 살펴봅니다.",
    lead:
      "슈투트가르트는 자동차 도시의 이미지가 강하지만, 식탁에서는 마울타셴과 슈페츨레, 렌틸 요리와 양파를 활용한 슈바벤 음식이 지역성을 드러냅니다. 도시의 시장과 국제적인 외식 문화도 함께 보아야 현재의 식탁이 보입니다.",
    readTime: 8,
    visualLabel: "SCHWABEN",
    visualCaption: "STUTTGART TABLE",
    keywords: ["슈투트가르트", "슈바벤", "마울타셴"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "슈투트가르트는 슈바벤 식문화권에 놓인다",
        paragraphs: [
          "슈투트가르트 관광청은 슈페츨레와 마울타셴, 양파 타르트 등을 지역에서 경험할 음식으로 소개합니다. 도시 이름과 지역 음식권을 함께 적으면 독일 전체와 슈바벤의 차이를 구분할 수 있습니다.",
          "인스타그램 하이라이트에서 확인되는 장소와 메뉴는 방문 기록으로 표시하고, 지역 문화 설명은 공식 관광 자료를 근거로 별도 정리합니다.",
        ],
      },
      {
        heading: "마울타셴과 슈페츨레는 반죽을 다르게 사용하는 음식이다",
        paragraphs: [
          "마울타셴은 반죽 안에 고기와 채소 등을 채워 육수에 익히거나 볶아 먹는 큰 만두이고, 슈페츨레는 달걀 반죽을 짧은 면처럼 익혀 소스가 있는 고기 요리의 곁들임이나 치즈 요리로 사용합니다.",
          "두 음식 모두 ‘독일 면’으로 묶기보다 조리법과 식사의 역할을 구분해 기록합니다.",
        ],
      },
      {
        heading: "시장과 포도밭이 현재의 도시 식탁을 넓힌다",
        paragraphs: [
          "슈투트가르트는 시장과 와인 문화, 세계 여러 지역의 음식이 함께 존재하는 도시입니다. 향토 음식만으로 현재의 주민 식생활 전체를 설명하지 않고 여행자가 실제로 본 장면을 구체적으로 남깁니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Stuttgart Tourism — Restaurants, bars and cafés",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart",
      },
      {
        label: "Stuttgart Tourism — The culinary delights of Stuttgart",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart/schwaebische-restaurants-stuttgart",
      },
    ],
    relatedRecipeSlugs: ["swabian-maultaschen", "swabian-potato-salad"],
    palette: {
      from: "#e7dfd0",
      mid: "#dbc8a9",
      to: "#bdc9b6",
      ink: "#384235",
    },
  },
  {
    slug: "german-abendbrot-culture",
    experienceStatus: "visit-based",
    title: "독일의 아벤트브로트는 왜 빵 중심의 저녁 식사가 되었을까?",
    country: "germany",
    category: "daily-life",
    summary:
      "빵과 치즈, 햄과 피클을 놓는 간결한 저녁 식사가 어떤 생활 리듬과 연결되는지 살펴봅니다.",
    lead:
      "아벤트브로트는 문자 그대로 ‘저녁 빵’을 뜻합니다. 다양한 빵에 햄, 치즈, 절임 채소와 신선한 채소를 곁들이는 방식은 독일 일상 식사의 한 형태로 알려져 있습니다.",
    readTime: 6,
    visualLabel: "ABENDBROT",
    visualCaption: "BREAD AT NIGHT",
    keywords: ["아벤트브로트", "빵문화", "일상식"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "따뜻한 요리 대신 차가운 식탁을 구성한다",
        paragraphs: [
          "여러 종류의 빵과 콜드컷, 치즈, 피클과 채소를 놓으면 각자가 원하는 조합을 만들 수 있습니다. 준비 시간이 짧고 남은 재료를 조합하기 쉽다는 실용적인 장점도 있습니다.",
        ],
      },
      {
        heading: "빵의 다양성이 식사의 폭을 넓힌다",
        paragraphs: [
          "호밀과 통곡물, 씨앗을 넣은 빵부터 부드러운 롤까지 빵의 질감과 산미가 곁들임 선택을 바꿉니다. 독일관광청은 Brotzeit와 Abendbrot를 빵, 햄, 치즈와 채소가 함께 놓이는 전통으로 설명합니다.",
        ],
      },
      {
        heading: "모든 가정의 매일 저녁은 아니다",
        paragraphs: [
          "오늘날에는 따뜻한 저녁, 외식과 국제적인 음식도 일반적입니다. 아벤트브로트는 독일 식사의 중요한 사례이지만 보편적이고 고정된 규칙으로 설명하지 않습니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Germany Travel — Brotzeit and Abendbrot",
        url: "https://www.germany.travel/en/experience-enjoy/german-cuisine.html",
      },
    ],
    relatedRecipeSlugs: ["swabian-potato-salad", "swabian-maultaschen"],
    palette: {
      from: "#eee5d7",
      mid: "#ddccb4",
      to: "#c8d0bf",
      ink: "#3d4034",
    },
  },
  {
    slug: "jungfrau-alpine-cuisine",
    experienceStatus: "visit-based",
    title: "융프라우 지역의 산악 식탁에는 왜 뢰스티와 치즈 요리가 많을까?",
    country: "switzerland",
    category: "food-culture",
    summary:
      "열차와 케이블카 이동 동선, 산악 식당과 알프스 환경이 든든한 감자·치즈 요리와 어떻게 연결되는지 살펴봅니다.",
    lead:
      "융프라우 지역에서는 전망과 이동 자체가 식사의 맥락이 됩니다. 산악 식당의 뢰스티, 앨플러마그로넨과 치즈 요리는 관광 메뉴이면서 알프스의 저장 식품과 에너지 밀도가 높은 한 끼를 보여 주는 단서입니다.",
    readTime: 8,
    visualLabel: "JUNGFRAU",
    visualCaption: "ALPINE TABLE",
    keywords: ["융프라우", "산악식당", "뢰스티"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "산악 이동 동선이 식사 공간을 만든다",
        paragraphs: [
          "융프라우 철도와 케이블카 주변의 식당은 이동 중 쉬고 체온과 에너지를 보충하는 공간입니다. 전망대와 산장, 역 주변 식당에서 제공되는 메뉴는 장소의 고도와 이용 방식에 영향을 받습니다.",
          "Jungfrau 공식 사이트는 지역 식당에서 뢰스티 변형, 앨플러마그로넨과 든든한 육류 요리 같은 스위스 전통 메뉴를 소개합니다.",
        ],
      },
      {
        heading: "감자와 치즈는 든든함과 보존성을 함께 가진다",
        paragraphs: [
          "감자와 숙성 치즈, 빵과 말린 육류는 산악 환경과 연결해 이해할 수 있는 재료입니다. 다만 오늘날 산악 식당에는 국제적인 메뉴도 함께 있어 과거의 생활식과 관광 서비스를 구분해야 합니다.",
        ],
      },
      {
        heading: "사진에는 전망뿐 아니라 메뉴와 장소 유형을 남긴다",
        paragraphs: [
          "인스타그램 하이라이트를 웹사이트에 연결할 때 촬영 지점, 식당 유형, 실제 주문 메뉴와 맛의 인상을 함께 기록합니다. 메뉴가 불확실하면 대표 음식으로 단정하지 않고 확인 전 상태로 둡니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Jungfrau — Culinary journeys and Alpine cuisine",
        url: "https://www.jungfrau.ch/en-gb/schynige-platte/culinary-journeys/",
      },
      {
        label: "Jungfrau — Food and Drink",
        url: "https://www.jungfrau.ch/en-gb/food-drink/",
      },
      {
        label: "Switzerland Tourism — This is Swiss cuisine",
        url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/",
      },
    ],
    relatedRecipeSlugs: ["swiss-rosti", "swiss-cheese-fondue"],
    palette: {
      from: "#e7ece8",
      mid: "#d4dfd7",
      to: "#c3d2df",
      ink: "#30464d",
    },
  },
  {
    slug: "swiss-fondue-shared-table",
    experienceStatus: "visit-based",
    title: "스위스 퐁뒤는 왜 함께 나누는 식사가 되었을까?",
    country: "switzerland",
    category: "food-culture",
    summary:
      "카클롱 한가운데 녹인 치즈를 두고 빵을 찍어 먹는 제공 방식과 식사의 관계를 살펴봅니다.",
    lead:
      "치즈 퐁뒤는 녹인 치즈의 맛만큼 한 냄비를 공유하는 방식이 중요합니다. 각자가 긴 포크로 빵을 찍어 먹으며 식사의 속도와 대화가 자연스럽게 이어집니다.",
    readTime: 6,
    visualLabel: "FONDUE",
    visualCaption: "SHARED CHEESE POT",
    keywords: ["퐁뒤", "공유식탁", "치즈"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "카클롱을 식탁 가운데 놓는다",
        paragraphs: [
          "스위스관광청은 치즈 퐁뒤를 카클롱이라 부르는 냄비에 녹인 치즈를 담고 빵 조각을 포크에 꽂아 돌려 먹는 음식으로 설명합니다.",
          "한 사람이 완성된 접시를 받는 방식과 달리 식탁 위에서 조리가 유지되고 모두가 같은 냄비에 참여합니다.",
        ],
      },
      {
        heading: "치즈 조합은 지역과 가정에 따라 달라진다",
        paragraphs: [
          "로망디에서는 그뤼예르와 바슈랭을 반씩 섞는 무아티에무아티에가 알려져 있습니다. 다른 지역과 제품에서는 에멘탈이나 다른 산악 치즈를 조합할 수 있습니다.",
        ],
      },
      {
        heading: "라클렛과 제공 방식을 구분한다",
        paragraphs: [
          "라클렛은 녹인 치즈를 감자, 피클과 양파 등에 얹어 먹는 음식입니다. 둘 다 치즈 중심의 공동 식사지만 조리 도구와 먹는 방식이 다릅니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Switzerland Tourism — Cheese fondue and raclette",
        url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/",
      },
    ],
    relatedRecipeSlugs: ["swiss-cheese-fondue", "swiss-rosti"],
    palette: {
      from: "#f0ead8",
      mid: "#e3d6b8",
      to: "#cad9d6",
      ink: "#3f493c",
    },
  },
  {
    slug: "roman-pasta-simplicity",
    experienceStatus: "visit-based",
    title: "로마 파스타는 왜 적은 재료로도 강한 맛을 낼까?",
    country: "italy",
    category: "food-culture",
    summary:
      "페코리노 로마노, 후추, 달걀과 염장육을 조리 기술로 연결하는 로마 파스타의 구조를 살펴봅니다.",
    lead:
      "카초 에 페페, 그리치아, 카르보나라와 아마트리치아나는 서로 다른 파스타지만 몇 가지 핵심 재료를 공유합니다. 적은 재료를 유화와 익힘 조절로 완성하는 기술이 맛의 중심입니다.",
    readTime: 8,
    visualLabel: "PASTA ROMANA",
    visualCaption: "ROME IN A BOWL",
    keywords: ["로마파스타", "페코리노", "유화"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "치즈와 전분물이 소스를 만든다",
        paragraphs: [
          "로마 관광청의 카초 에 페페 조리법은 삶은 면에 치즈를 단순히 뿌리는 대신 전분이 든 면수를 페코리노와 섞어 크림 같은 질감을 만드는 과정을 핵심으로 설명합니다.",
          "온도가 너무 높으면 치즈가 뭉치므로 불에서 내린 뒤 빠르게 섞는 조절이 중요합니다.",
        ],
      },
      {
        heading: "비슷한 재료가 다른 파스타로 분기한다",
        paragraphs: [
          "카초 에 페페는 치즈와 후추, 그리치아는 여기에 구안찰레, 카르보나라는 달걀, 아마트리치아나는 토마토가 더해지는 식으로 구조를 비교할 수 있습니다.",
          "다만 기원과 정통성에 관한 설명은 자료마다 차이가 있어 단정적인 한 문장보다 조리 구조에 집중합니다.",
        ],
      },
      {
        heading: "로마 방문 기록과 레시피를 분리해 연결한다",
        paragraphs: [
          "바티칸과 로마에서 촬영한 식당과 메뉴 사진은 개인 경험으로, 레시피의 재료와 조리 원리는 공식 관광 자료와 별도로 표시합니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Turismo Roma — Spaghetti cacio e pepe",
        url: "https://www.turismoroma.it/en/1042013-spaghetti-cacio-e-pepe",
      },
    ],
    relatedRecipeSlugs: ["roman-cacio-e-pepe", "roman-carbonara"],
    palette: {
      from: "#eee2c8",
      mid: "#dfc89f",
      to: "#c8d5bd",
      ink: "#4b432a",
    },
  },
  {
    slug: "rome-vatican-food-route",
    experienceStatus: "visit-based",
    title: "바티칸 방문 동선의 식탁은 왜 로마 음식과 이어질까?",
    country: "italy",
    category: "daily-life",
    summary:
      "바티칸 방문 기록을 별도의 ‘바티칸 요리’로 과장하지 않고 로마와 라치오의 식사 맥락 속에서 읽습니다.",
    lead:
      "바티칸은 독립된 국가이지만 여행자가 실제로 식사하는 동선은 주변 로마 시내와 긴밀하게 이어집니다. 따라서 이 콘텐츠는 바티칸만의 대표 요리를 만들어 내기보다 로마 지역의 카페, 트라토리아와 파스타를 중심으로 구성합니다.",
    readTime: 7,
    visualLabel: "ROMA · VATICANO",
    visualCaption: "TRAVEL FOOD ROUTE",
    keywords: ["바티칸", "로마", "여행동선"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-11",
    sections: [
      {
        heading: "국가 경계와 식사 생활권은 다르게 보일 수 있다",
        paragraphs: [
          "바티칸 박물관과 성베드로 대성당을 방문한 뒤의 식사는 주변 로마의 상권과 교통 동선에서 이루어지는 경우가 많습니다. 이 때문에 여행 사진 속 음식은 로마 또는 라치오의 식문화로 분류하는 편이 정확합니다.",
        ],
      },
      {
        heading: "여행 기록에는 장소와 음식의 관계를 남긴다",
        paragraphs: [
          "하이라이트 사진을 옮길 때 촬영 장소, 식당 유형, 실제 주문 메뉴를 함께 기록합니다. 기억이 불확실한 메뉴는 대표 음식으로 단정하지 않고 ‘추가 확인 필요’ 상태로 둡니다.",
        ],
      },
      {
        heading: "로마 음식으로 이어지는 탐색 경로를 만든다",
        paragraphs: [
          "여행 동선 콘텐츠에서 로마 파스타 이야기, 카초 에 페페와 카르보나라 레시피로 이어지도록 연결하면 개인 기록과 문화 자료가 자연스럽게 결합됩니다.",
        ],
      },
    ],
    sources: [
      {
        label: "Turismo Roma — Food and Wine",
        url: "https://www.turismoroma.it/en/taxonomy/term/54",
      },
      {
        label: "Vatican Museums — Official website",
        url: "https://www.museivaticani.va/",
      },
    ],
    relatedRecipeSlugs: ["roman-cacio-e-pepe", "roman-carbonara"],
    palette: {
      from: "#ebe0cd",
      mid: "#d8c6ac",
      to: "#cad4c5",
      ink: "#464335",
    },
  },
];

export const recipes: Recipe[] = [
  ...chungnamRecipes,
  ...gangwonRecipes,
  ...gyeonggiRecipes,
  ...jejuRecipes,
  ...dailyRecipes,
  ...steakRecipes,
  {
    slug: "hong-kong-macaroni-soup",
    experienceStatus: "researched",
    title: "홍콩식 마카로니 수프",
    country: "hong-kong",
    category: "breakfast",
    summary:
      "부드러운 마카로니와 햄, 달걀을 담백한 국물에 담아 내는 차찬텡식 아침 메뉴의 가정용 버전입니다.",
    culturalNote:
      "서양에서 들어온 마카로니가 홍콩의 면 요리 방식과 차찬텡 문화 속에서 변형된 사례입니다. 가게마다 육수와 토핑이 다르므로 아래 조리법은 하나의 표준이 아니라 집에서 재현하기 쉬운 버전입니다.",
    cookingTime: 25,
    difficulty: "쉬움",
    servings: 2,
    visualLabel: "通粉",
    visualCaption: "MACARONI SOUP",
    keywords: ["홍콩조식", "차찬텡", "한그릇요리"],
    ingredientGroups: [
      {
        title: "수프와 마카로니",
        items: [
          "엘보 마카로니 120g",
          "저염 닭 육수 또는 채소 육수 700ml",
          "슬라이스 햄 100g",
          "냉동 옥수수 50g(선택)",
          "진간장 1작은술",
          "흰후추 약간",
        ],
      },
      {
        title: "마무리",
        items: ["달걀 2개", "대파 또는 쪽파 1큰술", "식용유 1작은술"],
      },
    ],
    steps: [
      {
        title: "마카로니 삶기",
        description:
          "끓는 소금물에 마카로니를 포장지 권장 시간보다 1분 짧게 삶습니다. 체에 밭쳐 전분기를 가볍게 씻어 둡니다.",
        tip: "마카로니를 국물에서 처음부터 삶으면 국물이 지나치게 탁하고 걸쭉해질 수 있습니다.",
      },
      {
        title: "국물 끓이기",
        description:
          "냄비에 육수를 끓인 뒤 한입 크기로 자른 햄과 옥수수를 넣고 3분간 끓입니다. 간장과 흰후추로 간합니다.",
      },
      {
        title: "마카로니 데우기",
        description:
          "삶아 둔 마카로니를 국물에 넣고 1~2분 더 끓여 온도를 맞춥니다.",
      },
      {
        title: "달걀과 함께 담기",
        description:
          "팬에 달걀을 반숙으로 부치거나 국물에 직접 익힙니다. 그릇에 수프를 나누고 달걀과 파를 올립니다.",
      },
    ],
    substitutions: [
      "햄 대신 닭가슴살, 소시지 또는 구운 버섯을 사용할 수 있습니다.",
      "닭 육수 대신 다시마 채소 육수를 쓰면 고기 없이 만들 수 있습니다.",
    ],
    tips: [
      "햄과 육수의 염도가 높을 수 있으므로 소금은 마지막에만 추가합니다.",
      "남은 마카로니는 국물을 흡수하므로 보관할 때는 국물과 면을 분리합니다.",
    ],
    publishedAt: "2026-09-01",
    relatedStorySlugs: ["hong-kong-cha-chaan-teng", "hong-kong-macaroni-soup"],
    sources: [
      {
        label: "Hong Kong Tourism Board — Cha chaan teng menu examples",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-wai-kee-noodle-cafe.html",
      },
    ],
    palette: {
      from: "#efddc7",
      mid: "#e3cdb0",
      to: "#d2b491",
      ink: "#49311d",
    },
  },
  {
    slug: "japanese-beef-bean-sprout-stir-fry",
    title: "차돌박이 숙주볶음",
    country: "japan",
    category: "main",
    summary:
      "얇은 소고기와 숙주를 간장 양념에 빠르게 볶는 이자카야·가정식 조리법에서 영감을 받은 창작 메뉴입니다.",
    culturalNote:
      "이 음식은 특정 지역의 전통 향토 음식으로 소개하기보다 일본의 간장 기반 볶음 요리와 이자카야식 작은 접시에서 영감을 받은 메뉴로 구분하는 것이 정확합니다.",
    cookingTime: 20,
    difficulty: "쉬움",
    servings: 2,
    visualLabel: "牛肉もやし",
    visualCaption: "BEEF & BEAN SPROUT",
    keywords: ["숙주볶음", "소고기", "이자카야스타일"],
    ingredientGroups: [
      {
        title: "주재료",
        items: ["차돌박이 또는 얇은 소고기 250g", "숙주 300g", "대파 1/2대", "마늘 2쪽"],
      },
      {
        title: "양념",
        items: [
          "진간장 1과 1/2큰술",
          "미림 1큰술",
          "청주 또는 물 1큰술",
          "설탕 1작은술",
          "참기름 1작은술",
          "후추 약간",
        ],
      },
    ],
    steps: [
      {
        title: "재료 준비",
        description:
          "숙주는 씻어 물기를 충분히 빼고, 대파는 어슷하게 썰고 마늘은 얇게 편으로 썹니다. 양념 재료를 미리 섞습니다.",
      },
      {
        title: "소고기 굽기",
        description:
          "팬을 강하게 달군 뒤 소고기를 펼쳐 넣고 겉면이 갈색이 될 때까지 빠르게 볶습니다. 지방이 지나치게 많으면 일부를 덜어냅니다.",
      },
      {
        title: "향과 숙주 더하기",
        description:
          "마늘과 대파를 넣어 30초 볶고, 숙주를 넣어 센 불에서 1분간 뒤집습니다.",
        tip: "숙주의 물기를 충분히 빼고 팬을 넓게 사용해야 물이 덜 생깁니다.",
      },
      {
        title: "양념해 마무리",
        description:
          "양념을 팬 가장자리로 둘러 넣고 30초~1분만 더 볶습니다. 숙주가 아삭할 때 불을 끕니다.",
      },
    ],
    substitutions: [
      "차돌박이 대신 대패삼겹살, 우삼겹 또는 얇게 썬 버섯을 사용할 수 있습니다.",
      "미림이 없으면 물 1큰술과 설탕을 조금 추가합니다.",
    ],
    tips: [
      "소고기는 완전히 익히되 숙주는 과하게 익히지 않습니다.",
      "반찬으로는 2인분, 술안주용 작은 접시로는 3~4인이 나눌 수 있습니다.",
    ],
    publishedAt: "2026-09-02",
    relatedStorySlugs: ["japanese-izakaya-culture"],
    sources: [
      {
        label: "Japan National Tourism Organization — Izakaya Guide",
        url: "https://www.japan.travel/de/de/guide/izakaya-japan-essen/",
      },
    ],
    palette: {
      from: "#eddad5",
      mid: "#e2c8c2",
      to: "#d2b2aa",
      ink: "#4a2926",
    },
  },
  {
    slug: "mala-xiang-guo",
    experienceStatus: "researched",
    title: "집에서 만드는 마라샹궈",
    country: "china",
    category: "main",
    summary:
      "고기와 채소, 두부를 마라 양념에 볶아 여러 식감과 얼얼한 향을 한 팬에 담는 가정용 레시피입니다.",
    culturalNote:
      "마라샹궈는 쓰촨·충칭권의 마라 풍미와 재료 선택형 식사 방식에서 발전한 음식입니다. 시판 소스마다 염도와 매운맛이 크게 달라 양을 나누어 넣어야 합니다.",
    cookingTime: 45,
    difficulty: "보통",
    servings: 3,
    visualLabel: "麻辣香锅",
    visualCaption: "MALA XIANG GUO",
    keywords: ["마라", "화자오", "볶음요리"],
    ingredientGroups: [
      {
        title: "주재료",
        items: [
          "얇은 돼지고기 또는 소고기 300g",
          "청경채 150g",
          "연근 150g",
          "버섯 150g",
          "푸주 또는 두부 150g",
          "불린 목이버섯 80g",
        ],
      },
      {
        title: "향과 양념",
        items: [
          "시판 마라샹궈 소스 60~80g",
          "마늘 5쪽",
          "생강 10g",
          "대파 1대",
          "건고추 3개(선택)",
          "식용유 2큰술",
          "통깨와 고수 약간(선택)",
        ],
      },
    ],
    steps: [
      {
        title: "재료별 전처리",
        description:
          "연근과 푸주처럼 익는 시간이 긴 재료는 끓는 물에 2~3분 데칩니다. 청경채와 버섯은 씻은 뒤 물기를 제거합니다.",
      },
      {
        title: "고기 볶기",
        description:
          "넓은 팬이나 웍을 센 불로 달구고 기름 1큰술을 넣어 고기를 완전히 익힌 뒤 잠시 덜어냅니다.",
      },
      {
        title: "향신료와 소스 볶기",
        description:
          "남은 기름에 마늘, 생강, 대파, 건고추를 볶아 향을 내고 마라 소스의 절반을 넣어 20초간 볶습니다.",
        tip: "소스를 센 불에 오래 볶으면 타기 쉬우므로 재료를 바로 넣습니다.",
      },
      {
        title: "단단한 재료부터 합치기",
        description:
          "연근, 푸주, 목이버섯, 버섯을 넣고 볶은 뒤 고기와 청경채를 합칩니다. 맛을 보고 남은 소스를 추가합니다.",
      },
      {
        title: "수분을 날려 마무리",
        description:
          "재료 표면에 소스가 고르게 묻고 팬 바닥의 수분이 거의 없어질 때까지 2~3분 볶습니다. 통깨와 고수를 올립니다.",
      },
    ],
    substitutions: [
      "푸주 대신 단단한 두부나 유부를 사용할 수 있습니다.",
      "화자오 향이 부담스러우면 소스 사용량을 줄이고 간장 1작은술로 간을 보완합니다.",
    ],
    tips: [
      "여러 재료의 물기를 충분히 제거해야 ‘볶음’에 가까운 질감이 납니다.",
      "시판 소스는 나트륨 함량이 높을 수 있어 처음부터 전량 넣지 않습니다.",
    ],
    publishedAt: "2026-09-03",
    relatedStorySlugs: ["chinese-regional-spiciness"],
    sources: [
      {
        label: "UNESCO Creative Cities Network — Chengdu gastronomy",
        url: "https://www.unesco.org/en/creative-cities/chengdu",
      },
    ],
    palette: {
      from: "#eac9b1",
      mid: "#d99f7e",
      to: "#c47459",
      ink: "#552315",
    },
  },
  {
    slug: "osam-bulgogi",
    title: "매콤한 오삼불고기",
    country: "korea",
    category: "main",
    summary:
      "오징어와 삼겹살을 고추장 양념에 볶아 해산물의 감칠맛과 돼지고기의 고소함을 함께 살립니다.",
    culturalNote:
      "오징어와 삼겹살을 한 팬에 볶아 밥과 나누어 먹는 한국식 볶음 요리입니다. 가게와 가정에 따라 양배추, 당면, 깻잎 등 부재료가 달라집니다.",
    cookingTime: 35,
    difficulty: "보통",
    servings: 3,
    visualLabel: "오삼불고기",
    visualCaption: "SPICY SQUID & PORK",
    keywords: ["오징어", "삼겹살", "고추장양념"],
    ingredientGroups: [
      {
        title: "주재료",
        items: [
          "손질 오징어 1마리(약 300g)",
          "삼겹살 300g",
          "양파 1개",
          "양배추 200g",
          "대파 1대",
          "깻잎 8장",
        ],
      },
      {
        title: "양념",
        items: [
          "고추장 2큰술",
          "고춧가루 1과 1/2큰술",
          "진간장 2큰술",
          "설탕 또는 올리고당 1과 1/2큰술",
          "다진 마늘 1큰술",
          "맛술 1큰술",
          "참기름 1작은술",
        ],
      },
    ],
    steps: [
      {
        title: "재료 손질",
        description:
          "오징어는 물기를 닦고 한입 크기로 썹니다. 삼겹살과 채소도 비슷한 크기로 준비하고 양념은 한 그릇에 섞습니다.",
      },
      {
        title: "삼겹살 먼저 굽기",
        description:
          "달군 팬에 삼겹살을 넣어 기름이 나오고 표면이 노릇해질 때까지 볶습니다.",
      },
      {
        title: "채소와 양념 볶기",
        description:
          "양파, 양배추, 대파를 넣고 1분 볶은 뒤 양념의 3분의 2를 넣어 고기와 채소에 입힙니다.",
      },
      {
        title: "오징어 짧게 익히기",
        description:
          "오징어와 남은 양념을 넣어 센 불에서 2~3분 볶습니다. 오징어가 불투명해지고 말리기 시작하면 깻잎과 참기름을 넣고 불을 끕니다.",
        tip: "오징어를 오래 익히면 질겨지므로 마지막에 넣습니다.",
      },
    ],
    substitutions: [
      "삼겹살 대신 목살이나 앞다리살을 사용할 수 있습니다.",
      "매운맛을 줄이려면 고춧가루를 절반으로 줄이고 간장을 1작은술 추가합니다.",
    ],
    tips: [
      "오징어와 채소의 물기를 닦아야 양념이 묽어지지 않습니다.",
      "돼지고기와 오징어는 중심까지 충분히 익혀 섭취합니다.",
    ],
    publishedAt: "2026-09-04",
    relatedStorySlugs: ["korean-banchan-culture"],
    sources: [
      {
        label: "Korea Tourism Organization — Traditional Korean Food",
        url: "https://english1.visitkorea.or.kr/enu/AKR/AK_ENG_2_3.jsp",
      },
    ],
    palette: {
      from: "#ead5c2",
      mid: "#d9b69c",
      to: "#c88e72",
      ink: "#54291c",
    },
  },
  {
    slug: "vietnamese-banh-mi",
    experienceStatus: "researched",
    title: "베트남식 반미 샌드위치",
    country: "vietnam",
    category: "street-food",
    summary:
      "바삭한 바게트에 양념한 돼지고기, 새콤한 절임 채소와 허브를 채워 다양한 질감을 만듭니다.",
    culturalNote:
      "바게트라는 외래 식재료가 베트남의 절임 채소, 허브, 고기와 결합해 일상적인 거리 음식으로 재구성됐습니다. 아래 레시피는 한국에서 구하기 쉬운 재료를 사용한 가정용 버전입니다.",
    cookingTime: 40,
    difficulty: "보통",
    servings: 2,
    visualLabel: "BÁNH MÌ",
    visualCaption: "VIETNAMESE SANDWICH",
    keywords: ["반미", "거리음식", "샌드위치"],
    ingredientGroups: [
      {
        title: "절임 채소",
        items: ["당근 80g", "무 80g", "식초 3큰술", "설탕 2큰술", "소금 1/3작은술"],
      },
      {
        title: "고기",
        items: [
          "얇은 돼지고기 250g",
          "피시소스 1큰술",
          "진간장 1큰술",
          "설탕 1큰술",
          "다진 마늘 1작은술",
          "식용유 1큰술",
        ],
      },
      {
        title: "조립",
        items: [
          "작은 바게트 2개",
          "오이 1/2개",
          "고수 한 줌(선택)",
          "마요네즈 2큰술",
          "파테 2큰술(선택)",
          "라임 1/2개",
        ],
      },
    ],
    steps: [
      {
        title: "채소 절이기",
        description:
          "당근과 무를 가늘게 썰어 식초, 설탕, 소금과 섞고 최소 20분 둡니다. 사용 전 물기를 가볍게 짭니다.",
      },
      {
        title: "고기 재우기",
        description:
          "돼지고기에 피시소스, 간장, 설탕, 마늘을 섞어 15분간 재웁니다.",
      },
      {
        title: "고기 굽기",
        description:
          "팬을 강하게 달구고 기름을 둘러 고기를 펼쳐 넣습니다. 수분을 날리며 완전히 익히고 가장자리를 노릇하게 만듭니다.",
      },
      {
        title: "바게트 데우기",
        description:
          "바게트를 180℃ 오븐 또는 에어프라이어에서 3~4분 데워 겉을 바삭하게 합니다.",
      },
      {
        title: "조립하기",
        description:
          "바게트 안쪽에 마요네즈와 파테를 바르고 고기, 절임 채소, 오이, 고수를 채웁니다. 라임즙을 소량 뿌립니다.",
      },
    ],
    substitutions: [
      "고수를 먹지 못하면 깻잎을 소량 사용하거나 생략합니다.",
      "파테는 선택 재료이며, 마요네즈만 사용해도 됩니다.",
    ],
    tips: [
      "절임 채소의 물기를 빼야 빵이 빨리 눅눅해지지 않습니다.",
      "고기는 충분히 익히고 조립한 뒤 바로 먹는 것이 좋습니다.",
    ],
    publishedAt: "2026-09-05",
    relatedStorySlugs: ["vietnamese-breakfast-culture"],
    sources: [
      {
        label: "Vietnam Tourism — Bánh mì",
        url: "https://beta-v2.vietnam.travel/things-to-do/21-must-try-vietnamese-dishes",
      },
    ],
    palette: {
      from: "#dce8cc",
      mid: "#c7dab0",
      to: "#a9c48d",
      ink: "#2e4923",
    },
  },
  {
    slug: "italian-tiramisu",
    experienceStatus: "researched",
    title: "커피 향을 담은 티라미수",
    country: "italy",
    category: "dessert",
    summary:
      "에스프레소에 적신 레이디핑거와 마스카르포네 크림을 층층이 쌓는 달걀 없는 가정용 레시피입니다.",
    culturalNote:
      "티라미수는 지역과 제작자에 따라 달걀 사용 여부와 크림 배합이 다릅니다. 아래 버전은 가정에서 다루기 쉽도록 생달걀을 사용하지 않습니다.",
    cookingTime: 40,
    difficulty: "보통",
    servings: 6,
    visualLabel: "TIRAMISÙ",
    visualCaption: "COFFEE DESSERT",
    keywords: ["티라미수", "커피", "노오븐디저트"],
    ingredientGroups: [
      {
        title: "커피 시럽",
        items: ["진한 에스프레소 또는 커피 220ml", "설탕 1큰술", "무가당 코코아가루 1큰술"],
      },
      {
        title: "크림과 층",
        items: [
          "마스카르포네 치즈 250g",
          "생크림 250ml",
          "설탕 55g",
          "바닐라 익스트랙 1작은술(선택)",
          "레이디핑거 20~24개",
          "마무리용 코코아가루",
        ],
      },
    ],
    steps: [
      {
        title: "커피 식히기",
        description:
          "뜨거운 커피에 설탕을 녹이고 완전히 식힙니다. 따뜻한 상태로 사용하면 크림이 녹을 수 있습니다.",
      },
      {
        title: "크림 만들기",
        description:
          "차가운 생크림에 설탕을 넣고 부드러운 뿔이 설 때까지 휘핑합니다. 마스카르포네를 주걱으로 풀고 휘핑크림을 두세 번 나누어 섞습니다.",
        tip: "마스카르포네를 너무 오래 휘저으면 질감이 분리될 수 있습니다.",
      },
      {
        title: "첫 번째 층 쌓기",
        description:
          "레이디핑거를 식힌 커피에 앞뒤로 빠르게 적셔 용기 바닥에 놓고 크림의 절반을 고르게 펴 바릅니다.",
      },
      {
        title: "두 번째 층과 숙성",
        description:
          "같은 순서로 한 층을 더 쌓고 뚜껑을 덮어 냉장고에서 최소 4시간, 가능하면 하룻밤 굳힙니다.",
      },
      {
        title: "코코아로 마무리",
        description:
          "먹기 직전에 체로 코코아가루를 고르게 뿌리고 차갑게 제공합니다.",
      },
    ],
    substitutions: [
      "레이디핑거가 없으면 얇게 자른 카스텔라를 사용할 수 있지만 커피는 더 적게 묻힙니다.",
      "카페인을 줄이려면 디카페인 커피를 사용합니다.",
    ],
    tips: [
      "유제품은 조립 직전까지 차갑게 보관합니다.",
      "완성 후 냉장 보관하고 2일 이내에 섭취하는 것을 권장합니다.",
    ],
    publishedAt: "2026-09-06",
    relatedStorySlugs: ["italian-family-table"],
    sources: [
      {
        label: "Italia.it — Regional diversity of Italian cuisine",
        url: "https://www.italia.it/it/italia/cosa-fare/cucina-italiana-patrimonio-unesco",
      },
    ],
    palette: {
      from: "#e6d9c2",
      mid: "#d5c0a1",
      to: "#c2a17c",
      ink: "#473421",
    },
  },
  {
    slug: "korean-sundae-bokkeum",
    title: "시장식 순대볶음",
    country: "korea",
    category: "street-food",
    summary:
      "순대와 양배추, 깻잎, 쫄면을 매콤한 양념에 볶아 전통시장과 분식집의 푸짐한 한 접시를 재현합니다.",
    culturalNote:
      "순대볶음은 시장과 분식점에서 여러 사람이 나누어 먹는 형태로 널리 접할 수 있습니다. 지역과 점포에 따라 들깨가루, 당면, 곱창 등의 사용이 달라집니다.",
    cookingTime: 30,
    difficulty: "쉬움",
    servings: 3,
    visualLabel: "순대볶음",
    visualCaption: "MARKET-STYLE SUNDAE",
    keywords: ["순대", "시장음식", "매콤볶음"],
    ingredientGroups: [
      {
        title: "주재료",
        items: [
          "시판 순대 500g",
          "양배추 250g",
          "양파 1/2개",
          "대파 1대",
          "깻잎 10장",
          "불린 쫄면 또는 당면 150g(선택)",
        ],
      },
      {
        title: "양념",
        items: [
          "고추장 1과 1/2큰술",
          "고춧가루 1큰술",
          "진간장 1과 1/2큰술",
          "설탕 1큰술",
          "다진 마늘 1큰술",
          "물 4큰술",
          "들깨가루 2큰술",
          "참기름 1작은술",
        ],
      },
    ],
    steps: [
      {
        title: "순대 데우기",
        description:
          "순대는 포장지 안내에 따라 찌거나 데운 뒤 1.5cm 두께로 썹니다. 너무 차가운 순대를 바로 볶으면 터지기 쉽습니다.",
      },
      {
        title: "채소 볶기",
        description:
          "넓은 팬에 식용유를 두르고 양배추, 양파, 대파를 센 불에서 2분 볶습니다.",
      },
      {
        title: "양념과 면 넣기",
        description:
          "양념 재료 중 들깨가루와 참기름을 제외한 재료를 섞어 팬에 넣습니다. 면을 사용할 경우 이때 넣고 양념을 흡수시킵니다.",
      },
      {
        title: "순대는 마지막에",
        description:
          "순대를 넣어 으깨지지 않도록 크게 뒤집으며 2~3분 볶습니다. 깻잎, 들깨가루, 참기름을 넣고 마무리합니다.",
      },
    ],
    substitutions: [
      "쫄면이나 당면은 생략해도 됩니다.",
      "덜 매운 맛은 고추장을 1큰술로 줄이고 간장과 물을 조금 늘립니다.",
    ],
    tips: [
      "순대를 오래 볶으면 껍질이 터질 수 있으므로 마지막에 넣습니다.",
      "시판 순대는 제품별 가열 안내를 우선 따릅니다.",
    ],
    publishedAt: "2026-09-07",
    relatedStorySlugs: ["korean-market-food"],
    sources: [
      {
        label: "Korea Tourism Organization — Traditional markets and local food",
        url: "https://kto.visitkorea.or.kr/upload/flexer/upload/ktobiz/20180710/7b42845d-83c6-11e8-be15-b740af9dff37.hwp.files/Sections1.html",
      },
    ],
    palette: {
      from: "#ead6c3",
      mid: "#d9b99e",
      to: "#c79578",
      ink: "#4d2c20",
    },
  },
  {
    slug: "hong-kong-milk-tea",
    experienceStatus: "researched",
    title: "홍콩식 밀크티",
    country: "hong-kong",
    category: "drink",
    summary:
      "홍차를 진하게 우려 무가당 연유와 섞는 차찬텡식 밀크티의 가정용 버전입니다.",
    culturalNote:
      "홍콩식 밀크티는 영국식 홍차 문화가 현지의 차찬텡과 재료 사용 방식 속에서 변형된 음료입니다. 전통 점포에서는 여러 찻잎을 배합하고 천 필터를 사용하기도 하지만, 아래 레시피는 가정용 도구를 기준으로 합니다.",
    cookingTime: 15,
    difficulty: "쉬움",
    servings: 2,
    visualLabel: "奶茶",
    visualCaption: "HONG KONG MILK TEA",
    keywords: ["밀크티", "홍차", "차찬텡"],
    ingredientGroups: [
      {
        title: "재료",
        items: [
          "실론계 홍차 잎 18g 또는 진한 홍차 티백 5개",
          "물 450ml",
          "무가당 연유 140ml",
          "설탕 1~2큰술",
          "얼음(차갑게 마실 경우)",
        ],
      },
    ],
    steps: [
      {
        title: "물을 끓이기",
        description:
          "냄비에 물을 완전히 끓인 뒤 홍차 잎을 넣습니다.",
      },
      {
        title: "진하게 우리기",
        description:
          "약불에서 4분 끓이고 불을 끈 뒤 3분 더 우립니다. 고운 체나 종이 필터로 차 잎을 거릅니다.",
        tip: "일반 밀크티보다 진하게 우려야 우유를 넣어도 차 향이 남습니다.",
      },
      {
        title: "우유와 설탕 섞기",
        description:
          "컵에 무가당 연유를 나누어 담고 뜨거운 차를 높은 위치에서 천천히 부어 섞습니다. 기호에 따라 설탕을 넣습니다.",
      },
      {
        title: "뜨겁게 또는 차갑게",
        description:
          "뜨겁게 바로 마시거나 완전히 식힌 뒤 얼음 위에 부어 제공합니다.",
      },
    ],
    substitutions: [
      "무가당 연유가 없으면 전지우유와 생크림을 3:1로 섞어 사용할 수 있지만 풍미는 달라집니다.",
      "단맛은 가당 연유가 아니라 설탕으로 따로 조절하면 차 맛을 보기 쉽습니다.",
    ],
    tips: [
      "홍차를 너무 오래 끓이면 떫은맛이 강해지므로 시간을 지킵니다.",
      "차가운 버전은 얼음이 녹는 것을 고려해 차를 조금 더 진하게 만듭니다.",
    ],
    publishedAt: "2026-09-08",
    relatedStorySlugs: ["hong-kong-cha-chaan-teng"],
    sources: [
      {
        label: "Hong Kong Tourism Board — Cha chaan teng and milk tea",
        url: "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-mido-cafe.html",
      },
    ],
    palette: {
      from: "#e8d8c4",
      mid: "#dcc5a7",
      to: "#c8aa84",
      ink: "#47331f",
    },
  },
  {
    slug: "macau-minchi",
    title: "마카오식 민치",
    country: "macau",
    category: "main",
    experienceStatus: "researched",
    summary:
      "다진 고기와 감자, 양파를 간장과 우스터소스에 볶고 달걀을 곁들이는 든든한 마카오식 가정 요리입니다.",
    culturalNote:
      "민치는 마카오의 가정식과 식당에서 여러 형태로 만날 수 있습니다. 고기 종류, 감자를 튀기거나 볶는 방식, 달걀과 치즈 사용 여부가 달라지므로 아래 조리법은 한국 가정에서 만들기 쉬운 한 가지 버전입니다.",
    cookingTime: 35,
    difficulty: "쉬움",
    servings: 3,
    visualLabel: "免治",
    visualCaption: "MACANESE MINCHI",
    keywords: ["마카오가정식", "다진고기", "감자볶음"],
    ingredientGroups: [
      {
        title: "주재료",
        items: [
          "다진 돼지고기 또는 소고기 350g",
          "감자 2개(약 350g)",
          "양파 1개",
          "마늘 3쪽",
          "달걀 3개",
          "따뜻한 밥 3공기",
        ],
      },
      {
        title: "양념",
        items: [
          "진간장 1과 1/2큰술",
          "우스터소스 1큰술",
          "설탕 1작은술",
          "물 3큰술",
          "후추 약간",
          "식용유 2큰술",
        ],
      },
    ],
    steps: [
      {
        title: "감자와 양파 준비",
        description:
          "감자는 1cm 크기로 깍둑썰기하고 찬물에 한 번 헹군 뒤 물기를 닦습니다. 양파와 마늘은 잘게 다집니다.",
      },
      {
        title: "감자를 노릇하게 익히기",
        description:
          "팬에 식용유 1큰술을 두르고 감자를 중불에서 8~10분 볶아 속까지 익히고 가장자리를 노릇하게 만듭니다. 잠시 덜어 둡니다.",
        tip: "감자를 한 번에 겹치지 않게 펼치면 표면이 더 잘 익습니다.",
      },
      {
        title: "고기와 향채 볶기",
        description:
          "같은 팬에 남은 기름을 두르고 양파와 마늘을 볶습니다. 다진 고기를 넣어 덩어리를 풀며 수분이 거의 없어질 때까지 완전히 익힙니다.",
      },
      {
        title: "양념과 감자 합치기",
        description:
          "간장, 우스터소스, 설탕과 물을 넣고 1분간 볶은 뒤 감자를 다시 넣어 양념이 고르게 묻게 합니다. 후추로 마무리합니다.",
      },
      {
        title: "달걀과 함께 담기",
        description:
          "달걀을 반숙 또는 완숙으로 부칩니다. 밥 위에 민치를 담고 달걀을 올려 제공합니다.",
      },
    ],
    substitutions: [
      "다진 돼지고기와 소고기를 반씩 섞어도 좋습니다.",
      "우스터소스가 없으면 간장 1작은술, 식초 1작은술과 설탕 약간을 더하지만 맛은 달라집니다.",
    ],
    tips: [
      "다진 고기는 붉은 기가 남지 않도록 중심까지 충분히 익힙니다.",
      "감자는 고기와 처음부터 섞기보다 따로 익혀야 모양과 식감이 유지됩니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["macau-portuguese-chinese-table"],
    sources: [
      {
        label: "Macao Government Tourism Office — Macanese & Portuguese Dishes",
        url: "https://www.macaotourism.gov.mo/en/dining/taste-of-macao/macanese-and-portuguese-dishes",
      },
    ],
    palette: {
      from: "#efdec8",
      mid: "#dfbd96",
      to: "#c8a27d",
      ink: "#443021",
    },
  },
  {
    slug: "macau-portuguese-egg-tart",
    title: "마카오식 포르투갈 에그타르트",
    country: "macau",
    category: "dessert",
    experienceStatus: "researched",
    summary:
      "냉동 페이스트리와 진한 달걀 커스터드를 사용해 윗면을 짙게 구워 내는 가정용 에그타르트입니다.",
    culturalNote:
      "마카오의 포르투갈식 에그타르트는 도시를 대표하는 디저트로 널리 알려져 있습니다. 전문점의 다층 페이스트리와 고온 오븐을 완전히 재현하기 어려우므로 아래 조리법은 시판 페이스트리를 사용하는 간편 버전입니다.",
    cookingTime: 55,
    difficulty: "보통",
    servings: 6,
    visualLabel: "蛋撻",
    visualCaption: "PORTUGUESE EGG TART",
    keywords: ["에그타르트", "마카오디저트", "홈베이킹"],
    ingredientGroups: [
      {
        title: "타르트 껍질",
        items: ["냉동 퍼프 페이스트리 1장(약 250g)", "무염버터 약간"],
      },
      {
        title: "커스터드",
        items: [
          "달걀노른자 4개",
          "우유 180ml",
          "생크림 120ml",
          "설탕 75g",
          "바닐라 익스트랙 1작은술(선택)",
          "소금 한 꼬집",
        ],
      },
    ],
    steps: [
      {
        title: "오븐과 틀 준비",
        description:
          "오븐을 220℃로 충분히 예열합니다. 머핀 틀 6칸에 버터를 아주 얇게 바릅니다.",
      },
      {
        title: "페이스트리 성형",
        description:
          "해동한 페이스트리를 돌돌 말아 6등분하고 단면이 위로 오게 틀에 넣습니다. 손가락으로 눌러 바닥과 옆면을 얇게 펴고 냉장고에서 10분 둡니다.",
        tip: "페이스트리가 따뜻해지면 층이 뭉개지므로 작업 중 말랑해지면 다시 차갑게 식힙니다.",
      },
      {
        title: "커스터드 섞기",
        description:
          "우유와 설탕을 데워 설탕만 녹인 뒤 미지근하게 식힙니다. 노른자, 생크림, 바닐라와 소금을 넣고 거품이 많이 생기지 않게 섞은 뒤 체에 거릅니다.",
      },
      {
        title: "채우고 굽기",
        description:
          "페이스트리 틀의 80%까지 커스터드를 붓고 220℃에서 18~23분 굽습니다. 커스터드 표면에 진한 갈색 반점이 생기고 가장자리가 부풀면 꺼냅니다.",
      },
      {
        title: "잠시 식혀 제공",
        description:
          "틀에서 5분간 식힌 뒤 조심스럽게 꺼냅니다. 커스터드가 매우 뜨거우므로 10분 정도 더 식혀 먹습니다.",
      },
    ],
    substitutions: [
      "생크림이 없으면 우유로 대체할 수 있지만 커스터드의 농도와 풍미가 가벼워집니다.",
      "퍼프 페이스트리 대신 타르트지를 사용할 수 있지만 마카오식 제과점의 층진 식감과는 달라집니다.",
    ],
    tips: [
      "달걀 혼합물은 실온에 오래 두지 말고 만든 즉시 사용합니다.",
      "남은 타르트는 냉장 보관하고 2일 이내에 먹으며, 다시 먹을 때는 오븐이나 에어프라이어로 짧게 데웁니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["macau-egg-tart-story"],
    sources: [
      {
        label: "Macao Government Tourism Office — Macanese & Portuguese Dishes",
        url: "https://www.macaotourism.gov.mo/en/dining/taste-of-macao/macanese-and-portuguese-dishes",
      },
    ],
    palette: {
      from: "#f3e2c2",
      mid: "#e8bd7d",
      to: "#d2924e",
      ink: "#4c3018",
    },
  },
  {
    slug: "hawaii-loco-moco",
    title: "하와이식 로코모코",
    country: "usa",
    category: "main",
    experienceStatus: "researched",
    summary:
      "따뜻한 밥 위에 햄버그 패티, 갈색 그레이비와 달걀프라이를 올리는 하와이 로컬 컴포트 푸드입니다.",
    culturalNote:
      "Go Hawaiʻi는 로코모코를 밥 위에 햄버거 스테이크와 달걀, 그레이비를 올리는 하와이의 대표적인 로컬 음식으로 소개합니다. 가게마다 패티와 그레이비 조리법이 달라 아래 레시피는 가정용 버전입니다.",
    cookingTime: 45,
    difficulty: "보통",
    servings: 2,
    visualLabel: "LOCO MOCO",
    visualCaption: "RICE · PATTY · GRAVY · EGG",
    keywords: ["하와이로컬", "햄버그", "그레이비"],
    ingredientGroups: [
      {
        title: "패티와 밥",
        items: [
          "다진 소고기 300g",
          "다진 양파 1/4개",
          "빵가루 3큰술",
          "우유 2큰술",
          "소금 1/3작은술",
          "후추 약간",
          "따뜻한 밥 2공기",
          "달걀 2개",
        ],
      },
      {
        title: "그레이비",
        items: [
          "양파 1/2개",
          "버섯 100g",
          "무염버터 1큰술",
          "밀가루 1큰술",
          "소고기 육수 300ml",
          "우스터소스 1큰술",
          "진간장 1작은술",
        ],
      },
    ],
    steps: [
      {
        title: "패티 반죽",
        description:
          "빵가루와 우유를 섞어 2분 둔 뒤 소고기, 다진 양파, 소금과 후추를 넣고 가볍게 섞습니다. 두 개의 두꺼운 패티로 빚습니다.",
      },
      {
        title: "패티 익히기",
        description:
          "팬을 중강불로 달구고 패티를 앞뒤로 노릇하게 굽습니다. 불을 중불로 낮춰 중심까지 완전히 익힌 뒤 접시에 덜어 둡니다.",
      },
      {
        title: "그레이비 만들기",
        description:
          "같은 팬에 버터, 채 썬 양파와 버섯을 넣어 갈색이 돌 때까지 볶습니다. 밀가루를 넣어 1분 볶고 육수를 조금씩 부어 덩어리 없이 풉니다. 우스터소스와 간장으로 간합니다.",
        tip: "패티를 구운 팬의 갈색 눌어붙은 부분을 육수로 긁어 풀면 풍미가 좋아집니다.",
      },
      {
        title: "달걀 굽기",
        description:
          "별도 팬에서 달걀을 원하는 익힘 정도로 부칩니다.",
      },
      {
        title: "한 그릇에 조립",
        description:
          "밥, 패티, 그레이비와 달걀 순서로 올리고 후추를 뿌려 제공합니다.",
      },
    ],
    substitutions: [
      "소고기 일부를 다진 돼지고기로 바꾸면 더 부드러운 패티가 됩니다.",
      "버섯은 생략할 수 있으며 육수는 저염 제품을 사용합니다.",
    ],
    tips: [
      "다진 고기 패티는 중심까지 충분히 익혀 섭취합니다.",
      "그레이비는 식으면서 더 걸쭉해지므로 처음에는 약간 묽게 마무리합니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["hawaii-local-food-migration", "hawaii-plate-lunch-culture"],
    sources: [
      {
        label: "Go Hawaiʻi — Food Culture in Hawaiʻi",
        url: "https://www.gohawaii.com/kr/islands/hawaii-big-island/restaurants",
      },
    ],
    palette: {
      from: "#d8e8e4",
      mid: "#bfd6cc",
      to: "#e7c89e",
      ink: "#29463f",
    },
  },
  {
    slug: "hawaii-poke-bowl",
    title: "하와이 로컬 스타일 포케볼",
    country: "usa",
    category: "main",
    experienceStatus: "researched",
    summary:
      "회용 참치에 간장과 참기름, 파와 양파를 버무려 밥 위에 담는 간결한 포케볼입니다.",
    culturalNote:
      "포케는 잘게 자른 생선을 양념하는 하와이 음식의 계보를 갖습니다. 밥과 여러 토핑을 함께 담는 현대적인 포케볼은 확장된 형태이므로 전통 포케와 동일하게 설명하지 않는 것이 좋습니다.",
    cookingTime: 20,
    difficulty: "쉬움",
    servings: 2,
    visualLabel: "POKE",
    visualCaption: "HAWAIʻI-STYLE BOWL",
    keywords: ["포케", "참치", "하와이로컬"],
    ingredientGroups: [
      {
        title: "포케",
        items: [
          "회용 참치 300g",
          "양파 1/4개",
          "쪽파 2줄기",
          "진간장 2큰술",
          "참기름 1큰술",
          "라임즙 1큰술",
          "통깨 1작은술",
          "불린 미역 또는 해초 30g(선택)",
        ],
      },
      {
        title: "볼 구성",
        items: [
          "따뜻하거나 식힌 밥 2공기",
          "오이 1/2개",
          "아보카도 1개",
          "김가루 약간",
        ],
      },
    ],
    steps: [
      {
        title: "생선 상태 확인",
        description:
          "신뢰할 수 있는 판매처의 회용 참치를 준비하고 조리 직전까지 5℃ 이하로 차갑게 보관합니다. 깨끗한 칼과 도마로 1.5cm 크기로 썹니다.",
      },
      {
        title: "채소 손질",
        description:
          "양파는 얇게 썰어 찬물에 5분 담갔다 물기를 빼고, 쪽파와 오이, 아보카도를 먹기 좋게 준비합니다.",
      },
      {
        title: "짧게 버무리기",
        description:
          "참치에 간장, 참기름, 라임즙, 양파, 쪽파, 통깨와 해초를 넣고 가볍게 버무립니다. 냉장고에서 5~10분만 둡니다.",
        tip: "오래 재우면 생선에서 수분이 빠지고 간이 지나치게 강해질 수 있습니다.",
      },
      {
        title: "볼에 담기",
        description:
          "밥 위에 오이와 아보카도, 포케를 나누어 담고 김가루를 뿌립니다.",
      },
    ],
    substitutions: [
      "생식이 부담스럽다면 참치를 겉면만 익히거나 완전히 익힌 연어·두부로 대체합니다.",
      "아보카도와 해초는 선택 재료이며 제철 채소로 바꿀 수 있습니다.",
    ],
    tips: [
      "임신부, 고령자, 면역저하자와 어린이는 생선 생식을 피하거나 의료 전문가의 지침을 따릅니다.",
      "완성한 포케는 실온에 오래 두지 말고 즉시 먹으며 남은 음식은 재사용하지 않는 편이 안전합니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["hawaii-local-food-migration"],
    sources: [
      {
        label: "Go Hawaiʻi — Culinary Experiences in Hawaiʻi",
        url: "https://www.gohawaii.com/culinary-experiences-in-hawaii",
      },
    ],
    palette: {
      from: "#d6ebe7",
      mid: "#acd5ce",
      to: "#efc8a7",
      ink: "#244a44",
    },
  },
  {
    slug: "thai-pad-thai",
    title: "타마린드 소스 팟타이",
    country: "thailand",
    category: "main",
    experienceStatus: "researched",
    summary:
      "쌀국수와 달걀, 새우 또는 닭고기를 타마린드·피시소스·설탕 소스에 볶아 만드는 태국식 면 요리입니다.",
    culturalNote:
      "팟타이는 태국 전역에서 다양한 형태로 만날 수 있으며 지역과 가게에 따라 면, 단백질과 곁들임이 달라집니다. 아래 레시피는 타마린드의 산미를 중심으로 구성한 가정용 버전입니다.",
    cookingTime: 35,
    difficulty: "보통",
    servings: 2,
    visualLabel: "ผัดไทย",
    visualCaption: "PAD THAI",
    keywords: ["팟타이", "쌀국수", "타마린드"],
    ingredientGroups: [
      {
        title: "주재료",
        items: [
          "팟타이용 쌀국수 200g",
          "새우 또는 닭고기 200g",
          "단단한 두부 100g",
          "달걀 2개",
          "숙주 150g",
          "부추 또는 쪽파 60g",
          "다진 땅콩 3큰술",
          "식용유 2큰술",
        ],
      },
      {
        title: "팟타이 소스",
        items: [
          "타마린드 페이스트 2큰술",
          "피시소스 1과 1/2큰술",
          "팜슈거 또는 황설탕 1과 1/2큰술",
          "물 3큰술",
          "고춧가루 약간(선택)",
        ],
      },
      {
        title: "곁들임",
        items: ["라임 1개", "숙주 약간", "부추 약간", "다진 땅콩 약간"],
      },
    ],
    steps: [
      {
        title: "쌀국수 불리기",
        description:
          "쌀국수는 제품 안내에 따라 찬물이나 미지근한 물에 불립니다. 완전히 익히지 말고 휘어질 정도가 되면 물기를 뺍니다.",
      },
      {
        title: "소스 섞기",
        description:
          "타마린드, 피시소스, 설탕과 물을 섞어 설탕을 녹입니다. 산미와 염도는 제품에 따라 달라 조금씩 조절합니다.",
      },
      {
        title: "단백질과 두부 볶기",
        description:
          "웍이나 넓은 팬을 중강불로 달구고 기름을 두릅니다. 두부를 노릇하게 볶은 뒤 새우 또는 닭고기를 넣어 거의 익힙니다.",
      },
      {
        title: "면과 소스 합치기",
        description:
          "불린 면과 소스를 넣고 집게로 뒤집으며 2~3분 볶습니다. 면이 단단하면 물을 1큰술씩 추가합니다.",
        tip: "팬이 작으면 재료를 두 번에 나누어 볶아야 면이 찌듯 익지 않습니다.",
      },
      {
        title: "달걀과 채소 마무리",
        description:
          "면을 한쪽으로 밀고 달걀을 익힌 뒤 전체와 섞습니다. 숙주와 부추를 넣어 30초만 볶고 불을 끕니다. 땅콩과 라임을 곁들입니다.",
      },
    ],
    substitutions: [
      "타마린드가 없으면 라임즙과 식초를 섞을 수 있지만 팟타이 특유의 깊은 산미와는 달라집니다.",
      "피시소스 대신 채식용 간장이나 버섯 소스를 사용할 수 있습니다.",
    ],
    tips: [
      "새우와 닭고기는 중심까지 충분히 익힙니다.",
      "숙주는 마지막에 넣어 아삭함을 남기고, 라임은 먹기 직전에 짭니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["thai-street-food-daily-life", "thai-flavor-balance"],
    sources: [
      {
        label: "Tourism Authority of Thailand — Thai Foodie Map 2.0",
        url: "https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en",
      },
    ],
    palette: {
      from: "#eadfb3",
      mid: "#d7c785",
      to: "#aec49b",
      ink: "#3d4527",
    },
  },
  {
    slug: "thai-som-tam",
    title: "태국식 그린 파파야 쏨땀",
    country: "thailand",
    category: "street-food",
    experienceStatus: "researched",
    summary:
      "채 썬 그린 파파야를 라임, 피시소스, 팜슈거와 고추에 가볍게 찧어 만드는 산뜻하고 매콤한 샐러드입니다.",
    culturalNote:
      "쏨땀은 태국 전역에서 여러 변형으로 먹지만 특히 이산·북동부 음식 문화와 강하게 연결됩니다. 게, 발효 생선 소스, 과일과 면을 더하는 형태도 있어 아래 레시피는 비교적 기본적인 타이 스타일입니다.",
    cookingTime: 20,
    difficulty: "쉬움",
    servings: 2,
    visualLabel: "ส้มตำ",
    visualCaption: "GREEN PAPAYA SALAD",
    keywords: ["쏨땀", "그린파파야", "태국샐러드"],
    ingredientGroups: [
      {
        title: "샐러드",
        items: [
          "그린 파파야 400g",
          "방울토마토 8개",
          "줄기콩 또는 그린빈 60g",
          "볶은 땅콩 3큰술",
          "말린 새우 1큰술(선택)",
        ],
      },
      {
        title: "드레싱",
        items: [
          "마늘 1쪽",
          "태국 고추 또는 청양고추 1~2개",
          "라임즙 3큰술",
          "피시소스 1과 1/2큰술",
          "팜슈거 또는 황설탕 1큰술",
        ],
      },
    ],
    steps: [
      {
        title: "파파야 채 썰기",
        description:
          "그린 파파야는 껍질과 씨를 제거하고 가늘게 채 썹니다. 찬물에 5분 담갔다가 물기를 충분히 뺍니다.",
      },
      {
        title: "향 재료 찧기",
        description:
          "절구에 마늘과 고추를 넣어 거칠게 찧습니다. 너무 곱게 갈면 매운맛이 과하게 퍼질 수 있습니다.",
      },
      {
        title: "드레싱 만들기",
        description:
          "설탕, 라임즙과 피시소스를 넣고 설탕이 녹도록 섞습니다. 줄기콩과 토마토를 넣어 살짝 눌러 향과 즙을 냅니다.",
      },
      {
        title: "파파야와 가볍게 섞기",
        description:
          "파파야, 땅콩과 말린 새우를 넣고 절굿공이와 숟가락을 함께 사용해 아래에서 위로 뒤집으며 가볍게 찧습니다.",
        tip: "파파야를 으깨기보다 드레싱이 배도록 표면만 가볍게 눌러야 아삭한 식감이 남습니다.",
      },
      {
        title: "즉시 제공",
        description:
          "맛을 보고 라임, 피시소스와 설탕을 조금씩 조절한 뒤 바로 담아 냅니다.",
      },
    ],
    substitutions: [
      "그린 파파야를 구하기 어렵다면 무와 당근을 섞어 사용할 수 있지만 식감과 향은 달라집니다.",
      "말린 새우는 생략할 수 있으며 피시소스는 채식용 소스로 바꿀 수 있습니다.",
    ],
    tips: [
      "매운맛은 고추 한 개부터 시작해 조절합니다.",
      "완성 후 오래 두면 채소에서 물이 나오므로 바로 먹는 것이 좋습니다.",
    ],
    publishedAt: "2026-09-09",
    relatedStorySlugs: ["thai-street-food-daily-life", "thai-flavor-balance"],
    sources: [
      {
        label: "Tourism Authority of Thailand — Signature Dishes of Buriram",
        url: "https://www.tourismthailand.org/Articles/https-www-tourismthailand-org-articles-enjoy5signaturedishesofburiram",
      },
    ],
    palette: {
      from: "#e7e2b7",
      mid: "#cbd99b",
      to: "#9fc08f",
      ink: "#34472b",
    },
  },

  {
    slug: "french-croque-monsieur",
    experienceStatus: "researched",
    title: "프랑스식 크로크무슈",
    country: "france",
    category: "main",
    summary:
      "햄과 치즈를 넣은 빵에 베샤멜을 얹어 노릇하게 구워 내는 프랑스식 따뜻한 샌드위치입니다.",
    culturalNote:
      "크로크무슈는 카페와 비스트로의 간단한 한 끼로 널리 알려진 메뉴입니다. 가게와 가정에 따라 베샤멜 사용 여부와 치즈 종류가 달라질 수 있습니다.",
    cookingTime: 35,
    difficulty: "보통",
    servings: 2,
    visualLabel: "CROQUE-MONSIEUR",
    visualCaption: "HAM · CHEESE · BÉCHAMEL",
    keywords: ["프랑스카페", "따뜻한샌드위치", "베샤멜"],
    ingredientGroups: [
      {
        title: "샌드위치",
        items: [
          "식빵 4장",
          "슬라이스 햄 4장",
          "그뤼예르 또는 에멘탈 치즈 100g",
          "디종 머스터드 2작은술",
          "무염버터 약간",
        ],
      },
      {
        title: "베샤멜",
        items: [
          "무염버터 15g",
          "밀가루 15g",
          "우유 180ml",
          "소금 약간",
          "후추와 넛맥 약간",
        ],
      },
    ],
    steps: [
      {
        title: "베샤멜 만들기",
        description:
          "약불에서 버터를 녹이고 밀가루를 1분 볶습니다. 우유를 조금씩 넣어 덩어리 없이 저은 뒤 걸쭉해지면 소금, 후추와 넛맥으로 간합니다.",
      },
      {
        title: "빵과 속재료 준비",
        description:
          "빵 안쪽에 머스터드를 얇게 바르고 햄과 치즈 절반을 나누어 올린 뒤 다른 빵으로 덮습니다.",
      },
      {
        title: "팬에서 바닥 굽기",
        description:
          "빵 겉면에 버터를 얇게 바르고 중약불 팬에서 양면을 1~2분씩 구워 형태를 잡습니다.",
      },
      {
        title: "베샤멜과 치즈 올리기",
        description:
          "샌드위치 위에 베샤멜을 펴 바르고 남은 치즈를 올립니다.",
      },
      {
        title: "오븐에서 마무리",
        description:
          "200도로 예열한 오븐 또는 에어프라이어에서 6~8분, 표면이 노릇해질 때까지 굽습니다.",
        tip: "치즈가 타기 전에 빵 가장자리가 바삭해졌는지 확인합니다.",
      },
    ],
    substitutions: [
      "그뤼예르가 없으면 에멘탈, 고다와 모차렐라를 섞어 사용할 수 있습니다.",
      "오븐이 없으면 팬에 뚜껑을 덮고 약불로 치즈를 녹이되 베샤멜의 수분을 줄여 사용합니다.",
    ],
    tips: [
      "베샤멜은 식으면서 더 걸쭉해지므로 팬에서 지나치게 되직하게 만들지 않습니다.",
      "햄과 치즈의 염도가 높으므로 소금은 마지막에 조절합니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: [
      "paris-boulangerie-cafe-daily-life",
      "french-regional-gastronomy",
    ],
    sources: [
      {
        label: "France.fr — French gastronomy",
        url: "https://www.france.fr/en/",
      },
    ],
    palette: {
      from: "#eee4d2",
      mid: "#dfcfae",
      to: "#cad6da",
      ink: "#4a4131",
    },
  },
  {
    slug: "french-onion-soup",
    experienceStatus: "researched",
    title: "프렌치 어니언 수프",
    country: "france",
    category: "main",
    summary:
      "양파를 충분히 갈색으로 볶아 육수와 끓인 뒤 바게트와 치즈를 올려 구워 내는 진한 수프입니다.",
    culturalNote:
      "양파 수프는 프랑스의 도시형 비스트로 음식으로 널리 알려져 있지만 지역과 가게에 따라 육수, 와인과 치즈 사용이 달라집니다.",
    cookingTime: 75,
    difficulty: "보통",
    servings: 3,
    visualLabel: "SOUPE À L’OIGNON",
    visualCaption: "CARAMELIZED ONION SOUP",
    keywords: ["양파수프", "비스트로", "그라탱"],
    ingredientGroups: [
      {
        title: "수프",
        items: [
          "양파 700g",
          "무염버터 30g",
          "올리브오일 1큰술",
          "밀가루 1큰술",
          "소고기 또는 채소 육수 900ml",
          "드라이 화이트와인 100ml 선택",
          "타임 1줄기",
          "소금과 후추",
        ],
      },
      {
        title: "토핑",
        items: [
          "바게트 6조각",
          "그뤼예르 또는 에멘탈 치즈 120g",
        ],
      },
    ],
    steps: [
      {
        title: "양파 얇게 썰기",
        description:
          "양파는 결 방향으로 3~4mm 두께로 썹니다. 두께를 일정하게 해야 갈색이 고르게 납니다.",
      },
      {
        title: "천천히 갈색 내기",
        description:
          "두꺼운 냄비에 버터와 오일을 두르고 양파와 소금 한 꼬집을 넣어 중약불에서 35~45분 볶습니다.",
        tip: "갈색으로 붙는 부분은 물 한두 숟갈로 긁어 섞되 태우지 않습니다.",
      },
      {
        title: "밀가루와 와인 넣기",
        description:
          "밀가루를 넣어 1분 볶고 와인을 사용할 경우 부어 바닥을 긁어 냅니다. 알코올을 쓰지 않으면 육수로 대체합니다.",
      },
      {
        title: "육수와 끓이기",
        description:
          "육수와 타임을 넣고 약불에서 20분 끓인 뒤 소금과 후추로 간합니다.",
      },
      {
        title: "빵과 치즈로 마무리",
        description:
          "오븐용 그릇에 수프를 담고 구운 바게트와 치즈를 올려 220도에서 5~8분 노릇하게 굽습니다.",
      },
    ],
    substitutions: [
      "화이트와인은 같은 양의 육수와 레몬즙 1작은술로 대체할 수 있습니다.",
      "오븐용 그릇이 없으면 치즈 토스트를 따로 구워 수프 위에 올립니다.",
    ],
    tips: [
      "맛의 대부분은 양파 갈색 내기에서 결정되므로 불을 높여 시간을 단축하지 않습니다.",
      "육수의 염도를 확인한 뒤 마지막에 소금을 넣습니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: [
      "paris-boulangerie-cafe-daily-life",
      "french-regional-gastronomy",
    ],
    sources: [
      {
        label: "France.fr — French gastronomy",
        url: "https://www.france.fr/en/",
      },
    ],
    palette: {
      from: "#ead9bd",
      mid: "#d5b98f",
      to: "#c9d0c0",
      ink: "#4c3929",
    },
  },
  {
    slug: "swabian-maultaschen",
    experienceStatus: "researched",
    title: "슈바벤식 마울타셴",
    country: "germany",
    category: "main",
    summary:
      "얇은 달걀 반죽에 고기와 시금치, 양파와 빵을 섞은 속을 채워 육수에 익히는 슈바벤식 큰 만두입니다.",
    culturalNote:
      "마울타셴은 슈투트가르트가 속한 슈바벤 지역을 대표하는 음식으로 소개됩니다. 속재료와 제공 방식은 가정과 식당마다 다르며, 아래 레시피는 한국에서 구하기 쉬운 재료로 구성한 가정용 버전입니다.",
    cookingTime: 100,
    difficulty: "어려움",
    servings: 4,
    visualLabel: "MAULTASCHEN",
    visualCaption: "SWABIAN FILLED PASTA",
    keywords: ["슈투트가르트", "슈바벤", "독일만두"],
    ingredientGroups: [
      {
        title: "반죽",
        items: [
          "중력분 300g",
          "달걀 3개",
          "물 1~2큰술",
          "소금 1/2작은술",
        ],
      },
      {
        title: "속재료",
        items: [
          "다진 소고기와 돼지고기 합계 250g",
          "데친 시금치 120g",
          "양파 1/2개",
          "우유에 불린 식빵 1장",
          "달걀 1개",
          "다진 파슬리 2큰술",
          "넛맥·소금·후추 약간",
        ],
      },
      {
        title: "익히기와 제공",
        items: ["저염 소고기 또는 채소 육수 1.5L", "쪽파 또는 파슬리"],
      },
    ],
    steps: [
      {
        title: "반죽 만들기",
        description:
          "밀가루, 달걀과 소금을 섞고 물을 조금씩 더해 단단한 반죽으로 치댑니다. 랩으로 감싸 30분 휴지합니다.",
      },
      {
        title: "속재료 준비",
        description:
          "양파를 잘게 다져 볶아 식힙니다. 물기를 꼭 짠 시금치와 불린 빵, 고기, 달걀, 파슬리와 향신료를 섞습니다.",
        tip: "속재료 한 숟갈을 따로 익혀 간을 확인한 뒤 반죽에 채웁니다.",
      },
      {
        title: "반죽 얇게 밀기",
        description:
          "반죽을 2~3등분해 1mm 안팎으로 얇고 길게 밉니다. 작업 중인 반죽 외에는 마르지 않게 덮어 둡니다.",
      },
      {
        title: "속을 채워 자르기",
        description:
          "반죽 절반에 속을 일정 간격으로 올리고 가장자리에 물을 바른 뒤 나머지 반죽을 덮습니다. 공기를 빼며 눌러 사각형으로 자릅니다.",
      },
      {
        title: "육수에서 익히기",
        description:
          "육수를 약하게 끓인 상태에서 마울타셴을 넣고 10~12분 익힙니다. 속 중심이 완전히 익었는지 확인합니다.",
      },
      {
        title: "육수와 함께 제공",
        description:
          "그릇에 마울타셴과 뜨거운 육수를 담고 쪽파 또는 파슬리를 올립니다.",
      },
    ],
    substitutions: [
      "생면 반죽이 어렵다면 넓은 생 라자냐 시트나 큰 만두피로 형태를 단순화할 수 있습니다.",
      "육류를 줄이고 버섯과 리코타를 더한 변형도 가능하지만 전통적인 고기 속과는 다른 창작 버전임을 표시합니다.",
    ],
    tips: [
      "다진 고기와 달걀을 다룬 도구는 즉시 세척하고 교차오염을 피합니다.",
      "완성된 마울타셴의 중심 온도가 충분히 올라가도록 익힙니다.",
      "남은 마울타셴은 완전히 식힌 뒤 냉장 보관하고 빠르게 섭취합니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["stuttgart-swabian-table", "german-abendbrot-culture"],
    sources: [
      {
        label: "Stuttgart Tourism — The culinary delights of Stuttgart",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart/schwaebische-restaurants-stuttgart",
      },
      {
        label: "Stuttgart Tourism — Culinary walks",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart",
      },
    ],
    palette: {
      from: "#eadfc8",
      mid: "#d5c09d",
      to: "#bfcdb3",
      ink: "#433d2d",
    },
  },
  {
    slug: "swabian-potato-salad",
    experienceStatus: "researched",
    title: "슈바벤식 따뜻한 감자 샐러드",
    country: "germany",
    category: "main",
    summary:
      "따뜻한 감자에 육수와 식초, 겨자 드레싱을 흡수시켜 촉촉하게 만드는 슈바벤식 감자 요리입니다.",
    culturalNote:
      "독일 감자 샐러드는 지역별 차이가 큽니다. 이 레시피는 슈투트가르트와 남서부에서 볼 수 있는 육수·식초 중심의 방향을 기준으로 하며, 마요네즈식 감자 샐러드와 구분합니다.",
    cookingTime: 45,
    difficulty: "쉬움",
    servings: 4,
    visualLabel: "KARTOFFELSALAT",
    visualCaption: "SWABIAN POTATO SALAD",
    keywords: ["슈바벤", "감자샐러드", "육수드레싱"],
    ingredientGroups: [
      {
        title: "감자",
        items: ["중간 크기 감자 800g", "소금 약간"],
      },
      {
        title: "따뜻한 드레싱",
        items: [
          "양파 1/2개",
          "따뜻한 저염 채소 또는 닭 육수 180ml",
          "화이트와인식초 3큰술",
          "디종 머스터드 1큰술",
          "설탕 1작은술",
          "식용유 2큰술",
          "후추",
          "차이브 또는 파슬리 2큰술",
        ],
      },
    ],
    steps: [
      {
        title: "감자 삶기",
        description:
          "감자는 껍질째 소금물에 넣어 중심까지 익히되 부서질 정도로 무르게 삶지 않습니다.",
      },
      {
        title: "따뜻할 때 썰기",
        description:
          "손으로 다룰 수 있을 만큼 식으면 껍질을 벗기고 5mm 안팎 두께로 썹니다.",
      },
      {
        title: "드레싱 데우기",
        description:
          "냄비에 다진 양파, 육수, 식초, 겨자와 설탕을 넣어 2~3분 끓입니다.",
      },
      {
        title: "감자에 흡수시키기",
        description:
          "따뜻한 감자에 드레싱을 나누어 부으며 부서지지 않게 섞고 15분 두어 맛을 흡수시킵니다.",
        tip: "처음에는 국물이 많아 보여도 감자가 흡수하면서 촉촉한 농도가 생깁니다.",
      },
      {
        title: "기름과 허브로 마무리",
        description:
          "식용유와 후추, 허브를 넣고 간을 맞춘 뒤 미지근한 상태로 제공합니다.",
      },
    ],
    substitutions: [
      "화이트와인식초는 사과식초로 바꿀 수 있습니다.",
      "채식 버전은 채소 육수를 사용합니다.",
    ],
    tips: [
      "육수의 염도를 먼저 확인한 뒤 소금을 추가합니다.",
      "냉장 후에는 굳을 수 있으므로 먹기 전에 실온에 잠시 둡니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["stuttgart-swabian-table", "german-abendbrot-culture"],
    sources: [
      {
        label: "Stuttgart Tourism — Restaurants, bars and cafés",
        url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart",
      },
      {
        label: "Germany Travel — Regional German cuisine",
        url: "https://www.germany.travel/en/experience-enjoy/german-cuisine.html",
      },
    ],
    palette: {
      from: "#ede1c7",
      mid: "#d9c49e",
      to: "#c1cfb6",
      ink: "#45412e",
    },
  },
  {
    slug: "swiss-cheese-fondue",
    experienceStatus: "researched",
    title: "스위스 치즈 퐁뒤",
    country: "switzerland",
    category: "main",
    summary:
      "그뤼예르와 에멘탈 치즈를 부드럽게 녹여 빵을 찍어 먹는 스위스식 공동 식사 메뉴입니다.",
    culturalNote:
      "퐁뒤의 치즈 조합은 지역과 가정에 따라 달라집니다. 이 레시피는 한국에서 구하기 비교적 쉬운 그뤼예르와 에멘탈 조합을 사용합니다.",
    cookingTime: 30,
    difficulty: "보통",
    servings: 4,
    visualLabel: "FONDUE SUISSE",
    visualCaption: "MELTED CHEESE POT",
    keywords: ["스위스요리", "치즈퐁뒤", "공유식탁"],
    ingredientGroups: [
      {
        title: "치즈 베이스",
        items: [
          "그뤼예르 치즈 250g",
          "에멘탈 치즈 200g",
          "드라이 화이트와인 300ml",
          "옥수수전분 1큰술",
          "마늘 1쪽",
          "레몬즙 1작은술",
          "후추와 넛맥 약간",
        ],
      },
      {
        title: "곁들임",
        items: ["하루 지난 바게트 또는 단단한 빵 500g", "삶은 감자와 피클 선택"],
      },
    ],
    steps: [
      {
        title: "냄비에 마늘 향 내기",
        description:
          "마늘 단면으로 두꺼운 냄비 또는 퐁뒤 냄비 안쪽을 문지릅니다.",
      },
      {
        title: "치즈에 전분 묻히기",
        description:
          "치즈를 굵게 갈고 옥수수전분과 고르게 섞습니다.",
      },
      {
        title: "와인 데우기",
        description:
          "냄비에 와인과 레몬즙을 넣고 중약불에서 가장자리에 작은 기포가 생길 정도로 데웁니다.",
      },
      {
        title: "치즈 나누어 녹이기",
        description:
          "치즈를 세 번에 나누어 넣고 매번 완전히 녹을 때까지 8자 모양으로 저어 줍니다.",
        tip: "강하게 끓이면 치즈와 지방이 분리될 수 있으므로 낮은 온도를 유지합니다.",
      },
      {
        title: "식탁에서 따뜻하게 유지하기",
        description:
          "후추와 넛맥으로 간한 뒤 약한 워머 위에 올리고 2~3cm 크기로 자른 빵을 찍어 먹습니다.",
      },
    ],
    substitutions: [
      "화이트와인을 쓰지 않으려면 무알코올 사과주스 200ml와 저염 채소 육수 100ml, 레몬즙을 사용합니다.",
      "에멘탈 대신 바슈랭을 사용하면 더 부드러운 질감을 낼 수 있습니다.",
    ],
    tips: [
      "치즈는 미리 갈아 실온에 15분 두면 더 고르게 녹습니다.",
      "너무 되직하면 따뜻한 와인이나 육수를 한 숟갈씩 추가합니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["jungfrau-alpine-cuisine", "swiss-fondue-shared-table"],
    sources: [
      {
        label: "Switzerland Tourism — Cheese fondue",
        url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/",
      },
    ],
    palette: {
      from: "#f1ead3",
      mid: "#e4d3a8",
      to: "#c9d9d5",
      ink: "#4a4733",
    },
  },
  {
    slug: "swiss-rosti",
    experienceStatus: "researched",
    title: "스위스식 뢰스티",
    country: "switzerland",
    category: "main",
    summary:
      "굵게 간 감자를 팬에서 둥글고 바삭하게 구워 내는 스위스의 대표적인 감자 요리입니다.",
    culturalNote:
      "뢰스티는 생감자 또는 미리 익힌 감자를 사용하는 방식이 모두 존재합니다. 이 레시피는 형태를 잡기 쉬운 전날 삶은 감자 방식을 사용합니다.",
    cookingTime: 40,
    difficulty: "보통",
    servings: 3,
    visualLabel: "RÖSTI",
    visualCaption: "CRISP POTATO CAKE",
    keywords: ["뢰스티", "감자요리", "스위스식탁"],
    ingredientGroups: [
      {
        title: "기본 재료",
        items: [
          "감자 700g",
          "소금 1/2작은술",
          "후추 약간",
          "무염버터 20g",
          "식용유 1큰술",
        ],
      },
      {
        title: "선택 곁들임",
        items: ["달걀 프라이", "사워크림", "다진 차이브"],
      },
    ],
    steps: [
      {
        title: "감자 미리 익히기",
        description:
          "감자를 껍질째 10~12분 삶아 겉은 익고 중심은 단단한 상태로 만든 뒤 완전히 식혀 냉장합니다.",
      },
      {
        title: "굵게 갈기",
        description:
          "껍질을 벗긴 감자를 굵은 강판에 갈고 소금과 후추를 가볍게 섞습니다.",
      },
      {
        title: "팬에 눌러 굽기",
        description:
          "팬에 버터 절반과 기름을 두르고 감자를 1.5~2cm 두께의 원형으로 눌러 중약불에서 10~12분 굽습니다.",
      },
      {
        title: "뒤집어 마무리",
        description:
          "접시를 이용해 감자를 뒤집고 남은 버터를 넣어 반대쪽도 8~10분 노릇하게 굽습니다.",
        tip: "굽는 동안 자주 움직이지 않아야 단단한 갈색 껍질이 생깁니다.",
      },
    ],
    substitutions: [
      "버터 대신 식용유만 사용할 수 있지만 향은 달라집니다.",
      "전날 삶은 감자가 없다면 생감자를 갈아 물기를 충분히 짠 뒤 조금 더 오래 굽습니다.",
    ],
    tips: [
      "감자는 완전히 식힌 뒤 갈아야 서로 뭉개지지 않습니다.",
      "작은 팬을 사용하면 두께와 모양을 잡기 쉽습니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["jungfrau-alpine-cuisine", "swiss-fondue-shared-table"],
    sources: [
      {
        label: "Switzerland Tourism — Rösti",
        url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/",
      },
    ],
    palette: {
      from: "#efe4c8",
      mid: "#dec597",
      to: "#c7d5ca",
      ink: "#4c432d",
    },
  },
  {
    slug: "roman-cacio-e-pepe",
    experienceStatus: "researched",
    title: "로마식 카초 에 페페",
    country: "italy",
    category: "main",
    summary:
      "페코리노 로마노와 검은 후추, 면수만으로 크림 같은 질감을 만드는 로마의 대표적인 파스타입니다.",
    culturalNote:
      "카초 에 페페는 재료 수가 적지만 치즈가 뭉치지 않도록 온도와 전분 농도를 조절하는 기술이 핵심입니다.",
    cookingTime: 25,
    difficulty: "보통",
    servings: 2,
    visualLabel: "CACIO E PEPE",
    visualCaption: "PECORINO · PEPPER · PASTA",
    keywords: ["로마파스타", "페코리노로마노", "유화"],
    ingredientGroups: [
      {
        title: "파스타",
        items: [
          "스파게티 또는 톤나렐리 200g",
          "페코리노 로마노 곱게 간 것 100g",
          "통후추 1과 1/2작은술",
          "소금",
          "면수 약 180ml",
        ],
      },
    ],
    steps: [
      {
        title: "후추 볶기",
        description:
          "통후추를 굵게 부수어 마른 팬에서 30초 향을 낸 뒤 면수 2큰술을 넣어 둡니다.",
      },
      {
        title: "파스타 삶기",
        description:
          "평소보다 소금을 적게 넣은 물에 파스타를 알덴테보다 2분 덜 삶습니다. 면수는 넉넉히 남깁니다.",
      },
      {
        title: "치즈 크림 만들기",
        description:
          "불을 끈 상태에서 페코리노에 미지근한 면수를 조금씩 넣어 되직하고 매끈한 크림을 만듭니다.",
        tip: "뜨거운 물을 한꺼번에 넣으면 치즈 단백질이 뭉칠 수 있습니다.",
      },
      {
        title: "팬에서 면 마무리",
        description:
          "후추 팬에 면과 면수를 넣어 남은 익힘을 진행한 뒤 불에서 내려 20~30초 식힙니다.",
      },
      {
        title: "치즈와 빠르게 섞기",
        description:
          "치즈 크림을 넣고 집게로 빠르게 섞어 소스가 면을 감싸게 합니다. 필요하면 면수를 한 숟갈씩 추가합니다.",
      },
    ],
    substitutions: [
      "페코리노 로마노가 너무 짜면 일부를 파르미자노 레지아노로 바꿀 수 있지만 맛은 달라집니다.",
      "톤나렐리가 없으면 표면이 거친 스파게티를 사용합니다.",
    ],
    tips: [
      "치즈를 아주 곱게 갈아야 물과 빠르게 섞입니다.",
      "면 삶는 물의 소금은 치즈 염도를 고려해 적게 넣습니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["roman-pasta-simplicity", "rome-vatican-food-route"],
    sources: [
      {
        label: "Turismo Roma — Spaghetti cacio e pepe",
        url: "https://www.turismoroma.it/en/1042013-spaghetti-cacio-e-pepe",
      },
    ],
    palette: {
      from: "#f0e1bf",
      mid: "#dec38e",
      to: "#c7d4b8",
      ink: "#4d4126",
    },
  },
  {
    slug: "roman-carbonara",
    experienceStatus: "researched",
    title: "로마식 카르보나라",
    country: "italy",
    category: "main",
    summary:
      "구안찰레의 지방, 달걀과 페코리노 로마노를 면수로 연결해 만드는 로마식 파스타입니다.",
    culturalNote:
      "이 레시피는 생크림을 사용하지 않고 달걀, 치즈와 구안찰레의 지방으로 소스를 만드는 로마식 방향을 기준으로 합니다.",
    cookingTime: 30,
    difficulty: "보통",
    servings: 2,
    visualLabel: "CARBONARA",
    visualCaption: "EGG · PECORINO · GUANCIALE",
    keywords: ["카르보나라", "로마파스타", "구안찰레"],
    ingredientGroups: [
      {
        title: "파스타",
        items: [
          "스파게티 또는 리가토니 200g",
          "구안찰레 100g",
          "달걀노른자 3개",
          "달걀 1개",
          "페코리노 로마노 70g",
          "통후추 1작은술",
          "소금",
          "면수 약 150ml",
        ],
      },
    ],
    steps: [
      {
        title: "달걀 치즈 혼합물 만들기",
        description:
          "볼에 노른자와 달걀, 곱게 간 페코리노와 후추를 넣어 되직하게 섞습니다.",
      },
      {
        title: "구안찰레 지방 내기",
        description:
          "구안찰레를 막대 모양으로 썰어 차가운 팬에서 중약불로 천천히 익혀 지방을 충분히 냅니다.",
      },
      {
        title: "파스타 삶기",
        description:
          "치즈와 구안찰레가 짜므로 소금을 적게 넣은 물에 파스타를 알덴테로 삶고 면수를 남깁니다.",
      },
      {
        title: "팬에서 면과 지방 섞기",
        description:
          "파스타를 구안찰레 팬에 옮겨 지방과 면수 2큰술을 넣고 30초 섞은 뒤 불을 끕니다.",
      },
      {
        title: "잔열로 소스 완성",
        description:
          "팬을 30초 식힌 뒤 달걀 혼합물을 넣고 빠르게 섞습니다. 면수를 조금씩 더해 윤기 있는 소스로 만듭니다.",
        tip: "팬이 너무 뜨거우면 달걀이 스크램블처럼 익으므로 반드시 불에서 내려 작업합니다.",
      },
    ],
    substitutions: [
      "구안찰레가 없으면 판체타를 사용할 수 있지만 훈연 베이컨은 향이 크게 달라집니다.",
      "페코리노가 강하면 일부를 파르미자노로 섞을 수 있습니다.",
    ],
    tips: [
      "살균 달걀을 사용하고 완성 즉시 먹습니다.",
      "면수는 한꺼번에 넣지 말고 소스 농도를 보며 추가합니다.",
    ],
    publishedAt: "2026-09-11",
    relatedStorySlugs: ["roman-pasta-simplicity", "rome-vatican-food-route"],
    sources: [
      {
        label: "Turismo Roma — Food and Wine",
        url: "https://www.turismoroma.it/en/taxonomy/term/54",
      },
    ],
    palette: {
      from: "#f0dfbd",
      mid: "#d9ba82",
      to: "#c7d0ae",
      ink: "#4a3b25",
    },
  },

  {
    slug: "club-suyuk-platter",
    experienceStatus: "researched",
    title: "요리동아리 수육 한 상",
    country: "korea",
    category: "main",
    summary:
      "수육과 라면을 함께 먹는 15명 기준으로 돼지고기 3.2kg을 두 냄비에 나누어 삶고 알배추, 김치와 무말랭이를 곁들이는 단체 조리용 레시피입니다.",
    culturalNote:
      "수육은 돼지고기나 소고기 덩어리를 삶아 얇게 썰어 내는 한국식 고기 요리입니다. 이 레시피는 한 가정의 소량 조리법이 아니라 요리동아리 15명이 함께 준비하고 바로 나누어 먹을 수 있도록 냄비 분할, 휴지 시간과 상차림 분량을 포함한 운영형 버전입니다.",
    cookingTime: 100,
    difficulty: "보통",
    servings: 15,
    visualLabel: "수육 한 상",
    visualCaption: "EAT CLUB · 15 SERVINGS",
    keywords: ["요리동아리", "15인분", "단체요리", "수육"],
    ingredientGroups: [
      {
        title: "돼지고기",
        items: [
          "통삼겹살 1.6kg",
          "돼지 앞다리살 또는 목살 1.6kg",
          "고기가 잠길 정도의 물 약 6~7L(냄비 크기에 따라 조절)",
        ],
      },
      {
        title: "삶는 향신 재료",
        items: [
          "된장 6큰술",
          "양파 3개(반으로 자르기)",
          "대파 4대(큰 토막)",
          "통마늘 30쪽",
          "생강 50g(편으로 썰기)",
          "통후추 2큰술",
          "맛술 250ml",
          "진간장 4큰술",
          "월계수잎 6장(선택)",
        ],
      },
      {
        title: "상차림 곁들임",
        items: [
          "알배추 작은 것 3통",
          "배추김치 1.2kg",
          "무말랭이무침 600g",
          "쌈장 500g",
          "새우젓 250g",
          "편마늘 250g",
          "청양고추 15개",
        ],
      },
    ],
    steps: [
      {
        title: "냄비와 고기를 두 조로 나누기",
        description:
          "10L 안팎의 큰 냄비 2개에 삼겹살과 앞다리살을 절반씩 나눕니다. 고기 덩어리가 너무 크면 700~800g 정도가 되도록 잘라 두께를 비슷하게 맞춥니다.",
        tip: "한 냄비에 고기를 몰아 넣으면 끓는 온도가 크게 내려가고 익는 시간이 달라지므로 두 냄비로 나누는 것이 안정적입니다.",
      },
      {
        title: "향신 육수 끓이기",
        description:
          "각 냄비에 물과 향신 재료를 절반씩 넣고 된장이 완전히 풀리도록 저은 뒤 센 불에서 끓입니다.",
      },
      {
        title: "고기를 넣고 다시 끓이기",
        description:
          "육수가 팔팔 끓으면 고기를 넣습니다. 다시 끓기 시작하면 떠오르는 거품을 걷고 중약불로 낮춥니다.",
      },
      {
        title: "60~70분 천천히 삶기",
        description:
          "뚜껑을 반쯤 덮고 60~70분 삶습니다. 30분이 지나면 고기의 위아래를 바꾸고 물이 부족하면 뜨거운 물을 추가합니다.",
        tip: "가장 두꺼운 고기의 중심온도가 75℃ 이상에서 1분 이상 유지됐는지 확인합니다.",
      },
      {
        title: "10~15분 휴지하기",
        description:
          "익은 고기를 건져 포일이나 뚜껑을 느슨하게 덮고 10~15분 둡니다. 바로 자르는 것보다 육즙이 안정되고 모양이 덜 부서집니다.",
      },
      {
        title: "먹기 직전에 썰어 상차림하기",
        description:
          "결 반대 방향으로 약 7~8mm 두께로 썰어 넓은 접시에 담습니다. 알배추, 김치, 무말랭이, 쌈장과 새우젓을 구역별로 나누어 함께 냅니다.",
        tip: "먼저 먹을 분량만 썰고 남은 고기는 덩어리째 따뜻하게 보관하면 표면이 덜 마릅니다.",
      },
    ],
    substitutions: [
      "기름진 맛을 줄이려면 통삼겹살을 1kg으로 줄이고 앞다리살을 2.2kg으로 늘립니다.",
      "맛술은 청주나 물로 대체할 수 있으며, 월계수잎은 없어도 됩니다.",
      "무말랭이 대신 보쌈김치나 겉절이를 준비해도 됩니다.",
    ],
    tips: [
      "조리 시작 전에 수육팀, 상차림팀과 라면팀으로 역할을 나누면 마지막 20분에 작업이 몰리지 않습니다.",
      "대량 조리한 수육은 가능한 한 조리 후 2시간 이내 제공하고, 바로 먹지 않으면 따뜻한 상태는 60℃ 이상 또는 차갑게 보관할 때는 5℃ 이하를 유지합니다.",
      "남은 고기는 얕은 용기에 나누어 빠르게 식힌 뒤 냉장 보관하고, 다시 먹을 때 중심까지 충분히 재가열합니다.",
    ],
    publishedAt: "2026-09-13",
    relatedStorySlugs: ["korean-banchan-culture"],
    sources: [
      {
        label: "VISITKOREA — 수육",
        url: "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=178486",
      },
      {
        label: "식품안전나라 — 대량 조리 음식 식중독 주의 요령",
        url: "https://www.foodsafetykorea.go.kr/portal/sympathyplus/infographicDetail.do?bbs_no=bbs001&menu_no=2892&ntctxt_no=1089474",
      },
    ],
    palette: {
      from: "#efe2d4",
      mid: "#dfc4a8",
      to: "#c9d6c2",
      ink: "#493425",
    },
  },
  {
    slug: "club-bean-sprout-egg-ramyeon",
    experienceStatus: "researched",
    title: "요리동아리 숙주 계란 라면",
    country: "korea",
    category: "main",
    summary:
      "수육과 함께 먹는 15명 기준으로 라면 12봉을 4봉씩 세 번 나누어 끓이고, 숙주와 풀어 넣은 계란으로 식감과 포만감을 더하는 단체 조리 레시피입니다.",
    culturalNote:
      "숙주와 계란을 넣은 라면은 정해진 전통 음식이라기보다 즉석면을 인원과 취향에 맞게 확장한 생활 요리입니다. 동아리 조리에서는 한 냄비에 전량을 넣는 것보다 4봉 단위로 나누어 면의 익힘을 맞추고 완성되는 즉시 제공하는 운영 방식이 더 중요합니다.",
    cookingTime: 35,
    difficulty: "쉬움",
    servings: 15,
    visualLabel: "숙주 계란 라면",
    visualCaption: "EAT CLUB · 3 BATCHES",
    keywords: ["요리동아리", "15인분", "라면", "숙주", "계란"],
    ingredientGroups: [
      {
        title: "라면 기본",
        items: [
          "봉지라면 12봉(수육과 함께 먹는 기준, 라면이 주식이면 15봉)",
          "제품 표기 물 총량의 약 90%(12봉 기준 대략 5.8~6.0L, 제품별 조절)",
          "동봉된 분말스프와 건더기스프 전량",
        ],
      },
      {
        title: "추가 재료",
        items: [
          "숙주 1kg",
          "계란 8개",
          "대파 4대",
          "청양고추 8개(선택)",
          "다진 마늘 2큰술(선택)",
        ],
      },
      {
        title: "한 번 끓일 분량 · 총 3회",
        items: [
          "라면 4봉",
          "숙주 약 330g",
          "계란 2~3개",
          "대파와 청양고추 전체의 1/3",
          "라면 4봉에 해당하는 표기 물의 약 90%",
        ],
      },
    ],
    steps: [
      {
        title: "숙주와 고명을 세 묶음으로 나누기",
        description:
          "숙주는 흐르는 물에 두세 번 씻어 물기를 빼고 약 330g씩 세 묶음으로 나눕니다. 대파와 청양고추도 세 등분해 둡니다.",
      },
      {
        title: "계란은 가볍게 풀어 두기",
        description:
          "계란 8개를 한 그릇에 깨서 흰자와 노른자가 섞일 정도로만 풉니다. 매 회차마다 1/3씩 사용할 수 있도록 국자나 계량컵을 준비합니다.",
      },
      {
        title: "첫 번째 4봉 끓이기",
        description:
          "냄비에 4봉 분량 물의 약 90%와 건더기스프를 넣어 끓입니다. 끓으면 분말스프와 면 4개를 넣고 젓가락으로 면을 풀어 줍니다.",
        tip: "숙주에서 수분이 나오므로 처음부터 제품 표기 물을 모두 넣지 말고, 마지막에 간을 보며 뜨거운 물을 보충합니다.",
      },
      {
        title: "숙주와 계란 넣기",
        description:
          "제품 권장 조리시간이 약 1분 30초 남았을 때 숙주 330g을 넣습니다. 30초 뒤 계란 1/3을 원을 그리듯 부은 뒤 크게 한두 번만 저어 부드러운 덩어리를 만듭니다.",
      },
      {
        title: "파와 고추로 마무리해 즉시 제공",
        description:
          "면이 원하는 익힘이 되면 대파와 청양고추를 넣고 10~20초 더 끓입니다. 준비한 그릇에 바로 나누어 담습니다.",
      },
      {
        title: "같은 방식으로 두 번 더 조리",
        description:
          "첫 회차를 배식하는 동안 다음 냄비를 끓입니다. 가능하면 버너와 냄비 2개를 번갈아 사용해 세 회차의 대기 시간을 줄입니다.",
        tip: "12봉을 한 냄비에 한꺼번에 끓이면 면을 고르게 풀기 어렵고 먼저 익은 면이 불기 쉬우므로 4봉씩 나누는 것을 권장합니다.",
      },
    ],
    substitutions: [
      "숙주 식감을 약하게 하고 싶으면 800g으로 줄입니다.",
      "계란을 개별로 넣고 싶으면 12개를 준비해 각 회차에 4개씩 넣습니다.",
      "라면을 단독 식사로 제공하면 15봉과 숙주 1.2kg으로 늘리고 5봉씩 세 번 끓입니다.",
    ],
    tips: [
      "라면을 끓이기 전에 그릇 15개, 젓가락, 국자와 받침대를 먼저 배치해야 완성된 면이 기다리지 않습니다.",
      "수육을 써는 시간과 첫 라면 조리 시작을 맞추면 두 메뉴를 함께 따뜻하게 낼 수 있습니다.",
      "완성된 라면은 보관하지 말고 즉시 먹으며, 남은 국물을 실온에 오래 두지 않습니다.",
    ],
    publishedAt: "2026-09-13",
    relatedStorySlugs: [],
    sources: [
      {
        label: "식품안전나라 — 대량 조리 음식 식중독 주의 요령",
        url: "https://www.foodsafetykorea.go.kr/portal/sympathyplus/infographicDetail.do?bbs_no=bbs001&menu_no=2892&ntctxt_no=1089474",
      },
    ],
    palette: {
      from: "#f3dfbd",
      mid: "#e1b96f",
      to: "#c8d8b3",
      ink: "#47351f",
    },
  },
];

export const countrySlugs = countries.map((country) => country.slug);
export const storySlugs = stories.map((story) => story.slug);
export const recipeSlugs = recipes.map((recipe) => recipe.slug);

export function getCountry(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getCountryStories(country: CountrySlug) {
  return stories.filter((story) => story.country === country);
}

export function getCountryRecipes(country: CountrySlug) {
  return recipes.filter((recipe) => recipe.country === country);
}

export function getCountriesByContinent(continent: Continent) {
  return countries.filter((country) => country.continent === continent);
}

export function getStoriesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getStory(slug))
    .filter((story): story is Story => Boolean(story));
}

export function getRecipesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getRecipe(slug))
    .filter((recipe): recipe is Recipe => Boolean(recipe));
}
