import { env } from "@/const/env";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  let accessToken = req.cookies.get("accessToken")?.value;

  // 재발급된 토큰 활용, 쿠키가 바로 반영되지 않는 api route에만 적용
  const newAccessToken = req.headers.get("x-new-access-token");
  if (newAccessToken) {
    accessToken = newAccessToken;
  }

  const response = await fetch(`${env.API_URL}/post/comment/user/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  revalidateTag("post");

  return NextResponse.json({ message: "성공" });
}
