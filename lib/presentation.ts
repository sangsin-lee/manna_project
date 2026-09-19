import type { Recipe, SourceLink, Story } from "./content";
import { getRecipeNarrative, getRecipeSources } from "./recipe-narratives";
import { getRecipeDesign, type RecipeDesign } from "./recipe-design";

export type PresentationFrame = {
  design?: RecipeDesign;
  section: string;
  title: string;
  body?: string;
  items?: string[];
  sources?: SourceLink[];
  kind: "cover" | "culture" | "ingredients" | "step" | "note" | "sources";
  number?: string;
  kicker?: string;
};

// Preserve all text, including decimal temperatures and safety instructions.
export function splitForScreen(text: string, limit = 145): string[] {
  const pieces: string[] = [];
  let current = "";
  for (const word of text.trim().split(/\s+/)) {
    if (current && `${current} ${word}`.length > limit) {
      pieces.push(current);
      current = "";
    }
    current = current ? `${current} ${word}` : word;
  }
  if (current) pieces.push(current);
  return pieces;
}

function textFrames(section: string, title: string, text: string, kind: PresentationFrame["kind"], number?: string): PresentationFrame[] {
  return splitForScreen(text).map((body) => ({ section, title, body, kind, number }));
}

function sourceFrames(sources: SourceLink[]): PresentationFrame[] {
  const frames: PresentationFrame[] = [];
  for (let i = 0; i < sources.length; i += 3) {
    frames.push({ section: "참고 자료", title: "이야기의 출처", sources: sources.slice(i, i + 3), kind: "sources" });
  }
  return frames;
}

export function recipeFrames(recipe: Recipe): PresentationFrame[] {
  const narrative = getRecipeNarrative(recipe);
  const frames: PresentationFrame[] = [
    { section: "오늘의 레시피", title: recipe.title, items: [`${recipe.cookingTime}분`, `${recipe.servings}인분`, recipe.difficulty], kind: "cover" },
    ...(narrative?.chapters.flatMap((chapter) =>
      textFrames(chapter.section, chapter.title, chapter.body, "culture").map((frame) => ({ ...frame, kicker: chapter.kicker })),
    ) ?? []),
    ...textFrames("이번 레시피", "우리 집 식탁으로", recipe.culturalNote, "culture"),
    ...(recipe.localTable ? textFrames("지역과 계절", recipe.localTable.season, recipe.localTable.note, "culture") : []),
  ];
  for (const group of recipe.ingredientGroups) {
    // Long ingredient descriptions get their own frame rather than being clipped.
    let items: string[] = [];
    for (const item of group.items) {
      if (items.length === 4 || (items.length && [...items, item].join("").length > 130)) {
        frames.push({ section: `재료 · ${recipe.servings}인분`, title: group.title, items, kind: "ingredients" });
        items = [];
      }
      if (item.length > 130) {
        if (items.length) frames.push({ section: `재료 · ${recipe.servings}인분`, title: group.title, items, kind: "ingredients" });
        items = [];
        frames.push(...textFrames("재료", group.title, item, "ingredients"));
      } else items.push(item);
    }
    if (items.length) frames.push({ section: `재료 · ${recipe.servings}인분`, title: group.title, items, kind: "ingredients" });
  }
  recipe.steps.forEach((step, index) => {
    const number = String(index + 1).padStart(2, "0");
    frames.push(...textFrames(`만드는 순서 · ${index + 1}/${recipe.steps.length}`, step.title, step.description, "step", number));
    if (step.tip) frames.push(...textFrames(`조리 메모 · ${index + 1}단계`, step.title, step.tip, "note", number));
  });
  for (const tip of recipe.tips) frames.push(...textFrames("기억할 것", "마지막 한 끗", tip, "note"));
  for (const item of recipe.substitutions) frames.push(...textFrames("대체 재료", "우리 집 재료로", item, "note"));
  const design = getRecipeDesign(recipe);
  return [...frames, ...sourceFrames(getRecipeSources(recipe))].map((frame) => ({ ...frame, design }));
}

export function storyFrames(story: Story): PresentationFrame[] {
  return [
    { section: "음식과 문화", title: story.title, kind: "cover" },
    ...textFrames("프롤로그", "한 끼에서 시작하는 여행", story.lead, "culture"),
    ...story.sections.flatMap((section, index) => section.paragraphs.flatMap((paragraph) =>
      textFrames("문화 이야기", section.heading, paragraph, "culture", String(index + 1).padStart(2, "0")),
    )),
    ...sourceFrames(story.sources),
  ];
}
