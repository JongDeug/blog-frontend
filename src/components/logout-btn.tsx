"use client";

import { useSession } from "./hooks/use-session";

export default function LogoutBtn() {
  const { setIsLogin } = useSession();

  const onClick = async () => {
    const response = await fetch("/api/auth/logout");
    if (response.ok) setIsLogin(false);
  };

  return (
    <button
      onClick={onClick}
      className="py-1 px-3 transition-all duration-200 hover:text-red-300"
    >
      로그아웃
    </button>
  );
}
