import Link from "next/link";
import history from "@/data/daily-menu-history.json";
import { getRecipe } from "@/lib/content";
import { getRecipeDesign, recipeDesignStyle } from "@/lib/recipe-design";
import RecipeArtwork from "./RecipeArtwork";

export default function SeasonalFeature() {
  const pick = [...history.daily].sort((a, b) => b.date.localeCompare(a.date))[0];
  const recipe = pick && getRecipe(pick.recipeSlug);
  if (!recipe) return null;
  const design = getRecipeDesign(recipe);
  return (
    <div className="seasonal-feature" style={recipeDesignStyle(design)}>
      <div className="seasonal-feature-label"><span>SEASONAL TABLE / 계절의 식탁</span><time dateTime={pick.date}>{pick.date.replaceAll("-", ".")}</time></div>
      <Link href={`/recipes/${recipe.slug}`} aria-label={`${recipe.title} 레시피와 식문화 보기`}>
        <RecipeArtwork design={design} label={recipe.visualLabel} />
        <div className="seasonal-feature-bottom"><div><span>{recipe.localTable?.ingredient ?? design.place}</span><h2>{recipe.title}</h2></div><span aria-hidden="true">↗</span></div>
      </Link>
    </div>
  );
}
