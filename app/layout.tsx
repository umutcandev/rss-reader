import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RSS Reader",
  description: "Tüm RSS kaynaklarınızı tek bir yerde okuyun ve yönetin.",
  keywords: "rss reader, rss okuyucu, rss takip, haber okuyucu",
  authors: [{ name: "RSS Reader" }],
  openGraph: {
    title: "RSS Reader",
    description: "Tüm RSS kaynaklarınızı tek bir yerde okuyun ve yönetin.",
    type: "website",
  },
  twitter: {
    title: "RSS Reader",
    description: "Tüm RSS kaynaklarınızı tek bir yerde okuyun ve yönetin.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
