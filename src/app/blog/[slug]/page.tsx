import { ChevronLeft, ChevronRight } from "lucide-react";
import ToastViewer from "@/components/viewer";
import Comments from "@/components/comments";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import PostMenu from "@/components/post-menu";
import Link from "next/link";
import PostLike from "@/components/ui/post-like";
import { getPost } from "@/lib/fetch";
import { env } from "@/const/env";
import { CommentForm } from "@/components/form/comment-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug, "mock-guestId", true);

  return {
    title: `${post.title} - 종득 블로그`,
    description: `${post.summary}`,
    openGraph: {
      title: `${post.title} - 종득 블로그`,
      description: `${post.summary}`,
      url: `${env.URL}/blog/${slug}`,
      siteName: "종득 블로그",
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  const post = await getPost(slug, guestId);

  return (
    <div>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="title font-semibold text-3xl tracking-tighter">
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
        <div className="flex-1">
          {post.prevId ? (
            <Link
              href={`/blog/${post.prevId}`}
              className="flex items-center p-2 text-sm"
            >
              <ChevronLeft width={20} height={20} /> 이전
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {post.nextId ? (
            <Link
              href={`/blog/${post.nextId}`}
              className="flex items-center p-2 text-sm"
            >
              다음 <ChevronRight width={20} height={20} />
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex justify-center">
          <PostLike likes={post.likes} postId={slug} isLiked={post.isLiked} />
        </div>
        <Comments comments={post.comments} guestId={guestId} />
        <CommentForm slug={slug} />
      </section>
    </div>
  );
}
