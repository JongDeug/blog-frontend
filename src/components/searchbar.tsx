import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { getPosts } from "@/lib/fetch";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) return;

    // 300ms 후 API 요청
    const fetchData = setTimeout(async () => {
      const queryString = new URLSearchParams();
      queryString.append("search", searchQuery);

      const data = await getPosts(queryString.toString());
      setPosts([...data.posts]);
    }, 300);

    // 클린업 함수
    // 새로운 searchQuery 값이 들어오면, 이전 useEffect의 클린업 함수가 실행되기 때문에 기존 타이머 취소
    return () => clearTimeout(fetchData);
  }, [searchQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        variant="secondary"
        className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black"
      >
        게시글을 검색해보세요...
        <span className="bg-white text-black rounded font-bold px-1">
          CtrlK
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="제목 및 내용을 검색해보세요..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {posts && posts.length > 0 ? (
            <div className="p-2">
              <h4 className="text-xs text-neutral-600 ml-2 mb-2">검색 내용</h4>
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="hover:bg-neutral-100 p-2 rounded"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/blog/${post.id}`);
                  }}
                >
                  {post.title}
                </div>
              ))}
            </div>
          ) : (
            <CommandEmpty>검색 결과를 찾을 수 없습니다.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
