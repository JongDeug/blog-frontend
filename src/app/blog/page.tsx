import Blog from "@/components/blog";
import { env } from "../../const/env";
import { Category, Posts } from "@/types";

export async function getPosts(query: string): Promise<Posts> {
  const response = await fetch(`${env.API_URL}/post?${query}`, {
    next: { tags: ["posts"], revalidate: 20 },
  });
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${env.API_URL}/category`, {
    next: { tags: ["category"] },
  });
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string }>;
}) {
  const { category, sort } = await searchParams;
  const queryString = new URLSearchParams();

  queryString.append("take", "10");
  if (category) queryString.append("category", category);
  if (sort) {
    if (sort === "oldest") queryString.append("order[]", "id_asc");
    else if (sort === "latest") queryString.append("order[]", "id_desc");
    else if (sort === "like")
      ["likes_desc", "id_desc"].map((v) => queryString.append("order[]", v));
    else ["views_desc", "id_desc"].map((v) => queryString.append("order[]", v));
  }

  const postsData = await getPosts(queryString.toString());
  const categories = await getCategories();

  return (
    <Blog postsData={postsData} categories={categories} category={category} />
  );
}
