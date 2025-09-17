import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FutureClassifieds - Modern Classified Ads Forum",
  description: "A futuristic platform for classified ads, forums, and community discussions with cutting-edge design and technology.",
  keywords: "classified ads, forum, marketplace, community, futuristic, modern",
  authors: [{ name: "FutureClassifieds Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <div className="relative min-h-screen bg-void-950">
          {/* Animated background grid */}
          <div className="fixed inset-0 grid-background opacity-20 pointer-events-none" />

          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
