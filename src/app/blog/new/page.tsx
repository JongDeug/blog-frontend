import { env } from "@/const/env";
import { PostForm } from "../../../components/form/post-form";
import { Category } from "@/types";

export default async function Page() {
  const initialValues = {
    title: "",
    summary: "",
    category: "",
    content: "",
    prevId: 0,
    nextId: 0,
    draft: false,
  };

  const response = await fetch(`${env.API_URL}/category`);
  const categoriesOrError: Category[] = await response.json();

  if (!response.ok) {
    console.error(categoriesOrError);
    return <div>오류가 발생했습니다 ...</div>;
  }

  return (
    <PostForm
      title="게시글 작성"
      initialValues={initialValues}
      categories={categoriesOrError}
      method="create"
    />
  );
}
