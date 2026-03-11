import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AKMIND | Dream. Discover. Shine.",
  description: "Exciting and effective programs, curated by experts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
