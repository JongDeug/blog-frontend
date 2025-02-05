import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BlogPosts } from "@/components/posts";
import { env } from "../../const/env";
// import { Categories } from "@/components/categories";
import CreatePostBtn from "@/components/create-post-btn";
import { CategoriesInner } from "@/components/categories";
import Image from "next/image";
import logo from "@/assets/icon.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Posts } from "@/types";

async function Categories() {
  const response = await fetch(`${env.API_URL}/category`);

  const categoriesOrError = await response.json();
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  return <CategoriesInner categories={categoriesOrError} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  const queryString = new URLSearchParams();
  if (category) queryString.append("category", category);

  const response = await fetch(
    `${env.API_URL}/post?${queryString.toString()}`,
    {
      next: { tags: ["posts"], revalidate: 20 },
    }
  );
  const postsOrError: Posts = await response.json();

  if (!response.ok) {
    console.log(postsOrError);
    return <div>오류가 발생했습니다 ...</div>;
  }

  const { posts } = postsOrError;

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-2 w-fit tracking-tighter items-center transition-all duration-200 hover:scale-105 hover:text-green-500">
        <h1 className="text-3xl font-bold">기록 보관소</h1>
      </section>

      <Categories />

      <section className="flex flex-col gap-2">
        <Breadcrumb className="pb-2 mb-2 ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">블로그</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {category ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">모든 게시글</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>모든 게시글</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger className="w-[100px] h-[30px] dark:border-neutral-600 border-neutral-300">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastest">최신순</SelectItem>
              <SelectItem value="ordelest">오래된순</SelectItem>
              <SelectItem value="like">좋아요순</SelectItem>
            </SelectContent>
          </Select>

          <CreatePostBtn />
        </div>

        {/* 포스트 */}
        <BlogPosts posts={posts} />
      </section>
    </div>
  );
}
