import SubScriptions from "@/components/subscriptions";
import { env } from "@/const/env";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function getFeeds(queryString: string) {
  const response = await fetch(`${env.API_URL}/common/rss/feed?${queryString}`);
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}

async function getSubscriptions(): Promise<{ url: string; name: string }[]> {
  const response = await fetch(`${env.API_URL}/common/rss/subscriptions`);
  const resOrError = await response.json();

  if (!response.ok) {
    throw new Error(resOrError.message);
  }

  return resOrError;
}

export default async function RSSFeed({
  searchParams,
}: {
  searchParams: Promise<{ url: string; name: string }>;
}) {
  const { url, name } = await searchParams;

  const subScriptionList = await getSubscriptions();

  const queryString = new URLSearchParams();
  if (url) queryString.append("url", url);
  else queryString.append("url", subScriptionList[0].url);

  const posts = await getFeeds(queryString.toString());

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-2 w-fit tracking-tighter items-center transition-all duration-200 hover:scale-105 hover:text-green-500">
        <h1 className="text-3xl font-bold">RSS 구독</h1>
      </section>

      <section>
        <Breadcrumb className="pb-2 mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/subscribe">구독</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {name ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{subScriptionList[0].name}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <SubScriptions subScriptionList={subScriptionList} />
      </section>

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
