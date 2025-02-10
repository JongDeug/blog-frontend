"use client";

import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getCookie, setCookie } from "cookies-next/client";
import { v4 as uuidv4 } from "uuid";

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

export const SessionContext = createContext<{
  isLogin: boolean;
  userInfo: UserInfo | null;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLogin: false,
  userInfo: null,
  setIsLogin: () => {},
});

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 로그인 info 설정 (cookie)
    const info = getCookie("info");
    if (info) {
      setIsLogin(true);
      setUserInfo(JSON.parse(info));
    } else {
      setIsLogin(false);
      setUserInfo(null);
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
  }, [isLogin]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SessionContext.Provider value={{ isLogin, userInfo, setIsLogin }}>
        {children}
      </SessionContext.Provider>
    </ThemeProvider>
  );
}
