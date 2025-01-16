import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-2"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4 border-1 rounded p-2">
              <div className="border p-10 bg-gray-300">Image</div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="tracking-tight">{post.metadata.title}</p>
                  <p className="tracking-tight">요약</p>
                </div>
                <p className="tabular-nums">
                  조회수, 좋아요
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
