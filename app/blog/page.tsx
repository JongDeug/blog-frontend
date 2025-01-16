import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "블로그",
  description: "Read my blog.",
};

// 임시 카테고리 데이터
const categories = [
  "All",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Database",
  "DevOps",
  "AWS",
  "알고리즘",
  "All",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Database",
  "DevOps",
  "AWS",
  "알고리즘",
  "All",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Database",
  "DevOps",
  "AWS",
  "알고리즘",
];

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold w-fit text-3xl mb-8 tracking-tighter transition-all duration-200 hover:scale-110 hover:text-green-500">
        Dev
      </h1>
      {/* 카테고리 섹션 */}
      <div className="flex flex-wrap gap-2 pb-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-1.5 text-sm rounded-full whitespace-nowrap bg-gray-300  text-slate-700 hover:bg-green-200 transition-all duration-200"
          >
            {category}
          </button>
        ))}
      </div>
      {/* 정렬 */}
      <div className="flex justify-end">
        <select name="" id="" className="border-0 p-1 mb-1">
          <option value="">최신순</option>
          <option value="">오래된순</option>
          <option value="">좋아요순</option>
        </select>
      </div>
      <BlogPosts />
    </section>
  );
}
