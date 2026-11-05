import type { Metadata } from "next";
import { connection } from "next/server";
import { countries, continentLabels } from "@/lib/content";
import { tableEntries, type AtlasRegion, type AtlasTable } from "@/lib/atlas";
import AtlasExplorer from "./atlas/AtlasExplorer";
import "./atlas/atlas.css";

export const metadata: Metadata = {
  title: "나라별 식탁 · 맛과 향의 세계지도",
  description: "세계지도에서 나라를 골라 대표 음식과 식문화, 여행 기록, 쿠킹 클래스와 어울리는 향을 만나보세요.",
  alternates: { canonical: "/countries" },
  openGraph: {
    title: "나라별 식탁 | 만나의 식탁",
    description: "세계지도에서 펼쳐 보는 나라별 음식과 문화, 향.",
    url: "/countries", images: ["/atlas/pasta-workshop.webp"],
  },
};

const regionLabels: Record<AtlasRegion, string> = {
  ...continentLabels, "south-america": "남아메리카", africa: "아프리카",
};

type RecommendedProfile = { region: AtlasRegion; headline: string; summary: string; tags: string[] };
const recommended: Record<string, RecommendedProfile> = {
  spain: { region: "europe", headline: "넓은 팬 하나로 차리는 발렌시아의 점심", summary: "닭과 콩, 쌀을 얕은 팬에 익힙니다. 바닥에 노릇하게 눌은 쌀까지 나누는 빠에야 한 판이 오늘의 식탁입니다.", tags: ["발렌시아", "쌀 요리", "한 팬 나누기"] },
  mexico: { region: "north-america", headline: "옥수수 반죽을 누르고 따뜻한 한 장을 나누는 식탁", summary: "옥수수 마사를 눌러 구운 토르티야에 콩과 살사를 얹습니다. 같은 재료로도 각자 다른 한입을 만들 수 있어요.", tags: ["옥수수 마사", "토르티야", "살사"] },
  turkiye: { region: "asia", headline: "여럿이 빚어 마늘 요거트를 얹는 작은 만두", summary: "카이세리의 만트는 밀반죽에 고기 소를 넣어 작게 빚는 음식입니다. 삶은 만두에 요거트와 향신료 버터를 곁들여요.", tags: ["카이세리", "만두 빚기", "요거트"] },
  indonesia: { region: "asia", headline: "땅콩 소스 한 숟갈로 어우러지는 자카르타의 채소 접시", summary: "가도가도 한 접시에 채소와 템페, 두부가 모입니다. 땅콩 소스의 농도에 따라 달라지는 식감을 비교해 보세요.", tags: ["베타위", "템페", "땅콩 소스"] },
  morocco: { region: "africa", headline: "찐 쿠스쿠스와 채소를 커다란 접시에 모으는 식탁", summary: "쿠스쿠스는 모로코를 비롯한 북아프리카 여러 지역이 공유하는 음식입니다. 찐 곡물을 가볍게 풀고 익힌 채소를 함께 담아요.", tags: ["마그레브", "쿠스쿠스", "함께 나누는 접시"] },
  peru: { region: "south-america", headline: "라임과 고추로 맛을 잡는 해안의 한 접시", summary: "페루 해안의 세비체에서는 생선, 라임, 고추의 조합을 만납니다. 만나의 클래스에서는 익힌 새우로 응용해 산미의 차이를 맛봐요.", tags: ["페루 해안", "세비체", "라임"] },
  georgia: { region: "asia", headline: "주름진 만두 안에 뜨거운 육즙을 담는 식탁", summary: "반죽을 돌려 접어 꼭지를 만든 힌칼리는 손으로 들어 맛봅니다. 각자 빚은 모양을 구경하는 재미가 있는 만두예요.", tags: ["힌칼리", "손으로 빚는 만두", "후추"] },
  india: { region: "asia", headline: "묽은 쌀 반죽으로 얇게 부치는 해안의 도사", summary: "카르나타카의 니르 도사는 쌀 반죽을 얇게 펴서 익히는 음식입니다. 부드럽게 접은 한 장에 코코넛과 재거리를 곁들여요.", tags: ["카르나타카", "쌀 반죽", "코코넛"] },
};

const tables: AtlasTable[] = tableEntries.map<AtlasTable>((entry) => {
  const country = countries.find((item) => item.slug === entry.slug);
  if (country?.visit) {
    return {
      ...entry, group: country.visit.status === "visited" ? "visited" : "home",
      region: country.continent, headline: country.headline, summary: country.summary, tags: country.foodCulture.slice(0, 3),
      cover: { eyebrow: country.eyebrow, caption: country.representativeFoods.slice(0, 3).join(" · "), palette: country.palette },
      archive: { places: country.visit.places, regions: country.regionalNotes.length, stories: country.storySlugs.length, recipes: country.recipeSlugs.length, updatedAt: country.updatedAt },
    };
  }
  const profile = recommended[entry.slug];
  if (!entry.recommend || !profile) throw new Error(`Missing country card for ${entry.slug}`);
  return {
    ...entry, ...profile, group: entry.recommend,
    cover: {
      eyebrow: entry.place, caption: entry.ingredients,
      palette: entry.recommend === "popular" ? { from: "#f1e4c4", mid: "#e1d6b4", to: "#c5ceae", ink: "#35422c" }
        : { from: "#f1e1d3", mid: "#ebcdbb", to: "#d8b7a3", ink: "#4f342b" },
    },
  };
}).sort((a, b) => a.name.localeCompare(b.name, "ko"));

export default async function CountriesPage() {
  await connection();
  return <main className="atlas"><AtlasExplorer tables={tables} regions={regionLabels} /></main>;
}
