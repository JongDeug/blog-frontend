import { env } from "@/const/env";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import RSSBadges from "@/components/rss-badges";
import { rssList } from "@/lib/rss-list";

async function getRSSPosts(queryString: string) {
  const response = await fetch(`${env.API_URL}/common/feed?${queryString}`);
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.error);
  }

  return resOrError;
}

export default async function RSSFeed({
  searchParams,
}: {
  searchParams: Promise<{ url: string }>;
}) {
  let { url } = await searchParams;
  if (!url) url = rssList[0]?.url;

  const queryString = new URLSearchParams();
  queryString.append("url", url);

  const posts = await getRSSPosts(queryString.toString());
  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-2 w-fit tracking-tighter items-center transition-all duration-200 hover:scale-105 hover:text-green-500">
        <h1 className="text-3xl font-bold">RSS 구독</h1>
      </section>

      <RSSBadges />

      <section>
        <ul className="space-y-4">
          {posts.map(
            (
              post: {
                title: string;
                link: string;
                pubDate: string;
                source: string;
              },
              index: number
            ) => (
              <li key={index} className="border-b pb-2">
                <Link
                  href={post.link}
                  target="_blank"
                  className="text-blue-500 hover:underline visited:text-purple-600"
                >
                  {post.title}
                </Link>
                <p className="text-gray-400 text-sm">
                  {format(post.pubDate, "PPP EEE p", { locale: ko })}
                </p>
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  );
}
