"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Ellipsis } from "lucide-react";
import { useSession } from "./hooks/use-session";
import { useRouter } from "next/navigation";
import { toast } from "./hooks/use-toast";
import Link from "next/link";

export default function PostMenu({ slug }: { slug: string }) {
  const { loginInfo } = useSession();
  const router = useRouter();

  const onClickDelete = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      const response = await fetch(`/api/next/post/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        return toast({
          variant: "destructive",
          title: "게시글 삭제 실패",
          description: `${error.message}.`,
        });
      }

      router.replace("/blog");
      router.refresh();
    }
  };

  return (
    <div>
      {loginInfo?.isLogin ? (
        <Menubar className="border-0 shadow-none p-0">
          <MenubarMenu>
            <MenubarTrigger>
              <Ellipsis />
            </MenubarTrigger>

            <MenubarContent>
              <MenubarItem asChild>
                <Link href={`/blog/edit/${slug}`}>게시글 수정</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-red-400" onClick={onClickDelete}>
                게시글 삭제
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <></>
      )}
    </div>
  );
}
