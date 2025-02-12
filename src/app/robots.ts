import { env } from "@/const/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/login/",
    },
    sitemap: `${env.URL}/sitemap.xml`,
  };
}
