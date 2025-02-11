import { env } from "@/const/env";
import { Category, Post, Posts } from "@/types";

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

export async function getPost(
  slug: string,
  guestId: string | undefined,
  isEdit: boolean = false
): Promise<Post> {
  const queryString = new URLSearchParams();
  queryString.append("isEdit", isEdit ? "true" : "false");

  const response = await fetch(
    `${env.API_URL}/post/${slug}?${queryString.toString()}`,
    {
      headers: {
        Cookie: `guestId=${guestId};`,
      },
      next: { tags: ["post"] },
    }
  );
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${env.API_URL}/category`, {
    next: { tags: ["category"] },
  });
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}
