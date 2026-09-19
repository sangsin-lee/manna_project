import type { Metadata } from "next";
import { Suspense } from "react";
import KoreaFoodMap from "@/components/KoreaFoodMap";
import { recipes } from "@/lib/content";
import { seasonInSeoul } from "@/lib/korea-table";
import "./korea.css";

export const metadata: Metadata = {
  title: "국내 미식 지도 · 지역과 계절의 식탁",
  description: "지도 위 특산물을 눌러 국내 지역별 제철 재료와 레시피를 만나보세요. 제주 돔베국수, 갈치조림, 생선 모둠구이, 귤 디저트까지.",
  alternates: { canonical: "/korea" },
};

export default async function KoreaPage({ searchParams }: { searchParams: Promise<{ region?: string; season?: string }> }) {
  // Request-time season avoids a stale build-time season and browser/server date differences.
  await searchParams;
  return <Suspense fallback={<main className="atlas-loading">국내 미식 지도를 펼치고 있어요.</main>}><KoreaFoodMap initialSeason={seasonInSeoul()} recipes={recipes.filter(recipe => recipe.domesticRegion)}/></Suspense>;
}
