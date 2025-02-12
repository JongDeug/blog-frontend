import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "./const/env";
import cookieOptions from "./lib/cookie-options";

function isTokenExpired(token: string) {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    // 만료 15초 전이라면 true
    return Date.now() >= decoded.exp! * 1000 - 15 * 1000;
  } catch {
    return true;
  }
}

async function refreshTokens(
  token: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await fetch(`${env.API_URL}/auth/token/refresh`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const tokensOrError = await response.json();

  if (!response.ok) {
    throw new Error(tokensOrError.message);
  }

  return tokensOrError;
}

const protectedRoutes = ["/blog/new", "/blog/edit"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // session 나중에 합치기
  const cookie = req.cookies.get("session")?.value ?? "null";
  const session = JSON.parse(cookie);

  if (isProtectedRoute && !session?.accessToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  try {
    if (session?.accessToken && isTokenExpired(session?.accessToken)) {
      const newTokens = await refreshTokens(session?.refreshToken);

      // 새 요청 및 쿠키 설정, 쿠키는 바로 반영되지 않음
      const response = NextResponse.next();
      response.cookies.set("session", JSON.stringify(newTokens), cookieOptions);

      // 다음 요청에 사용할 accessToken
      response.headers.set("x-new-access-token", newTokens.accessToken);

      return response;
    }
  } catch (err) {
    // console.log((err as Error).message);
    return NextResponse.next();
  }
}

// 특정 경로에 미들웨어 적용
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
