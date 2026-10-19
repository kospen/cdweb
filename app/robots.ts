import type { MetadataRoute } from "next";
import { PRODUCTION_SITE_URL } from "@/content/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: PRODUCTION_SITE_URL + "/sitemap.xml",
  };
}