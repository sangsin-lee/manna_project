import type { CSSProperties } from "react";
import type { CountrySlug, Recipe } from "./content";

export type RecipePattern = "grain" | "tiles" | "waves" | "contours" | "linen";
export type RecipeArt = "gnocchi" | "rice" | "steak" | "bowl" | "noodles" | "bread" | "toast" | "potato" | "dessert" | "tart" | "drink" | "minchi" | "loco" | "pork-noodles" | "fish-stew" | "grilled-fish" | "citrus" | "sweet-potato-chicken" | "pear-shrimp" | "pine-noodles" | "tofu-hotpot" | "ongsimi" | "cabbage-jeon" | "deodeok-gui" | "corn-soup" | "chestnut-pasta" | "salt-shrimp" | "ginger-pork" | "apple-crumble" | "lentil-stew" | "jujube-porridge" | "garlic-chicken" | "perilla-kalguksu" | "grape-salad" | "berry-duck" | "cheese-jeon" | "shiitake-japchae" | "apple-pork-rolls" | "yuja-salmon" | "fig-toast" | "octopus-soup" | "cockle-rice" | "persimmon-curry" | "chestnut-yullan" | "oyster-jeon" | "spinach-soup" | "apple-pancakes" | "ginseng-soup" | "chili-tteok" | "crab-custard" | "onion-tart" | "barley-soup" | "salmon-chanchan";
export type RecipeDesign = {
  paper: string; soft: string; from: string; mid: string; to: string;
  ink: string; muted: string; accent: string; dark: string; line: string;
  pattern: RecipePattern; art: RecipeArt; place: string; caption: string;
};

const places: Record<CountrySlug, [string, RecipePattern]> = {
  korea: ["한국의 식탁", "linen"], japan: ["일본의 식탁", "grain"],
  china: ["중국의 식탁", "linen"], "hong-kong": ["홍콩 · 차찬텡", "tiles"],
  macau: ["마카오", "tiles"], vietnam: ["베트남의 거리", "linen"],
  thailand: ["태국의 식탁", "waves"], usa: ["미국의 식탁", "waves"],
  france: ["프랑스 · 비스트로", "linen"], germany: ["독일 · 슈바벤", "linen"],
  switzerland: ["스위스 · 알프스", "contours"], italy: ["이탈리아의 식탁", "tiles"],
};

