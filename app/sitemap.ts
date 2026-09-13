import type { MetadataRoute } from "next";
import { countries, recipes, stories } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/countries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/recipes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/journeys/europe`,
      lastModified: new Date("2026-09-11T00:00:00+09:00"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/videos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/classes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/clubs/eat`,
      lastModified: new Date("2026-09-13T00:00:00+09:00"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${siteConfig.url}/countries/${country.slug}`,
    lastModified: new Date(`${country.updatedAt}T00:00:00+09:00`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${siteConfig.url}/stories/${story.slug}`,
    lastModified: new Date(`${story.updatedAt}T00:00:00+09:00`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${siteConfig.url}/recipes/${recipe.slug}`,
    lastModified: new Date(`${recipe.publishedAt}T00:00:00+09:00`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...storyRoutes,
    ...recipeRoutes,
  ];
}
