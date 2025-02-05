import { env } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// login
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();

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
    return NextResponse.json(
      { message: tokensOrError.message },
      { status: tokensOrError.statusCode }
    );

  // 성공 시 쿠키에 저장
  const { accessToken, refreshToken, info } = tokensOrError;

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true, // O
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true, // O
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("info", JSON.stringify(info), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ message: "성공" });
}

// logout
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 백엔드 요청
  await fetch(`${env.API_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 실패든 성공이든 쿠키 초기화
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("info");

  return NextResponse.json({ message: "성공" });
}
