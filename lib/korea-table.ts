import type { SourceLink } from "./content";
import { koreaSources as sources } from "./korea-sources";
import { gyeonggiSources } from "./gyeonggi-sources";
import { gangwonSources } from "./gangwon-sources";

export const seasons = [
  { id: "spring", label: "봄", months: "3–5월", mark: "✿" },
  { id: "summer", label: "여름", months: "6–8월", mark: "☀" },
  { id: "autumn", label: "가을", months: "9–11월", mark: "❧" },
  { id: "winter", label: "겨울", months: "12–2월", mark: "❄" },
] as const;
export type Season = (typeof seasons)[number]["id"];
export type SpecialtyArt = "citrus" | "rice" | "potato" | "grape" | "chestnut" | "berry" | "apple" | "persimmon" | "fish" | "fern" | "pork" | "sweet-potato" | "pear" | "pine-nut" | "soybean" | "buckwheat" | "deodeok" | "corn";
export type PantryRecipe = { title: string; meta: string; ingredients: string; steps: string[]; note?: string };
export type Specialty = { name: string; art: SpecialtyArt; timing: string; seasons: Season[]; note: string };
export type KoreanRegion = {
  id: string; name: string; english: string; area: string; headline: string; description: string;
  icon: SpecialtyArt; pin: [number, number]; colors: [string, string, string]; colorStory: string;
  specialties: Specialty[]; seasonNotes: Record<Season, string>; sources: SourceLink[];
  pantry?: PantryRecipe; recipeSlugs: string[];
};

