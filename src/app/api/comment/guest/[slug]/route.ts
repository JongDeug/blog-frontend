import { env } from "@/const/env";
import { ReceiptPoundSterling } from "lucide-react";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const data = await req.json();
  const guestId = req.cookies.get("guestId")?.value;
  const { slug } = await params;

  const response = await fetch(`${env.API_URL}/post/comment/guest/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `guestId=${guestId};`,
    },
    body: JSON.stringify({ ...data }),
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
