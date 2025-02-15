"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("에러 발생:", error);
    console.error("에러 발생:", error.digest);
  }, [error]);

  return (
    <main className="flex h-[300px] flex-col gap-2 items-center justify-center">
      <h2 className="text-center text-lg font-semibold">
        문제가 발생했습니다!
      </h2>
      <p className="text-gray-600">
        페이지를 다시 시도하거나 잠시 후 다시 접속해 주세요.
      </p>
      <Button
        variant="destructive"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </Button>
    </main>
  );
}
