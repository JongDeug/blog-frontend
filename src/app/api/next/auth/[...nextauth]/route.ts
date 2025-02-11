import { env } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
