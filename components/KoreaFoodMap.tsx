"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, type CSSProperties } from "react";
import { getKoreanRegion, getSeason, koreanRegions, seasonalSpecialties, seasons, type Season } from "@/lib/korea-table";
import { koreaCoastPaths, projectKorea } from "@/lib/korea-map";
import type { Recipe } from "@/lib/content";
import RecipeCard from "./RecipeCard";
import SpecialtyIcon from "./SpecialtyIcon";

// Spread small-screen labels into the surrounding sea; leader lines retain their anchors.
const mobilePins: Record<string, [number, number]> = {
  gyeonggi: [35, 16], gangwon: [77, 13], chungbuk: [59, 43], chungnam: [11, 37],
  jeonbuk: [35, 60], jeonnam: [11, 83], gyeongbuk: [86, 48], gyeongnam: [64, 74], jeju: [40, 94],
};

export default function KoreaFoodMap({ initialSeason, recipes }: { initialSeason: Season; recipes: Recipe[] }) {
  const searchParams = useSearchParams();
  const region = getKoreanRegion(searchParams.get("region"));
  const season = getSeason(searchParams.get("season"), initialSeason);
  const seasonLabel = seasons.find((item) => item.id === season)!.label;
  const seasonal = seasonalSpecialties(region, season);
  const regionRecipes = recipes.filter((recipe) => recipe.domesticRegion === region.id);
  const detailRef = useRef<HTMLDivElement>(null);
  const theme = { "--local-ink": region.colors[0], "--local-soft": region.colors[1], "--local-color": region.colors[2] } as CSSProperties;

  function choose(nextRegion: string, nextSeason: Season = season) {
    if (nextRegion === region.id && nextSeason === season) return;
    const query = new URLSearchParams({ region: nextRegion, season: nextSeason });
    // Next's native history integration keeps selection shareable and Back/Forward functional.
    window.history.pushState(null, "", `/korea?${query}`);
  }

  return <main className="korea-atlas" style={theme}>
    <div className="atlas-wrap">
      <header className="atlas-intro">
        <div><p className="atlas-eyebrow">THE KOREAN TABLE / 국내 미식 지도</p><h1>맛을 따라,<br className="atlas-mobile-break" /> <em>우리나라 한 바퀴.</em></h1></div>
        <p>지도 위 작은 식재료를 눌러 보세요.<br/>지역의 색과 계절, 한 끼의 이야기가 열립니다.</p>
      </header>
      <div className="atlas-toolbar">
        <div><span className="atlas-compass" aria-hidden="true">↗</span><span>어느 계절로 떠날까요?</span></div>
        <div className="atlas-seasons" role="group" aria-label="탐색할 계절">{seasons.map((item) => <button key={item.id} type="button" aria-pressed={season === item.id} onClick={() => choose(region.id, item.id)}><span aria-hidden="true">{item.mark}</span>{item.label}<small>{item.months}</small></button>)}</div>
      </div>

      <div className="atlas-explorer">
        <section className="atlas-map-panel" aria-label="대한민국 특산물 지도">
          <div className="atlas-map-heading"><span>INGREDIENT ATLAS</span><span>9개의 지역, 서로 다른 맛</span></div>
          <div className="atlas-map">
            <svg viewBox="0 0 520 620" aria-hidden="true" className="atlas-coastline">
              <defs><pattern id="atlas-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#d7d6cb"/></pattern></defs>
              <rect width="520" height="620" fill="url(#atlas-dots)"/>
              <g className="atlas-islands">{koreaCoastPaths.map((path, index) => <path key={index} d={path}/>)}</g>
              <g className="atlas-mobile-leaders">{koreanRegions.map(item => { const [x,y] = projectKorea(item.pin); const [mx,my] = mobilePins[item.id]; return <g key={item.id}><path d={`M${x} ${y}L${mx * 5.2} ${my * 6.2}`}/><circle cx={x} cy={y} r="3"/></g>; })}</g>
              <g className="atlas-map-water"><text x="61" y="320">서해</text><text x="435" y="240">동해</text><text x="351" y="507">남해</text></g>
              <path d="M108 506q39-40 101 0" fill="none" stroke="#baaa8b" strokeDasharray="3 6"/>
              <text x="35" y="575" className="atlas-map-caption">JEJU ISLAND</text>
              <g transform="translate(443 56)" stroke="#989b91" fill="none"><path d="M0 27V0m-6 9 6-9 6 9M-10 20h20"/><text x="-4" y="-7" stroke="none" fill="#777b72" fontSize="10">N</text></g>
            </svg>
            {koreanRegions.map((item) => {
              const [x,y] = projectKorea(item.pin);
              return <button key={item.id} type="button" className={`atlas-pin${region.id === item.id ? " is-selected" : ""}`} style={{ "--pin-x": `${x / 520 * 100}%`, "--pin-y": `${y / 620 * 100}%`, "--pin-mobile-x": `${mobilePins[item.id][0]}%`, "--pin-mobile-y": `${mobilePins[item.id][1]}%`, "--pin-color": item.colors[0] } as CSSProperties} aria-label={`${item.name} 특산물 보기`} aria-pressed={region.id === item.id} aria-controls="region-details" onClick={() => choose(item.id)}>
                <span className="atlas-pin-art"><SpecialtyIcon art={item.icon}/></span><span className="atlas-pin-label">{item.name}<small>{item.id === "jeju" ? "감귤 · 갈치" : item.specialties[0].name.replace(/^(이천|평창|영동|공주|고창|고흥|청송|진영)\s?/, "")}</small></span>
              </button>;
            })}
          </div>
          <p className="atlas-map-note">식재료를 중심으로 묶은 9개 탐색 권역입니다.<br/>아이콘은 지역을 가리키며, 판매점이나 행정 경계 표시는 아닙니다.</p>
          <div className="atlas-region-list" role="group" aria-label="지역 이름으로 선택">{koreanRegions.map(item => <button type="button" key={item.id} aria-pressed={region.id === item.id} onClick={() => choose(item.id)}>{item.name}</button>)}</div>
          <button className="atlas-mobile-detail" type="button" onClick={() => { detailRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); detailRef.current?.focus({ preventScroll: true }); }}>{region.name}의 {seasonLabel} 식탁 보기 ↓</button>
        </section>

        <div id="region-details" ref={detailRef} tabIndex={-1} className="atlas-details">
          <p className="atlas-sr-status" role="status">{region.name} · {seasonLabel} 선택. 특산물 {seasonal.items.length}개와 {regionRecipes.length ? `레시피 ${regionRecipes.length}개` : "재료 활용 레시피"}를 표시합니다.</p>
          <div key={region.id} className="atlas-region-content">
            <section className={`atlas-region-cover${region.id === "jeju" ? " is-jeju" : ""}`} aria-labelledby="atlas-region-title">
              <div className="atlas-cover-top"><span>LOCAL TABLE / {region.english}</span><span className="atlas-stamp">{seasonLabel}의 식탁</span></div>
              <div className="atlas-cover-copy"><p>{region.area}</p><h2 id="atlas-region-title">{region.name}<span>의 식탁</span></h2><h3>{region.headline}</h3></div>
              <div className="atlas-cover-art" aria-hidden="true"><span className="atlas-sun"/><span className="atlas-hill"/><SpecialtyIcon art={region.icon} className="atlas-hero-ingredient"/>{region.id === "jeju" && <><SpecialtyIcon art="fish" className="atlas-hero-fish"/><div className="atlas-basalt">{[0,1,2,3,4].map(i=><i key={i}/>)}</div></>}<svg viewBox="0 0 300 90"><path d="M0 25q30-30 60 0t60 0t60 0t60 0t60 0M0 48q30-30 60 0t60 0t60 0t60 0t60 0M0 71q30-30 60 0t60 0t60 0t60 0t60 0"/></svg></div>
              <div className="atlas-color-note"><span>{region.colors.map(color=><i key={color} style={{background:color}}/>)}</span>{region.colorStory}</div>
            </section>
            <p className="atlas-region-description">{region.description}</p>
            <section className="atlas-season-table" aria-labelledby="atlas-season-title">
              <div className="atlas-section-heading"><div><p className="atlas-eyebrow">A TASTE OF THE SEASON</p><h3 id="atlas-season-title">{region.name}의 {seasonLabel}, 무엇을 먹을까?</h3></div><span>{seasonLabel}</span></div>
              <p key={season} className="atlas-season-note">{region.seasonNotes[season]}</p>
              {!seasonal.isHarvestSeason && <p className="atlas-storage-label">이 계절에는 저장·가공 재료로 즐겨요</p>}
              <div className="atlas-specialties">{seasonal.items.map(item=><article key={item.name} className="atlas-specialty"><SpecialtyIcon art={item.art}/><div><h4>{item.name}</h4><span>{item.timing}</span><p>{item.note}</p></div></article>)}</div>
              <p className="atlas-harvest-note">대표 수확·추천 시기입니다. 품종, 작황, 어획 및 유통 방식에 따라 실제 판매 시기는 달라집니다.</p>
            </section>
          </div>
        </div>
      </div>

      <section key={`recipes-${region.id}`} className="atlas-recipes" aria-labelledby="atlas-recipes-title">
        <div className="atlas-section-heading"><div><p className="atlas-eyebrow">FROM THE MAP TO YOUR TABLE</p><h2 id="atlas-recipes-title">{region.name}의 재료로, 오늘 한 끼.</h2></div><span>{regionRecipes.length ? `${regionRecipes.length} RECIPES` : "KITCHEN NOTE"}</span></div>
        <p className="atlas-recipe-intro">{regionRecipes.length ? "재료와 조리 순서를 읽고, 음식의 이야기를 촬영 화면으로도 만나보세요. 사계절 메뉴는 선택한 계절과 함께 표시합니다." : "지역의 대표 재료를 집에서 즐기는 간단한 활용법입니다. 전통 향토음식의 고정된 배합을 뜻하지 않습니다."}</p>
        {regionRecipes.length > 0 && <div className="atlas-recipe-grid">{regionRecipes.map(recipe=><RecipeCard key={recipe.slug} recipe={recipe}/>)}</div>}
        {region.pantry && <article className="atlas-pantry"><div className="atlas-pantry-title"><SpecialtyIcon art={region.icon}/><p>{region.pantry.meta}</p><h3>{region.pantry.title}</h3><p>{region.pantry.ingredients}</p></div><div><ol>{region.pantry.steps.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><p>{step}</p></li>)}</ol>{region.pantry.note && <p className="atlas-pantry-note">{region.pantry.note}</p>}</div></article>}
      </section>
      <footer className="atlas-references"><div><p className="atlas-eyebrow">FIELD NOTES / 지역과 계절의 근거</p><p>지역 소개는 관광·농업 자료를 참고했고, 조리법은 가정에서 만들기 쉽게 구성했습니다.</p><p>지도: Natural Earth · 아이콘과 풍경은 직접 그린 일러스트</p></div><ul>{region.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul><Link href="/recipes?country=korea#recipe-archive">한국 레시피 전체 보기 ↗</Link></footer>
    </div>
  </main>;
}
