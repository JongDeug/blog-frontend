import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const navItems = {
  "/": {
    name: "메인",
  },
  "/blog": {
    name: "블로그",
  },
  "/article": {
    name: "기사",
  },
  "/auth": {
    name: "로그인",
  },
};

export default function Navbar() {
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
      </div>
      <ModeToggle />
    </nav>
  );
}
