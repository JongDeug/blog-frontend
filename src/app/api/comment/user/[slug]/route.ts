import { env } from "@/const/env";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { slug } = await params;

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
