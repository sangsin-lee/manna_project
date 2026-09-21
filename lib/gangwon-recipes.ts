import type { Recipe } from "./content";
import { gangwonSources as sources } from "./gangwon-sources";

// Regional additions are separate from the daily dinner publishing log.
export const gangwonRecipes: Recipe[] = [
  {
    slug: "pyeongchang-potato-ongsimi", title: "평창 감자옹심이", country: "korea", domesticRegion: "gangwon", category: "main", experienceStatus: "researched",
    summary: "생감자를 갈아 빚은 옹심이를 맑은 국물에 끓입니다. 평창 감자의 담백함과 쫀득한 식감을 한 그릇에 담는 두 사람의 산골 식탁입니다.",
    culturalNote: "평창군은 봉평 감자를 직접 갈아 옹심이를 만드는 지역 식당을 소개합니다. 여기서는 그 조리 방식에 착안해 감자 수분에 따라 전분을 보충하는 가정용 분량을 구성했습니다.",
    localTable: { region: "강원 · 평창의 고랭지", ingredient: "평창 감자 · 애호박", season: "여름~초가을 · 감자 수확 체험 8~9월", note: "평창의 감자 수확 체험 안내를 참고한 시기이며, 재배 작형과 품종에 따라 다릅니다. 저장 감자로 사계절 만들 수 있고 산지는 포장에서 확인합니다." },
    cookingTime: 50, servings: 2, difficulty: "보통", visualLabel: "PYEONGCHANG POTATO", visualCaption: "감자 속살의 아이보리, 맑은 국물", keywords: ["강원", "평창", "감자", "옹심이", "고랭지", "가을"],
    ingredientGroups: [
      { title: "옹심이 반죽", items: ["껍질을 벗긴 감자 600g", "감자전분 2~4큰술(20~40g) · 상태에 따라", "소금 1/4작은술"] },
      { title: "국물과 채소", items: ["무염 멸치·다시마 육수 800ml", "애호박 100g, 양파 80g, 대파 20g", "국간장 2작은술(10ml), 다진 마늘 1작은술", "소금·후추 약간, 보충할 물", "강판, 면포, 볼, 냄비"] },
    ],
    steps: [
      { title: "감자를 갈아 물기 빼기", description: "감자를 씻고 껍질을 벗겨 600g 준비합니다. 강판에 곱게 갈아 면포에 담고 볼 위에서 눌러 물기를 짭니다. 건더기는 따로 두고, 짠 물은 10분 그대로 두어 전분을 가라앉힙니다." },
      { title: "전분을 모아 반죽하기", description: "볼의 윗물만 조심히 버리고 바닥의 흰 전분을 건더기와 섞습니다. 소금과 감자전분 20g을 넣어 뭉치고, 너무 질면 전분을 조금씩 추가합니다. 2cm 크기로 동그랗게 빚습니다.", tip: "반죽이 너무 퍽퍽하면 물을 1작은술씩 더합니다. 첫 알을 끓여 보고 풀어지면 전분을 조금 보충하세요." },
      { title: "채소 국물 끓이기", description: "애호박과 양파는 가늘게, 대파는 송송 썹니다. 냄비에 육수, 국간장, 마늘, 양파를 넣어 끓입니다. 시판 육수가 짜면 국간장을 줄입니다." },
      { title: "옹심이 속까지 익히기", description: "끓는 국물에 옹심이를 넣고 바닥에 붙지 않게 한 번 저어 줍니다. 중불에서 10~12분 끓이며 마지막 3분에 애호박과 대파를 넣습니다. 한 알을 갈라 중심에 생감자 맛이나 가루진 심이 없고 쫀득하게 익었는지 확인하고, 필요하면 더 끓입니다." },
      { title: "두 그릇에 담기", description: "국물이 줄면 뜨거운 물을 조금 더하고 소금과 후추로 간을 맞춥니다. 옹심이와 채소를 두 그릇에 나누어 뜨거울 때 먹습니다." },
    ],
    substitutions: ["평창산이 없으면 다른 국내산 감자로 만들되 수분에 따라 전분 양을 조절합니다.", "멸치육수 대신 다시마·표고 육수를 써도 됩니다."],
    tips: ["싹이 많거나 초록빛으로 변한 감자는 사용하지 않습니다.", "손으로 빚는 장면과 옹심이 단면을 담으면 감자의 변화를 보여주기 좋습니다."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.potatoHarvest, sources.ongsimi], palette: { from: "#eee8dc", mid: "#c9c6b6", to: "#91a3a2", ink: "#344344" },
  },
  {
    slug: "bongpyeong-buckwheat-cabbage-jeon", title: "봉평 메밀배추전", country: "korea", domesticRegion: "gangwon", category: "main", experienceStatus: "researched",
    summary: "얇은 메밀 반죽에 배추 잎을 펼쳐 노릇하게 부칩니다. 봉평 장터의 메밀 음식에서 영감 받은, 두 사람이 나눠 먹는 작은 전 네 장입니다.",
    culturalNote: "봉평장은 이효석의 소설 『메밀꽃 필 무렵』과 연결되는 장터이며, 메밀국수와 메밀전 등 다양한 음식을 만날 수 있는 곳입니다. 집에서 뒤집기 쉽도록 메밀가루에 밀가루를 조금 섞었습니다.",
    localTable: { region: "강원 · 평창 봉평의 메밀밭", ingredient: "메밀가루 · 배추", season: "메밀 · 여름 7월, 가을 10월 중심", note: "농사로는 중북부 메밀 수확을 여름 작형 7월 상~중순, 가을 작형 10월 상~중순으로 안내합니다. 꽃이 피는 시기와 알곡 수확은 다르며, 유통 메밀가루로 연중 조리할 수 있습니다." },
    cookingTime: 30, servings: 2, difficulty: "쉬움", visualLabel: "BONGPYEONG JEON", visualCaption: "메밀의 회갈색, 배추의 연둣빛", keywords: ["강원", "평창", "봉평", "메밀", "배추전", "장터"],
    ingredientGroups: [
      { title: "작은 전 네 장", items: ["메밀가루 80g, 밀가루 40g", "물 180ml, 소금 1/4작은술", "작은 알배추 잎 4장(약 150g), 쪽파 20g", "식용유 2큰술(30ml) · 나누어 사용"] },
      { title: "찍어 먹는 간장", items: ["진간장 1큰술(15ml)", "식초 1작은술(5ml), 물 1작은술(5ml)", "깨 1/2작은술(선택)"] },
    ],
    steps: [
      { title: "배추 줄기 부드럽게 준비", description: "배추와 쪽파를 씻습니다. 두꺼운 배추 줄기를 칼등으로 가볍게 눌러 편 뒤 끓는 물에 약 1분 데칩니다. 찬물에 식혀 물기를 꼭 짜고 쪽파는 5cm로 썹니다." },
      { title: "묽은 메밀 반죽 만들기", description: "메밀가루, 밀가루, 물 180ml, 소금을 덩어리 없이 섞어 5분 둡니다. 국자로 떴을 때 흐르는 농도여야 하며, 너무 되면 물을 1큰술씩 더합니다. 간장 소스 재료도 섞습니다." },
      { title: "잎을 펼쳐 앞면 굽기", description: "중불로 달군 팬에 기름을 조금 두릅니다. 배추 한 장에 반죽을 묻혀 펼치고 쪽파와 반죽을 조금 더해 지름 약 15cm로 만듭니다. 2~3분, 가장자리가 익고 바닥이 노릇해질 때까지 굽습니다." },
      { title: "뒤집어 속까지 익히기", description: "넓은 뒤집개로 뒤집어 2~3분 더 굽고, 배추 주변에도 젖은 반죽이 남지 않도록 익힙니다. 나머지도 같은 방법으로 총 네 장 부쳐 소스와 함께 냅니다.", tip: "팬이 작으면 한 장씩 굽고, 큰 팬은 서로 닿지 않게 두 장씩 굽습니다." },
    ],
    substitutions: ["메밀 혼합가루는 밀 함량과 간이 다르므로 제품 안내에 맞게 물과 소금을 조절합니다.", "알배추 대신 일반 배추의 작은 속잎을 사용할 수 있습니다."],
    tips: ["메밀과 밀 알레르기가 있는 경우 재료를 확인하세요.", "주걱을 넣기 전에 바닥이 충분히 익어야 얇은 전이 찢어지지 않습니다.", "배추 잎맥이 드러나는 면을 위로 놓고 가장자리의 바삭한 소리를 담아 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.market, sources.buckwheatHarvest], palette: { from: "#efe9db", mid: "#c8bd9c", to: "#a2a781", ink: "#414332" },
  },
  {
    slug: "hoengseong-gochujang-deodeok-gui", title: "횡성 더덕 고추장구이", country: "korea", domesticRegion: "gangwon", category: "main", experienceStatus: "researched",
    summary: "향긋한 더덕을 두드려 펼친 뒤 붉은 고추장 양념을 얇게 입혀 굽습니다. 밥에 곁들이기 좋은 두 사람의 산지 한 접시입니다.",
    culturalNote: "횡성 청일면에서는 직접 재배한 더덕을 여러 요리로 내는 농가 식탁이 소개됩니다. 더덕 고유의 향과 결을 살리되, 집의 프라이팬에서 만들기 쉬운 구이로 구성했습니다.",
    localTable: { region: "강원 · 횡성 청일의 더덕 밭", ingredient: "횡성 더덕 · 고추장", season: "가을부터 이듬해 싹트기 전 · 재배 조건별 차이", note: "농사로는 심은 지 2~3년 된 더덕을 10월 중순 이후부터 다음 봄 싹이 나기 전까지 수확할 수 있다고 설명합니다. 9월 판매품을 새 가을 수확으로 단정하지 않고 산지와 출하 정보를 확인합니다." },
    cookingTime: 35, servings: 2, difficulty: "보통", visualLabel: "HOENGSEONG ROOTS", visualCaption: "더덕의 흙빛, 고추장의 붉은 윤기", keywords: ["강원", "횡성", "더덕", "더덕구이", "고추장", "가을"],
    ingredientGroups: [
      { title: "더덕과 곁들임", items: ["껍질 벗긴 더덕 200g", "참기름 1작은술(5ml), 식용유 1작은술(5ml)", "송송 썬 쪽파 1큰술, 깨 1/2작은술", "곁들임: 지은 밥 2공기, 채소 반찬"] },
      { title: "구이 양념", items: ["고추장 1큰술(약 20g)", "진간장 1작은술(5ml), 물 1큰술(15ml)", "다진 마늘 1작은술, 설탕 1작은술", "종이 포일, 밀대 또는 고기망치, 팬"] },
    ],
    steps: [
      { title: "더덕을 얇게 펼치기", description: "껍질 벗긴 더덕을 씻어 물기를 닦고 길이로 반을 가릅니다. 종이 포일 사이에 놓고 밀대로 살살 두드려 4~5mm 두께로 폅니다. 결이 찢어질 만큼 세게 누르지 않습니다." },
      { title: "양념과 밑간 준비", description: "고추장, 간장, 물, 마늘, 설탕을 섞습니다. 펼친 더덕에는 참기름을 얇게 바릅니다. 작은 더덕 조각은 따로 모아 짧게 굽습니다." },
      { title: "양념 없이 먼저 굽기", description: "팬에 식용유를 두르고 중약불에서 더덕을 앞뒤로 총 4~5분 굽습니다. 살짝 휘어질 정도로 부드러워지면 불을 약하게 줄입니다." },
      { title: "양념을 얇게 입혀 마무리", description: "양념을 양면에 얇게 바르고 약불에서 앞뒤로 1~2분씩 더 굽습니다. 두꺼운 부분까지 부드러워질 때까지 익히되 양념이 타기 시작하면 불을 더 줄입니다. 남는 양념은 모두 붓지 말고, 쪽파와 깨를 뿌려 밥에 곁들입니다." },
    ],
    substitutions: ["횡성산이 없으면 다른 국내산 더덕으로 같은 방식으로 조리합니다.", "매운맛을 줄이려면 고추장을 절반으로 줄이고 물을 1작은술 더해 얇게 바릅니다."],
    tips: ["35분은 껍질 벗긴 더덕 기준입니다. 흙더덕은 씻고 껍질 벗기는 시간을 별도로 잡으세요.", "한 끼 전체보다 밥에 곁들이는 2인용 구이 분량입니다.", "더덕을 두드리는 소리 → 양념 붓질 → 결대로 찢는 장면으로 향과 식감을 전해 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.deodeok, sources.deodeokHarvest], palette: { from: "#f1e0d0", mid: "#d1a18c", to: "#b86850", ink: "#4c3029" },
  },
  {
    slug: "hongcheon-waxy-corn-soup", title: "홍천 찰옥수수 수프", country: "korea", domesticRegion: "gangwon", category: "breakfast", experienceStatus: "researched",
    summary: "익힌 찰옥수수를 우유와 곱게 갈고 알갱이를 조금 남겨 쫀득함을 살립니다. 빵을 곁들여 가볍게 먹는 크림빛 두 그릇입니다.",
    culturalNote: "홍천군은 찰옥수수의 차진 식감과 지역 종자 개발을 소개합니다. 쪄 먹던 지역 재료를 우유 수프로 응용한 현대적인 가정용 메뉴입니다.",
    localTable: { region: "강원 · 홍천의 옥수수 밭", ingredient: "홍천 찰옥수수 · 우유", season: "여름~초가을 유통 · 냉동·진공 포장은 연중", note: "홍천군의 생물 구매 안내는 7월 15일~9월 말이며, 실제 출하는 작황과 농가에 따라 다릅니다. 수프는 완전히 익힌 알갱이를 사용하고, 제철 밖에는 냉동·진공 포장 제품을 활용합니다." },
    cookingTime: 25, servings: 2, difficulty: "쉬움", visualLabel: "HONGCHEON CORN", visualCaption: "찰옥수수의 크림빛과 버터의 연노랑", keywords: ["강원", "홍천", "찰옥수수", "옥수수수프", "여름", "초가을"],
    ingredientGroups: [
      { title: "수프 두 그릇", items: ["완전히 익힌 찰옥수수 알갱이 250g · 고명 30g 포함", "양파 80g, 버터 10g", "우유 300ml, 물 150ml + 농도 조절용", "소금 1/4작은술부터, 후추 약간", "곁들임: 식빵 또는 통곡물빵 2~4쪽", "냄비, 내열 핸드블렌더 또는 믹서"] },
    ],
    steps: [
      { title: "익힌 옥수수 준비", description: "삶거나 찐 옥수수에서 알갱이 250g을 떼어 30g은 고명으로 남깁니다. 냉동·진공 포장 제품은 생제품인지 가열 완료 제품인지 확인하고, 포장 안내대로 충분히 익혀 준비합니다. 양파는 잘게 썹니다." },
      { title: "양파를 부드럽게 볶기", description: "냄비에 버터를 녹이고 중약불에서 양파를 4~5분, 투명해질 때까지 볶습니다. 옥수수 220g과 물 150ml를 넣어 약 5분 잔잔하게 끓입니다." },
      { title: "우유와 곱게 갈기", description: "불을 끄고 우유를 넣습니다. 내열 핸드블렌더를 충분히 잠기게 해 튀지 않도록 갈거나, 일반 믹서는 내용물을 식힌 뒤 용기의 온도·용량 안내에 맞춰 나누어 갑니다. 곱게 간 내용물을 냄비에 모읍니다." },
      { title: "농도 맞춰 따뜻하게 내기", description: "약불에서 바닥을 저어가며 충분히 데웁니다. 찰옥수수라 걸쭉해지면 물을 1큰술씩 더하고 소금·후추로 간합니다. 남긴 고명도 넣어 함께 데운 뒤 두 그릇에 나누고 빵을 곁들입니다." },
    ],
    substitutions: ["홍천산이 없으면 다른 찰옥수수를 사용할 수 있습니다.", "스위트콘 통조림은 물기를 빼고 쓸 수 있지만 단맛과 식감이 달라집니다.", "우유 대신 무가당 두유, 버터 대신 식물성 기름을 쓰면 맛과 알레르기 성분이 달라집니다."],
    tips: ["25분은 이미 익힌 옥수수 기준이며, 생옥수수를 삶는 시간과 일반 믹서용 냉각 시간은 별도입니다.", "찰옥수수는 스위트콘보다 덜 달고 차집니다. 품종에 따라 수프 색도 달라질 수 있습니다.", "알갱이를 한 숟가락 떨어뜨리는 장면으로 매끈한 수프와 쫀득한 고명의 대비를 보여주세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.corn], palette: { from: "#faf0ce", mid: "#e1d199", to: "#c5ae6b", ink: "#494029" },
  },
];
