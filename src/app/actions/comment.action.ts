"use server";

import { UserCommentFormSchema } from "@/lib/schema";
import { env } from "@/const/env";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function userCommentAction(_: any, formData: FormData) {
  const parse = UserCommentFormSchema.safeParse({
    content: formData.get("content"),
    postId: formData.get("postId"),
    parentCommentId: formData.get("parentCommentId") ?? undefined,
  });

  if (!parse.success) {
    return {
      status: false,
      errors: parse.error.flatten().fieldErrors,
      error: "입력되지 않은 필드가 존재합니다",
    };
  }

  const data = parse.data;

  // 백엔드 요청
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${env.API_URL}/post/comment/user`, {
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
      error: resOrError.message,
    };
  }

  revalidateTag("post");

  return {
    status: true,
    error: "",
  };
}
