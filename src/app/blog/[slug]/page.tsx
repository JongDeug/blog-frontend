import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import ToastViewer from "@/components/viewer";
import CommentForm from "@/components/form/comment-form";

import Comments from "@/components/comments";
import { env } from "@/const/env";
import { cookies, headers } from "next/headers";
import { Post } from "@/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import PostMenu from "@/components/post-menu";
import Link from "next/link";
import PostLike from "@/components/ui/post-like";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId");

  const response = await fetch(`${env.API_URL}/post/${slug}`, {
    headers: {
      Cookie: `${guestId?.name}=${guestId?.value};`,
    },
  });
  const post: Post = await response.json();

  if (!response.ok) {
    console.error(post);
    return <div>오류가 발생했습니다 ...</div>;
  }
  // if (response.ok) notFound();

  return (
    <div>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="title font-semibold text-2xl tracking-tighter">
            {post.title}
          </h1>

          <PostMenu slug={slug} />
        </div>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {format(post.createdAt, "PPP EEE p", { locale: ko })}
          </p>
        </div>

        <div className="mb-12">
          <ToastViewer initialValue={post.content} />
        </div>
      </section>

      <section className="flex justify-between py-3 border-t my-2 items-center">
        {post.prevId ? (
          <Link
            href={`/blog/${post.prevId}`}
            className="flex items-center p-2 text-sm"
          >
            <ChevronLeft width={20} height={20} /> 이전
          </Link>
        ) : null}

        {post.nextId ? (
          <Link
            href={`/blog/${post.nextId}`}
            className="flex items-center p-2 text-sm"
          >
            다음 <ChevronRight width={20} height={20} />
          </Link>
        ) : null}
      </section>

      <section className="space-y-5">
        <div className="flex justify-center">
          <PostLike likes={post.likes} postId={slug} />
        </div>
        <Comments />
        <CommentForm />
      </section>
    </div>
  );
}
