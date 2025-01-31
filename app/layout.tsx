import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "../components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/footer";
import { baseUrl } from "./sitemap";
import { Providers } from "../components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "메인 - 종득 블로그",
    template: "%s - 종득 블로그",
  },
  description: "블로그",
  openGraph: {
    title: "종득 블로그",
    description: "개인 블로그 서비스입니다.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={cx(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-xl mx-4 mt-8 md:mx-auto">
        <Providers>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  );
}
