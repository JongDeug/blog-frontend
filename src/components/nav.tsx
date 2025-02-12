"use client";

import { ToggleMode } from "./toggle-mode";
import Link from "next/link";
import LogoutBtn from "./logout-btn";
import { useSession } from "./hooks/use-session";
import { SearchBar } from "./searchbar";

const navItems = {
  "/": {
    name: "메인",
  },
  "/blog": {
    name: "블로그",
  },
  "/subscribe": {
    name: "구독",
  },
};

export default function Navbar() {
  const { loginInfo } = useSession();

  return (
    <nav className="-ml-[8px] mb-8 tracking-tight flex flex-col md:flex-row md:items-center gap-4 justify-between">
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

        {loginInfo?.isLogin ? (
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
      <div className="flex items-center gap-2">
        <SearchBar />
        <ToggleMode />
      </div>
    </nav>
  );
}
