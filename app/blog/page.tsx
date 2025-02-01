import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BlogPosts } from "@/components/posts";
import Link from "next/link";

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
];

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-semibold w-fit text-3xl tracking-tighter transition-all duration-200 hover:scale-110 hover:text-green-500">
        개발
      </h1>

      {/* 카테고리 섹션 */}
      <section className="flex flex-wrap gap-2 fade">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="hover:bg-green-300"
          >
            {category}
          </Badge>
        ))}
        <Badge variant="secondary" className="hover:bg-green-300">
          +
        </Badge>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger className="w-[100px] h-[30px] dark:border-neutral-600 border-neutral-300">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastest">최신순</SelectItem>
              <SelectItem value="ordelest">오래된순</SelectItem>
              <SelectItem value="like">좋아요순</SelectItem>
            </SelectContent>
          </Select>

          <Link
            href="/blog/new"
            className="w-[90px] h-[30px] shadow-sm border border-neutral-300 dark:border-neutral-600 rounded flex items-center justify-center text-sm"
          >
            게시글 작성
          </Link>
        </div>

        {/* 포스트 */}
        <BlogPosts />
      </section>
    </div>
  );
}
