import { env } from "@/const/env";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const accessToken = req.cookies.get("accessToken")?.value;

  const response = await fetch(`${env.API_URL}/post/${slug}`, {
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

  revalidateTag("posts");

  return NextResponse.json({ message: "성공" });
}
