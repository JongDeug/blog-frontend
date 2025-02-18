"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "./hooks/use-session";

export function SortSelect() {
  const [value, setValue] = useState("latest");
  const { loginInfo } = useSession();
  const router = useRouter();

  const handleChange = (value: string) => {
    setValue(value);
    const params = new URLSearchParams();
    params.set("sort", value);
    router.replace(`/blog?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={handleChange} value={value}>
      <SelectTrigger className="w-[100px] h-[30px] dark:border-neutral-600 border-neutral-300">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="oldest">오래된순</SelectItem>
        <SelectItem value="likes">좋아요순</SelectItem>
        <SelectItem value="views">조회순</SelectItem>
        {loginInfo?.isLogin && loginInfo.role === "ADMIN" ? (
          <SelectItem value="draft">임시저장</SelectItem>
        ) : null}
      </SelectContent>
    </Select>
  );
}
