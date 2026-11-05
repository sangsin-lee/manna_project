import { useLayoutEffect, useRef, useState } from "react";
import type { AtlasTable } from "@/lib/atlas";

const width = 1000;
const height = 440;

function project([lon, lat]: [number, number]) {
  const radians = (lat * Math.PI) / 180;
  return { x: 500 + lon * 2.68 * (1 - 0.32 * Math.sin(radians) ** 2), y: 240 - lat * 2.53 };
}

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

export default function AtlasMap({ tables, selected, zoom, fitRegion, onSelect }: {
  tables: AtlasTable[]; selected?: AtlasTable; zoom: number; fitRegion: boolean; onSelect: (slug: string) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState(760);
  useLayoutEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setPixels(entry.contentRect.width || 760));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const points = tables.map((table) => project(table.point));
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));
  const fitted = fitRegion && points.length > 0;
  const baseZoom = fitted ? Math.min(4, width / (maxX - minX + 115), height / (maxY - minY + 85)) : 1;
  const center = fitted ? { x: (minX + maxX) / 2, y: (minY + maxY) / 2 } : { x: width / 2, y: height / 2 };
  const focus = selected && zoom > 1 ? project(selected.point) : center;
  const w = width / (Math.max(1, baseZoom) * zoom);
  const h = height / (Math.max(1, baseZoom) * zoom);
  const left = Math.min(width - w, Math.max(0, focus.x - w / 2));
  const top = Math.min(height - h, Math.max(0, focus.y - h / 2));
  return (
    <div ref={stage} className="atlas-map-stage" role="group" aria-label="나라와 지역을 선택하는 세계지도">
      <svg className="atlas-map-svg" viewBox={`${left} ${top} ${w} ${h}`} aria-hidden="true">
        <image href="/atlas/world.svg" x="0" y="0" width={width} height={height} />
        {tables.filter((table) => table.code !== "HKG" && table.code !== "MAC").map((table) => (
          <use key={table.slug} href={`/atlas/world.svg#${table.code}`}
            className={`atlas-land ${table.slug === selected?.slug ? "chosen" : ""}`}
            onClick={() => onSelect(table.slug)}><title>{table.name}</title></use>
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
              id={`pin-${table.slug}`} aria-label={`${table.name} 식탁 선택`} aria-haspopup="dialog" onClick={() => onSelect(table.slug)}>
              <span className="atlas-pin-dot" aria-hidden="true" />
              <span className={`world-pin-label${x > pixels - 90 ? " label-left" : ""}`} aria-hidden="true">{table.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
