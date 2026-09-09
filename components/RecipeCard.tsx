import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import {
  experienceStatusLabels,
  getCountry,
  recipeCategoryLabels,
  type Recipe,
} from "@/lib/content";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const country = getCountry(recipe.country);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#ded4c8] bg-white shadow-[0_16px_50px_rgba(70,50,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(70,50,25,0.09)]">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="block h-full no-underline"
        aria-label={`${recipe.title} 레시피 보기`}
      >
        <ContentVisual
          eyebrow={country?.nameEn ?? "WORLD RECIPE"}
          label={recipe.visualLabel}
          caption={recipe.visualCaption}
          palette={recipe.palette}
        />

        <div className="flex min-h-[390px] flex-col p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-black tracking-[0.16em] text-[#b9480c]">
              {country?.nameKo ?? "세계"}
            </span>
            <div className="flex flex-wrap justify-end gap-2">
              {recipe.experienceStatus && (
                <span className="rounded-full border border-[#e5b596] bg-[#fff3ea] px-3 py-1.5 text-[11px] font-black text-[#943706]">
                  {experienceStatusLabels[recipe.experienceStatus]}
                </span>
              )}
              <span className="rounded-full bg-[#f5f1ea] px-3 py-1.5 text-[11px] font-bold text-neutral-600">
                {recipeCategoryLabels[recipe.category]}
              </span>
            </div>
          </div>

          <h2 className="mt-5 break-keep text-xl font-black leading-8 tracking-tight">
            {recipe.title}
          </h2>
          <p className="mt-4 line-clamp-3 break-keep text-sm leading-7 text-neutral-600">
            {recipe.summary}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
              <p className="text-[10px] text-neutral-500">시간</p>
              <p className="mt-1 text-xs font-black">{recipe.cookingTime}분</p>
            </div>
            <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
              <p className="text-[10px] text-neutral-500">난이도</p>
              <p className="mt-1 text-xs font-black">{recipe.difficulty}</p>
            </div>
            <div className="rounded-xl bg-[#f7f3ed] px-3 py-3">
              <p className="text-[10px] text-neutral-500">인분</p>
              <p className="mt-1 text-xs font-black">{recipe.servings}인분</p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-6">
            <span className="text-xs text-neutral-500">
              재료 {recipe.ingredientGroups.reduce((sum, group) => sum + group.items.length, 0)}개
            </span>
            <span className="text-sm font-black text-neutral-950 transition group-hover:text-[#b9480c]">
              레시피 보기 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
