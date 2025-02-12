import { env } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const cookie = req.cookies.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  // 재발급된 토큰 활용, 쿠키가 바로 반영되지 않는 api route에만 적용
  const newAccessToken = req.headers.get("x-new-access-token");
  if (newAccessToken) {
    session.accessToken = newAccessToken;
  }

  const response = await fetch(`${env.API_URL}/common/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: formData,
  });
  const resOrError = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: resOrError.message },
      { status: resOrError.statusCode }
    );
  }

  return NextResponse.json({ filename: resOrError.filename });
}
