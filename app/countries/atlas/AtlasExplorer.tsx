"use client";

import Link from "next/link";
import { useState } from "react";
import { groupLabels, type AtlasTable } from "@/lib/atlas";
import { products } from "@/lib/atlas-products";
import AtlasMap from "./AtlasMap";

const filters = ["all", "visited", "popular", "discovery", "home"] as const;
type Filter = (typeof filters)[number];

const scents = [
  { kind: "diffuser", title: "디퓨저", when: "손님을 맞을 때", use: "현관이나 옷을 거는 곳에 두어 들어서는 순간만 가볍게 느끼도록 해요." },
  { kind: "candle", title: "향초", when: "식사를 마친 뒤", use: "식기를 치운 뒤 대화를 나눌 공간에서 하나만 켜요." },
  { kind: "perfume", title: "향수", when: "돌아가기 전에", use: "원하는 사람만 시향지에 뿌려, 오늘의 식탁을 떠올릴 향을 가져가요." },
] as const;

function ScentDrawing({ kind }: { kind: (typeof scents)[number]["kind"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 70" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      {kind === "diffuser" && <>
        <path d="M30 36 14 6m18 30L27 3m7 33 2-29m0 29L49 7m-16 28L21 13"/>
        <path d="M25 36h15v5c0 4 8 5 8 13v10c0 2-2 3-5 3H22c-4 0-6-1-6-4V53c0-7 9-8 9-12z" />
        <path d="M24 40h16m-21 14c10-3 17 3 26 0"/>
      </>}
      {kind === "candle" && <>
        <path d="M29 31c-6-7 4-12 4-22 6 9 8 14 3 21m-3 6v-8"/>
        <ellipse cx="32" cy="38" rx="19" ry="5"/><path d="m13 38 3 25c1 6 30 6 32 0l3-25m-30 8 1 13"/>
      </>}
      {kind === "perfume" && <>
        <path d="M25 12h15v11H25zM27 24h11v6H27zM22 30h21l7 8v24a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V38z"/>
        <path d="M22 42h21v15H22zM29 47h7m-6 5h5m-7-37h10"/>
      </>}
    </svg>
  );
}

function Compass() {
  return <svg className="atlas-compass" viewBox="0 0 54 66" aria-hidden="true">
    <text x="27" y="10" textAnchor="middle" fontSize="10" fill="currentColor">N</text>
    <g stroke="currentColor" fill="none" strokeWidth=".9">
      <circle cx="27" cy="39" r="15"/><path d="m27 15 5 19 18 5-18 5-5 19-5-19-18-5 18-5z"/>
      <path d="m27 15 0 24 5-5zm0 24-5 5 5 19zm0 0 23 0-18 5zm0 0L4 39l18-5z" fill="currentColor"/>
    </g>
  </svg>;
}

