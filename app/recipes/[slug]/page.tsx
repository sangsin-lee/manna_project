import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import RecipeArticle from "@/components/RecipeArticle";
import {
  continentLabels,
  getCountry,
  getRecipe,
  recipeCategoryLabels,
  recipes,
  type Recipe,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

function getRelatedRecipes(currentRecipe: Recipe) {
  const sameCountry = recipes.filter(
    (recipe) =>
      recipe.slug !== currentRecipe.slug &&
      recipe.country === currentRecipe.country,
  );

  const sameCategory = recipes.filter(
    (recipe) =>
      recipe.slug !== currentRecipe.slug &&
      recipe.category === currentRecipe.category &&
      recipe.country !== currentRecipe.country,
  );

  const fallback = recipes.filter(
    (recipe) => recipe.slug !== currentRecipe.slug,
  );

  return [...sameCountry, ...sameCategory, ...fallback]
    .filter(
      (recipe, index, list) =>
        list.findIndex((candidate) => candidate.slug === recipe.slug) === index,
    )
    .slice(0, 3);
}

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(normalizeSlug(slug));

  if (!recipe) {
    return {};
  }

  const country = getCountry(recipe.country);
  const canonicalPath = `/recipes/${recipe.slug}`;

  return {
    title: `${recipe.title} 레시피`,
    description: recipe.summary,
    keywords: [
      country?.nameKo ?? "세계 음식",
      ...(country ? [continentLabels[country.continent], ...(country.visit?.places ?? [])] : []),
      recipeCategoryLabels[recipe.category],
      ...recipe.keywords,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: `${recipe.title} 레시피 | ${siteConfig.name}`,
      description: recipe.summary,
      url: `${siteConfig.url}${canonicalPath}`,
      siteName: siteConfig.name,
      locale: "ko_KR",
      publishedTime: recipe.publishedAt,
      tags: recipe.keywords,
    },
    twitter: {
      card: "summary",
      title: `${recipe.title} 레시피`,
      description: recipe.summary,
    },
  };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipe(normalizeSlug(slug));

  if (!recipe) {
    notFound();
  }

  const country = getCountry(recipe.country);
  const relatedRecipes = getRelatedRecipes(recipe);
  const canonicalUrl = `${siteConfig.url}/recipes/${recipe.slug}`;
  const allIngredients = recipe.ingredientGroups.flatMap(
    (group) => group.items,
  );

  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.title,
            description: recipe.summary,
            datePublished: recipe.publishedAt,
            totalTime: `PT${recipe.cookingTime}M`,
            recipeYield: `${recipe.servings}인분`,
            recipeCategory: recipeCategoryLabels[recipe.category],
            recipeCuisine: country?.nameKo,
            keywords: recipe.keywords.join(", "),
            recipeIngredient: allIngredients,
            recipeInstructions: recipe.steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.tip
                ? `${step.description} 팁: ${step.tip}`
                : step.description,
            })),
            author: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntityOfPage: canonicalUrl,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: siteConfig.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "세계 레시피",
                item: `${siteConfig.url}/recipes`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: recipe.title,
                item: canonicalUrl,
              },
            ],
          },
        ]}
      />

      <RecipeArticle recipe={recipe} relatedRecipes={relatedRecipes} />
    </main>
  );
}
