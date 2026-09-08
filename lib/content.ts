export type CountrySlug =
  | "korea"
  | "japan"
  | "china"
  | "hong-kong"
  | "vietnam"
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

export type Country = {
  slug: CountrySlug;
  nameKo: string;
  nameEn: string;
  eyebrow: string;
  headline: string;
  summary: string;
  introduction: string[];
  representativeFlavors: string[];
  mainIngredients: string[];
  foodCulture: string[];
  representativeFoods: string[];
  storySlugs: string[];
  recipeSlugs: string[];
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
  slug: string;
  title: string;
  country: CountrySlug;
  category: RecipeCategory;
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

export const countries: Country[] = [
  {
    slug: "korea",
    nameKo: "한국",
    nameEn: "KOREA",
    eyebrow: "RICE · SOUP · BANCHAN",
    headline: "밥과 국, 여러 반찬을 함께 나누는 식탁",
    summary:
      "한국의 식탁은 밥과 국, 김치와 반찬이 서로 관계를 이루는 한 상 차림을 중심으로 발전했습니다.",
    introduction: [
      "한국 음식은 한 가지 대표 메뉴만으로 설명하기 어렵습니다. 밥을 중심에 두고 국이나 찌개, 김치와 여러 반찬을 함께 놓는 구성 자체가 식사의 중요한 특징입니다.",
      "발효 장류와 저장 음식, 계절에 따라 달라지는 나물과 국물 요리는 지역과 가정의 생활방식을 보여 줍니다. 다만 오늘날의 식사는 1인 가구, 외식, 배달 문화의 영향으로 매우 다양한 형태를 갖습니다.",
    ],
    representativeFlavors: ["발효의 깊은 맛", "국물의 감칠맛", "매콤달콤한 양념"],
    mainIngredients: ["쌀", "콩과 장류", "배추와 무", "제철 나물", "돼지고기"],
    foodCulture: ["한 상 차림", "반찬을 나누는 식사", "김장과 저장 음식", "시장 먹거리"],
    representativeFoods: ["김치", "비빔밥", "불고기", "순대볶음"],
    storySlugs: ["korean-banchan-culture", "korean-market-food"],
    recipeSlugs: ["osam-bulgogi", "korean-sundae-bokkeum"],
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
    eyebrow: "SEASON · INGREDIENT · BALANCE",
    headline: "계절과 재료의 특징을 세심하게 살피는 식탁",
    summary:
      "일본의 전통적 식문화에서는 제철 재료, 조리법의 균형, 그릇과 배치를 중요하게 다루는 경향이 있습니다.",
    introduction: [
      "일본의 식문화는 쌀, 생선, 채소와 산나물 등 지역에서 얻은 재료를 활용해 왔습니다. 지역마다 기후와 생산물이 달라 향토 음식의 차이도 큽니다.",
      "가정식, 편의점 식사, 라멘 전문점, 이자카야처럼 현대 일본의 식사 공간은 매우 다양합니다. 이 페이지에서는 하나의 전형으로 단정하기보다 음식이 놓이는 상황과 지역 차이를 함께 살펴봅니다.",
    ],
    representativeFlavors: ["다시의 감칠맛", "간장과 된장의 풍미", "제철 재료의 담백함"],
    mainIngredients: ["쌀", "생선", "다시 재료", "간장", "제철 채소"],
    foodCulture: ["와쇼쿠", "향토 음식", "이자카야", "도시형 간편식"],
    representativeFoods: ["스시", "미소시루", "오코노미야키", "라멘"],
    storySlugs: ["japanese-izakaya-culture"],
    recipeSlugs: ["japanese-beef-bean-sprout-stir-fry"],
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
    eyebrow: "REGION · FIRE · AROMA",
    headline: "넓은 지역만큼 다양한 재료와 조리법의 식탁",
    summary:
      "중국 음식은 지역의 기후와 산물에 따라 향신료, 기름, 발효, 불의 사용 방식이 크게 달라집니다.",
    introduction: [
      "중국의 식문화를 하나의 맛으로 묶기는 어렵습니다. 쓰촨의 복합적인 매운맛, 후난의 선명한 매운맛과 산미, 광둥의 재료 중심 조리처럼 지역별 특징이 뚜렷합니다.",
      "볶기, 찌기, 삶기, 튀기기와 같은 조리법은 같은 재료도 전혀 다른 음식으로 바꿉니다. 이 페이지에서는 특정 지역의 특징을 중국 전체의 보편적인 모습으로 확대하지 않도록 구분해 소개합니다.",
    ],
    representativeFlavors: ["마라의 얼얼함", "발효 조미료의 깊이", "센 불에서 만든 향"],
    mainIngredients: ["쌀과 밀", "돼지고기", "두부", "채소", "향신료"],
    foodCulture: ["지역 요리", "공유하는 원형 식탁", "차 문화", "야시장과 길거리 음식"],
    representativeFoods: ["마라샹궈", "훠궈", "딤섬", "면 요리"],
    storySlugs: ["chinese-regional-spiciness"],
    recipeSlugs: ["mala-xiang-guo"],
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
    eyebrow: "CANTONESE · BRITISH · CITY",
    headline: "동서양의 조리법이 빠른 도시 생활과 만난 식탁",
    summary:
      "홍콩에서는 광둥식 전통과 영국 통치기의 영향, 빠른 도시 생활이 한 메뉴판 안에서 교차합니다.",
    introduction: [
      "차찬텡에서는 밀크티, 토스트, 마카로니 수프, 면과 볶음밥을 함께 만날 수 있습니다. 서로 다른 문화권에서 시작된 재료가 홍콩의 속도와 취향에 맞게 재구성된 결과입니다.",
      "얌차와 딤섬, 광둥식 구이와 해산물 요리도 홍콩 식문화의 중요한 축입니다. 이 페이지에서는 관광용 이미지에 머물지 않고 일상적인 식사 공간과 메뉴 조합을 중심으로 살펴봅니다.",
    ],
    representativeFlavors: ["간장과 육수의 감칠맛", "차와 우유의 진한 풍미", "구이의 단짠 양념"],
    mainIngredients: ["쌀과 면", "돼지고기", "해산물", "차", "연유와 무가당 연유"],
    foodCulture: ["차찬텡", "얌차와 딤섬", "도시형 아침 식사", "늦은 시간의 간편식"],
    representativeFoods: ["딤섬", "완탕면", "마카로니 수프", "밀크티"],
    storySlugs: ["hong-kong-cha-chaan-teng", "hong-kong-macaroni-soup"],
    recipeSlugs: ["hong-kong-macaroni-soup", "hong-kong-milk-tea"],
    palette: {
      from: "#ecdac3",
      mid: "#dfcfb9",
      to: "#c8d6ca",
      ink: "#2e4137",
    },
  },
  {
    slug: "vietnam",
    nameKo: "베트남",
    nameEn: "VIETNAM",
    eyebrow: "RICE · HERBS · BALANCE",
    headline: "쌀과 허브, 산미와 감칠맛이 균형을 이루는 식탁",
    summary:
      "베트남 음식은 쌀과 면, 신선한 허브, 피시소스를 바탕으로 지역별로 다른 균형을 만듭니다.",
    introduction: [
      "베트남의 북부, 중부, 남부는 기후와 역사적 교류가 달라 같은 음식도 국물, 허브, 단맛의 정도가 다르게 나타납니다.",
      "쌀국수와 반미는 아침이나 간단한 한 끼로 널리 접할 수 있지만, 모든 지역과 가정이 같은 방식으로 먹는 것은 아닙니다. 시장과 노점, 전문점, 가정식의 차이도 함께 볼 필요가 있습니다.",
    ],
    representativeFlavors: ["피시소스의 감칠맛", "라임과 식초의 산미", "생허브의 향"],
    mainIngredients: ["쌀과 쌀국수", "피시소스", "허브", "돼지고기", "라임"],
    foodCulture: ["거리의 아침 식사", "지역별 쌀국수", "허브를 곁들이는 식사", "커피 문화"],
    representativeFoods: ["퍼", "반미", "분짜", "고이꾸온"],
    storySlugs: ["vietnamese-breakfast-culture"],
    recipeSlugs: ["vietnamese-banh-mi"],
    palette: {
      from: "#deead0",
      mid: "#cbdcb8",
      to: "#aec795",
      ink: "#2e4a24",
    },
  },
  {
    slug: "italy",
    nameKo: "이탈리아",
    nameEn: "ITALY",
    eyebrow: "REGION · SEASON · CONVIVIALITY",
    headline: "지역의 재료와 함께 식사하는 시간을 중시하는 식탁",
    summary:
      "이탈리아의 음식은 도시와 지역, 가정마다 다른 조리법을 지니며 식탁에서 나누는 시간과 긴밀하게 연결됩니다.",
    introduction: [
      "이탈리아 음식은 ‘파스타와 피자’라는 이미지보다 훨씬 넓습니다. 북부의 쌀과 버터, 중부의 밀과 육류, 남부의 토마토와 올리브오일처럼 지역 산물이 요리의 성격을 만듭니다.",
      "같은 이름의 음식도 지역과 가족에 따라 조리법이 달라질 수 있습니다. 식탁은 음식을 먹는 장소이면서 대화와 기억, 세대 간 기술 전승이 일어나는 공간으로 다뤄집니다.",
    ],
    representativeFlavors: ["올리브오일의 향", "치즈의 숙성 풍미", "토마토의 산미와 단맛"],
    mainIngredients: ["밀과 파스타", "올리브오일", "토마토", "치즈", "지역 채소"],
    foodCulture: ["지역 요리", "가족 식사", "코스 구성", "커피와 디저트"],
    representativeFoods: ["파스타", "리소토", "피자", "티라미수"],
    storySlugs: ["italian-family-table"],
    recipeSlugs: ["italian-tiramisu"],
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
];

export const recipes: Recipe[] = [
  {
    slug: "hong-kong-macaroni-soup",
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
