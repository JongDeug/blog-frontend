"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import dark from "../assets/dark.png";
import light from "../assets/light.png";
import { useState } from "react";

const navItems = {
  "/": {
    name: "메인",
  },
  "/blog": {
    name: "블로그",
  },
  "/it": {
    name: "기사",
  },
  "/auth": {
    name: "로그인",
  },
};

export function Navbar() {
  const { setTheme } = useTheme();
  const [themeColor, setThemeColor] = useState("light");

  const toggleTheme = () => {
    if (themeColor === "light") {
      setTheme("dark");
      setThemeColor("dark");
    } else {
      setTheme("light");
      setThemeColor("light");
    }
  };

  return (
    <aside className="-ml-[8px] mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="hover:text-green-300 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <button
            onClick={toggleTheme}
            className="w-fit border-0 cursor-pointer hover:ring mr-1"
          >
            {themeColor === "light" ? (
              <Image src={dark} alt="" className="w-8" />
            ) : (
              <Image src={light} alt="" className="w-8" />
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
}
