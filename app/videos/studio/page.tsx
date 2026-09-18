import type { Metadata } from "next";
import { recipes } from "@/lib/content";
import { recipeFrames } from "@/lib/presentation";
import VideoStudio from "@/components/VideoStudio";
import "./studio.css";

export const metadata: Metadata = {
  title: "영상 제작실",
  description: "식문화와 레시피를 내레이션과 자막이 있는 영상으로 만듭니다.",
  robots: { index: false, follow: false },
};

export default async function VideoStudioPage({ searchParams }: { searchParams: Promise<{ recipe?: string }> }) {
  const { recipe } = await searchParams;
  const options = recipes.map((item) => ({ slug: item.slug, title: item.title, frames: recipeFrames(item) }));
  const selected = options.some((item) => item.slug === recipe) ? recipe! : options[0].slug;
  return <VideoStudio recipes={options} initialRecipe={selected} />;
}
