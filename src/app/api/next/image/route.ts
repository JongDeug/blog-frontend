import { env } from "@/const/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${env.API_URL}/common/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
