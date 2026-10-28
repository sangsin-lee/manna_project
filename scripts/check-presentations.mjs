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
const { splitSceneText } = loadTypeScript("../lib/video-project.ts");
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const join = (frames) => normalize(frames.map((frame) => frame.body ?? "").join(" "));

// Regression: the old 145-character split showed only "않았습니다." on a page.
const reportedSentences = [
  "서울은 브랜드의 지역 배경이며 딸기의 산지를 뜻하지 않습니다.",
  "아래 기본 배합은 작은 딸기 기준입니다.",
  "가을에는 작은 귤이나 씨 없는 포도로 응용할 수 있고, 시설 재배·저장·수입에 따른 판매 시기는 노지 수확기와 다릅니다.",
  "특정 매장 재고는 확인하지 않았습니다.",
];
for (const split of [splitForScreen, splitSceneText]) {
  const reported = reportedSentences.join(" ");
  const pages = split(reported);
  assert.equal(normalize(pages.join(" ")), reported);
  for (const sentence of reportedSentences) {
    assert.ok(pages.some((page) => page.includes(sentence)), "A sentence that fits must stay on one screen");
  }
  const longSentence = "반죽의 가장자리부터 가운데까지 주걱으로 고루 저어 ".repeat(6) + "충분히 익힙니다.";
  const balanced = split(longSentence);
  assert.equal(normalize(balanced.join(" ")), normalize(longSentence));
  assert.ok(balanced.length > 1 && balanced.every((page) => page.length >= 30 && page.length <= 145), "Long sentences must not leave a tiny trailing screen");
  for (const text of ["한".repeat(500), "🥘".repeat(150), "중심 71.1°C 이상입니다. \"최소 3분 휴지합니다.\" ".repeat(8)]) {
    const parts = split(text);
    assert.equal(parts.join("").replace(/\s/g, ""), text.replace(/\s/g, ""));
    assert.ok(parts.every((part) => part.length <= 145 && !/[\uD800-\uDBFF]$/.test(part)));
    if (text.includes("71.1°C")) assert.equal(parts.filter((part) => part.includes("71.1°C")).length > 0, true);
  }
  assert.deepEqual(split(" \n\t "), []);
}

for (const text of ["중심 71.1°C 이상. 최소 3분 휴지합니다.", "한 줄\n\n다음 줄", "온도 63°C. 휴지 3분. ".repeat(40)]) {
  assert.equal(normalize(splitForScreen(text).join(" ")), normalize(text));
  assert.ok(splitForScreen(text).every((part) => part.length <= 145));
}

for (const recipe of recipes) {
  const frames = recipeFrames(recipe);
  const narrative = recipeNarratives[recipe.slug];
  assert.ok(narrative, `${recipe.slug}: missing food story`);
  assert.deepEqual(narrative.chapters.map((chapter) => chapter.section), ["음식의 유래", "시대와 문화", "맛과 식감"]);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize([...narrative.chapters.map((chapter) => chapter.body), recipe.culturalNote, recipe.localTable?.note ?? ""].join(" ")), recipe.slug);
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
const unpublishedRecipe = { ...recipes[0], slug: "not-yet-authored", localTable: undefined };
assert.equal(join(recipeFrames(unpublishedRecipe).filter((frame) => frame.kind === "culture")), normalize(unpublishedRecipe.culturalNote), "Unwritten stories must retain the existing cultural note");
for (const story of stories) {
  const frames = storyFrames(story);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize([story.lead, ...story.sections.flatMap((section) => section.paragraphs)].join(" ")), story.slug);
  assert.deepEqual(frames.flatMap((frame) => frame.sources ?? []), story.sources);
}
console.log(`Verified origin/culture/taste openings and preserved all ingredients, methods, safety notes and sources: ${recipes.length} recipes, ${stories.length} stories.`);
