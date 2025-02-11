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

async function refreshTokens(token: string) {
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

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  try {
    if (accessToken && isTokenExpired(accessToken) && refreshToken) {
      const newTokens = await refreshTokens(refreshToken);

      // 쿠키 설정
      const response = NextResponse.next();
      response.cookies.set("accessToken", newTokens.accessToken, cookieOptions);
      response.cookies.set(
        "refreshToken",
        newTokens.refreshToken,
        cookieOptions
      );

      return response;
    }
  } catch (err) {
    // console.log((err as Error).message);
    return NextResponse.next();
  }
}

// 모든 경로에 미들웨어 적용
export const config = {
  matcher: "/:path*",
};
