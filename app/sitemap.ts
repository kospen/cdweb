import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { routePaths } from "@/content/index";
import { PRODUCTION_SITE_URL } from "@/content/metadata";

export const dynamic = "force-static";

const url = (path: string) => new URL(path, PRODUCTION_SITE_URL).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = Object.entries(routePaths).map(([key, path]) => ({
    url: url(path ? path + "/" : "/"),
    changeFrequency: key === "home" || key === "news" ? "weekly" : "monthly",
    priority: key === "home" ? 1 : 0.7,
  }));

  const articles: MetadataRoute.Sitemap = en.news.records.map((article) => ({
    url: url("/news/" + article.slug + "/"),
    lastModified: article.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
