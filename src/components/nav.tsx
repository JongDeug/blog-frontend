"use client";

import { ToggleMode } from "./toggle-mode";
import Link from "next/link";
import LogoutBtn from "./logout-btn";
import { useSession } from "./hooks/use-session";

const navItems = {
  "/": {
    name: "메인",
  },
  "/blog": {
    name: "블로그",
  },
  // "/article": {
  //   name: "아티클",
  // },
};

export default function Navbar() {
  const { isLogin } = useSession();

  // useEffect(() => {
  //   console.log({ isLogin });
  // }, [isLogin]);

  return (
    <nav className="-ml-[8px] mb-8 tracking-tight flex items-center justify-between">
      <div>
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              key={path}
              href={path}
              className="py-1 px-3 transition-all duration-200 hover:text-green-300"
            >
              {name}
            </Link>
          );
        })}

        {isLogin ? (
          <LogoutBtn />
        ) : (
          <Link
            key="/login"
            href="/login"
            className="py-1 px-3 transition-all duration-200 hover:text-green-300"
          >
            로그인
          </Link>
        )}
      </div>
      <ToggleMode />
    </nav>
  );
}
