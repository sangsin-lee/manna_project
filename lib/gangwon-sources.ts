import type { SourceLink } from "./content";
import { koreaSources } from "./korea-sources";

// Harvest guidance and local food culture reviewed on 2026-09-21.
// The household quantities and methods are Manna Table adaptations.
export const gangwonSources = {
  potatoHarvest: koreaSources.potato,
  ongsimi: { label: "평창군 — 봉평 감자로 만드는 옹심이", url: "https://tour.pc.go.kr/Home/H20000/H20200/placeDetail?order_column=1&page=1&pageSize=12&place_no=690&search_column=2&search_keyword=%ED%9D%A5%EC%A0%95%EC%B2%9C&viewType=gallery" },
  market: { label: "평창군 — 봉평장과 메밀 음식 문화", url: "https://tour.pc.go.kr/Home/H40000/H40200/placeDetail?order_column=1&page=1&pageSize=12&place_no=112&search_column=2&search_keyword=%EC%8B%9C%EC%9E%A5&viewType=gallery" },
  buckwheatHarvest: { label: "농촌진흥청 농사로 — 여름·가을 메밀의 수확 시기", url: "https://www.nongsaro.go.kr/portal/ps/psb/psbl/workScheduleDtl.ps?cntntsNo=30706&menuId=PS00087&sKidofcomdtySeCode=210005&totalSearchYn=Y" },
  deodeok: { label: "농촌진흥청 — 횡성 청일면의 더덕 한 상", url: "https://www.rda.go.kr/webzine/2023/02/sub4-3.html" },
  deodeokHarvest: { label: "농촌진흥청 농사로 — 강원 더덕 재배와 수확", url: "https://www.nongsaro.go.kr/portal/ps/psb/psby/vodPlay.ps?mvpClipNo=&mvpNo=1827" },
  corn: { label: "홍천군 — 찰옥수수의 특징과 생물·냉동 유통 시기", url: "https://www.hongcheon.go.kr/tour/contents.do?key=1913" },
} satisfies Record<string, SourceLink>;
