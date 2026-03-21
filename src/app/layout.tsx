import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import FloatingCTA from "@/components/FloatingCTA";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AKMIND — AI Education for School Students in India",
  description:
    "India's most exciting AI education platform for students in Grades 5-10. Learn Python, Machine Learning, Computer Vision and more with expert 1-on-1 mentors. Book your free demo class today.",
  keywords:
    "AI education India, coding for kids, machine learning for students, AI classes Bangalore, Python for kids, AKMIND",
  openGraph: {
    title: "AKMIND — AI Education for School Students",
    description:
      "Learn AI with expert mentors. Python, ML, Computer Vision and more for students aged 10-16.",
    url: "https://www.akmind.com",
    type: "website",
  },
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
        {/* Spacer to push content below the fixed navbar */}
        <div className="h-14 md:h-20" />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
