import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();
const subscribe = [
  "https://tech.inflab.com/rss.xml", // 인프런
  "https://feeds.feedburner.com/geeknews-feed", // GeekNews
  "https://medium.com/feed/wantedjobs", // 원티드
  "https://medium.com/feed/daangn", // 당근
  "https://medium.com/feed/musinsa-tech", // 무신사
  // "https://meetup.toast.com/rss", // NHN Cloud
  // "https://blog.banksalad.com/rss.xml", // 뱅크샐러드
  "https://tech.kakao.com/feed/", // 카카오
  "https://toss.tech/rss.xml", // 토스
  // "https://tech.devsisters.com/rss.xml", // Devsisters
  "https://medium.com/feed/zigbang", // 직방
  "https://tech.socarcorp.kr/feed", // 소카
  "https://techblog.gccompany.co.kr/feed", // 여기어때
];

export interface Feed {
  title: string | undefined;
  link: string | undefined;
  pubDate: string | undefined;
  source: string | undefined;
}

export async function GET() {
  try {
    // 여러 개의 RSS 피드 동시 요청
    const feeds = await Promise.all(
      subscribe.map((url) => parser.parseURL(url))
    );

    // 가져온 RSS 데이터를 하나의 배열로 합치기
    const posts = feeds.flatMap((feed) =>
      feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: feed.title, // RSS 출처 표시
      }))
    );

    // 최신순 정렬, 내림차순
    posts.sort(
      (a: Feed, b: Feed) =>
        new Date(b.pubDate ?? "").getTime() -
        new Date(a.pubDate ?? "").getTime()
    );

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "RSS feed 가져오기 실패" },
      { status: 500 }
    );
  }
}
