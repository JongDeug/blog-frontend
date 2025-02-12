"use client";

import Link from "next/link";
import { useSession } from "./hooks/use-session";

export default function CreatePostBtn() {
  const { loginInfo } = useSession();
  return (
    <div>
      {loginInfo?.isLogin ? (
        <Link
          href="/blog/new"
          className="w-[90px] h-[30px] shadow-sm border border-neutral-300 dark:border-neutral-600 rounded flex items-center justify-center text-sm"
        >
          게시글 작성
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
