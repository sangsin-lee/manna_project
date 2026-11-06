import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { groupLabels, type AtlasTable } from "@/lib/atlas";
import { clamp, height, maxZoom, panTo, project, startingView, width, zoomAt, type View } from "./atlas-viewport";

// Pixel offsets separate neighbors on small screens. A line connects each pin to its location.
const offsets: Record<string, [number, number]> = {
  france: [-24, -14], germany: [5, -23], switzerland: [-4, 3], italy: [18, 18],
  spain: [-27, 9], morocco: [-15, 26], turkiye: [1, 12], georgia: [11, -10],
  "hong-kong": [15, 6], macau: [-7, 19], thailand: [-19, 4], vietnam: [6, 26],
  china: [5, -9], korea: [-8, -22], japan: [18, -5],
};

type PositionedPin = { table: AtlasTable; originX: number; originY: number; x: number; y: number };

function placePins(tables: AtlasTable[], box: { left: number; top: number; w: number; h: number }, pixels: number) {
  const pins: PositionedPin[] = [];
  const stageHeight = pixels * height / width;
  for (const table of tables) {
    const point = project(table.point);
    const originX = (point.x - box.left) / box.w * pixels;
    const originY = (point.y - box.top) / box.h * stageHeight;
    if (originX < 0 || originX > pixels || originY < 0 || originY > stageHeight) continue;
    const [dx, dy] = offsets[table.slug] ?? [0, 0];
    // Try the preferred offset, then increasingly distant rings until the touch target is clear.
    for (let attempt = 0; attempt < 161; attempt++) {
      const radius = Math.ceil(attempt / 16) * 12;
      const angle = attempt * Math.PI / 8;
      const x = Math.max(13, Math.min(pixels - 13, originX + dx + Math.cos(angle) * radius));
      const y = Math.max(13, Math.min(stageHeight - 13, originY + dy + Math.sin(angle) * radius));
      if (pins.every((pin) => Math.abs(x - pin.x) >= 25 || Math.abs(y - pin.y) >= 25)) {
        pins.push({ table, originX, originY, x, y });
        break;
      }
    }
  }
  return pins;
}

type Drag = { id: number; startX: number; startY: number; view: View; moved: boolean };
type Preview = { table: AtlasTable; x: number; y: number };

