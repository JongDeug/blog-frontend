"use client";

import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getCookie, setCookie } from "cookies-next/client";
import { v4 as uuidv4 } from "uuid";

export const SessionContext = createContext<{
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLogin: false,
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

  useEffect(() => {
    // 로그인 info 설정 (cookie)
    const info = getCookie("info");
    if (info) setIsLogin(true);
    else setIsLogin(false);

    // guestId 설정 (localStorage => cookie)
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem("guestId", guestId);
    }
    setCookie("guestId", guestId, {
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SessionContext.Provider value={{ isLogin, setIsLogin }}>
        {children}
      </SessionContext.Provider>
    </ThemeProvider>
  );
}
