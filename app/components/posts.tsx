import Link from "next/link";

const mockBlogs = [
  {
    slug: "1",
    title: "Never coming the perfect time",
    publishedAt: new Date(),
  },
  {
    slug: "2",
    title: "I'm king. monkey spanner",
    publishedAt: new Date(),
  },
  {
    slug: "3",
    title: "I header about it",
    publishedAt: new Date(),
  },
];

export function BlogPosts() {
  return (
    <div>
      {mockBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col mb-2 border rounded tracking-tight border-neutral-400 dark:border-neutral-600"
          href={`/blog/${post.slug}`}
        >
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 p-2">
            <div className="border p-10 bg-gray-200">Image</div>

            <div className="flex flex-col flex-1 justify-between">
              <div>
                <p className="">{post.title}</p>
                <p className="">요약</p>
              </div>
              <p className="tabular-nums">
                조회수, 좋아요 | {post.publishedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
