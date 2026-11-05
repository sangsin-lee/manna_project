"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { groupLabels, type AtlasRegion, type AtlasTable } from "@/lib/atlas";
import AtlasMap from "./AtlasMap";
import CountryDialog from "./CountryDialog";

const filters = ["all", "visited", "popular", "discovery", "home"] as const;


export default function AtlasExplorer({ tables, regions }: {
  tables: AtlasTable[]; regions: Record<AtlasRegion, string>;
}) {
  const params = useSearchParams();
  const filter = filters.find((key) => key === params.get("group")) ?? "all";
  const [search, setSearch] = useState("");
  const [lastPin, setLastPin] = useState<string>();
  const country = params.get("country");
  const active = tables.find((table) => table.slug === country);
  const requestedRegion = params.get("continent") ?? "";
  const region = Object.hasOwn(regions, requestedRegion) ? requestedRegion : "";
  const term = search.trim().toLocaleLowerCase();
  const shown = tables.filter((t) =>
    (!region || t.region === region) && (filter === "all" || t.group === filter) &&
    (!term || [t.name, t.english, t.dish, t.notes, t.place].join(" ").toLocaleLowerCase().includes(term)));
  const focused = shown.find((t) => t.slug === (active?.slug ?? lastPin));

  useEffect(() => {
    // Older shared links used fragments for class notes and individual country cards.
    const url = new URL(window.location.href);
    const fragment = url.hash.slice(1);
    if (fragment === "class-notes" && url.searchParams.has("country")) {
      url.searchParams.set("section", "class");
    } else if (!url.searchParams.has("country") && tables.some((t) => t.slug === fragment)) {
      url.searchParams.set("country", fragment);
    } else return;
    url.hash = "";
    window.history.replaceState(null, "", url);
  }, [tables]);

  function openCard(slug: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("country", slug);
    url.searchParams.delete("section");
    url.hash = "";
    setLastPin(slug);
    window.history.pushState({ atlasCard: true }, "", url);
  }

  function closeCard() {
    if (window.history.state?.atlasCard) {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("country");
    url.searchParams.delete("section");
    url.hash = "";
    window.history.replaceState(null, "", url);
  }

  function changeSection(showClass: boolean) {
    const url = new URL(window.location.href);
    if (showClass) url.searchParams.set("section", "class");
    else url.searchParams.delete("section");
    window.history.replaceState({ atlasCard: Boolean(window.history.state?.atlasCard) }, "", url);
  }

  function changeFilters(regionValue: string, groupValue: (typeof filters)[number]) {
    const url = new URL(window.location.href);
    if (regionValue) url.searchParams.set("continent", regionValue);
    else url.searchParams.delete("continent");
    if (groupValue !== "all") url.searchParams.set("group", groupValue);
    else url.searchParams.delete("group");
    window.history.replaceState(null, "", url);
  }

  return <div className="world-wrap atlas-body">
    <header className="atlas-heading-block" id="explore">
      <h1>나라별 식탁</h1>
      <p>나라를 고르면 그곳의 음식과 식문화, 식탁에 어울리는 향이 펼쳐집니다.</p>
    </header>
    <div className="atlas-controls">
      <div className="atlas-filters" aria-label="여행지 분류" role="group">
        {filters.map((key) => <button type="button" key={key} aria-pressed={filter === key}
          onClick={() => changeFilters(region, key)}>
          {key !== "all" && <i className={`atlas-key group-${key}`} aria-hidden="true"/>}
          {key === "all" ? "전체" : groupLabels[key]}
        </button>)}
      </div>
      <label className="atlas-region">대륙
        <select value={region} onChange={(e) => changeFilters(e.target.value, filter)}>
          <option value="">모든 대륙</option>
          {Object.entries(regions).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
        </select>
      </label>
    </div>
    <div className="atlas-spread">
      <section className="atlas-cartography" aria-label="세계지도">
        <div className="atlas-map-bar"><h2>세계지도</h2><a href="#country-search">이름으로 찾기 ↓</a></div>
        <div className="atlas-sheet">
          <AtlasMap key={JSON.stringify([filter, region, term])} tables={shown} selected={focused} fitRegion={Boolean(region || term)} onSelect={openCard} />
          <svg className="world-compass" viewBox="0 0 54 66" aria-hidden="true">
            <text x="27" y="10" textAnchor="middle" fontSize="10" fill="currentColor">N</text>
            <g stroke="currentColor" fill="none"><circle cx="27" cy="39" r="15"/><path d="m27 15 5 19 18 5-18 5-5 19-5-19-18-5 18-5z"/><path d="M27 15v24l5-5zm0 24-5 5 5 19z" fill="currentColor"/></g>
          </svg>
        </div>
        <div className="atlas-map-foot"><span><span className="atlas-mouse-hint">휠로 확대·축소하고 드래그로 이동하세요. </span>나라나 핀을 누르면 식탁이 열립니다.</span>
          <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth ↗</a></div>
      </section>
      <section className="atlas-directory" id="country-list" aria-labelledby="directory-title">
        <div className="atlas-directory-head"><div><h2 id="directory-title">나라 찾기</h2><span role="status">{shown.length}곳</span></div>
          <label className="atlas-search"><svg aria-hidden="true" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg>
            <input id="country-search" type="search" aria-label="나라, 요리 또는 향 검색" placeholder="나라, 요리 또는 향 검색" value={search}
              onChange={(e) => setSearch(e.target.value)}/></label>
        </div>
        <ul className="atlas-directory-list">{shown.map((t) => <li key={t.slug}>
          <button type="button" aria-haspopup="dialog" aria-label={`${t.name} 식탁 카드 열기`} onClick={() => openCard(t.slug)}>
            <i className={`atlas-key group-${t.group}`} aria-hidden="true"/><span><strong>{t.name}</strong>
              <small>{t.dish} <span>·</span> {t.notes}</small></span><span className="atlas-row-arrow" aria-hidden="true">↗</span>
          </button>
        </li>)}</ul>
        {!shown.length && <p className="atlas-empty">조건에 맞는 식탁이 없어요. <button type="button" onClick={() => { setSearch(""); changeFilters("", "all"); }}>전체 식탁 보기</button></p>}
      </section>
    </div>
    {active && <CountryDialog key={active.slug} table={active} region={regions[active.region]}
      showClass={params.get("section") === "class"} onSection={changeSection} onClose={closeCard}/>}
  </div>;
}
