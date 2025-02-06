import Link from "next/link";
import Image from "next/image";
import icon from "@/assets/icon.png";
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
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 p-2 hover:bg-green-50 hover:text-black rounded transition-all h-[120px]">
            {/* <Image src={} alt="" width={110}></Image> */}
            {/* md 이하일 때 hidden */}
            <div className="border p-10 bg-gray-200 hidden md:block">Image</div>

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
