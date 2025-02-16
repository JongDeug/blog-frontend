import { env } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  // 재발급된 토큰 활용, 쿠키가 바로 반영되지 않는 api route에만 적용
  const newAccessToken = req.headers.get("x-new-access-token");
  if (newAccessToken) {
    session.accessToken = newAccessToken;
  }

  // 백엔드 요청
  await fetch(`${env.API_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  // 실패든 성공이든 쿠키 초기화
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("userInfo");

  return NextResponse.json({ message: "성공" });
}
