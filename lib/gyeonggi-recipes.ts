import type { Recipe } from "./content";
import { gyeonggiSources as sources } from "./gyeonggi-sources";

// Requested regional additions; independent of the daily dinner publishing log.
export const gyeonggiRecipes: Recipe[] = [
  {
    slug: "yeoju-sweet-potato-chicken-jorim", title: "여주 고구마 닭조림", country: "korea", domesticRegion: "gyeonggi", category: "main", experienceStatus: "researched",
    summary: "보랏빛 껍질 속 노란 고구마와 닭다리살을 간장 양념에 조립니다. 여주의 가을 재료로 차리는 달큰한 두 사람의 저녁입니다.",
    culturalNote: "경기도농업기술원이 고구마 주산지로 소개한 여주의 재료를 활용했습니다. 지역 고구마를 닭조림에 넣는 가정용 응용으로, 여주의 전통 향토음식 배합을 재현한 요리는 아닙니다.",
    localTable: { region: "경기 · 여주의 고구마 밭", ingredient: "여주 고구마 · 닭다리살", season: "가을 · 보통재배 9월 하순~10월 중순 수확", note: "농촌진흥청의 보통재배 수확 기준이며, 실제 산지·품종·재배 방식에 따라 달라집니다. 가을 밖에는 저장 고구마를 쓰고, 구입할 때 여주산 표시와 상태를 확인하세요." },
    cookingTime: 45, servings: 2, difficulty: "쉬움", visualLabel: "YEOJU HARVEST", visualCaption: "자주빛 고구마, 간장의 윤기", keywords: ["경기도", "여주", "고구마", "닭조림", "가을", "저녁"],
    ingredientGroups: [
      { title: "냄비 속 재료", items: ["뼈 없는 닭다리살 350g", "고구마 300g, 양파 100g", "대파 1/2대, 식용유 1작은술(5ml)", "곁들임: 지은 밥 2공기"] },
      { title: "간장 양념과 도구", items: ["물 250ml, 진간장 2큰술(30ml)", "다진 마늘 2작은술, 설탕 1작은술, 후추 약간", "뚜껑 있는 넓은 냄비, 식품용 중심온도계"] },
    ],
    steps: [
      { title: "고구마와 닭 손질", description: "고구마를 깨끗이 씻어 껍질째 3cm 크기로 썰고, 양파와 대파도 썹니다. 닭은 수분을 닦아 3cm로 자릅니다. 생닭을 다룬 칼과 도마는 세척합니다." },
      { title: "닭 겉면 굽기", description: "냄비에 기름을 두르고 중불로 달군 뒤 닭을 넣어 약 5분, 양면에 색을 냅니다. 이 단계에서는 속까지 익지 않아도 됩니다." },
      { title: "고구마와 함께 조리기", description: "고구마, 양파, 물, 간장, 마늘, 설탕, 후추를 넣습니다. 끓으면 중약불로 줄여 덮고 15~20분 조립니다. 바닥이 마르면 물을 조금씩 보충합니다." },
      { title: "익힘과 윤기 맞추기", description: "가장 두꺼운 닭 중심이 74°C 이상이고 고구마에 젓가락이 부드럽게 들어가면 대파를 넣습니다. 덜 익었으면 더 익히고, 마지막 2~3분은 뚜껑을 열어 국물을 졸여 밥에 곁들입니다.", tip: "고구마를 자주 뒤적이지 말고 냄비를 가볍게 흔들어 모양을 살리세요." },
    ],
    substitutions: ["여주산을 구하기 어려우면 다른 국내산 고구마로 같은 방법을 사용합니다.", "닭가슴살은 더 쉽게 퍽퍽해지므로 중심온도를 확인하며 조리 시간을 조절합니다."],
    tips: ["밤고구마는 포슬하고 호박고구마는 더 부드럽게 풀어질 수 있습니다.", "촬영은 고구마 단면 → 보글거리는 양념 → 밥 위에 올리는 순서가 어울립니다."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.sweetPotato, sources.sweetPotatoHarvest, sources.safety], palette: { from: "#efd8d0", mid: "#c7a3ac", to: "#9b6370", ink: "#4d3039" },
  },
  {
    slug: "anseong-pear-shrimp-salad", title: "안성 배 새우 겨자냉채", country: "korea", domesticRegion: "gyeonggi", category: "main", experienceStatus: "researched",
    summary: "아삭한 배와 탱글한 새우에 알싸한 겨자 소스를 곁들입니다. 가을 과수원의 단맛을 살린, 밥과 함께 먹기 좋은 2인 냉채입니다.",
    culturalNote: "경기도의 안성장 소개는 9~10월의 배와 포도를 지역 특산물로 꼽습니다. 이 냉채는 안성 배를 식사에 활용한 현대적인 가정용 제안입니다.",
    localTable: { region: "경기 · 안성의 과수원과 장터", ingredient: "안성 배 · 새우", season: "가을 · 배 9~10월 중심", note: "배는 품종과 날씨에 따라 수확 시기가 다릅니다. 저장 배로도 만들 수 있으며, 새우와 오이까지 모두 안성산이거나 같은 제철이라는 뜻은 아닙니다." },
    cookingTime: 25, servings: 2, difficulty: "쉬움", visualLabel: "ANSEONG PEAR", visualCaption: "배의 금빛 껍질과 산호빛 새우", keywords: ["경기도", "안성", "배", "새우", "겨자냉채", "가을"],
    ingredientGroups: [
      { title: "냉채 한 접시", items: ["껍질·씨를 제거한 배 250g", "손질한 생새우 200g, 오이 100g", "빨간 파프리카 60g", "곁들임: 지은 밥 2공기"] },
      { title: "겨자 소스", items: ["식초 1큰술(15ml), 물 1큰술(15ml)", "연겨자 1작은술, 설탕 2작은술", "진간장 1작은술(5ml), 소금 1/8작은술부터"] },
    ],
    steps: [
      { title: "채소와 소스 준비", description: "오이와 파프리카를 씻어 가늘게 썹니다. 소스 재료를 설탕이 녹을 때까지 섞어 냉장합니다. 연겨자는 제품마다 매운 정도가 다르니 절반부터 넣어도 좋습니다." },
      { title: "새우를 충분히 익히기", description: "냉동 생새우는 냉장실에서 해동합니다. 끓는 물에 넣어 보통 2~3분 익히되 크기에 따라 더 가열하고, 가장 두꺼운 살까지 진주빛 또는 흰색의 불투명한 상태인지 확인합니다." },
      { title: "새우 식히고 배 썰기", description: "새우를 건져 생새우가 닿지 않은 깨끗한 얕은 그릇에 펼쳐 식히고 신속히 냉장합니다. 먹기 직전에 배를 씻어 껍질과 씨를 제거한 뒤 5mm 두께로 썹니다." },
      { title: "차갑게 담아 내기", description: "차가운 새우, 배, 오이, 파프리카를 넓은 접시에 담습니다. 소스를 절반부터 끼얹어 가볍게 섞고 간에 맞게 추가합니다. 채소에서 물이 나오기 전에 밥과 함께 바로 먹습니다." },
    ],
    substitutions: ["안성 배가 없으면 단단하고 과즙이 많은 국내산 배를 사용합니다.", "새우 대신 완전히 익혀 식힌 닭가슴살 200g을 사용할 수 있습니다. 알레르기 대체 시 소스 성분도 확인하세요."],
    tips: ["소스는 미리 섞어도 되지만 배와 채소는 먹기 직전에 버무립니다.", "밝은 접시에 배와 새우를 번갈아 담으면 흰빛과 산호빛이 잘 드러납니다."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.pear, sources.safety], palette: { from: "#f2e6c3", mid: "#d4c88e", to: "#a3b5a2", ink: "#3d4532" },
  },
  {
    slug: "gapyeong-pine-nut-buckwheat-noodles", title: "가평 잣소스 메밀국수", country: "korea", domesticRegion: "gyeonggi", category: "main", experienceStatus: "researched",
    summary: "가평 잣을 두유와 곱게 갈아 메밀국수를 감싸는 크림빛 소스로 만듭니다. 향긋한 잣과 오이의 산뜻함을 함께 즐기는 한 그릇입니다.",
    culturalNote: "가평에서는 잣을 죽과 두부, 국수부터 디저트까지 다양하게 활용합니다. 이 레시피는 그 지역 재료에서 출발해 두유와 메밀면을 조합한 가정용 응용입니다.",
    localTable: { region: "경기 · 가평의 잣나무 숲", ingredient: "가평 잣 · 메밀면", season: "가을 채취 · 깐 잣은 연중 유통", note: "가평의 가을 잣 수확은 현장 취재 자료에서도 확인됩니다. 실제 채취는 산지와 작황에 따라 다르며, 판매 중인 깐 잣이 모두 올해 햇잣은 아닙니다. 원산지·생산 정보와 보관 안내를 확인하세요." },
    cookingTime: 25, servings: 2, difficulty: "쉬움", visualLabel: "GAPYEONG PINE", visualCaption: "잣의 크림색, 메밀의 회갈색", keywords: ["경기도", "가평", "잣", "메밀국수", "두유", "가을"],
    ingredientGroups: [
      { title: "두 그릇의 국수", items: ["마른 메밀면 200g, 오이 100g", "깐 잣 50g · 소스용 45g, 고명용 5g"] },
      { title: "고소한 소스", items: ["바로 마실 수 있는 무가당 두유 150ml", "차가운 물 30~60ml", "소금 1/4작은술부터, 진간장 1작은술(5ml)", "믹서, 면 삶을 냄비, 체"] },
    ],
    steps: [
      { title: "잣과 오이 준비", description: "오이를 씻어 가늘게 썹니다. 잣은 마른 팬의 약불에서 2~3분 저어 향을 낸 뒤 식힙니다. 이미 볶은 잣은 이 과정을 생략하고, 타기 전에 불을 끕니다." },
      { title: "크림빛 소스 갈기", description: "식힌 잣 45g, 두유 150ml, 물 30ml, 간장, 소금을 믹서에 곱게 갑니다. 너무 되직하면 물을 조금씩, 최대 30ml 더 넣어 면에 묻는 농도로 맞추고 냉장합니다." },
      { title: "면 삶고 헹구기", description: "넉넉한 끓는 물에 메밀면을 넣고 포장지 시간대로 삶습니다. 찬물에 가볍게 비벼 헹군 뒤 체에서 물기를 충분히 뺍니다." },
      { title: "소스와 고명 더하기", description: "그릇 두 개에 면과 소스를 나눠 담고 오이와 남은 잣 5g을 올립니다. 차갑게 바로 먹고, 농도가 되면 차가운 물을 한 숟가락씩 더합니다." },
    ],
    substitutions: ["가평산 잣을 구하기 어렵다면 다른 산지의 잣을 사용할 수 있습니다.", "메밀면 대신 소면으로 만들면 향과 알레르기 성분이 달라집니다."],
    tips: ["잣·콩·메밀 및 혼합 면에 든 밀 등 알레르기 성분을 확인하세요.", "소스가 면에 천천히 흐르는 모습을 가까이 담으면 질감이 잘 전달됩니다."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.pineNut, sources.pineNutHarvest], palette: { from: "#eee7d7", mid: "#c9c4b3", to: "#93a4ad", ink: "#343e46" },
  },
  {
    slug: "paju-jangdan-tofu-mushroom-hotpot", title: "파주 장단콩 두부 버섯전골", country: "korea", domesticRegion: "gyeonggi", category: "main", experienceStatus: "researched",
    summary: "장단콩으로 만든 두부와 버섯을 차곡차곡 담아 끓이는 맑은 전골. 콩의 고소함에 들깨 향을 조금 더한 두 사람의 따뜻한 식탁입니다.",
    culturalNote: "장단콩의 ‘장단’은 하나의 콩 품종명이 아니라 지역에서 온 이름입니다. 파주에서는 콩을 두부와 장으로 이어 먹는 식문화가 소개됩니다. 여기서는 구입한 두부로 간편한 전골을 구성했습니다.",
    localTable: { region: "경기 · 파주 장단콩의 식탁", ingredient: "장단콩 두부 · 버섯", season: "늦가을 콩 수확 · 두부는 사계절", note: "지역 체험 자료는 콩 수확을 10월 말~11월 초순으로 안내합니다. 9월에는 올해 햇콩으로 단정하지 않습니다. 장단콩 사용 표시를 확인한 두부를 쓰며, 두부의 연중 판매와 원료 콩의 수확기는 구분합니다." },
    cookingTime: 30, servings: 2, difficulty: "쉬움", visualLabel: "PAJU BEAN TABLE", visualCaption: "콩의 아이보리와 버섯의 흙빛", keywords: ["경기도", "파주", "장단콩", "두부", "버섯전골", "가을"],
    ingredientGroups: [
      { title: "전골 재료", items: ["장단콩으로 만든 두부 400g", "느타리·표고 등 버섯 200g", "알배추 150g, 양파 80g, 대파 30g", "곁들임: 지은 밥 2공기"] },
      { title: "국물과 마무리", items: ["무염 다시마 육수 600ml", "국간장 1큰술(15ml), 다진 마늘 1작은술", "소금·후추 약간, 들깨가루 2큰술(선택)", "지름 약 22cm 냄비"] },
    ],
    steps: [
      { title: "두부와 채소 썰기", description: "두부는 물기를 빼고 1.5cm 두께로 썹니다. 버섯을 손질해 느타리는 찢고 표고는 썹니다. 씻은 배추는 4cm로, 양파는 채로, 대파는 어슷하게 썹니다." },
      { title: "냄비에 차곡차곡 담기", description: "냄비 바닥에 양파와 배추를 깔고 두부와 버섯을 번갈아 돌려 담습니다. 육수 600ml에 국간장과 마늘을 섞어 가장자리로 붓습니다." },
      { title: "속까지 끓이기", description: "중불로 끓인 뒤 중약불에서 10~12분, 채소와 버섯이 부드럽고 두부 중심까지 충분히 뜨거워지도록 익힙니다. 두부 포장의 가열 안내도 따르고, 국물이 부족하면 뜨거운 물을 조금 보충합니다." },
      { title: "고소한 향으로 마무리", description: "대파와 선택한 들깨가루를 넣어 2분 더 끓입니다. 소금과 후추로 간을 맞춘 뒤 밥과 함께 냅니다. 들깨가루는 조금씩 풀어 원하는 농도로 조절합니다." },
    ],
    substitutions: ["장단콩 두부가 없으면 일반 국산콩 두부로 만듭니다. 원료 콩의 산지는 포장에서 확인하세요.", "버섯은 새송이로 바꿔도 좋고, 맑은 국물을 원하면 들깨가루를 생략합니다."],
    tips: ["버섯과 두부를 젓기보다 국물을 끼얹으면 모양을 살리기 좋습니다.", "끓기 전 재료 배열과 완성 후 김이 오르는 장면을 연결해 촬영해 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.jangdan, sources.beanHarvest], palette: { from: "#eee3cf", mid: "#d9bea3", to: "#b28b6b", ink: "#49382c" },
  },
];
