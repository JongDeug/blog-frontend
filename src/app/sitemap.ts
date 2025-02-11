// import { getPosts } from "@/lib/fetch";
// import { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   // 모든 포스트 데이터 가져오기
//   const queryString = new URLSearchParams();
//   queryString.append("take", "1000");
//   const { posts } = await getPosts(queryString.toString());

//   // 블로그 포스트 URL 생성
//   const postsUrls = posts.map((post) => ({
//     url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${post.id}`,
//     lastModified: new Date(post.updatedAt),
//     changeFrequency: "daily" as const,
//     priority: 0.7,
//   }));

//   // 정적 페이지 URL
//   const routes = ["/", "/blog"].map((route) => ({
//     url: `${process.env.NEXT_PUBLIC_SERVER_URL}${route}`,
//     lastModified: new Date(),
//     changeFrequency: "daily" as const,
//     priority: 1,
//   }));

//   return [...routes, ...postsUrls];
// }