export const koreanRegions: KoreanRegion[] = [
  {
    id: "gyeonggi", name: "경기", english: "GYEONGGI", area: "이천 · 여주 · 안성 · 가평 · 파주", icon: "rice", pin: [127.15, 37.65],
    headline: "들녘과 과수원, 숲을 잇는 식탁", description: "이천쌀과 여주 고구마, 안성 배, 가평 잣, 파주 장단콩. 서로 다른 산지의 재료로 달큰한 조림부터 산뜻한 냉채와 고소한 국수, 따뜻한 전골까지 차립니다.",
    colors: ["#76602e", "#ece2c6", "#d2bd79"], colorStory: "쌀의 아이보리와 가을 들녘의 금빛",
    specialties: [
      { name: "이천쌀", art: "rice", timing: "가을 수확 · 품종별 차이", seasons: ["autumn"], note: "햅쌀 수확과 도정한 쌀의 연중 유통을 구분합니다. 포장의 생산 연도·도정일을 함께 살펴보세요." },
      { name: "여주 고구마", art: "sweet-potato", timing: "가을 · 보통재배 9월 하순~10월 중순", seasons: ["autumn"], note: "여주는 경기도 고구마 주산지 중 하나입니다. 수확기는 재배 방식에 따라 다르고, 저장 고구마는 다른 계절에도 활용합니다." },
      { name: "안성 배", art: "pear", timing: "가을 · 9~10월 중심", seasons: ["autumn"], note: "안성 과수원과 장터를 연결하는 가을 과일. 품종별 수확 시기가 다르며 저장 배와 햇배는 구분해 고릅니다." },
      { name: "가평 잣", art: "pine-nut", timing: "가을 채취 · 산지·작황별 차이", seasons: ["autumn"], note: "가평의 잣은 죽·두부·국수에도 쓰입니다. 깐 잣의 연중 유통과 가을 채취는 다르므로 원산지와 생산 정보를 살펴보세요." },
      { name: "파주 장단콩", art: "soybean", timing: "늦가을 · 10월 말~11월 초순 중심", seasons: ["autumn"], note: "장단은 품종이 아닌 지역 이름입니다. 올해 햇콩 수확 전에는 저장 콩이나 두부·장류로 만나며, 실제 수확일은 날씨에 따라 달라집니다." },
    ],
    seasonNotes: {
      spring: "봄에는 저장 쌀과 고구마, 보관한 잣과 콩 가공품을 활용합니다. 아래 재료는 봄 햇수확 목록이 아닌 저장·가공 식탁입니다. 배는 판매 제품의 보관 상태를 확인하세요.",
      summer: "깐 잣으로 차가운 국수를, 두부로 가벼운 식사를 준비해 보세요. 여름 햇잣·햇콩이라는 뜻은 아닙니다. 저장·가공품의 포장 보관 안내를 따릅니다.",
      autumn: "9~10월 안성 배, 보통재배 기준 9월 하순~10월 중순 고구마, 가을의 햅쌀과 잣을 만납니다. 장단콩은 10월 말~11월 초순 수확이 중심이라 9월에는 두부 등 가공품을 활용하세요. 품종·작황별 차이가 있습니다.",
      winter: "가을에 거둔 쌀과 고구마, 저장 배와 잣, 콩으로 만든 두부를 즐깁니다. 겨울 햇수확으로 소개하지 않으며 각 재료의 보관 상태와 가공일을 살펴보세요.",
    },
    pantry: { title: "쌀의 맛을 살린 냄비밥", meta: "2인분 · 65분", ingredients: "백미 200g, 밥물 240ml, 불릴 물 별도", steps: ["쌀을 씻어 30분 불리고 체에서 5분 물기를 뺍니다.", "두꺼운 냄비에 쌀과 물 240ml를 넣고 중불로 끓입니다. 끓으면 덮어 아주 약불로 12분 익힙니다.", "불을 끄고 10분 뜸을 들여 섞습니다. 밥이 단단하면 뜨거운 물을 조금 보충해 더 익힙니다."], note: "쌀의 품종과 도정 상태, 냄비에 따라 물과 시간을 조정합니다." },
    recipeSlugs: ["yeoju-sweet-potato-chicken-jorim", "anseong-pear-shrimp-salad", "gapyeong-pine-nut-buckwheat-noodles", "paju-jangdan-tofu-mushroom-hotpot"],
    sources: [sources.rice, gyeonggiSources.sweetPotato, gyeonggiSources.sweetPotatoHarvest, gyeonggiSources.pear, gyeonggiSources.pineNut, gyeonggiSources.pineNutHarvest, gyeonggiSources.jangdan, gyeonggiSources.beanHarvest],
  },
  {
    id: "gangwon", name: "강원", english: "GANGWON", area: "평창 · 봉평 · 횡성 · 홍천", icon: "potato", pin: [128.55, 37.75],
    headline: "높은 밭에서 장터의 한 그릇까지", description: "평창 감자와 봉평 메밀, 횡성 더덕, 홍천 찰옥수수. 산지의 재료를 쫀득한 옹심이, 얇은 배추전, 향긋한 구이, 크림빛 수프로 차려 봅니다.",
    colors: ["#415e57", "#dde7d8", "#b5c8aa"], colorStory: "산의 청록, 감자 껍질의 흙빛",
    specialties: [
      { name: "평창 감자", art: "potato", timing: "여름~초가을 · 재배 작형별 차이", seasons: ["summer", "autumn"], note: "평창의 감자 수확 체험은 8~9월로 안내됩니다. 저장 감자의 연중 유통과 고랭지 수확기를 구분하고 산지와 상태를 살펴보세요." },
      { name: "봉평 메밀", art: "buckwheat", timing: "여름 7월 · 가을 10월 수확 중심", seasons: ["summer", "autumn"], note: "중북부 기준 여름 작형은 7월 상~중순, 가을 작형은 10월 상~중순 수확합니다. 메밀꽃 감상 시기와 알곡 수확은 다르며, 가루는 연중 활용합니다." },
      { name: "횡성 더덕", art: "deodeok", timing: "10월 중순 이후~이듬해 봄 싹트기 전", seasons: ["autumn", "winter", "spring"], note: "심은 지 2~3년 된 더덕의 일반적인 수확 가능 시기입니다. 봄 전체가 아닌 싹트기 전을 뜻하며, 실제 작업은 땅 상태와 농가 일정에 따라 달라집니다." },
      { name: "홍천 찰옥수수", art: "corn", timing: "생물 유통 7월 중순~9월 말 안내", seasons: ["summer", "autumn"], note: "홍천군은 생물 구매 기간과 냉동·진공 포장 제품의 연중 유통을 따로 안내합니다. 늦가을에는 저장 제품을 활용하고 출하 상태를 확인하세요." },
    ],
    seasonNotes: {
      spring: "더덕은 새싹이 나기 전까지 수확 가능한 재료입니다. 싹이 난 뒤에는 저장·가공 제품인지 확인하세요. 감자와 메밀가루, 냉동 찰옥수수로 다른 계절의 맛도 이어갈 수 있습니다.",
      summer: "평창 감자와 홍천 찰옥수수, 여름 작형 메밀을 만나는 계절입니다. 감자는 8~9월 수확 체험, 옥수수는 7월 중순부터의 생물 유통 안내를 참고하되 농가별 차이를 살펴보세요.",
      autumn: "9월에는 감자와 생물 찰옥수수의 끝자락을, 10월에는 가을 메밀과 더덕 수확을 이어 만납니다. 9월 메밀꽃을 올해 가을 햇곡 수확으로 혼동하지 말고, 늦가을 옥수수는 냉동 제품을 활용하세요.",
      winter: "더덕은 땅과 생육 조건에 따라 봄 싹트기 전까지 수확할 수 있습니다. 감자·메밀가루·찰옥수수는 저장·가공한 재료로 옹심이와 전, 따뜻한 수프를 만듭니다.",
    },
    pantry: { title: "노릇한 감자 버터구이", meta: "2인분 · 30분", ingredients: "감자 400g, 버터 15g, 소금 1/4작은술, 후추", steps: ["감자를 씻어 3cm 크기로 자르고 찬물에 넣어 끓입니다. 끓은 뒤 약 12분, 속이 부드러워질 때까지 삶습니다.", "물을 빼고 팬에 버터를 녹여 감자를 넣습니다. 중약불에서 6~8분 굴려가며 굽습니다.", "소금과 후추를 뿌리고 노릇한 면이 위로 오게 담습니다."], note: "지역 감자를 활용한 가정용 구이입니다." },
    recipeSlugs: ["pyeongchang-potato-ongsimi", "bongpyeong-buckwheat-cabbage-jeon", "hoengseong-gochujang-deodeok-gui", "hongcheon-waxy-corn-soup"],
    sources: [gangwonSources.potatoHarvest, gangwonSources.ongsimi, gangwonSources.market, gangwonSources.buckwheatHarvest, gangwonSources.deodeok, gangwonSources.deodeokHarvest, gangwonSources.corn],
  },
  {
    id: "chungbuk", name: "충북", english: "CHUNGBUK", area: "영동의 포도밭", icon: "grape", pin: [127.88, 36.93],
    headline: "알알이 맺힌 보랏빛 계절", description: "영동의 포도를 생과와 가벼운 소스로 즐깁니다. 과수원에서 식탁까지, 품종마다 다른 산미와 향을 읽어 보세요.",
    colors: ["#59445e", "#e9dce8", "#bca0be"], colorStory: "포도 껍질의 보라와 잎의 차분한 색",
    specialties: [{ name: "영동 포도", art: "grape", timing: "늦여름~가을 · 품종별 차이", seasons: ["summer", "autumn"], note: "영동군은 8월 말~9월 초 포도 수확기의 농장 체험을 소개합니다. 모든 품종의 수확 시기가 같지는 않습니다." }],
    seasonNotes: { spring: "생과 수확 전에는 포도잼이나 가공품으로 과일의 향을 만납니다. 봄 제철 포도로 표시하지 않습니다.", summer: "여름 끝자락, 포도가 익기 시작합니다. 포도밭의 수확 시기는 품종별로 달라집니다.", autumn: "가을에는 품종별 향과 산미를 비교해 보세요. 씨와 껍질의 식감에 따라 생과 또는 소스로 즐깁니다.", winter: "저장·냉동 포도나 잼으로 여름의 향을 이어갑니다. 가공품은 당 함량을 보고 사용량을 조절하세요." },
    pantry: { title: "포도 콩포트 요거트", meta: "2인분 · 25분", ingredients: "씨 없는 포도 200g, 설탕 10g, 물 1큰술, 요거트 200g", steps: ["포도를 씻어 반으로 자릅니다. 씨가 있는 품종은 씨를 제거합니다.", "냄비에 포도, 설탕, 물을 넣고 중약불에서 8~10분 졸입니다.", "얕은 그릇에 옮겨 식힌 뒤 요거트에 나누어 얹습니다."], note: "제철 밖에는 냉동 포도를 쓰거나, 포도잼 40g으로 소스 단계를 대신할 수 있습니다." },
    recipeSlugs: [], sources: [sources.grape],
  },
  {
    id: "chungnam", name: "충남", english: "CHUNGNAM", area: "공주의 알밤 숲", icon: "chestnut", pin: [126.63, 36.55],
    headline: "밤 한 알에 담긴 가을", description: "공주 알밤의 포슬포슬한 식감과 은은한 단맛을 밥 한 그릇에 담습니다. 따뜻한 갈색으로 차리는 내륙의 식탁입니다.",
    colors: ["#67432c", "#ecdfcb", "#b99570"], colorStory: "밤 껍질의 갈색과 속살의 크림색",
    specialties: [{ name: "공주 알밤", art: "chestnut", timing: "가을 · 9~10월 중심", seasons: ["autumn"], note: "공주의 가을 관광 코스에는 9~10월 알밤 수확 체험이 포함됩니다. 저장·냉동 밤은 계절 밖에도 활용할 수 있습니다." }],
    seasonNotes: { spring: "껍질을 벗겨 냉동한 밤이나 익힌 밤으로 밥을 짓습니다. 가을에 거둔 재료를 이어 먹는 방법입니다.", summer: "생밤 수확 전에는 냉동·가공 밤을 활용합니다. 포장지의 해동·가열 안내를 따라 주세요.", autumn: "알밤을 줍는 계절. 속껍질까지 벗겨 밥에 넣으면 은은한 단맛이 밥알 사이에 배어듭니다.", winter: "저장한 밤을 따뜻한 밥과 수프로 즐깁니다. 단맛을 더하지 않아도 포근한 한 그릇이 됩니다." },
    pantry: { title: "알밤 냄비밥", meta: "2인분 · 70분", ingredients: "쌀 200g, 깐 밤 100g, 밥물 250ml", steps: ["쌀을 30분 불려 5분 물기를 빼고, 껍질을 모두 벗긴 밤은 반으로 자릅니다.", "두꺼운 냄비에 쌀·물·밤을 넣고 끓입니다. 뚜껑을 덮어 약불에서 약 15분 익힙니다.", "불을 끄고 10분 뜸을 들입니다. 밤과 쌀이 단단하면 뜨거운 물을 조금 더해 추가 가열합니다."], note: "냉동 밤은 제품 안내에 맞게 해동하여 사용합니다." },
    recipeSlugs: [], sources: [sources.chestnut],
  },
  {
    id: "jeonbuk", name: "전북", english: "JEONBUK", area: "고창의 복분자 밭", icon: "berry", pin: [126.95, 35.7],
    headline: "짙은 열매, 산뜻한 한 스푼", description: "고창을 비롯한 전북의 복분자는 짙은 자주색이 매력입니다. 과일의 산미를 살려 디저트의 작은 포인트로 씁니다.",
    colors: ["#65364b", "#efdee5", "#c68b9e"], colorStory: "복분자의 자주색과 황토의 부드러운 분홍",
    specialties: [{ name: "고창 복분자", art: "berry", timing: "초여름 · 6월 중심", seasons: ["summer"], note: "수확 기간이 짧은 열매입니다. 냉동 과육이나 가공 소스로 다른 계절에도 향과 색을 이어갑니다." }],
    seasonNotes: { spring: "올해의 수확을 기다리는 때입니다. 냉동 복분자나 과일 소스를 활용할 수 있습니다.", summer: "복분자가 짙게 익는 초여름. 수확한 열매는 오래 두지 않고 소스로 만들어 즐기기 좋습니다.", autumn: "냉동 복분자로 여름의 색을 꺼내 보세요. 가을에 새로 수확한 복분자와는 구분합니다.", winter: "따뜻한 팬케이크에 복분자 소스를 조금 얹어 보세요. 저장·가공한 재료를 활용하는 겨울의 방법입니다." },
    pantry: { title: "복분자 요거트 볼", meta: "2인분 · 25분", ingredients: "복분자 150g, 설탕 15g, 물 1큰술, 요거트 200g, 그래놀라 30g", steps: ["복분자와 설탕, 물을 냄비에 넣고 중약불에서 7~8분 끓입니다. 냉동 제품은 포장의 가열 안내도 따릅니다.", "거친 씨가 싫으면 체에 거른 뒤 얕은 그릇에서 식힙니다.", "요거트 위에 소스와 그래놀라를 나누어 올립니다."], note: "우유·견과류 등 그래놀라의 알레르기 성분을 확인합니다." },
    recipeSlugs: [], sources: [sources.berry],
  },
  {
    id: "jeonnam", name: "전남", english: "JEONNAM", area: "고흥의 유자밭", icon: "citrus", pin: [126.58, 34.68],
    headline: "남쪽 바람에 익은 노란 향", description: "고흥 유자의 산뜻한 향을 차와 소스, 샐러드에 담습니다. 남쪽 과수원의 노란빛을 식탁으로 옮겨 보세요.",
    colors: ["#655322", "#f0e9bc", "#d4bf62"], colorStory: "유자의 노랑과 남쪽 들녘의 밝은 색",
    specialties: [{ name: "고흥 유자", art: "citrus", timing: "늦가을 · 황유자 11월 중심", seasons: ["autumn"], note: "노랗게 익은 황유자와 일찍 수확한 청유자는 구분합니다. 유자청은 생과 수확기가 지난 뒤에도 활용합니다." }],
    seasonNotes: { spring: "유자청을 드레싱으로 풀어 봄 채소에 곁들입니다. 수확기가 아닌 계절에는 가공한 유자를 활용합니다.", summer: "유자청에 차가운 물을 더하거나 샐러드 소스로 즐깁니다. 황유자의 주요 수확기는 늦가을입니다.", autumn: "11월 무렵 노랗게 익는 고흥 유자. 생과를 고를 때는 껍질의 향과 산지를 함께 살펴보세요.", winter: "가을에 담근 유자청을 차와 요리에 씁니다. 생과와 가공품의 유통 시기는 서로 다릅니다." },
    pantry: { title: "유자 두부 샐러드", meta: "2인분 · 15분", ingredients: "바로 먹을 수 있는 두부 300g, 샐러드 채소 100g, 유자청 1큰술, 간장 1큰술, 식초 1작은술, 식용유 1작은술", steps: ["채소를 씻어 물기를 빼고 두부는 한입 크기로 자릅니다. 두부 제품에 가열 안내가 있으면 먼저 익혀 식힙니다.", "유자청·간장·식초·기름을 섞어 소스를 만듭니다.", "채소와 두부를 담고 먹기 직전에 소스를 끼얹습니다."], note: "지역 유자청을 활용한 가정용 요리입니다. 제주 귤 디저트와는 다른 재료입니다." },
    recipeSlugs: [], sources: [sources.yuja],
  },
  {
    id: "gyeongbuk", name: "경북", english: "GYEONGBUK", area: "청송의 사과 과수원", icon: "apple", pin: [128.88, 36.23],
    headline: "붉게 익은 과수원의 한 입", description: "청송의 대표 농산물인 사과에서 출발합니다. 아삭한 생과와 따뜻하게 익힌 과육의 서로 다른 표정을 즐겨 보세요.",
    colors: ["#853f36", "#f2dfd5", "#d59983"], colorStory: "사과의 붉은 껍질과 크림빛 과육",
    specialties: [{ name: "청송 사과", art: "apple", timing: "가을 중심 · 품종별 수확", seasons: ["autumn"], note: "청송은 산과 계곡이 있는 사과 산지입니다. 홍로·후지 등 품종에 따라 숙기가 달라 정확한 출하 시기는 상품 정보를 확인합니다." }],
    seasonNotes: { spring: "저장 사과를 활용해 보세요. 부드럽게 졸인 사과는 토스트와 잘 어울립니다.", summer: "저장 사과와 조생종의 출하가 구분되는 때입니다. 청송 사과 전체를 여름 제철로 단정하지 않습니다.", autumn: "품종을 바꿔가며 사과의 단맛과 산미를 비교하는 계절입니다. 수확 시기는 품종과 농장마다 다릅니다.", winter: "저장 사과를 얇게 썰어 굽거나 졸여 따뜻한 디저트로 만납니다." },
    pantry: { title: "따뜻한 사과 토스트", meta: "2인분 · 20분", ingredients: "사과 1개(250g), 식빵 2장, 버터 15g, 설탕 1작은술, 계피가루 약간(선택)", steps: ["사과를 씻어 씨를 제거하고 5mm 두께로 썹니다.", "팬에 버터 10g과 사과, 설탕을 넣어 중약불에서 7~8분 굽듯이 익힙니다.", "남은 버터로 빵을 굽고 사과를 올립니다. 취향에 따라 계피를 뿌립니다."], note: "과육이 무르거나 단단한 정도에 따라 굽는 시간을 조절합니다." },
    recipeSlugs: [], sources: [sources.apple],
  },
  {
    id: "gyeongnam", name: "경남", english: "GYEONGNAM", area: "김해 진영의 단감", icon: "persimmon", pin: [128.12, 35.13],
    headline: "아삭하게 베어 무는 주홍빛", description: "진영단감의 달고 아삭한 맛을 가벼운 무침으로 즐깁니다. 과수원의 주홍빛이 채소와 만나 한 접시가 됩니다.",
    colors: ["#85502d", "#f2e1cf", "#d8a16c"], colorStory: "단감의 주홍과 잎의 차분한 초록",
    specialties: [{ name: "진영 단감", art: "persimmon", timing: "가을 · 부유 10월 하순~11월 상순", seasons: ["autumn"], note: "단감은 품종별 수확 차이가 있습니다. 부유·차랑과 더 일찍 익는 품종을 구분하고, 겨울 유통은 저장 여부를 살펴보세요." }],
    seasonNotes: { spring: "생단감의 수확기가 아닙니다. 저장 상품이 없으면 같은 단감이라고 표시하지 말고 사과 등 다른 아삭한 과일로 응용하세요.", summer: "단감은 가을을 기다리는 재료입니다. 아래 무침은 제철 단감이 나올 때 만들거나 다른 과일로 응용할 수 있습니다.", autumn: "주홍빛 단감이 익는 계절. 부유는 주로 10월 하순~11월 상순에 수확하며 품종마다 차이가 있습니다.", winter: "가을에 거둔 저장 단감을 아삭한 무침으로 즐깁니다. 구입할 때 단단함과 보관 상태를 확인하세요." },
    pantry: { title: "단감 오이무침", meta: "2인분 · 15분", ingredients: "단감 1개(200g), 오이 1/2개(100g), 식초 2작은술, 소금 1/4작은술, 참깨 1작은술", steps: ["단감은 씻어 꼭지와 씨를 제거하고 얇게 썹니다. 오이도 같은 두께로 썹니다.", "오이에 소금 절반을 뿌려 5분 두었다가 생긴 물을 가볍게 뺍니다.", "단감과 오이에 식초, 남은 소금, 참깨를 넣어 살살 무치고 바로 먹습니다."], note: "제철 밖에는 단단한 사과로 바꾸면 사과 오이무침이 됩니다. 곶감을 그대로 대체하지 않습니다." },
    recipeSlugs: [], sources: [sources.persimmon, sources.persimmonHarvest],
  },
  {
    id: "jeju", name: "제주", english: "JEJU", area: "바다 · 돌담 · 감귤 과수원", icon: "citrus", pin: [126.52, 33.38],
    headline: "바다의 맛에, 귤빛 한 스푼", description: "도마 위 돔베고기부터 은빛 갈치, 노릇한 생선구이와 새콤한 귤 디저트까지. 섬의 재료로 우리 집에 제주 한 상을 차립니다.",
    colors: ["#985021", "#f7e8cf", "#eeac57"], colorStory: "감귤의 주황 · 바다의 청록 · 현무암의 먹색",
    specialties: [
      { name: "제주 고사리", art: "fern", timing: "봄 · 3월 말~5월 초", seasons: ["spring"], note: "봄에 거두는 산나물입니다. 가정에서는 충분히 삶아 전처리된 식용 고사리를 구입해 제품 안내대로 조리하세요." },
      { name: "풋귤", art: "citrus", timing: "늦여름 · 8~9월", seasons: ["summer", "autumn"], note: "익기 전에 일찍 수확하는 감귤입니다. 신맛이 강해 익은 귤 디저트의 과육과 같은 양으로 바꾸지 않습니다." },
      { name: "제주 갈치", art: "fish", timing: "가을 · 9~10월 추천", seasons: ["autumn"], note: "은빛 갈치는 조림과 구이로 즐깁니다. 제철 밖에는 원산지를 확인한 냉동 제품도 활용할 수 있습니다." },
      { name: "노지감귤", art: "citrus", timing: "가을~겨울 · 10~12월 중심", seasons: ["autumn", "winter"], note: "극조생은 10월, 조생은 11~12월 중심입니다. 하우스·월동 감귤의 출하 시기와 구분합니다." },
      { name: "돼지고기 · 옥돔", art: "pork", timing: "사계절 유통 · 생산·어획별 차이", seasons: ["spring", "summer", "autumn", "winter"], note: "돼지고기와 손질·건조·냉동 옥돔은 제철 재료와 함께 한 상을 완성합니다. 사계절 수확되는 작물이라는 뜻은 아닙니다." },
    ],
    seasonNotes: { spring: "고사리가 올라오는 봄. 부드럽게 전처리한 나물을 돔베국수 한 상의 곁들임으로 만나 보세요.", summer: "늦여름의 풋귤은 강한 산미가 특징입니다. 익은 귤 컵 디저트에는 하우스감귤 등 익은 과육을 사용합니다.", autumn: "9~10월 갈치, 10월부터 익어가는 노지감귤. 은빛 바다와 귤빛 과수원의 맛이 만나는 계절입니다.", winter: "초겨울의 노지감귤과 따뜻한 돔베국수. 월동감귤은 이후 1~4월 출하되는 별도의 재배 방식입니다." },
    recipeSlugs: ["jeju-dombe-guksu", "jeju-galchi-jorim", "jeju-grilled-fish-platter", "jeju-tangerine-yogurt-cup"],
    sources: [sources.jejuFood, sources.citrus, sources.greenCitrus, sources.fern],
  },
];

export function getKoreanRegion(id?: string | null) { return koreanRegions.find((region) => region.id === id) ?? koreanRegions[koreanRegions.length - 1]; }
export function getSeason(value?: string | null, fallback: Season = "autumn"): Season { return seasons.some((season) => season.id === value) ? value as Season : fallback; }
export function seasonInSeoul(date = new Date()): Season {
  const month = Number(new Intl.DateTimeFormat("en", { timeZone: "Asia/Seoul", month: "numeric" }).format(date));
  return month >= 3 && month <= 5 ? "spring" : month >= 6 && month <= 8 ? "summer" : month >= 9 && month <= 11 ? "autumn" : "winter";
}
export function seasonalSpecialties(region: KoreanRegion, season: Season) {
  const fresh = region.specialties.filter((item) => item.seasons.includes(season));
  return { items: fresh.length ? fresh : region.specialties, isHarvestSeason: fresh.length > 0 };
}
