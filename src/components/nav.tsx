"use client";

import { ToggleMode } from "./toggle-mode";
import Link from "next/link";
import LogoutBtn from "./logout-btn";
import { useSession } from "./hooks/use-session";
import { CommandMenu } from "./command";
import { Button } from "./ui/button";
import { Command } from "lucide-react";

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

        <CommandMenu />

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
      <div>
        <Button variant="secondary">
          검색 <Command /> K
        </Button>
        <ToggleMode />
      </div>
    </nav>
  );
}
