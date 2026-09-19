import coastline from "../data/korea-coastline.json";

// Natural Earth 1:50m, public domain. Equirectangular projection adjusted at 36°N.
// Icons indicate culinary areas, not administrative boundaries or shop locations.
export function projectKorea([longitude, latitude]: readonly number[]) {
  return [80 + (longitude - 125.3) * 78, 40 + (38.65 - latitude) * 96];
}
export const koreaCoastPaths = coastline.coordinates.map((polygon) => polygon.map((ring) => ring.map((point, i) => {
  const [x, y] = projectKorea(point);
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(" ") + "Z").join(" "));
