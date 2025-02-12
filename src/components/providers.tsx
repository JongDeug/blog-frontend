"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getCookie, setCookie } from "cookies-next/client";
import { v4 as uuidv4 } from "uuid";

interface LoginInfo {
  isLogin: boolean;
  role: string;
  email: string;
}

export const SessionContext = createContext<{
  loginInfo: LoginInfo | null;
  setLoginInfo: Dispatch<SetStateAction<LoginInfo | null>>;
}>({
  loginInfo: null,
  setLoginInfo: () => {},
});

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [loginInfo, setLoginInfo] = useState<{
    isLogin: boolean;
    role: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const cookie = getCookie("userInfo") ?? "null";
    const userInfo = JSON.parse(cookie);

    if (userInfo) {
      setLoginInfo({
        isLogin: true,
        role: userInfo.role,
        email: userInfo.email,
      });
    } else {
      setLoginInfo({
        isLogin: false,
        role: "",
        email: "",
      });
    }

    // guestId 설정 (localStorage => cookie)
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem("guestId", guestId);
    }
    setCookie("guestId", guestId, {
      // sameSite: "strict",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }, [loginInfo?.isLogin]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SessionContext.Provider value={{ loginInfo, setLoginInfo }}>
        {children}
      </SessionContext.Provider>
    </ThemeProvider>
  );
}
