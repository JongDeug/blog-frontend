import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
        Dev
      </h1>

      {/* 카테고리 섹션 */}
      <section className="flex flex-wrap gap-2 fade">
        {categories.map((category) => (
          <Badge key={category} variant="default">
            {category}
          </Badge>
        ))}
        <Badge variant="destructive" className="">
          +
        </Badge>
      </section>

      <section className="flex justify-end">
        <Select>
          <SelectTrigger className="w-[100px] ">
            <SelectValue placeholder="최신순" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastest">최신순</SelectItem>
            <SelectItem value="ordelest">오래된순</SelectItem>
            <SelectItem value="like">좋아요순</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </div>
  );
}
