import type { Country } from "./content";
import type { products } from "./atlas-products";

export type AtlasGroup = "visited" | "popular" | "discovery" | "home";
export const groupLabels: Record<AtlasGroup, string> = {
  visited: "직접 다녀온 곳", popular: "인기 여행지", discovery: "문화 추천지", home: "홈베이스",
};

type TableEntry = {
  slug: string;
  name: string;
  english: string;
  code: string;
  point: [number, number];
  place: string;
  recommend?: "popular" | "discovery";
  dish: string;
  ingredients: string;
  activity: string;
  mood: string;
  notes: string;
  diffuser: string;
  candle: string;
  perfume: string;
  product: keyof typeof products;
  source: { label: string; url: string };
};

export type AtlasRegion = Country["continent"] | "south-america" | "africa";

export type AtlasTable = TableEntry & {
  group: AtlasGroup;
  region: AtlasRegion;
  headline: string;
  summary: string;
  tags: string[];
  cover: { eyebrow: string; caption: string; palette: Country["palette"] };
  archive?: {
    places: string[];
    regions: number;
    stories: number;
    recipes: number;
    updatedAt: string;
  };
};

export const tableEntries: TableEntry[] = [
  {
    slug: "italy", name: "이탈리아", english: "Italy", code: "ITA",
    point: [11.34, 44.49], place: "볼로냐",
    dish: "탈리아텔레 알 라구", ingredients: "생면 · 라구 · 파르미자노",
    activity: "볼로냐에서는 넓적한 달걀면에 고기 라구를 곁들여요. 두 사람이 반죽 하나를 밀고, 리본처럼 썬 면을 한 접시에 나눠 담아 보세요.",
    mood: "밀가루 묻은 나무판과 긴 식탁. 붉은 체크 냅킨 위에 각자 만든 면을 한 가닥씩 놓고 굵기를 비교해요.",
    notes: "바질 · 만다린",
    diffuser: "바질잎과 만다린 껍질", candle: "무화과 잎과 마른 나무", perfume: "베르가못과 네롤리",
    product: "lime", source: { label: "볼로냐 관광청의 탈리아텔레", url: "https://www.bolognawelcome.com/it/altro/altro/tagliatelle-al-ragu" },
  },
  {
    slug: "japan", name: "일본", english: "Japan", code: "JPN",
    point: [139.7, 35.7], place: "일본 가정식",
    dish: "오니기리", ingredients: "쌀 · 김 · 우메보시",
    activity: "손바닥으로 밥을 살짝 모아 삼각형이나 둥근 모양을 빚어요. 매실절임과 연어 속을 각각 넣고, 김을 먹기 직전에 감싼 것과 미리 감싼 것의 식감을 비교해요.",
    mood: "밝은 나무 쟁반에 작은 밥공기를 놓고, 갓 지은 밥에서 김이 오르는 동안 잠시 조용히 기다려요.",
    notes: "편백 · 풋유자",
    diffuser: "풋유자 껍질", candle: "편백과 마른 솔잎", perfume: "사이프러스와 시더",
    product: "hinoki", source: { label: "일본 농림수산성의 오니기리", url: "https://www.maff.go.jp/e/policies/market/japan-cuisine/japan/7/index.html" },
  },
  {
    slug: "china", name: "중국", english: "China", code: "CHN",
    point: [121.45, 31.23], place: "상하이 난샹",
    dish: "샤오룽바오", ingredients: "얇은 피 · 돼지고기 · 육즙",
    activity: "상하이 난샹식 샤오룽바오는 속에 넣은 육수 젤리가 찌는 동안 녹아요. 짝과 함께 만두피를 밀고 주름을 잡은 뒤, 한 숟가락에 담아 육즙을 맛봐요.",
    mood: "둥근 상 한가운데 대나무 찜기를 놓고 뚜껑을 함께 열어요. 각자의 작은 접시에 식초와 생강채를 덜어요.",
    notes: "녹차 · 재스민",
    diffuser: "찻잎과 대나무", candle: "화이트 티와 옅은 나무", perfume: "녹차와 레몬",
    product: "greenTea", source: { label: "상하이시의 난샹 샤오룽바오", url: "https://english.shanghai.gov.cn/en-SpecialtyFood/20260511/594d417a429d426e8442a47336c47574.html" },
  },
  {
    slug: "hong-kong", name: "홍콩", english: "Hong Kong", code: "HKG",
    point: [114.17, 22.31], place: "광둥식 찻집",
    dish: "시우마이", ingredients: "돼지고기 · 새우 · 얇은 피",
    activity: "차와 작은 딤섬을 즐기는 얌차에서 아이디어를 얻었어요. 만두피의 윗면이 열리도록 시우마이를 빚고, 찜기를 돌려 가며 서로의 잔에 차를 따라요.",
    mood: "찻주전자 하나와 작은 찻잔 여러 개. 찜기를 열 때마다 다른 사람이 차를 따르는 역할을 맡아요.",
    notes: "우롱차 · 귤껍질",
    diffuser: "우롱차와 말린 귤껍질", candle: "찻잎과 시더", perfume: "그린 티와 베르가못",
    product: "greenTea", source: { label: "홍콩관광청의 식문화 지도", url: "https://www.discoverhongkong.com/content/dam/dhk/intl/plan/traveller-info/e-guidebooks/foodmap-tc.pdf" },
  },
  {
    slug: "macau", name: "마카오", english: "Macao", code: "MAC",
    point: [113.55, 22.16], place: "콜로안",
    dish: "포르투갈식 에그타르트", ingredients: "달걀 · 페이스트리 · 우유",
    activity: "콜로안에서 만나는 에그타르트를 주제로 바삭한 페이스트리에 커스터드를 부어요. 오븐에서 꺼낸 타르트를 반으로 갈라 윗면의 갈색 무늬와 층을 살펴봐요.",
    mood: "작은 카페처럼 창가에 두 사람씩 앉아요. 따뜻한 타르트 하나와 무가당 차를 흰 접시에 담아 내요.",
    notes: "귤꽃 · 바닐라",
    diffuser: "귤꽃과 가벼운 머스크", candle: "바닐라빈과 마른 나무", perfume: "네롤리와 비터오렌지",
    product: "vanille", source: { label: "마카오관광청의 콜로안 안내", url: "https://content.macaotourism.gov.mo/uploads/mgto_brouchures/1537f4fbc5a513d8e01f69f63ae2794828252f96.pdf" },
  },
  {
    slug: "vietnam", name: "베트남", english: "Vietnam", code: "VNM",
    point: [106.63, 10.82], place: "남부식 월남쌈",
    dish: "고이꾸온", ingredients: "라이스페이퍼 · 새우 · 허브",
    activity: "새우와 쌀국수, 채소를 얇은 라이스페이퍼에 말아요. 새우의 붉은 면이 겉으로 보이게 놓고, 민트를 넣은 쌈과 뺀 쌈을 나눠 맛봐요.",
    mood: "허브를 줄기째 놓고 손으로 한 잎씩 뜯어요. 속이 비치는 쌈을 흰 접시에 나란히 놓으면 긴 식탁이 그대로 차려져요.",
    notes: "라임 · 레몬그라스",
    diffuser: "레몬그라스와 라임", candle: "풋귤 껍질과 대나무", perfume: "민트와 그린 시트러스",
    product: "lemongrass", source: { label: "베트남관광청의 고이꾸온", url: "https://vietnam.travel/things-to-do/spice-viet-hanoi/" },
  },
  {
    slug: "thailand", name: "태국", english: "Thailand", code: "THA",
    point: [100.5, 13.75], place: "태국 중부",
    dish: "똠얌꿍", ingredients: "새우 · 갈랑갈 · 레몬그라스",
    activity: "똠얌꿍 한 냄비에서 새우와 향신채가 어떻게 어우러지는지 살펴봐요. 레몬그라스를 두드리고 마크루트 라임 잎을 찢어, 육수에 넣기 전과 후의 향을 비교해요.",
    mood: "작은 그릇에 향신채를 따로 담습니다. 참가자들이 향을 맡고 재료를 고른 뒤 한 냄비 앞에 둘러서요.",
    notes: "레몬그라스 · 라임 잎",
    diffuser: "레몬그라스와 마크루트 라임", candle: "라임 제스트와 생강", perfume: "풋라임과 베티버",
    product: "lemongrass", source: { label: "유네스코의 똠얌꿍", url: "https://ich.unesco.org/en/RL/tom-yum-goong-kung-sour-and-spicy-shrimp-soup-01879" },
  },
  {
    slug: "usa", name: "미국", english: "United States", code: "USA",
    point: [-155.1, 19.7], place: "하와이",
    dish: "로코모코", ingredients: "쌀밥 · 패티 · 그레이비",
    activity: "하와이의 로컬 메뉴인 로코모코는 밥과 패티를 한 접시에 담아요. 패티를 굽는 사람과 그레이비를 젓는 사람으로 나눠 익힌 뒤 달걀을 올려 마무리해요.",
    mood: "밝은 색 접시와 물잔을 들고 피크닉처럼 둘러앉아요. 숟가락으로 그레이비를 끼얹으며 각자 한 접시를 완성해요.",
    notes: "씨 솔트 · 세이지",
    diffuser: "바닷바람과 풋잎", candle: "세이지와 드리프트우드", perfume: "씨 솔트와 세이지",
    product: "sea", source: { label: "하와이관광청의 로컬 음식", url: "https://www.gohawaii.com/culinary-experiences-in-hawaii" },
  },
  {
    slug: "france", name: "프랑스", english: "France", code: "FRA",
    point: [-1.68, 48.12], place: "브르타뉴",
    dish: "메밀 갈레트", ingredients: "메밀 · 달걀 · 햄",
    activity: "브르타뉴의 짭짤한 메밀 갈레트를 얇게 구워요. 햄·치즈·달걀을 가운데 올리고 가장자리를 네모로 접어, 한 장씩 굽는 작은 크레프리를 열어요.",
    mood: "낮은 유리잔과 줄무늬 천을 두세요. 팬 하나를 돌아가면서 쓰면 방금 구운 사람과 다음 차례인 사람이 자연스럽게 이야기를 나눠요.",
    notes: "오렌지꽃 · 리넨",
    diffuser: "네롤리와 레몬 잎", candle: "부드러운 리넨과 밀랍", perfume: "귤꽃과 화이트 라일락",
    product: "orange", source: { label: "브르타뉴 관광청의 갈레트", url: "https://www.brittanytourism.com/matching-what-i-want/food-drink/brittanys-specialities/are-you-a-crepe-expert/" },
  },
  {
    slug: "germany", name: "독일", english: "Germany", code: "DEU",
    point: [9.18, 48.78], place: "슈투트가르트 · 슈바벤",
    dish: "마울타셴", ingredients: "밀반죽 · 고기 · 시금치",
    activity: "슈바벤의 큼직한 속채움 면 요리예요. 넓은 반죽에 고기와 시금치 소를 놓고 접은 뒤 잘라, 맑은 육수에 띄워 나눠요.",
    mood: "긴 작업대에 반죽을 펼칩니다. 한 사람은 소를 올리고 다음 사람은 접는 식으로 호흡을 맞춰요.",
    notes: "시더 · 솔잎",
    diffuser: "시더와 오렌지 껍질", candle: "솔잎과 전나무", perfume: "주니퍼와 마른 나무",
    product: "fir", source: { label: "슈투트가르트 관광청의 슈바벤 음식", url: "https://www.stuttgart-tourist.de/geniessen-in-stuttgart/schwaebische-restaurants-stuttgart" },
  },
  {
    slug: "switzerland", name: "스위스", english: "Switzerland", code: "CHE",
    point: [7.9, 46.6], place: "베른 고원",
    dish: "치즈 퐁뒤", ingredients: "치즈 · 마늘 · 빵",
    activity: "녹인 치즈 한 냄비를 가운데 두고 빵을 찍어 나누는 식탁이에요. 치즈를 가는 팀과 빵을 자르는 팀으로 나누고, 먼저 녹인 치즈에 모두가 한 조각씩 담가요.",
    mood: "나무 상판에 낮은 조명을 켜고 빵 바구니를 돌려요. 따뜻한 음식과 어울리는 숲 향은 입구에서만 가볍게 써요.",
    notes: "전나무 · 주니퍼",
    diffuser: "주니퍼와 시더", candle: "전나무와 몰약", perfume: "사이프러스와 이끼",
    product: "fir", source: { label: "스위스관광청의 식탁 문화", url: "https://www.myswitzerland.com/en/planning/about-switzerland/custom-and-tradition/typical-food/" },
  },
  {
    slug: "korea", name: "한국", english: "Korea", code: "KOR",
    point: [126.98, 37.57], place: "한국의 김장",
    dish: "배추김치", ingredients: "절인 배추 · 무 · 고춧가루",
    activity: "김장은 여러 사람이 김치를 담가 나누는 문화예요. 절인 배추 사이에 속을 넣고, 각자 담근 한 포기에서 한 잎씩 떼어 맛본 뒤 나눠 담아요.",
    mood: "넓은 대야 곁에 둘러앉아 집집마다 김칫소에 넣는 재료를 이야기해요. 끝에는 함께 쓴 도마를 치우고 따뜻한 보리차를 나눠요.",
    notes: "유자 · 차나무 잎",
    diffuser: "유자 껍질과 초록 잎", candle: "볶은 차와 시더", perfume: "녹차와 레몬",
    product: "greenTea", source: { label: "유네스코의 김장 문화", url: "https://ich.unesco.org/en/RL/kimjang-making-and-sharing-kimchi-in-the-republic-of-korea-00881" },
  },
  {
    slug: "spain", name: "스페인", english: "Spain", code: "ESP",
    point: [-0.38, 39.47], place: "발렌시아", recommend: "popular",
    dish: "빠에야 발렌시아나", ingredients: "쌀 · 닭 · 콩",
    activity: "발렌시아식 빠에야에는 닭과 콩 등이 들어가요. 넓고 얕은 팬에서 쌀을 익히고, 바닥에 노릇하게 눌은 부분을 한 숟갈씩 나눠요.",
    mood: "한 팬이 식탁의 중심이에요. 팬이 놓일 자리는 비워 두고 주황색 천과 작은 흰 접시로 햇살 드는 점심상을 차려요.",
    notes: "만다린 · 로즈메리",
    diffuser: "만다린과 바질", candle: "로즈메리와 나무", perfume: "비터오렌지와 베르가못",
    product: "lime", source: { label: "발렌시아 관광청의 빠에야", url: "https://blog.visitvalencia.com/en/paella-valenciana" },
  },
  {
    slug: "mexico", name: "멕시코", english: "Mexico", code: "MEX",
    point: [-96.73, 17.06], place: "옥수수 반죽의 식탁", recommend: "popular",
    dish: "옥수수 토르티야", ingredients: "옥수수 마사 · 콩 · 살사",
    activity: "옥수수 반죽을 둥글게 눌러 뜨거운 판에 구워요. 갓 구운 토르티야를 천에 싸서 온기를 간직하고 콩과 살사를 얹어 나눠요.",
    mood: "한쪽에서는 반죽을 누르고 다른 쪽에서는 살사를 으깨요. 여러 색의 작은 그릇을 한데 모아 원하는 맛을 조합해요.",
    notes: "라임 · 바닐라빈",
    diffuser: "라임 껍질과 허브", candle: "마른 바닐라빈", perfume: "비터오렌지와 베티버",
    product: "vanille", source: { label: "유네스코의 멕시코 전통 식문화", url: "https://ich.unesco.org/en/RL/traditional-mexican-cuisine-00400" },
  },
  {
    slug: "turkiye", name: "튀르키예", english: "Türkiye", code: "TUR",
    point: [35.49, 38.72], place: "카이세리", recommend: "popular",
    dish: "만트", ingredients: "밀반죽 · 고기 · 요거트",
    activity: "작은 반죽 조각에 고기 소를 얹고 네 귀를 모아 만트를 빚어요. 삶아낸 만두에 마늘 요거트와 향신료 버터를 얹으며 한 그릇을 완성해요.",
    mood: "여럿이 마주 앉아 만두를 빚기 좋은 긴 상을 차려요. 마무리는 작은 유리잔에 차를 따라 서로의 반죽 솜씨를 구경하는 시간이에요.",
    notes: "장미 · 시트러스",
    diffuser: "베르가못과 장미 잎", candle: "삼나무와 은은한 장미", perfume: "장미와 리치",
    product: "rose", source: { label: "튀르키예 관광청의 만트", url: "https://goturkiye.com/blog/turkish-manti" },
  },
  {
    slug: "indonesia", name: "인도네시아", english: "Indonesia", code: "IDN",
    point: [106.85, -6.21], place: "자카르타 · 베타위", recommend: "popular",
    dish: "가도가도", ingredients: "템페 · 두부 · 땅콩",
    activity: "자카르타식 가도가도에서 아이디어를 얻어 채소와 템페, 두부를 준비해요. 땅콩 소스를 직접 으깨어 농도를 맞춘 뒤 재료를 섞어요.",
    mood: "재료를 한 가지씩 맡아 긴 접시에 차곡차곡 올려요. 각자 만든 소스를 한 숟갈씩 덜어 서로 바꿔 맛봐요.",
    notes: "라임 잎 · 생강",
    diffuser: "라임 잎과 레몬그라스", candle: "생강과 샌들우드", perfume: "풋귤과 베티버",
    product: "lemongrass", source: { label: "인도네시아 관광청의 가도가도", url: "https://www.indonesia.travel/ru/ru/travel-ideas/gastronomy/gado-gado-betawi/" },
  },
  {
    slug: "morocco", name: "모로코", english: "Morocco", code: "MAR",
    point: [-6.84, 34.02], place: "마그레브의 공동 식탁", recommend: "discovery",
    dish: "채소 쿠스쿠스", ingredients: "세몰리나 · 병아리콩 · 채소",
    activity: "쿠스쿠스 곡물을 쪄서 손끝으로 가볍게 풀고 익힌 채소를 올려요. 모로코를 비롯해 북아프리카 여러 지역이 공유하는 음식을 큰 접시에 담아 함께 나눠요.",
    mood: "낮은 그릇에 채소를 색깔별로 놓고 민트차 잔을 곁들여요. 차를 다 마신 뒤에야 오렌지꽃 향을 시향해요.",
    notes: "오렌지꽃 · 민트",
    diffuser: "오렌지꽃과 민트 잎", candle: "시더와 비터오렌지", perfume: "귤꽃과 화이트 라일락",
    product: "orange", source: { label: "유네스코의 쿠스쿠스 문화", url: "https://ich.unesco.org/en/RL/knowledge-know-how-and-practices-pertaining-to-the-production-and-consumption-of-couscous-01602" },
  },
  {
    slug: "peru", name: "페루", english: "Peru", code: "PER",
    point: [-77.04, -12.05], place: "페루 해안", recommend: "discovery",
    dish: "세비체", ingredients: "생선 · 라임 · 고추",
    activity: "페루 해안의 세비체에서 생선과 산미, 매운맛의 조합을 살펴봐요. 모임에서는 익힌 새우로 응용하고, 라임과 적양파의 양을 달리한 두 접시를 비교해요.",
    mood: "차가운 접시와 물잔을 미리 준비해요. 두 사람이 번갈아 라임을 짜고 향과 신맛이 어떻게 다른지 한 단어씩 적어요.",
    notes: "라임 껍질 · 소금",
    diffuser: "풋라임과 바닷바람", candle: "세이지와 마른 풀", perfume: "씨 솔트와 세이지",
    product: "sea", source: { label: "유네스코의 세비체 문화", url: "https://ich.unesco.org/en/RL/ceviche-an-expression-of-traditional-peruvian-cuisine-01952" },
  },
  {
    slug: "georgia", name: "조지아", english: "Georgia", code: "GEO",
    point: [44.8, 41.71], place: "조지아의 만두 식탁", recommend: "discovery",
    dish: "힌칼리", ingredients: "밀반죽 · 고기 · 후추",
    activity: "둥근 반죽 가장자리를 돌려 접어 꼭지가 있는 힌칼리를 빚어요. 꼭지를 잡고 한쪽을 조금 베어 뜨거운 육즙부터 조심스럽게 맛봐요.",
    mood: "두꺼운 나무 도마에 주름 수가 다른 만두들이 모여요. 접시에는 후추를 따로 두고, 누구의 만두인지 모양으로 찾아봐요.",
    notes: "후추 · 장미",
    diffuser: "주니퍼와 검은 후추", candle: "시더와 말린 장미", perfume: "다마스크 장미와 리치",
    product: "rose", source: { label: "조지아 관광청의 힌칼리", url: "https://georgia.travel/khinkali" },
  },
  {
    slug: "india", name: "인도", english: "India", code: "IND",
    point: [74.85, 12.87], place: "카르나타카 해안", recommend: "discovery",
    dish: "니르 도사", ingredients: "쌀 · 물 · 코코넛",
    activity: "카르나타카 해안의 니르 도사는 묽은 쌀 반죽을 얇게 부쳐요. 레이스처럼 구멍이 생긴 전을 접어 코코넛과 재거리의 달큰한 맛을 곁들여요.",
    mood: "팬을 돌리는 손목의 움직임을 서로 가르쳐 줘요. 따뜻한 도사를 접어 돌리고 곁들임을 한 가지씩 바꾸어 맛봐요.",
    notes: "풋귤 · 샌들우드",
    diffuser: "풋귤과 라임 잎", candle: "샌들우드와 은은한 생강", perfume: "베르가못과 녹차",
    product: "greenTea", source: { label: "인도 관광청의 카르나타카 음식", url: "https://www.incredibleindia.gov.in/en/karnataka/bengaluru/the-delectable-cuisine-of-karnataka-13-must-try-local-dishes-in-bengaluru" },
  },
];
