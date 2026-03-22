import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import FloatingCTA from "@/components/FloatingCTA";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.akmind.com"),
  title: {
    default: "AKMIND — AI Education for Schools",
    template: "%s | AKMIND"
  },
  description: "The most exciting AI education platform. Learn Python, Machine Learning, Computer Vision and more with expert 1-on-1 mentors. Book your free demo class today.",
  keywords: [
    "AI education",
    "machine learning for students",
    "Python for kids",
    "AKMIND",
    "AI Explorers",
    "AI Builders",
    "AI Innovators",
    "online AI classes",
    "artificial intelligence for students"
  ],
  authors: [{ name: "AKMIND by Akonnai AI" }],
  creator: "Akonnai AI",
  publisher: "Akonnai AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.akmind.com",
    siteName: "AKMIND",
    title: "AKMIND — AI Education for Schools",
    description: "Learn AI with expert 1-on-1 mentors. Python, Machine Learning and Computer Vision for students worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AKMIND — AI Education for School Students"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AKMIND — AI Education for Schools",
    description: "Learn AI with expert 1-on-1 mentors. Python, Machine Learning and Computer Vision for students worldwide.",
    images: ["/og-image.png"],
    creator: "@akmind"
  },
  alternates: {
    canonical: "https://www.akmind.com"
  },
  verification: {
    google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <ScrollProgressBar />
        {/* Spacer to push content below the fixed navbar */}
        <div className="h-14 md:h-20" />
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
