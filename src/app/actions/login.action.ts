"use server";

import { env } from "@/const/env";
import { FormSchema } from "../login/schema";
import { cookies } from "next/headers";
import cookieOptions from "@/lib/cookie-options";

export async function loginAction(_: any, formData: FormData) {
  const parse = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      status: false,
      error: "유효하지 않는 입력입니다",
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;
  const email = data.email;
  const password = data.password;

  // 백엔드 요청
  const base64Credentials = btoa(`${email}:${password}`);
  const response = await fetch(`${env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64Credentials}`,
    },
  });
  const tokensOrError = await response.json();

  // 실패 시 에러 처리
  if (!response.ok)
    return {
      status: false,
      error: tokensOrError.message,
    };

  // 성공 시 쿠키에 저장
  const { accessToken, refreshToken, info } = tokensOrError;
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, cookieOptions);
  cookieStore.set("refreshToken", refreshToken, cookieOptions);

  cookieStore.set("info", JSON.stringify(info), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return {
    status: true,
    error: "",
  };
}