export default function AtlasExplorer({ tables, initialSlug }: { tables: AtlasTable[]; initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"map" | "list">("map");
  const [zoom, setZoom] = useState(1);
  const selected = tables.find((table) => table.slug === slug) ?? tables[0];
  const shown = tables.filter((table) => filter === "all" || table.group === filter);
  const product = products[selected.product];

  function select(next: string) {
    setSlug(next);
    const url = new URL(window.location.href);
    url.searchParams.set("country", next);
    window.history.replaceState(window.history.state, "", url);
  }

  function changeFilter(next: Filter) {
    setFilter(next);
    setZoom(1);
    if (next !== "all" && selected.group !== next) {
      const first = tables.find((table) => table.group === next);
      if (first) select(first.slug);
    }
  }

  return (
    <div className="atlas-wrap atlas-body">
      <section id="explore" aria-labelledby="atlas-explore-title">
        <div className="atlas-section-head">
          <div className="atlas-heading"><h2 id="atlas-explore-title">세계의 식탁</h2><span>{tables.length}개 나라·지역</span></div>
          <div className="atlas-switch" aria-label="탐색 방식" role="group">
            <button type="button" aria-pressed={view === "map"} onClick={() => setView("map")}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m2 5 5-2 6 2 5-2v12l-5 2-6-2-5 2zM7 3v12m6-10v12"/></svg>지도
            </button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5h10M7 10h10M7 15h10M3 5h.5m-.5 5h.5m-.5 5h.5"/></svg>목록
            </button>
          </div>
        </div>
        <div className="atlas-filters" aria-label="여행지 분류" role="group">
          {filters.map((key) => <button type="button" key={key} aria-pressed={filter === key} onClick={() => changeFilter(key)}>
            {key !== "all" && <i className={`atlas-key group-${key}`} aria-hidden="true"/>}
            {key === "all" ? "전체" : groupLabels[key]} <small>{key === "all" ? tables.length : tables.filter((t) => t.group === key).length}</small>
          </button>)}
        </div>
        <div className="atlas-spread">
          <div className="atlas-cartography">
            <div className="atlas-map-bar">
              <label htmlFor="atlas-destination">나라·지역 선택</label>
              <select id="atlas-destination" value={selected.slug} onChange={(event) => select(event.target.value)}>
                {shown.map((table) => <option value={table.slug} key={table.slug}>{table.name} · {table.dish}</option>)}
              </select>
            </div>
            {view === "map" ? (
              <div className="atlas-sheet">
                <AtlasMap tables={shown} selected={selected} zoom={zoom} onSelect={select} />
                <Compass/>
                <div className="atlas-zoom">
                  <button type="button" aria-label="선택한 나라 주변 확대" title="선택한 나라 주변 확대" disabled={zoom >= 4} onClick={() => setZoom(zoom * 2)}>+</button>
                  <button type="button" aria-label="지도 축소" title="지도 축소" disabled={zoom <= 1} onClick={() => setZoom(zoom / 2)}>−</button>
                </div>
              </div>
            ) : (
              <div className="atlas-list" role="region" aria-label="나라별 요리와 향 비교" tabIndex={0}>
                <table><thead><tr><th>나라·지역</th><th>대표 요리</th><th>추천 향</th></tr></thead>
                  <tbody>{shown.map((t) => <tr key={t.slug} className={selected.slug === t.slug ? "selected" : ""}>
                    <td><button type="button" aria-pressed={selected.slug === t.slug} onClick={() => select(t.slug)}><i className={`atlas-key group-${t.group}`}/>{t.name}</button></td>
                    <td>{t.dish}</td><td>{t.notes}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            )}
            <div className="atlas-map-foot"><span>{view === "map" ? "지도에서 색이 있는 땅이나 점을 눌러 보세요." : "나라 이름을 누르면 해당 식탁이 펼쳐져요."}</span>
              {view === "map" && <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth ↗</a>}
            </div>
          </div>
          <article className="atlas-profile" aria-labelledby="atlas-selected">
            <div className="atlas-profile-top"><span className={`atlas-tag group-${selected.group}`}><i/>{groupLabels[selected.group]}</span><span className="atlas-code">{selected.code}</span></div>
            <div className="atlas-country-heading"><h3 id="atlas-selected">{selected.name}</h3><em lang="en">{selected.english}</em></div>
            <dl className="atlas-facts">
              <div><dt>대표 요리</dt><dd>{selected.dish}<small>{selected.ingredients}</small></dd></div>
              <div><dt>식탁 테마</dt><dd>{selected.place}</dd></div>
              <div><dt>추천 향</dt><dd>{selected.notes}</dd></div>
            </dl>
            <a className="atlas-profile-action" href="#class-notes">모임과 향 자세히 보기 <span aria-hidden="true">↓</span></a>
          </article>
        </div>
        <p role="status" className="sr-only">{selected.name}, {selected.dish}, 추천 향 {selected.notes}. 현재 {shown.length}곳을 표시합니다.</p>
      </section>

      <section id="class-notes" className="atlas-notes" aria-labelledby="atlas-class-title">
        <div className="atlas-subhead"><div><p className="atlas-kicker">COOKING CLASS</p><h2 id="atlas-class-title">{selected.name}의 쿠킹 클래스</h2></div>
          {selected.visitPlaces && <Link href={`/countries/${selected.slug}`}>{selected.group === "home" ? "홈베이스" : "방문 기록"} · {selected.visitPlaces.join(" · ")} ↗</Link>}
        </div>
        <div className="atlas-class-grid">
          <article><h3>{selected.dish} 함께 만들기</h3><p>{selected.activity}</p>
            <a href={selected.source.url} target="_blank" rel="noreferrer">{selected.source.label} ↗</a></article>
          <article><h3>어울리는 식탁 분위기</h3><p>{selected.mood}</p></article>
        </div>
      </section>

      <section className="atlas-scents" aria-labelledby="atlas-scent-title">
        <p className="atlas-kicker">SCENT PAIRING</p><h2 id="atlas-scent-title">{selected.name} 식탁에 어울리는 향</h2>
        <p className="atlas-scent-intro">만나의 연출 제안이에요. 아래에서 한 가지를 고르고, 조리와 식사 중에는 음식 자체의 향을 즐겨 보세요.</p>
        <div className="atlas-scent-grid">{scents.map((scent) => <article key={scent.kind}>
          <div className="atlas-scent-label"><ScentDrawing kind={scent.kind}/><div><span>{scent.when}</span><h3>{scent.title}</h3></div></div>
          <strong>{selected[scent.kind]}</strong><p>{scent.use}</p>
        </article>)}</div>
        <div className="atlas-product"><div><span>이 향을 시도해 볼 제품 · {product.kind}</span>
          <h3>{product.brand} <b>{product.name}</b></h3><p>{product.notes}</p></div>
          <a href={product.url} target="_blank" rel="noreferrer">브랜드에서 향 확인 ↗</a>
        </div>
      </section>
      <div className="atlas-end"><Link href="/classes">만나의 식탁 클래스 안내 ↗</Link><Link href="/countries">나라별 식문화 아카이브 →</Link></div>
    </div>
  );
}
