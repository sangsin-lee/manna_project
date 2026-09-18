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
const normalize = (text) => text.replace(/\s+/g, " ").trim();
const join = (frames) => normalize(frames.map((frame) => frame.body ?? "").join(" "));

for (const text of ["중심 71.1°C 이상. 최소 3분 휴지합니다.", "한 줄\n\n다음 줄", "온도 63°C. 휴지 3분. ".repeat(40)]) {
  assert.equal(normalize(splitForScreen(text).join(" ")), normalize(text));
  assert.ok(splitForScreen(text).every((part) => part.length <= 145));
}

for (const recipe of recipes) {
  const frames = recipeFrames(recipe);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize(recipe.culturalNote), recipe.slug);
  assert.equal(join(frames.filter((frame) => frame.kind === "step")), normalize(recipe.steps.map((step) => step.description).join(" ")), recipe.slug);
  const notes = join(frames.filter((frame) => frame.kind === "note"));
  for (const text of [...recipe.tips, ...recipe.substitutions, ...recipe.steps.map((step) => step.tip).filter(Boolean)]) {
    assert.ok(notes.includes(normalize(text)), `${recipe.slug}: missing note`);
  }
  const ingredients = normalize(frames.filter((frame) => frame.kind === "ingredients").flatMap((frame) => frame.items ?? [frame.body]).join(" "));
  assert.equal(ingredients, normalize(recipe.ingredientGroups.flatMap((group) => group.items).join(" ")), recipe.slug);
  assert.deepEqual(frames.flatMap((frame) => frame.sources ?? []), recipe.sources);
}
for (const story of stories) {
  const frames = storyFrames(story);
  assert.equal(join(frames.filter((frame) => frame.kind === "culture")), normalize([story.lead, ...story.sections.flatMap((section) => section.paragraphs)].join(" ")), story.slug);
  assert.deepEqual(frames.flatMap((frame) => frame.sources ?? []), story.sources);
}
console.log(`Preserved all ingredients, methods, safety notes, cultural text and sources: ${recipes.length} recipes, ${stories.length} stories.`);
