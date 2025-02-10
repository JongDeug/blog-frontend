"use server";

import { cookies } from "next/headers";
import { env } from "@/const/env";
import { revalidateTag } from "next/cache";
import { PostFormSchema } from "@/lib/schema";

export async function postCreateAction(_: any, formData: FormData) {
  const parse = PostFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    category: formData.get("category"),
    content: formData.get("content"),
    prevId: formData.get("prevId"),
    nextId: formData.get("nextId"),
    draft: formData.get("draft"),
    images: formData.get("images") ?? undefined,
  });

  if (!parse.success) {
    return {
      status: false,
      error: "입력하지 않은 필드가 있습니다",
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 백엔드 요청
  const response = await fetch(`${env.API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ...data }),
  });
  const resOrError = await response.json();

  if (!response.ok) {
    return {
      status: false,
      error: `${resOrError.message}`,
    };
  }

  revalidateTag("posts");

  return {
    status: true,
    error: "",
    postId: resOrError,
  };
}

export async function postUpdateAction(_: any, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const postId = formData.get("postId")?.toString();

  const parse = PostFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    category: formData.get("category"),
    content: formData.get("content"),
    prevId: formData.get("prevId"),
    nextId: formData.get("nextId"),
    draft: formData.get("draft"),
    images: formData.get("images") ?? undefined,
  });

  if (!parse.success) {
    return {
      status: false,
      error: "입력하지 않은 필드가 있습니다",
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  // 백엔드 요청
  const response = await fetch(`${env.API_URL}/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ...data }),
  });
  const resOrError = await response.json();

  if (!response.ok) {
    return {
      status: false,
      error: `${resOrError.message}`,
    };
  }

  revalidateTag("posts");

  return {
    status: true,
    error: "",
    postId: resOrError,
  };
}
