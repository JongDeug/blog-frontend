import { PostForm } from "../../../components/form/post-form";
import { getCategories } from "@/lib/fetch";

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

  const categories = await getCategories();

  return (
    <PostForm
      title="게시글 작성"
      initialValues={initialValues}
      categories={categories}
      method="create"
    />
  );
}
