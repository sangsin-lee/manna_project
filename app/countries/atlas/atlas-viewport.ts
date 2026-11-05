import type { AtlasTable } from "@/lib/atlas";

export const width = 1000;
export const height = 440;
export const maxZoom = 12;

export type View = { left: number; top: number; zoom: number };

export function project([lon, lat]: [number, number]) {
  const radians = (lat * Math.PI) / 180;
  return { x: 500 + lon * 2.68 * (1 - 0.32 * Math.sin(radians) ** 2), y: 240 - lat * 2.53 };
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function panTo(zoom: number, left: number, top: number): View {
  const w = width / zoom;
  const h = height / zoom;
  // A little ocean at each edge lets visitors drag even from the full-world view.
  return { zoom, left: clamp(left, -w * 0.12, width - w * 0.88), top: clamp(top, -h * 0.12, height - h * 0.88) };
}

export function zoomAt(view: View, factor: number, x: number, y: number): View {
  const zoom = clamp(view.zoom * factor, 1, maxZoom);
  if (zoom === view.zoom) return view;
  if (zoom === 1) return { zoom, left: 0, top: 0 };
  // x and y are fractions of the viewport. Hold the same world point under them.
  const change = 1 / view.zoom - 1 / zoom;
  return panTo(zoom, view.left + x * width * change, view.top + y * height * change);
}

export function startingView(tables: AtlasTable[], fit: boolean): View {
  if (!fit || !tables.length) return { zoom: 1, left: 0, top: 0 };
  const points = tables.map((t) => project(t.point));
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
  const x1 = Math.min(...xs), x2 = Math.max(...xs), y1 = Math.min(...ys), y2 = Math.max(...ys);
  const zoom = clamp(Math.min(width / (x2 - x1 + 115), height / (y2 - y1 + 85)), 1, 4);
  return panTo(zoom, (x1 + x2 - width / zoom) / 2, (y1 + y2 - height / zoom) / 2);
}
