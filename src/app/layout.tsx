import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { Toaster } from "../components/ui/toaster";
import { Providers } from "../components/providers";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "종득 블로그",
  description: "개인 블로그 서비스",
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
