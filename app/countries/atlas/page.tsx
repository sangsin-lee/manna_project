import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { countries } from "@/lib/content";
import { tableEntries, type AtlasTable } from "@/lib/atlas";
import AtlasExplorer from "./AtlasExplorer";
import "./atlas.css";

export const metadata: Metadata = {
  title: "맛과 향의 세계지도",
  description: "지도에서 나라를 고르고 함께 만들 요리, 식탁 분위기, 디퓨저·향초·향수의 향을 살펴보세요.",
  alternates: { canonical: "/countries/atlas" },
  openGraph: {
    title: "맛과 향의 세계지도 | 만나의 식탁",
    description: "방문 기록과 추천 여행지에서 찾은 나라별 쿠킹 클래스와 향.",
    url: "/countries/atlas", images: ["/atlas/pasta-workshop.webp"],
  },
};

const tables: AtlasTable[] = tableEntries.map((entry) => {
  const country = countries.find((item) => item.slug === entry.slug);
  if (country?.visit) {
    return { ...entry, group: country.visit.status === "visited" ? "visited" : "home", visitPlaces: country.visit.places };
  }
  if (!entry.recommend) throw new Error(`Missing atlas category for ${entry.slug}`);
  return { ...entry, group: entry.recommend };
});

export default async function AtlasPage({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  const { country } = await searchParams;
  return (
    <main className="atlas">
      <section className="atlas-cover">
        <div className="atlas-wrap atlas-cover-grid">
          <div className="atlas-intro">
            <nav className="atlas-crumb" aria-label="현재 위치">
              <Link href="/countries">나라별 식탁</Link><span aria-hidden="true">/</span>쿠킹 클래스
            </nav>
            <h1>맛과 향의 <em>세계지도</em></h1>
            <p>어떤 요리를 함께 만들고, 어떤 향으로 손님을 맞을까요?<br className="wide-break" /> 지도 위에서 다음 모임의 식탁을 골라 보세요.</p>
            <a className="atlas-jump" href="#explore">지도 펼쳐보기 <span aria-hidden="true">↓</span></a>
          </div>
          <figure className="atlas-cover-image">
            <Image src="/atlas/pasta-workshop.webp" alt="밀가루를 뿌린 나무 도마 위에서 손으로 생면을 둥글게 마는 모습" width={1440} height={720} sizes="(max-width: 760px) 100vw, 48vw" priority />
            <figcaption>이탈리아의 식탁 <span>·</span> 생파스타</figcaption>
          </figure>
        </div>
      </section>
      <AtlasExplorer tables={tables} initialSlug={country ?? "italy"} />
    </main>
  );
}
