"use server";

import { cookies } from "next/headers";
import { FormSchema } from "../blog/new/schema";
import { env } from "@/const/env";
import { revalidateTag } from "next/cache";
import { delay } from "@/lib/delay";

export async function postAction(_: any, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const postId = formData.get("postId")?.toString();

  await delay(3000);

  const parse = FormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    category: formData.get("category"),
    content: formData.get("content"),
    prevId: formData.get("prevId"),
    nextId: formData.get("nextId"),
    draft: formData.get("draft") === "true",
  });

  if (!parse.success) {
    return {
      status: false,
      error: "입력하지 않은 필드가 있습니다",
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  // 백엔드 수정 요청
  if (postId) {
    const response = await fetch(`${env.API_URL}/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        status: false,
        error: `${error.message}`,
      };
    }
  }
  // 백엔드 생성 요청
  else {
    const response = await fetch(`${env.API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        status: false,
        error: `${error.message}`,
      };
    }
  }

  revalidateTag("posts");

  return {
    status: true,
    error: "",
  };
}
