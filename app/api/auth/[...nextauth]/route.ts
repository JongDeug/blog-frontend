import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/const/env";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const base64Credentials = btoa(
            `${credentials?.email}:${credentials?.password}`
          );

          const res = await fetch(`${env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${base64Credentials}`,
            },
            // credentials: "include",
          });

          if (!res.ok) {
            const error = await res.json();
            console.error("Login failed: ", error);
            return null;
          }

          const cookies = res.headers.get("set-cookie");
          // JWT는 쿠키에서 추출
          console.log(cookies);

          return {
            id: "1",
            email: credentials?.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }: { token: JWT; user: any }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: JWT }) {
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.email = token.email;
  //     }
  //     return session;
  //   },
  // },
  pages: {
    signIn: "/auth",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
