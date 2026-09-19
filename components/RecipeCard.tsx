import Link from "next/link";
import { getCountry, recipeCategoryLabels, type Recipe } from "@/lib/content";
import RecipeArtwork from "./RecipeArtwork";
import { getRecipeDesign, recipeDesignStyle } from "@/lib/recipe-design";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const country = getCountry(recipe.country);
  const design = getRecipeDesign(recipe);
  return (
    <article className="journal-card" style={recipeDesignStyle(design)}>
      <Link href={`/recipes/${recipe.slug}`} aria-label={`${recipe.title} 레시피 보기`}>
        <div className="journal-card-top"><span>{country?.nameKo ?? "세계"} / {recipeCategoryLabels[recipe.category]}</span><span>RECIPE ↗</span></div>
        <RecipeArtwork design={design} label={recipe.visualLabel} compact />
        <h3>{recipe.title}</h3>
        <p className="journal-card-summary">{recipe.summary}</p>
        <div className="journal-card-meta"><span>{recipe.cookingTime}분</span><span>{recipe.servings}인분</span><span>{recipe.difficulty}</span><span>레시피 보기 ↗</span></div>
      </Link>
    </article>
  );
}