// Visual interpretations of ingredients and places, not claims of traditional patterns.
const details: Record<string, { art: RecipeArt; caption: string; place?: string; pattern?: RecipePattern; colors?: [string, string, string, string] }> = {
  "ishikari-inspired-salmon-chanchanyaki": { art: "salmon-chanchan", caption: "연어의 산호빛과 미소의 황갈색, 이시카리 바다를 떠올리는 물결 선", pattern: "waves" },
  "graubunden-inspired-barley-soup": { art: "barley-soup", caption: "보리의 크림빛과 당근의 주황, 알프스를 떠올리는 푸른 회색과 등고선", pattern: "contours" },
  "swabian-inspired-onion-tart": { art: "onion-tart", caption: "양파의 금빛과 구운 반죽의 갈색, 슈바벤의 소박한 식탁을 떠올리는 리넨 선", pattern: "linen" },
  "cheongsong-apple-oat-pancakes": { art: "apple-pancakes", caption: "청송 사과의 장밋빛과 귀리 팬케이크의 노릇한 갈색", pattern: "contours" },
  "punggi-ginseng-chicken-gomtang": { art: "ginseng-soup", caption: "풍기 수삼의 옅은 흙빛과 담백한 닭국물의 크림색", pattern: "contours" },
  "yeongyang-chili-oil-tteokbokki": { art: "chili-tteok", caption: "영양 고춧가루의 붉은빛과 쌀떡, 깨의 작은 금빛 점", pattern: "grain" },
  "uljin-red-snow-crab-egg-custard": { art: "crab-custard", caption: "울진 동해의 푸른 회색과 게살의 산호빛, 달걀의 노랑", pattern: "waves" },
  "jinyeong-persimmon-chicken-curry": { art: "persimmon-curry", caption: "진영 단감의 주홍과 카레의 황갈색, 흰 밥의 여백", pattern: "grain" },
  "hadong-chestnut-yullan": { art: "chestnut-yullan", caption: "하동 밤 속살의 크림색과 지리산 자락을 떠올리는 선", pattern: "contours" },
  "tongyeong-oyster-jeon": { art: "oyster-jeon", caption: "통영 바다의 회청색과 굴전에 입힌 달걀옷의 금빛", pattern: "waves" },
  "namhae-spinach-tofu-doenjang-soup": { art: "spinach-soup", caption: "남해 겨울 밭의 차분한 올리브빛과 두부의 흰색", pattern: "linen" },
  "goheung-yuja-salmon": { art: "yuja-salmon", caption: "고흥 유자의 노란 향과 연어의 따뜻한 산호색", pattern: "grain" },
  "yeongam-fig-cream-cheese-toast": { art: "fig-toast", caption: "영암 무화과의 보라와 장밋빛 단면, 흰 크림치즈", pattern: "linen" },
  "muan-octopus-yeonpotang": { art: "octopus-soup", caption: "무안 갯벌의 회갈색과 맑은 국물, 미나리의 초록", pattern: "waves" },
  "beolgyo-cockle-bibimbap": { art: "cockle-rice", caption: "벌교 갯벌의 흙빛과 꼬막살의 주황, 따뜻한 밥의 흰빛", pattern: "grain" },
  "gochang-bokbunja-duck": { art: "berry-duck", caption: "고창 복분자의 자주색과 구운 오리의 따뜻한 갈색", pattern: "grain" },
  "iksan-sweet-potato-cheese-jeon": { art: "cheese-jeon", caption: "익산 고구마 속살의 금빛과 치즈의 크림색", pattern: "linen" },
  "jinan-shiitake-japchae": { art: "shiitake-japchae", caption: "진안 표고의 흙빛과 산자락을 떠올리는 겹친 선", pattern: "contours" },
  "jangsu-apple-pork-rolls": { art: "apple-pork-rolls", caption: "장수 사과의 붉은 껍질과 고원 과수원의 부드러운 빛", pattern: "contours" },
  "boeun-jujube-rice-porridge": { art: "jujube-porridge", caption: "보은 대추의 적갈색과 부드럽게 내린 죽의 따뜻한 빛", pattern: "grain" },
  "danyang-garlic-roast-chicken": { art: "garlic-chicken", caption: "단양의 밝은 돌빛과 통마늘, 노릇한 닭구이의 금빛", pattern: "contours" },
  "goesan-cabbage-perilla-kalguksu": { art: "perilla-kalguksu", caption: "괴산 배추 속잎의 연두와 들깨 국물의 크림색", pattern: "linen" },
  "yeongdong-grape-ricotta-salad": { art: "grape-salad", caption: "영동 포도의 보라와 흰 리코타, 과수원 잎의 초록", pattern: "grain" },
  "auvergne-inspired-lentil-sausage-stew": { art: "lentil-stew", caption: "오베르뉴 고원의 회청색, 렌틸콩의 흙빛과 소시지의 구운 갈색", pattern: "contours" },
  "gongju-chestnut-cream-pasta": { art: "chestnut-pasta", caption: "공주 알밤의 갈색과 부드러운 크림 소스의 아이보리", pattern: "grain" },
  "taean-salt-roasted-prawns": { art: "salt-shrimp", caption: "태안 바다의 푸른색과 소금 위 새우의 산호빛", pattern: "waves" },
  "seosan-ginger-pork-rice-bowl": { art: "ginger-pork", caption: "서산 생강의 연노랑과 간장 볶음의 따뜻한 호박빛", pattern: "linen" },
  "yesan-apple-crumble": { art: "apple-crumble", caption: "예산 사과의 붉은빛과 바삭하게 구운 크럼블의 금빛", pattern: "grain" },
  "pyeongchang-potato-ongsimi": { art: "ongsimi", caption: "평창 감자의 아이보리와 산안개를 닮은 회청색", pattern: "contours" },
  "bongpyeong-buckwheat-cabbage-jeon": { art: "cabbage-jeon", caption: "봉평 메밀의 회갈색과 배추 잎맥의 연둣빛", pattern: "linen" },
  "hoengseong-gochujang-deodeok-gui": { art: "deodeok-gui", caption: "횡성 더덕의 흙빛과 고추장 양념의 벽돌빛", pattern: "grain" },
  "hongcheon-waxy-corn-soup": { art: "corn-soup", caption: "홍천 찰옥수수의 크림빛과 버터의 연노랑", pattern: "grain" },
  "yeoju-sweet-potato-chicken-jorim": { art: "sweet-potato-chicken", caption: "여주 고구마의 자주색과 달큰한 조림의 금빛", pattern: "grain" },
  "anseong-pear-shrimp-salad": { art: "pear-shrimp", caption: "안성 배의 금빛, 아삭한 속살, 새우의 산호빛", pattern: "linen" },
  "gapyeong-pine-nut-buckwheat-noodles": { art: "pine-noodles", caption: "가평 잣의 크림색과 메밀의 차분한 회갈색", pattern: "contours" },
  "paju-jangdan-tofu-mushroom-hotpot": { art: "tofu-hotpot", caption: "장단콩 두부의 아이보리와 버섯의 흙빛", pattern: "grain" },
  "mantua-inspired-pumpkin-gnocchi": { art: "gnocchi", caption: "단호박의 황금빛, 버터의 크림색, 따뜻한 흙빛", pattern: "tiles" },
  "jeju-dombe-guksu": { art: "pork-noodles", caption: "나무 도마의 갈색과 우윳빛 고기 국물", pattern: "grain" },
  "jeju-galchi-jorim": { art: "fish-stew", caption: "은갈치의 바다와 붉은 양념의 온기", pattern: "waves" },
  "jeju-grilled-fish-platter": { art: "grilled-fish", caption: "제주 바다의 청록과 노릇한 생선", pattern: "waves" },
  "jeju-tangerine-yogurt-cup": { art: "citrus", caption: "감귤 과수원의 주황과 요거트의 흰빛", pattern: "contours" },
  "chicken-mushroom-takikomi-gohan": { art: "rice", place: "일본 · 가을의 식탁", caption: "쌀의 아이보리, 표고의 갈색, 흙빛 냄비", colors: ["#f3e5c9", "#d5b489", "#a87951", "#442d22"] },
  "choo-inspired-garlic-butter-steak": { art: "steak", place: "일본 · 도쿄에서 얻은 영감", caption: "구운 고기, 갈릭버터, 짙은 나무색", colors: ["#efd9bc", "#ca9774", "#925844", "#482b27"] },
  "juicy-pork-loin-steak": { art: "steak", caption: "노릇한 겉면과 머스터드의 금빛", colors: ["#f5e6d5", "#dfb79d", "#b78958", "#49332a"] },
  "hong-kong-macaroni-soup": { art: "bowl", caption: "맑은 국물과 차찬텡의 타일에서 영감" },
  "japanese-beef-bean-sprout-stir-fry": { art: "bowl", caption: "소고기의 갈색과 숙주의 밝은 결" },
  "mala-xiang-guo": { art: "bowl", caption: "마라의 붉은빛과 진한 향신료색" },
  "osam-bulgogi": { art: "bowl", caption: "고추장빛 볶음과 깻잎의 초록" },
  "vietnamese-banh-mi": { art: "bread", caption: "바게트의 황금색과 채소의 산뜻함" },
  "italian-tiramisu": { art: "dessert", caption: "에스프레소, 코코아, 마스카르포네" },
  "korean-sundae-bokkeum": { art: "bowl", caption: "시장의 따뜻한 볶음 한 접시" },
  "hong-kong-milk-tea": { art: "drink", caption: "홍차의 호박색과 부드러운 우유빛" },
  "macau-minchi": { art: "minchi", caption: "감자와 간장의 황토색, 마카오의 푸른빛" },
  "macau-portuguese-egg-tart": { art: "tart", caption: "황금빛 커스터드와 푸른 타일의 대비", colors: ["#f3ebce", "#d7dcd6", "#739ca5", "#284952"] },
  "hawaii-loco-moco": { art: "loco", place: "미국 · 하와이", caption: "그레이비의 깊은 갈색과 따뜻한 모래빛" },
  "hawaii-poke-bowl": { art: "bowl", place: "미국 · 하와이", caption: "참치의 산호빛과 바다의 청록색" },
  "thai-pad-thai": { art: "noodles", caption: "타마린드와 땅콩, 라임의 색" },
  "thai-som-tam": { art: "bowl", caption: "파파야의 연두와 고추의 붉은빛" },
  "french-croque-monsieur": { art: "toast", caption: "구운 빵과 치즈, 비스트로의 리넨" },
  "french-onion-soup": { art: "bowl", caption: "캐러멜 양파와 오래 끓인 국물의 호박색" },
  "swabian-maultaschen": { art: "bowl", caption: "밀 반죽의 크림색과 허브의 녹색" },
  "swabian-potato-salad": { art: "potato", caption: "감자의 황금빛과 소박한 식탁보의 선" },
  "swiss-cheese-fondue": { art: "bowl", caption: "치즈의 크림색과 알프스 산등성이" },
  "swiss-rosti": { art: "potato", caption: "구운 감자의 금빛과 산의 푸른 회색", colors: ["#eee5cc", "#bccaca", "#79949d", "#2d4852"] },
  "roman-cacio-e-pepe": { art: "noodles", place: "이탈리아 · 로마", caption: "페코리노의 아이보리와 검은 후추" },
  "roman-carbonara": { art: "noodles", place: "이탈리아 · 로마", caption: "달걀의 금빛과 로마의 따뜻한 돌빛" },
  "club-suyuk-platter": { art: "steak", caption: "삶은 고기의 온기와 함께 나누는 식탁" },
  "club-bean-sprout-egg-ramyeon": { art: "noodles", caption: "따뜻한 국물, 달걀, 숙주의 밝은 색" },
};

