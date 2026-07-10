import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seifali.dev"),
  title: "Seif Ali — AI & Software Engineer",
  description:
    "Final-year Computer Science student (AI & Big Data) at the University of Wollongong. Builds AI systems that run where the data lives — RAG pipelines, local-first tools, full-stack applications.",
  keywords: [
    "Seif Ali",
    "Computer Science",
    "AI",
    "Big Data",
    "RAG",
    "University of Wollongong",
    "Portfolio",
    "Software Engineer",
    "Sydney",
  ],
  authors: [{ name: "Seif Ali" }],
  openGraph: {
    title: "Seif Ali — AI & Software Engineer",
    description:
      "Builds AI systems that run where the data lives. Final-year CS (AI & Big Data), University of Wollongong.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${plexMono.variable} antialiased bg-carbon text-ink`}
      >
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
