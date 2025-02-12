"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function ToggleMode() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const onClick = async () => {
    setTheme(theme === "light" ? "dark" : "light");

    const arr = pathname.split("/blog/");
    if (arr.length > 1) {
      window.location.reload();
    }
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
