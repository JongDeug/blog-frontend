import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import type { EditorProps, ViewerProps } from "@toast-ui/react-editor";
import ToastViewer from "@/components/viewer";

export default async function Blog({
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
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.publishedAt}
        </p>
      </div>

      {/* <div className="prose"> */}
      <ToastViewer initialValue={post.content} />
      {/* </div> */}
      {/* <article className="prose h-[500px]">{post.content}</article> */}

      <Button variant="outline">
        <ThumbsUp />
        <p>0</p>
      </Button>
    </section>
  );
}
