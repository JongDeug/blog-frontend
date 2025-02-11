"use client";

import { useRouter } from "next/navigation";
import { useSession } from "./hooks/use-session";
import { toast } from "./hooks/use-toast";

export default function LogoutBtn() {
  const { setIsLogin } = useSession();
  const router = useRouter();

  const onClick = async () => {
    const response = await fetch("/api/next/auth/logout");
    if (response.ok) {
      setIsLogin(false);
      toast({
        variant: "default",
        title: "로그아웃 완료",
        description: "로그아웃을 완료했습니다.",
      });
    }

    router.refresh();
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
