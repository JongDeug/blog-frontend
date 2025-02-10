"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/const/env";
import { ThumbsUp } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";

export default function PostLike({
  likes,
  postId,
  isLiked,
}: {
  likes: number;
  postId: string;
  isLiked: boolean;
}) {
  const router = useRouter();

  const onClick = async () => {
    const response = await fetch(`${env.API_URL}/post/like/${postId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      return toast({
        variant: "destructive",
        title: "좋아요 API 오류",
        description: `${error.message}`,
      });
    }

    // re-rendering Server Components.
    router.refresh();
  };

  return (
    <div>
      {isLiked ? (
        <Button variant="destructive" onClick={onClick}>
          <ThumbsUp />
          <p>{likes}</p>
        </Button>
      ) : (
        <Button variant="outline" onClick={onClick}>
          <ThumbsUp />
          <p>{likes}</p>
        </Button>
      )}
    </div>
  );
}
