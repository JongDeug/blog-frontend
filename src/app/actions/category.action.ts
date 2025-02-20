"use server";

import { env } from "@/const/env";
import { CategoryFormSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createCategoryAction(_: any, formData: FormData) {
  const parse = CategoryFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    return {
      status: false,
      errors: parse.error.flatten().fieldErrors,
      error: "입력되지 않은 필드가 존재합니다.",
    };
  }

  const data = parse.data;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  // 백엔드 요청
  const response = await fetch(`${env.API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ ...data }),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: false,
      error: error.message,
    };
  }

  revalidateTag("category");

  return {
    status: true,
    error: "",
  };
}

export async function updateCategoryAction(_: any, formData: FormData) {
  const parse = CategoryFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
  });

  if (!parse.success) {
    return {
      status: false,
      errors: parse.error.flatten().fieldErrors,
      error: "입력되지 않은 필드가 존재합니다.",
    };
  }

  const data = parse.data;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  // 백엔드 요청
  const response = await fetch(`${env.API_URL}/category/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ name: data.name }),
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: false,
      error: error.message,
    };
  }

  revalidateTag("category");

  return {
    status: true,
    error: "",
  };
}

export async function deleteCategoryAction(_: any, formData: FormData) {
  const parse = CategoryFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!parse.success) {
    return {
      status: false,
      errors: parse.error.flatten().fieldErrors,
      error: "입력되지 않은 필드가 존재합니다.",
    };
  }

  const data = parse.data;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  // 백엔드 요청
  const response = await fetch(`${env.API_URL}/category/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: false,
      error: error.message,
    };
  }

  revalidateTag("category");

  return {
    status: true,
    error: "",
  };
}
