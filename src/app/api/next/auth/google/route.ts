import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/const/env";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  if (!session?.accessToken)
    return NextResponse.json({ message: "구글 로그인 오류" }, { status: 500 });

  const cookieStore = await cookies();
  const decoded = jwt.decode(session.accessToken) as JwtPayload;

  cookieStore.set(
    "userInfo",
    JSON.stringify({ role: decoded.role, email: decoded.email })
  );

  return NextResponse.redirect(`${env.URL}/blog`);
}
