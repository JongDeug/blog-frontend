"use server";

import { GuestCommentFormSchema, UserCommentFormSchema } from "@/lib/schema";
import { env } from "@/const/env";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function userCommentAction(_: any, formData: FormData) {
  const commentId = formData.get("commentId")?.toString();

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

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 백엔드 수정 요청
  if (commentId) {
    const response = await fetch(
      `${env.API_URL}/post/comment/user/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: data.content }),
      }
    );
    const resOrError = await response.json();

    if (!response.ok) {
      return {
        status: false,
        error: resOrError.message,
      };
    }
  }
  // 백엔드 생성 요청
  else {
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
  }

  revalidateTag("post");

  return {
    status: true,
    error: "",
  };
}

export async function guestCommentAction(_: any, formData: FormData) {
  // 수정 시 사용
  const commentId = formData.get("commentId")?.toString();

  const parse = GuestCommentFormSchema.safeParse({
    content: formData.get("content"),
    email: formData.get("email") ?? "mock@gmail.com",
    password: formData.get("password"),
    postId: formData.get("postId"),
    parentCommentId: formData.get("parentCommentId") ?? undefined,
  });

  if (!parse.success) {
    return {
      status: false,
      error: "입력되지 않은 필드가 존재합니다",
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  // 백엔드 수정 요청
  if (commentId) {
    const response = await fetch(
      `${env.API_URL}/post/comment/guest/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `guestId=${guestId}`,
        },
        body: JSON.stringify({
          content: data.content,
          password: data.password,
        }),
      }
    );

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
    const response = await fetch(`${env.API_URL}/post/comment/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `guestId=${guestId}`,
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
  }

  revalidateTag("post");

  return {
    status: true,
    error: "",
  };
}