function mix(a: string, b: string, amount: number) {
  const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return "#" + rgb(a).map((v, i) => Math.round(v * (1 - amount) + rgb(b)[i] * amount).toString(16).padStart(2, "0")).join("");
}

export function getRecipeDesign(recipe: Recipe): RecipeDesign {
  const detail = details[recipe.slug];
  const [place, pattern] = places[recipe.country];
  const [from, mid, to, baseInk] = detail?.colors ?? [recipe.palette.from, recipe.palette.mid, recipe.palette.to, recipe.palette.ink];
  const ink = mix(baseInk, "#171310", 0.35);
  return {
    from, mid, to, ink, muted: mix(ink, "#ffffff", 0.22),
    paper: mix(from, "#ffffff", 0.9), soft: mix(mid, "#ffffff", 0.68),
    accent: mix(baseInk, "#4c241b", 0.22), dark: mix(ink, "#171310", 0.15),
    line: mix(mid, "#ffffff", 0.32), pattern: detail?.pattern ?? pattern,
    art: detail?.art ?? "bowl", place: recipe.localTable?.region ?? detail?.place ?? place,
    caption: detail?.caption ?? "이 음식의 재료와 식탁에서 가져온 색",
  };
}

export const defaultRecipeDesign: RecipeDesign = {
  paper: "#fffaf4", soft: "#f1e7da", from: "#efdfc9", mid: "#d2b492", to: "#b28464",
  ink: "#342b26", muted: "#625850", accent: "#743f2c", dark: "#342b26", line: "#d6c7b7",
  pattern: "linen", art: "bowl", place: "세계의 식탁", caption: "음식으로 읽는 세계",
};

export function recipeDesignStyle(theme: RecipeDesign): CSSProperties {
  return Object.fromEntries(Object.entries(theme).filter(([key]) => !["pattern", "art", "place", "caption"].includes(key)).map(([key, value]) => [`--dish-${key}`, value])) as CSSProperties;
}
