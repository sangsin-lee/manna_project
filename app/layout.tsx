import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "만나의 식탁",
  description: "한 끼로 만나는 세계 문화",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#fffdf9] text-neutral-950">
        <Header />

        {children}
      </body>
    </html>
  );
}