export default function AtlasMap({ tables, selected, fitRegion, onSelect }: {
  tables: AtlasTable[]; selected?: AtlasTable; fitRegion: boolean; onSelect: (slug: string) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [initial] = useState(() => startingView(tables, fitRegion));
  const [view, setView] = useState(initial);
  const flight = useRef<number | null>(null);
  const liveView = useRef(initial);
  function flyTo(target: View) {
    if (flight.current !== null) cancelAnimationFrame(flight.current);
    const from = liveView.current; let start: number | undefined;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
    function frame(now: number) {
      start ??= now;
      const t = duration ? Math.min(1, (now-start)/duration) : 1, ease = 1-(1-t)**3;
      const next = {left:from.left+(target.left-from.left)*ease, top:from.top+(target.top-from.top)*ease, zoom:from.zoom+(target.zoom-from.zoom)*ease};
      liveView.current=next; setView(next);
      flight.current=t<1?requestAnimationFrame(frame):null;
    }
    flight.current=requestAnimationFrame(frame);
  }
  useEffect(() => () => { if(flight.current !== null) cancelAnimationFrame(flight.current); }, []);
  useEffect(() => {
    if (!selected) return;
    const point=project(selected.point), z=3;
    flyTo(panTo(z,point.x-width/z/2,point.y-height/z/2));
    // Selection drives the flight; animation frames must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.slug]);
  const [pixels, setPixels] = useState(760);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const hasTables = tables.length > 0;
  const { left, top, zoom } = view;
  const w = width / zoom, h = height / zoom;
  const stageHeight = pixels * height / width;

  useLayoutEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setPixels(entry.contentRect.width || 760));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const node = stage.current;
    if (!node || !hasTables) return;
    function wheel(event: WheelEvent) {
      if (!event.deltaY || event.ctrlKey || event.metaKey || drag.current) return;
      event.preventDefault();
      const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? bounds.height : 1;
      const factor = Math.exp(-clamp(event.deltaY * unit, -400, 400) * 0.0025);
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      setPreview(null);
      if(flight.current !== null) cancelAnimationFrame(flight.current);
      setView(previous => {const next=zoomAt(previous,factor,x,y);liveView.current=next;return next;});
    }
    node.addEventListener("wheel", wheel, { passive: false });
    return () => node.removeEventListener("wheel", wheel);
  }, [hasTables]);

  const previewOpen = preview !== null;
  useEffect(() => {
    if (!previewOpen) return;
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setPreview(null); };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [previewOpen]);
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  function showPreview(table: AtlasTable, clientX: number, clientY: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect || drag.current) return;
    clearTimeout(hideTimer.current);
    setPreview({ table, x: clientX - rect.left, y: clientY - rect.top });
  }
  function hover(event: PointerEvent, table: AtlasTable) {
    if (event.pointerType !== "touch") showPreview(table, event.clientX, event.clientY);
  }
  function leavePreview() {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setPreview(null), 140);
  }
  function select(slug: string) {
    setPreview(null);
    onSelect(slug);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.startX, dy = event.clientY - start.startY;
    if (!start.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      start.moved = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      setPreview(null);
    }
    const scale = width / (pixels * start.view.zoom);
    if(flight.current !== null) cancelAnimationFrame(flight.current);
    const next=panTo(start.view.zoom,start.view.left-dx*scale,start.view.top-dy*scale);liveView.current=next;setView(next);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== drag.current?.id) return;
    drag.current = null;
    setDragging(false);
  }
  function stepZoom(factor: number) {
    const point = selected && project(selected.point);
    const x = point ? (point.x - left) / w : 0.5, y = point ? (point.y - top) / h : 0.5;
    const visible = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    flyTo(zoomAt(view, factor, visible ? x : 0.5, visible ? y : 0.5));
    setPreview(null);
  }
  const cardWidth = Math.min(210, pixels - 16);
  const previewLeft = preview && clamp(preview.x < pixels / 2 ? preview.x + 12 : preview.x - cardWidth - 12, 8, pixels - cardWidth - 8);
  return <>
    <div ref={stage} className="atlas-map-stage" data-zoomed={zoom > 1} data-dragging={dragging}
      role="group" tabIndex={0} aria-label="나라와 지역을 선택하는 세계지도. 화살표 키로 이동할 수 있습니다."
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
        if (!hasTables || (event.pointerType === "touch" && zoom <= 1)) return;
        drag.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, view, moved: false };
      }}
      onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
      onLostPointerCapture={(event) => { if (event.target === event.currentTarget) endDrag(event); }}
      onPointerLeave={(event) => { if (!drag.current?.moved) endDrag(event); leavePreview(); }}
      onClickCapture={(event) => {
        if (suppressClick.current && event.detail > 0) { event.stopPropagation(); suppressClick.current = false; }
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || !hasTables) return;
        const shifts: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
        const shift = shifts[event.key];
        if (!shift) return;
        event.preventDefault();
        setPreview(null);
        flyTo(panTo(zoom, left + shift[0] * w / 6, top + shift[1] * h / 6));
      }}>
      <svg className="atlas-map-svg" viewBox={`${left} ${top} ${w} ${h}`} aria-hidden="true">
        <image href="/atlas/world.svg" x="0" y="0" width={width} height={height} />
        {tables.filter((table) => table.code !== "HKG" && table.code !== "MAC").map((table) => (
          <use key={table.slug} href={`/atlas/world.svg#${table.code}`}
            className={`atlas-land ${table.slug === selected?.slug ? "chosen" : ""}`}
            data-preview={preview?.table.slug === table.slug}
            onPointerEnter={(e) => hover(e, table)} onPointerLeave={leavePreview} onClick={() => select(table.slug)} />
        ))}
      </svg>
      {placePins(tables, { left, top, w, h }, pixels).map(({ table, originX, originY, x, y }) => {
        const dx = x - originX;
        const dy = y - originY;
        const active = table.slug === selected?.slug;
        return (
          <div key={table.slug} className={`atlas-map-anchor group-${table.group}${active ? " active" : ""}`}
            style={{ left: `${100 * originX / pixels}%`, top: `${100 * originY / (pixels * height / width)}%` }}>
            {(dx !== 0 || dy !== 0) && <svg aria-hidden="true" width="1" height="1"><path d={`M0 0 L${dx} ${dy}`} /></svg>}
            <button type="button" className="world-pin" data-selected={active} style={{ left: dx, top: dy }}
              id={`pin-${table.slug}`} aria-label={`${table.name} 식탁 선택`} aria-haspopup="dialog"
              aria-describedby={preview?.table.slug === table.slug ? "atlas-preview" : undefined}
              onPointerEnter={(e) => hover(e, table)} onPointerLeave={leavePreview}
              onFocus={(e) => {
                if (!e.currentTarget.matches(":focus-visible")) return;
                const rect = e.currentTarget.getBoundingClientRect();
                showPreview(table, rect.left + rect.width / 2, rect.top + rect.height / 2);
              }}
              onBlur={leavePreview} onClick={() => select(table.slug)}>
              <span className="atlas-pin-dot" aria-hidden="true" />
              {active && !preview && !dragging && <span className={`world-pin-label${x > pixels - 90 ? " label-left" : ""}`} aria-hidden="true">{table.name}</span>}
            </button>
          </div>
        );
      })}
      {preview && <div id="atlas-preview" role="tooltip" className={`atlas-preview group-${preview.table.group}`}
        style={{ width: cardWidth, left: previewLeft ?? 8, ...(preview.y < stageHeight / 2
          ? { top: Math.max(6, preview.y - 16) } : { bottom: Math.max(6, stageHeight - preview.y - 16) }) }}
        onPointerEnter={() => clearTimeout(hideTimer.current)} onPointerLeave={leavePreview}>
        <div className="atlas-preview-heading"><strong>{preview.table.name}</strong><small>{groupLabels[preview.table.group]}</small></div>
        <dl><div><dt>요리</dt><dd>{preview.table.dish}</dd></div><div><dt>향</dt><dd>{preview.table.notes}</dd></div></dl>
      </div>}
    </div>
    <div className="atlas-zoom">
      <button type="button" aria-label="지도 확대" disabled={!hasTables || zoom >= maxZoom} onClick={() => stepZoom(2)}>+</button>
      <button type="button" aria-label="지도 축소" disabled={!hasTables || zoom <= 1} onClick={() => stepZoom(0.5)}>−</button>
      <button type="button" aria-label="지도 처음 위치로" title="처음 위치로" disabled={zoom === initial.zoom && left === initial.left && top === initial.top}
        onClick={() => { flyTo(initial); setPreview(null); }}>
        <svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8a6.5 6.5 0 1 1 .6 5M3.5 3.5v4.8h4.8"/></svg>
      </button>
    </div>
  </>;
}
