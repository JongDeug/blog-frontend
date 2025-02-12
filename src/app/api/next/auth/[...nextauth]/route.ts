import { env } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// logout
export async function GET(req: NextRequest) {
  let accessToken = req.cookies.get("accessToken")?.value;

  // 재발급된 토큰 활용, 쿠키가 바로 반영되지 않는 api route에만 적용
  const newAccessToken = req.headers.get("x-new-access-token");
  if (newAccessToken) {
    accessToken = newAccessToken;
  }

  // 백엔드 요청
  await fetch(`${env.API_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 실패든 성공이든 쿠키 초기화
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("info");

  return NextResponse.json({ message: "성공" });
}
