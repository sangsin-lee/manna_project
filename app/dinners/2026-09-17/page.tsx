import type { Metadata } from "next";
import Link from "next/link";
import ArchivedDinnerPick from "./ArchivedDinnerPick";

export const metadata: Metadata = {
  title: "9월 17일의 저녁 · 불고기 치즈 떡피자",
  description: "지난 저녁 추천의 장보기 목록과 프라이팬 조리법을 다시 확인하세요.",
  alternates: { canonical: "/dinners/2026-09-17" },
};

export default function ArchivedDinnerPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-xs font-bold tracking-widest text-[#943706]">지난 저녁의 기록 · 2026.09.17</p>
        <h1 className="mt-3 text-3xl font-black">불고기 치즈 떡피자</h1>
        <Link href="/#tonight-pick" className="mt-4 inline-block text-sm underline underline-offset-4">최근 저녁 추천 보기 →</Link>
      </div>
      <ArchivedDinnerPick />
    </main>
  );
}
