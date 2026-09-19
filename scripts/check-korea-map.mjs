import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};
const { recipes } = load("../lib/content.ts");
const { koreanRegions, getKoreanRegion, getSeason, seasonInSeoul, seasonalSpecialties, seasons } = load("../lib/korea-table.ts");
const { koreaCoastPaths, projectKorea } = load("../lib/korea-map.ts");
assert.equal(new Set(koreanRegions.map(region => region.id)).size, koreanRegions.length);
assert.equal(new Set(recipes.map(recipe => recipe.slug)).size, recipes.length, "No duplicate recipe URLs");
assert.equal(getKoreanRegion("unknown").id, "jeju");
assert.equal(getKoreanRegion(null).id, "jeju");
assert.equal(getSeason("invalid", "winter"), "winter");
assert.equal(seasonInSeoul(new Date("2026-05-31T14:59:59Z")), "spring");
assert.equal(seasonInSeoul(new Date("2026-05-31T15:00:00Z")), "summer");
assert.equal(seasonInSeoul(new Date("2026-11-30T15:00:00Z")), "winter");
assert.ok(koreaCoastPaths.length > 1, "The mainland and islands are present");
assert.ok(koreaCoastPaths.every(path => !path.includes("NaN")));

for (const region of koreanRegions) {
  const [x, y] = projectKorea(region.pin);
  assert.ok(x > 35 && x < 485 && y > 35 && y < 585, `${region.id}: icon fits on map`);
  assert.ok(region.sources.length && region.specialties.length);
  for (const source of region.sources) assert.equal(new URL(source.url).protocol, "https:");
  for (const { id } of seasons) {
    assert.ok(region.seasonNotes[id]?.trim());
    const result = seasonalSpecialties(region, id);
    assert.ok(result.items.length, `${region.id}/${id}: a useful seasonal or pantry option`);
    if (result.isHarvestSeason) assert.ok(result.items.every(item => item.seasons.includes(id)));
    else assert.ok(result.items.every(item => !item.seasons.includes(id)), "Off-season produce must be marked as storage/processed");
  }
  const linked = recipes.filter(recipe => recipe.domesticRegion === region.id);
  assert.deepEqual(linked.map(recipe => recipe.slug).sort(), [...region.recipeSlugs].sort(), `${region.id}: map links match published recipes`);
  assert.ok(linked.length || (region.pantry?.ingredients && region.pantry.steps.length >= 3), `${region.id}: cooking information required`);
}
for (const recipe of recipes.filter(recipe => recipe.domesticRegion)) {
  assert.ok(koreanRegions.some(region => region.id === recipe.domesticRegion));
  assert.equal(recipe.country, "korea");
  assert.ok(recipe.localTable && recipe.ingredientGroups.length && recipe.steps.length >= 4);
}
const summerJeju = seasonalSpecialties(getKoreanRegion("jeju"), "summer");
assert.ok(summerJeju.items.some(item => item.name === "풋귤"));
assert.ok(!summerJeju.items.some(item => item.name === "노지감귤"));
console.log(`Korea map checks passed: ${koreanRegions.length} regions, 36 seasonal views, reciprocal recipe links, off-season labels and Seoul date boundaries.`);
