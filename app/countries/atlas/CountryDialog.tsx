import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import ContentVisual from "@/components/ContentVisual";
import { groupLabels, type AtlasTable } from "@/lib/atlas";
import { products } from "@/lib/atlas-products";

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


function ClassNotes({ table }: { table: AtlasTable }) {
  const product = products[table.product];
  return <>
      <section id="class-notes" className="atlas-notes" aria-labelledby="atlas-class-title">
        <h2 id="atlas-class-title">{table.name}의 쿠킹 클래스</h2>
        <div className="atlas-class-grid">
          <article><h3>{table.dish} 함께 만들기</h3><p>{table.activity}</p>
            <a href={table.source.url} target="_blank" rel="noreferrer">{table.source.label} ↗</a></article>
          <article><h3>어울리는 식탁 분위기</h3><p>{table.mood}</p></article>
        </div>
      </section>

      <section className="atlas-scents" aria-labelledby="atlas-scent-title">
        <h2 id="atlas-scent-title">{table.name} 식탁에 어울리는 향</h2>
        <p className="atlas-scent-intro">만나의 연출 제안이에요. 아래에서 한 가지를 고르고, 조리와 식사 중에는 음식 자체의 향을 즐겨 보세요.</p>
        <div className="atlas-scent-grid">{scents.map((scent) => <article key={scent.kind}>
          <div className="atlas-scent-label"><ScentDrawing kind={scent.kind}/><div><span>{scent.when}</span><h3>{scent.title}</h3></div></div>
          <strong>{table[scent.kind]}</strong><p>{scent.use}</p>
        </article>)}</div>
        <div className="atlas-product"><div><span>이 향을 시도해 볼 제품 · {product.kind}</span>
          <h3>{product.brand} <b>{product.name}</b></h3><p>{product.notes}</p></div>
          <a href={product.url} target="_blank" rel="noreferrer">브랜드에서 향 확인 ↗</a>
        </div>
      </section>
    <Link className="atlas-class-link" href="/classes">만나의 식탁 클래스 안내 →</Link>
  </>;
}

export default function CountryDialog({ table, region, showClass, onSection, onClose }: {
  table: AtlasTable;
  region: string;
  showClass: boolean;
  onSection: (showClass: boolean) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const { archive } = table;
  const countryPath = `/countries/${table.slug}`;
  useLayoutEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const opener = document.activeElement;
    node.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener !== document.body && opener.isConnected) {
        opener.focus({ preventScroll: true });
      } else {
        document.getElementById(`pin-${table.slug}`)?.focus({ preventScroll: true });
      }
    };
  }, [table.slug]);
  useLayoutEffect(() => {
    if (scrollArea.current) scrollArea.current.scrollTop = 0;
  }, [showClass]);

  return (
    <dialog className="table-dialog" ref={dialog} aria-labelledby="table-card-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="table-card">
        <button type="button" className="table-close" onClick={onClose} autoFocus aria-label="카드 닫고 지도로 돌아가기">닫기 <span aria-hidden="true">×</span></button>
        <div className="table-scroll" ref={scrollArea}>
          <ContentVisual eyebrow={table.cover.eyebrow} label={table.english.toUpperCase()} caption={table.cover.caption} palette={table.cover.palette} size="atlas" />
          <div className="table-card-body">
            <div className="table-byline"><span>{region}</span><span className={`atlas-tag group-${table.group}`}><i aria-hidden="true" />{groupLabels[table.group]}</span></div>
            <h2 id="table-card-title">{table.name}의 식탁</h2>
            <div className="table-sections" role="group" aria-label="카드 내용">
              <button type="button" aria-pressed={!showClass} onClick={() => onSection(false)}>식문화 소개</button>
              <button type="button" aria-pressed={showClass} onClick={() => onSection(true)}>쿠킹 클래스와 향</button>
            </div>
            {showClass ? <ClassNotes table={table}/> : <>
              <h3 className="table-headline">{table.headline}</h3>
              <p className="table-summary">{table.summary}</p>
              <dl className="table-fields">
                <div><dt>{archive ? (table.group === "home" ? "기준 식탁" : "방문한 곳") : "모임 테마"}</dt><dd>{archive ? archive.places.join(" · ") : table.place}</dd></div>
                <div><dt>클래스 요리</dt><dd>{table.dish}</dd></div>
                <div><dt>어울리는 향</dt><dd>{table.notes}</dd></div>
              </dl>
              <ul className="table-tags" aria-label="식문화 키워드">{table.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {archive && <nav className="table-counts" aria-label={`${table.name} 식문화 콘텐츠`}>
                <a href={countryPath + "#regional-notes"}>지역·공간 <b>{archive.regions}</b></a>
                <a href={countryPath + "#stories"}>문화 이야기 <b>{archive.stories}</b></a>
                <a href={countryPath + "#recipes"}>레시피 <b>{archive.recipes}</b></a>
              </nav>}
              <div className="table-actions">
                {archive ? <><small>검토 {archive.updatedAt.replaceAll("-", ".")}</small><Link href={countryPath}>상세 식탁 보기 →</Link></>
                  : <><a href={table.source.url} target="_blank" rel="noreferrer">식문화 출처 ↗</a><button type="button" onClick={() => onSection(true)}>모임 구성 보기 →</button></>}
              </div>
            </>}
          </div>
        </div>
      </div>
    </dialog>
  );
}
