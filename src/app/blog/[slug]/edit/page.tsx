import { PostForm } from "@/components/form/post-form";
import { getCategories, getPost } from "@/lib/fetch";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  const post = await getPost(slug, guestId, true);
  const categories = await getCategories();

  const initialValues = {
    title: post.title,
    summary: post.summary,
    category: post.category.name,
    content: post.content,
    prevId: post.prevId,
    nextId: post.nextId,
    draft: post.draft,
  };

  return (
    <PostForm
      title="게시글 수정"
      initialValues={initialValues}
      categories={categories}
      method="update"
      postId={slug}
    />
  );
}
