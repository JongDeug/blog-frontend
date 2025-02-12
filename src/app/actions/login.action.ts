"use server";

import { env } from "@/const/env";
import { cookies } from "next/headers";
import cookieOptions from "@/lib/cookie-options";
import { LoginFormSchema } from "@/lib/schema";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function loginAction(_: any, formData: FormData) {
  const parse = LoginFormSchema.safeParse({
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
  const decoded = jwt.decode(tokensOrError.accessToken) as JwtPayload;
  const cookieStore = await cookies();

  cookieStore.set("session", JSON.stringify(tokensOrError), cookieOptions);
  cookieStore.set(
    "userInfo",
    JSON.stringify({ role: decoded.role, email: decoded.email })
  );

  return {
    status: true,
    error: "",
  };
}
