import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Ellipsis, ThumbsUp } from "lucide-react";
import type { ViewerProps } from "@toast-ui/react-editor";
import ToastViewer from "@/components/viewer";
import { TextareaForm } from "@/components/comment";
import { ko } from "date-fns/locale";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Comment {
  id: string;
  author: {
    name: string;
    image?: string;
  };
  content: string;
  createdAt: Date;
}

function CommentSection() {
  const comments: Comment[] = [
    {
      id: "1",
      author: {
        name: "익명",
        image: "https://github.com/shadcn.png",
      },
      content: "Great post! Thanks for sharing.",
      createdAt: new Date(),
    },
    {
      id: "2",
      author: {
        name: "익명",
        image: "https://github.com/shadcn.png",
      },
      content: "Great post! Thanks for sharing.",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.author.image} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-neutral-500">
                  {format(comment.createdAt, "PPP", { locale: ko })}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  수정
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  삭제
                </Button>
              </div>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300">
              {comment.content}
            </p>

            <Button variant="ghost" size="sm" className="text-neutral-500">
              답글
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

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

      <section className="flex justify-center my-10">
        <Button variant="outline">
          <ThumbsUp />
          <p>0</p>
        </Button>
      </section>

      <section className="space-y-5">
        <CommentSection />
        <TextareaForm />
      </section>
    </div>
  );
}
