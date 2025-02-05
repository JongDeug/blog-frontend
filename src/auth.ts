// import CredentialsProvider from "next-auth/providers/credentials";
// import { env } from "./const/env";
// import { cache } from "react";
// import { JwtPayload } from "jsonwebtoken";
// import jwt from "jsonwebtoken";
// import { getServerSession } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import { AuthOptions } from "next-auth";

// async function rotateToken(token: JWT) {
//   try {
//     const res = await fetch(`${env.API_URL}/auth/token/refresh`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token.refreshToken}`,
//       },
//     });

//     const tokensOrError = await res.json();
//     if (!res.ok) throw new Error(tokensOrError.message);
//     console.log("새로 발급된", tokensOrError);

//     return {
//       ...token,
//       ...tokensOrError,
//       expiresAt: (jwt.decode(tokensOrError.accessToken) as JwtPayload).exp!,
//       error: undefined,
//     };
//   } catch (error) {
//     console.error("토큰 재발급 실패: ", error);
//     return { ...token, error: "RefreshTokenError" };
//   }
// }

// const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         try {
//           const base64Credentials = btoa(
//             `${credentials?.email}:${credentials?.password}`
//           );

//           console.log("==== Authorize 로그인 ====");

//           const res = await fetch(`${env.API_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Basic ${base64Credentials}`,
//             },
//           });

//           const userOrError = await res.json();
//           if (!res.ok) throw new Error(userOrError.message);
//           return userOrError;
//         } catch (error) {
//           console.error("로그인 에러:", error);
//           throw new Error((error as Error).message);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         console.log("==== JWT 최초 ====");
//         return {
//           ...user,
//           expiresAt: (jwt.decode(user.accessToken) as JwtPayload).exp!,
//         };
//       } else if (Date.now() < token.expiresAt * 1000) {
//         console.log("==== JWT 유효 ====");
//         return token;
//       } else {
//         console.log("==== JWT 만료 및 재발급 ====");
//         console.log("jwt", token);
//         return rotateToken(token);
//       }
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       console.log("==== Session 업데이트 ====");

//       if (token.error) {
//         // 토큰 에러가 있을 경우 세션에도 에러 표시
//         console.log("=== 세션에서 에러 받음 ===");
//         return { ...session, error: token.error };
//       }

//       if (session.user) {
//         session.user.accessToken = token.accessToken;
//         session.user.expiresAt = token.expiresAt;
//         session.user.info = { ...token.info };
//       }
//       return session;
//     },
//   },
//   // 커스텀 페이지 사용, 설정하지 않았으면 기본 적용
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// /**
//  * Helper Function
//  */
// const getSession = cache(() => getServerSession(authOptions));

// export { authOptions, getSession };
