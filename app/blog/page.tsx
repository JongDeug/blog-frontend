import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "블로그",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold w-fit text-3xl mb-8 tracking-tighter transition-all duration-200 hover:scale-105 hover:text-green-500">
        Dev
      </h1>
      <BlogPosts />
    </section>
  );
}
