import { env } from "@/const/env";
import { getPosts } from "@/lib/fetch";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const queryString = new URLSearchParams();
  queryString.append("take", "1000");

  const { posts } = await getPosts(queryString.toString());

  const postsUrls = posts.map((post) => ({
    url: `${env.URL}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: `${env.URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${env.URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...postsUrls];
}
