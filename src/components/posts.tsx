import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Eye, Heart } from "lucide-react";

export function BlogPosts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.id}
          className="block border-b tracking-tight border-neutral-300 dark:border-neutral-600"
          href={`/blog/${post.id}`}
        >
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 p-2 hover:bg-neutral-50 hover:text-black rounded transition-all h-[120px]">
            {/* md 이하일 때 hidden */}
            {post.images.length ? (
              <div className="relative w-[130px] h-auto">
                <Image
                  src={post.images[0].url}
                  alt="게시글 이미지"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="hidden md:block rounded"
                ></Image>
              </div>
            ) : (
              <div className="hidden md:flex border rounded bg-green-50 w-[130px] justify-center items-center">
                <span className="text-neutral-500 text-sm">이미지</span>
              </div>
            )}

            <div className="flex flex-col flex-1 justify-between">
              <div>
                <p className="font-bold line-clamp-1">{post.title}</p>
                <p className="line-clamp-2 overflow-hidden text-sm">
                  {post.summary}
                </p>
              </div>

              <div className="flex justify-between text-sm ">
                {format(new Date(post.createdAt), "yyyy년 MM월 dd일 HH시", {
                  locale: ko,
                })}
                <div className="flex gap-2">
                  <span>
                    <Eye width={20} height={20} className="inline" />{" "}
                    {post.views}
                  </span>
                  <span>
                    <Heart width={20} height={20} className="inline" />{" "}
                    {post.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
