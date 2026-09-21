import type { Recipe } from "./content";
import { chungnamSources as sources } from "./chungnam-sources";

// Regional additions are separate from the daily dinner publishing log.
export const chungnamRecipes: Recipe[] = [
  {
    slug: "gongju-chestnut-cream-pasta", title: "공주 알밤 크림 파스타", country: "korea", domesticRegion: "chungnam", category: "main", experienceStatus: "researched",
    summary: "포슬포슬한 알밤을 으깨 크림 소스에 풀고, 버섯과 함께 파스타에 감쌉니다. 공주의 가을 재료를 두 사람의 부드러운 저녁으로 옮긴 한 접시입니다.",
    culturalNote: "공주의 가을 여행에는 알밤 수확 체험이 등장합니다. 지역의 밤을 파스타 소스에 활용한 만나의 식탁의 가정용 응용이며, 공주 전통 음식으로 소개하는 배합은 아닙니다.",
    localTable: { region: "충남 · 공주의 알밤 숲", ingredient: "공주 알밤 · 버섯", season: "가을 · 알밤 수확 체험 9~10월", note: "품종과 농장에 따라 수확 시기가 다릅니다. 조리에는 설탕을 넣지 않고 완전히 익힌 깐 밤을 사용하며, 저장·냉동 제품으로 다른 계절에도 만들 수 있습니다." },
    cookingTime: 30, servings: 2, difficulty: "쉬움", visualLabel: "GONGJU CHESTNUT", visualCaption: "알밤의 갈색과 부드러운 크림빛", keywords: ["충남", "공주", "알밤", "크림", "파스타", "가을"],
    ingredientGroups: [
      { title: "파스타와 밤", items: ["스파게티 160g", "무가당으로 완전히 익힌 깐 밤 120g", "양송이버섯 100g, 양파 80g", "파스타 삶을 물 1.5L, 소금 8g"] },
      { title: "크림 소스", items: ["무가당 생크림 120ml, 우유 120ml", "버터 10g, 다진 마늘 1작은술", "파르메산 치즈 10g, 후추 약간", "남겨 둔 면수 100ml · 농도에 따라 사용", "파슬리 약간(선택)"] },
    ],
    steps: [
      { title: "익힌 밤과 채소 준비", description: "밤 80g은 포크로 으깨고 나머지는 반으로 자릅니다. 버섯은 얇게, 양파는 잘게 썹니다. 생밤을 쓴다면 먼저 속까지 부드럽게 삶고 껍질을 모두 벗겨 120g 준비하며, 이 시간은 별도입니다." },
      { title: "파스타 삶기", description: "물 1.5L를 끓여 소금과 면을 넣습니다. 포장 권장 시간보다 1분 짧게 삶고, 건지기 전에 면수 100ml를 따로 둡니다. 삶는 동안 소스를 준비합니다." },
      { title: "버섯에 고소한 향 입히기", description: "큰 팬에 버터를 녹여 중불에서 양파와 마늘을 2분 볶습니다. 버섯을 넣고 3~4분 더 볶아 물기를 날립니다." },
      { title: "밤 크림 소스 만들기", description: "불을 약하게 줄이고 우유, 생크림, 으깬 밤을 넣어 3분 정도 부드럽게 끓입니다. 바닥에 눌어붙지 않게 저으며, 너무 되면 면수를 조금 더합니다." },
      { title: "면과 소스 합치기", description: "면과 반으로 자른 밤을 넣고 약불에서 1~2분 섞어 면을 마저 익힙니다. 불을 끄고 치즈와 후추를 더합니다. 면수로 흐르는 농도를 맞추고, 두 접시에 나누어 파슬리를 뿌립니다." },
    ],
    substitutions: ["공주산이 없으면 다른 국내산 밤으로 만들고 실제 산지를 표시합니다.", "양송이 대신 느타리버섯을 잘게 찢어 사용할 수 있습니다."],
    tips: ["30분은 완전히 익힌 깐 밤 기준입니다. 시럽에 절인 밤이나 달게 만든 밤 페이스트는 같은 양으로 대체하지 않습니다.", "소스는 식으면 더 되직해집니다. 불을 끄기 전 약간 묽게 맞춥니다.", "반으로 자른 밤의 단면과 크림이 묻은 면을 함께 담아 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.chestnut], palette: { from: "#f2e6d0", mid: "#d6b991", to: "#b68a63", ink: "#523728" },
  },
  {
    slug: "taean-salt-roasted-prawns", title: "태안 대하 소금구이", country: "korea", domesticRegion: "chungnam", category: "main", experienceStatus: "researched",
    summary: "굵은소금 위에 대하를 한 겹으로 놓고 뚜껑을 덮어 익힙니다. 껍질 안의 촉촉한 살과 은은한 단맛을 즐기는 서해의 가을 한 접시입니다.",
    culturalNote: "태안 백사장항은 가을 대하를 즐기는 지역 식문화와 연결됩니다. 대하와 흰다리새우는 서로 다른 종이므로 구입할 때 종명과 원산지를 확인하고, 대체 재료를 쓰면 이름도 구분합니다.",
    localTable: { region: "충남 · 태안 안면도 백사장항", ingredient: "태안 대하 · 굵은소금", season: "가을 · 어획과 유통에 따라 차이", note: "해양수산부는 대하와 흰다리새우를 가을 새우로 소개합니다. 태안산 대하를 확인해 구입하며, 냉동 제품은 냉장 해동 시간을 별도로 잡습니다." },
    cookingTime: 25, servings: 2, difficulty: "쉬움", visualLabel: "TAEAN SEA", visualCaption: "소금의 흰빛, 새우의 산호빛, 서해의 푸른색", keywords: ["충남", "태안", "안면도", "대하", "새우", "소금구이"],
    ingredientGroups: [
      { title: "새우와 소금 바닥", items: ["냉장 또는 냉장 해동한 통대하 600g", "굵은소금 약 500~700g · 팬 바닥 1cm 두께", "레몬 1/2개(선택)", "두꺼운 무코팅 팬 또는 냄비(약 26cm), 뚜껑, 집게"] },
      { title: "곁들임", items: ["지은 밥 2공기", "씻은 쌈 채소 또는 오이 150g"] },
    ],
    steps: [
      { title: "대하 손질하기", description: "대하는 흐르는 찬물에 짧게 씻고 긴 수염과 뾰족한 머리 끝을 가위로 정리합니다. 등의 마디 사이로 이쑤시개를 넣어 검은 내장을 빼고 물기를 닦습니다. 껍질은 그대로 둡니다." },
      { title: "소금 바닥 준비", description: "두꺼운 무코팅 팬에 굵은소금을 약 1cm 두께로 고르게 깝니다. 새우를 겹치지 않게 올린 뒤 뚜껑을 덮고 중불로 가열합니다. 한 번에 안 들어가면 나누어 굽습니다.", tip: "굵은소금은 열을 전달하는 바닥용입니다. 추가로 새우에 소금을 뿌리지 않습니다." },
      { title: "뚜껑 덮어 속까지 익히기", description: "김이 오르면 중약불로 줄여 6~8분 익힙니다. 집게로 한 번 뒤집고 2~4분 더 익힙니다. 크기와 화력에 따라 시간이 달라지므로 가장 큰 새우를 열어 중심 살까지 진주빛 또는 흰색의 불투명한 상태인지 확인합니다." },
      { title: "익힘을 확인해 차리기", description: "중심이 반투명하면 뚜껑을 덮어 추가 가열합니다. 껍질 색만으로 판단하지 않습니다. 익은 대하를 소금에서 건져 별도 접시에 담고 레몬, 밥, 채소를 곁들입니다. 뜨거운 소금과 팬은 충분히 식힌 뒤 정리합니다." },
    ],
    substitutions: ["흰다리새우로 같은 방식으로 만들 수 있으며, 그때는 흰다리새우 소금구이로 구분합니다.", "레몬은 생략해도 됩니다. 새우 크기가 달라지면 시간보다 중심 살의 익힘 상태를 확인합니다."],
    tips: ["25분은 손질과 한 번 굽기 기준이며, 냉동 새우의 해동 시간은 제외합니다.", "코팅 팬을 소금과 함께 장시간 가열하지 말고 무코팅의 두꺼운 조리도구를 사용합니다.", "껍질을 벗겨 드러나는 촉촉한 살을 찍으면 소금구이의 식감을 보여주기 좋습니다."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.shrimp, sources.shrimpSeason, sources.seafoodSafety], palette: { from: "#e5edef", mid: "#bad0d4", to: "#de9b81", ink: "#304d58" },
  },
  {
    slug: "seosan-ginger-pork-rice-bowl", title: "서산 생강 돼지고기 덮밥", country: "korea", domesticRegion: "chungnam", category: "main", experienceStatus: "researched",
    summary: "곱게 간 생강과 간장으로 얇은 돼지고기를 볶아 따뜻한 밥에 올립니다. 서산 생강의 알싸한 향과 양파의 단맛이 만나는 두 사람의 집밥입니다.",
    culturalNote: "충남농업기술원은 서산 부석면에서 1930년대 시작된 지역 생강 재배를 소개합니다. 그 지역 재료를 간장 볶음 덮밥에 활용한 가정용 메뉴로, 서산의 전통 향토요리라고 단정하지 않습니다.",
    localTable: { region: "충남 · 서산의 생강 밭", ingredient: "서산 생강 · 얇게 썬 돼지고기", season: "늦가을 · 노지 생강 10월 하순~11월 상순", note: "수확 시기는 재배 형태와 날씨에 따라 다릅니다. 9월 생강을 모두 햇생강으로 표시하지 않고, 수확기 밖에는 저장 생강이나 무가당 냉동 생강을 활용합니다." },
    cookingTime: 25, servings: 2, difficulty: "쉬움", visualLabel: "SEOSAN GINGER", visualCaption: "생강의 연노랑과 간장 볶음의 호박빛", keywords: ["충남", "서산", "생강", "돼지고기", "덮밥", "집밥"],
    ingredientGroups: [
      { title: "고기와 밥", items: ["돼지 앞다리살 불고기용 250g(두께 2~3mm)", "지은 밥 2공기(약 400g)", "양파 150g, 대파 20g", "식용유 1큰술(15ml), 깨 1/2작은술(선택)"] },
      { title: "생강 간장 소스", items: ["껍질 벗긴 생강 10g", "진간장 1큰술 반(22.5ml)", "물 3큰술(45ml), 설탕 2작은술(8g)", "후추 약간"] },
    ],
    steps: [
      { title: "생강 향 준비하기", description: "생강을 곱게 갈아 간장, 물, 설탕, 후추와 섞습니다. 양파는 가늘게, 대파는 송송 썹니다. 생고기는 별도 도마에서 먹기 좋은 크기로 자르고 뭉친 부분을 펼칩니다." },
      { title: "양파 볶기", description: "팬을 중불로 달궈 기름과 양파를 넣고 3분 볶습니다. 가장자리가 살짝 노릇해지면 한쪽으로 밀어 둡니다." },
      { title: "고기 펼쳐 익히기", description: "고기를 한 겹으로 펼쳐 앞뒤로 볶습니다. 양이 많으면 나누어 굽고, 겹친 고기는 집게로 풀어 줍니다. 겉면이 익으면 생강 소스와 대파를 넣습니다." },
      { title: "소스와 충분히 가열하기", description: "중불에서 3~4분 더 볶되, 고기 중심이 75°C 이상에서 1분 이상 유지되도록 충분히 익힙니다. 소스가 먼저 졸면 물을 1큰술씩 더합니다. 생고기에 닿은 집게는 익힌 음식을 담기 전에 씻거나 교체합니다." },
      { title: "따뜻한 밥에 올리기", description: "두 그릇에 밥을 나누고 고기, 양파, 소스를 얹습니다. 깨를 뿌려 따뜻할 때 먹습니다. 생강 맛이 강하면 다음 조리 때 생강을 5g으로 줄여 취향에 맞춥니다." },
    ],
    substitutions: ["서산산이 없으면 구입한 생강의 실제 산지를 확인해 같은 양으로 만듭니다.", "생강청은 설탕 비율이 달라 그대로 대체하지 않습니다. 무가당 다진 냉동 생강은 제품 안내에 따라 사용할 수 있습니다."],
    tips: ["25분은 지은 밥이 준비된 기준입니다.", "생강의 굵은 섬유가 남지 않도록 곱게 갈면 소스가 고르게 묻습니다.", "밥의 흰색과 윤기 나는 고기, 생강 단면을 함께 담아 지역 재료를 소개해 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.ginger, sources.gingerHarvest, sources.meatSafety], palette: { from: "#f3e8ce", mid: "#dec391", to: "#b98956", ink: "#58402a" },
  },
  {
    slug: "yesan-apple-crumble", title: "예산 사과 크럼블", country: "korea", domesticRegion: "chungnam", category: "dessert", experienceStatus: "researched",
    summary: "얇게 썬 사과에 버터와 밀가루로 만든 작은 부스러기를 얹어 굽습니다. 부드러운 과육과 바삭한 윗면을 숟가락으로 함께 떠먹는 따뜻한 가을 디저트입니다.",
    culturalNote: "예산군은 홍로를 명절 무렵 만나는 햇사과이자 지역 특산물로 소개합니다. 여기서는 예산 사과를 집에서 굽는 크럼블로 응용했습니다. 지역 전통 과자나 특정 가게의 조리법을 재현한 것은 아닙니다.",
    localTable: { region: "충남 · 예산의 사과 과수원", ingredient: "예산 사과 · 버터", season: "늦여름~가을 · 홍로 8월 하순~9월 중순", note: "홍로와 후지 등 품종에 따라 수확 시기가 다릅니다. 홍로의 수확 안내를 예산 사과 전체에 적용하지 않으며, 겨울에는 저장 사과로 이어 만들 수 있습니다." },
    cookingTime: 45, servings: 2, difficulty: "쉬움", visualLabel: "YESAN APPLE", visualCaption: "사과의 붉은 껍질과 구운 부스러기의 금빛", keywords: ["충남", "예산", "사과", "홍로", "크럼블", "디저트"],
    ingredientGroups: [
      { title: "사과 속", items: ["사과 1~2개(씨를 제거한 무게 300g)", "설탕 10g, 레몬즙 1작은술(5ml)", "계피가루 1/4작은술(선택)"] },
      { title: "크럼블", items: ["중력분 50g, 차가운 무염버터 30g", "설탕 20g, 소금 한 꼬집", "오븐, 얕은 오븐용 내열 그릇(지름 약 16cm)"] },
    ],
    steps: [
      { title: "오븐과 사과 준비", description: "오븐을 180°C로 예열합니다. 사과를 씻어 씨를 제거하고 껍질째 3mm 두께로 썹니다. 껍질이 질기면 벗깁니다. 설탕 10g, 레몬즙, 계피와 버무려 내열 그릇에 고르게 펼칩니다." },
      { title: "차가운 버터로 부스러기 만들기", description: "볼에 밀가루, 설탕 20g, 소금을 섞습니다. 차가운 버터를 작은 주사위 모양으로 잘라 넣고 손끝으로 가볍게 비벼 콩알 크기의 부스러기를 만듭니다. 매끈한 반죽이 될 때까지 치대지 않습니다." },
      { title: "사과 위에 얹어 굽기", description: "사과 위에 부스러기를 느슨하게 흩뿌립니다. 예열한 오븐 가운데 칸에서 25~30분 굽습니다. 윗면이 너무 빨리 진해지면 포일을 느슨하게 덮고 계속 익힙니다." },
      { title: "과육의 익힘 확인", description: "꼬치를 찔러 사과가 부드럽게 들어가고 윗면이 노릇한지 확인합니다. 사과가 단단하거나 밀가루 부스러기가 젖은 채 남으면 5분씩 더 굽습니다. 오븐 장갑으로 꺼내 5분 식힌 뒤 두 사람이 나누어 먹습니다." },
    ],
    substitutions: ["홍로 대신 후지 등 단단한 사과도 사용할 수 있으며, 익는 정도에 따라 굽는 시간을 조절합니다.", "계피는 생략할 수 있고 가염버터를 쓰면 소금을 넣지 않습니다."],
    tips: ["45분은 예열과 준비를 함께 진행하는 기준이며 오븐 성능과 과육 두께에 따라 더 걸릴 수 있습니다.", "오븐 사용이 가능한 얕은 내열 그릇을 쓰고, 뜨거운 그릇을 젖거나 차가운 표면에 바로 놓지 않습니다.", "숟가락이 바삭한 윗면을 지나 부드러운 사과까지 들어가는 장면을 담아 보세요."],
    publishedAt: "2026-09-21", relatedStorySlugs: [], sources: [sources.apple], palette: { from: "#f5e5d7", mid: "#e7b99e", to: "#c77a62", ink: "#683d32" },
  },
];
