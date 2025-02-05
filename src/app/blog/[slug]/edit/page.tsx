import { env } from "@/const/env";
import { PostForm } from "@/components/form/post-form";
import { Category, Post } from "@/types";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId");

  const getPost = await fetch(`${env.API_URL}/post/${slug}`, {
    headers: {
      Cookie: `${guestId?.name}=${guestId?.value};`,
    },
  });
  const postOrError: Post = await getPost.json();

  if (!getPost.ok) {
    console.error(postOrError);
    return <div>오류가 발생했습니다 ...</div>;
  }

  const initialValues = {
    title: postOrError.title,
    summary: postOrError.summary,
    category: postOrError.category.name,
    content: postOrError.content,
    prevId: postOrError.prevId,
    nextId: postOrError.nextId,
    draft: postOrError.draft,
  };

  const getCategories = await fetch(`${env.API_URL}/category`);
  const categoriesOrError: Category[] = await getCategories.json();

  if (!getCategories.ok) {
    console.error(categoriesOrError);
    return <div>오류가 발생했습니다 ...</div>;
  }

  const categories = categoriesOrError.map(({ name }) => ({
    value: name,
    label: name,
  }));

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
