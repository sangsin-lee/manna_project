import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const loadTypeScript = createRequire(import.meta.url);

// Load the same TypeScript content used by the site without emitting build files.
loadTypeScript.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  module._compile(outputText, filename);
};
const { recipes, stories } = loadTypeScript("../lib/content.ts");
const { splitForScreen, recipeFrames, storyFrames } = loadTypeScript("../lib/presentation.ts");
const { recipeNarratives } = loadTypeScript("../lib/recipe-narratives.ts");
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const join = (frames) => normalize(frames.map((frame) => frame.body ?? "").join(" "));

for (const text of ["중심 71.1°C 이상. 최소 3분 휴지합니다.", "한 줄\n\n다음 줄", "온도 63°C. 휴지 3분. ".repeat(40)]) {
  assert.equal(normalize(splitForScreen(text).join(" ")), normalize(text));
  assert.ok(splitForScreen(text).every((part) => part.length <= 145));
}

for (const recipe of recipes) {
  const frames = recipeFrames(recipe);
  const narrative = recipeNarratives[recipe.slug];
  assert.ok(narrative, `${recipe.slug}: missing food story`);
  assert.deepEqual(narrative.chapters.map((chapter) => chapter.section), ["음식의 유래", "시대와 문화", "맛과 식감"]);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize([...narrative.chapters.map((chapter) => chapter.body), recipe.culturalNote].join(" ")), recipe.slug);
  const firstIngredient = frames.findIndex((frame) => frame.kind === "ingredients");
  let previousChapter = 0;
  for (const chapter of narrative.chapters) {
    const index = frames.findIndex((frame) => frame.section === chapter.section);
    assert.ok(index > previousChapter && index < firstIngredient, `${recipe.slug}: food story order`);
    assert.ok(chapter.title.trim() && chapter.body.trim(), `${recipe.slug}: empty food story`);
    previousChapter = index;
  }
  assert.ok(frames.filter((frame) => frame.kind === "culture").every((frame) => frame.body.length <= 145), `${recipe.slug}: oversized story frame`);
  assert.equal(join(frames.filter((frame) => frame.kind === "step")), normalize(recipe.steps.map((step) => step.description).join(" ")), recipe.slug);
  const notes = join(frames.filter((frame) => frame.kind === "note"));
  for (const text of [...recipe.tips, ...recipe.substitutions, ...recipe.steps.map((step) => step.tip).filter(Boolean)]) {
    assert.ok(notes.includes(normalize(text)), `${recipe.slug}: missing note`);
  }
  const ingredients = normalize(frames.filter((frame) => frame.kind === "ingredients").flatMap((frame) => frame.items ?? [frame.body]).join(" "));
  assert.equal(ingredients, normalize(recipe.ingredientGroups.flatMap((group) => group.items).join(" ")), recipe.slug);
  const actualSources = frames.flatMap((frame) => frame.sources ?? []).map((source) => source.url);
  assert.ok(narrative.sources.length > 0, `${recipe.slug}: missing historical sources`);
  const expectedSources = [...new Set([...recipe.sources, ...narrative.sources].map((source) => source.url))];
  assert.deepEqual(actualSources, expectedSources, `${recipe.slug}: missing or duplicate sources`);
  for (const url of actualSources) assert.equal(new URL(url).protocol, "https:");
}
assert.deepEqual(Object.keys(recipeNarratives).sort(), recipes.map((recipe) => recipe.slug).sort(), "Orphaned food stories");
const unpublishedRecipe = { ...recipes[0], slug: "not-yet-authored" };
assert.equal(join(recipeFrames(unpublishedRecipe).filter((frame) => frame.kind === "culture")), normalize(unpublishedRecipe.culturalNote), "Unwritten stories must retain the existing cultural note");
for (const story of stories) {
  const frames = storyFrames(story);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize([story.lead, ...story.sections.flatMap((section) => section.paragraphs)].join(" ")), story.slug);
  assert.deepEqual(frames.flatMap((frame) => frame.sources ?? []), story.sources);
}
console.log(`Verified origin/culture/taste openings and preserved all ingredients, methods, safety notes and sources: ${recipes.length} recipes, ${stories.length} stories.`);
