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
          <div className="flex flex-col md:flex-row md:h-[120px] space-x-0 md:space-x-5 p-2 hover:bg-neutral-50 hover:text-black rounded transition-all ">
            {/* 이미지 */}
            {post.images.length ? (
              <div className="relative w-full mb-2 md:mb-0 aspect-[16/9] md:w-[130px]">
                <Image
                  src={post.images[0].url}
                  alt="게시글 이미지"
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-fill rounded"
                ></Image>
              </div>
            ) : (
              <div className="relative mb-2 md:mb-0 w-full aspect-[16/9] md:w-[130px] flex border rounded bg-green-50 justify-center items-center">
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

              <div className="flex justify-between text-sm mt-3">
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
