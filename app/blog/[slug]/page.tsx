import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Ellipsis, ThumbsUp } from "lucide-react";
import type { ViewerProps } from "@toast-ui/react-editor";
import ToastViewer from "@/components/viewer";
import CommentForm from "@/components/form/comment-form";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Comments from "@/components/comments";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // let post = getBlogPosts().find((post) => post.slug === params.slug);

  let post = {
    metadata: {
      title: "Mock Title",
      publishedAt: new Date().toLocaleDateString(),
    },
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, inventore architecto provident aut obcaecati veritatis unde nisi quia, consectetur cupiditate exercitationem ad aliquid quod suscipit fuga cum omnis! Ad, consectetur, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, inventore architecto provident aut obcaecati veritatis unde nisi quia, consectetur cupiditate exercitationem ad aliquid quod suscipit fuga cum omnis! Ad, consectetur, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, inventore architecto provident aut obcaecati veritatis unde nisi quia, consectetur cupiditate exercitationem ad aliquid quod suscipit fuga cum omnis! Ad, consectetur",
  };

  if (!post) {
    notFound();
  }

  const viewerProps: ViewerProps = {
    initialValue: "# content content content content",
  };

  return (
    <div>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="title font-semibold text-2xl tracking-tighter">
            {post.metadata.title}
          </h1>
          <Menubar className="border-0 shadow-none p-0">
            <MenubarMenu>
              <MenubarTrigger>
                <Ellipsis />
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem>게시글 수정</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="text-red-400">게시글 삭제</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.metadata.publishedAt}
          </p>
        </div>

        {/* <div className="prose"> */}
        <ToastViewer initialValue={post.content} />
        {/* </div> */}
        {/* <article className="prose h-[500px]">{post.content}</article> */}
      </section>

      <section className="flex justify-between py-3 border-t my-10">
        <Button variant="ghost" className="p-0">
          <ChevronLeft /> 이전
        </Button>
        <Button variant="outline">
          <ThumbsUp />
          <p>0</p>
        </Button>
        <Button variant="ghost" className="p-0">
          <ChevronRight /> 다음
        </Button>
      </section>

      <section className="space-y-5">
        <Comments />
        <CommentForm />
      </section>
    </div>
  );
}
