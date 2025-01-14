import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "블로그",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Dev</h1>
      <BlogPosts />
    </section>
  );
}
