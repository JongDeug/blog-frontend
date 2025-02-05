import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
      info: {
        name: string;
        email: string;
        role: string;
      };
    };
    expires: string;
    error?: "RefreshTokenError";
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    info: {
      name: string;
      email: string;
      role: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    info: {
      name: string;
      email: string;
      role: string;
    };
    error?: "RefreshTokenError";
  }
}
