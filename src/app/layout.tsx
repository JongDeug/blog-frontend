import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { Toaster } from "../components/ui/toaster";
import { Providers } from "../components/providers";
import { env } from "@/const/env";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "종득 블로그",
  description: "웹 개발 및 개인 블로그 서비스입니다.",
  keywords: ["블로그", "Next.js", "Nest.js", "개발"],
  openGraph: {
    title: "종득 블로그",
    description: "웹 개발 및 개인 블로그 서비스입니다.",
    url: `${env.URL}`,
    siteName: "종득 블로그",
    images: [
      {
        url: `${env.URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "블로그 대표 이미지",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKr.className} antialiased`}>
        <Providers>
          <main className="max-w-xl mx-4 mt-8 px-2 md:px-0 md:mx-auto">
            <Navbar />
            {children}
            <Footer />
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
