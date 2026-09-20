import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};
const history = load("../data/daily-menu-history.json");
const { recipes } = load("../lib/content.ts");
const { dailyRecipes } = load("../lib/daily-recipes.ts");
const { recipeNarratives } = load("../lib/recipe-narratives.ts");
const { recipeFrames } = load("../lib/presentation.ts");
const { buildScenes, buildTimeline, draftFromFrames, MAX_DURATION, timelineDuration } = load("../lib/video-project.ts");

function validateHistory(candidate) {
  assert.equal(candidate.timeZone, "Asia/Seoul");
  const dates = new Set();
  const slugs = new Set(candidate.baseline.map((entry) => entry.recipeSlug).filter(Boolean));
  const names = new Set();
  const normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
  for (const entry of [...candidate.baseline, ...candidate.daily]) {
    // Aliases may normalize to one spelling inside an entry, never across meals.
    const ownNames = new Set([entry.title, ...(entry.aliases ?? []), entry.canonicalDish].filter(Boolean).map(normalize));
    for (const name of ownNames) {
      assert.ok(!names.has(name), `Previously recommended dish or alias: ${entry.title}`);
      names.add(name);
    }
  }
  for (const entry of candidate.daily) {
    assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${entry.date}T00:00:00Z`).toISOString().slice(0, 10), entry.date);
    assert.ok(!dates.has(entry.date), `Only one new menu per Korean date: ${entry.date}`);
    assert.ok(!slugs.has(entry.recipeSlug), `Previously used recipe: ${entry.recipeSlug}`);
    dates.add(entry.date);
    slugs.add(entry.recipeSlug);
    const recipe = recipes.find((item) => item.slug === entry.recipeSlug);
    assert.ok(recipe, `Missing published recipe: ${entry.recipeSlug}`);
    assert.equal(recipe.title, entry.title);
    assert.equal(recipe.publishedAt, entry.date);
    assert.ok(recipeNarratives[entry.recipeSlug], "A dinner needs its food story");
    assert.ok(entry.duplicateReview && entry.keyIngredients.length && entry.method);
    assert.ok(entry.preparationLabels.length && entry.research.sources.length);
    for (const url of entry.research.sources) assert.equal(new URL(url).protocol, "https:");
  }
}

validateHistory(history);
// Daily recipes must be usable in the studio without deleting content first.
for (const recipe of dailyRecipes) {
  const timeline = buildTimeline(buildScenes(draftFromFrames(recipeFrames(recipe), false)));
  assert.ok(timelineDuration(timeline) <= MAX_DURATION, `${recipe.slug}: daily full recipe fits video duration`);
}

assert.equal(history.baseline.length, 27, "Preserve the original 26 recipes and homepage dinner");
for (const entry of history.baseline) {
  if (entry.recipeSlug) assert.ok(recipes.some((recipe) => recipe.slug === entry.recipeSlug), "Keep earlier recipe URLs");
}
assert.deepEqual(dailyRecipes.map((recipe) => recipe.slug).sort(), history.daily.map((entry) => entry.recipeSlug).sort());

// Reruns, reused dishes and alternate names must not create a second menu.
const last = history.daily.at(-1);
assert.ok(last, "At least one daily recommendation is required");
const withEntry = (entry) => ({ ...history, daily: [...history.daily, entry] });
assert.throws(() => validateHistory(withEntry({ ...last, title: "새 이름", aliases: [], canonicalDish: "new-name" })), /Only one new menu/);
assert.throws(() => validateHistory(withEntry({ ...last, date: "2099-01-01", title: "다른 소스", aliases: [], canonicalDish: "another-sauce" })), /Previously used recipe/);
assert.throws(() => validateHistory(withEntry({ ...last, date: "2099-01-01", recipeSlug: "renamed", title: last.aliases[0], aliases: [], canonicalDish: "renamed" })), /Previously recommended dish/);
console.log(`Daily menu checks passed: ${history.baseline.length} earlier dishes, ${history.daily.length} daily menus; date and alias duplicates rejected.`);
