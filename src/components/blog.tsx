"use client";

import { SortSelect } from "@/components/sort-select";
import { BlogPosts } from "@/components/posts";
import CreatePostBtn from "@/components/create-post-btn";
import Categories from "@/components/categories";
import { Category, Posts } from "@/types";
import BreadCrumb from "./breadcrumb";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { delay } from "@/lib/utils";
import { getPosts } from "@/lib/fetch";

export default function Blog({
  postsData,
  categories,
  category,
}: {
  postsData: Posts;
  categories: Category[];
  category: string;
}) {
  const [blog, setBlog] = useState(postsData);
  const [ref, inView] = useInView();

  useEffect(() => {
    setBlog(postsData);
  }, [postsData]);

  useEffect(() => {
    if (inView && blog.cursor) {
      const cursorPagination = async () => {
        const queryString = new URLSearchParams();
        queryString.append("cursor", blog.cursor);
        queryString.append("take", "5");
        if (category) queryString.append("category", category);
        await delay(100);
        const data = await getPosts(queryString.toString());
        setBlog({ posts: [...blog.posts, ...data.posts], cursor: data.cursor });
      };

      cursorPagination();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-2 w-fit tracking-tighter items-center transition-all duration-200 hover:scale-105 hover:text-green-500">
        <h1 className="text-3xl font-bold">기록 보관소</h1>
      </section>

      <section>
        <BreadCrumb category={category} />
        {categories && <Categories categories={categories} />}
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <SortSelect />
          <CreatePostBtn />
        </div>

        <BlogPosts posts={blog.posts} />
      </section>

      <div ref={ref}></div>
    </div>
  );
}
