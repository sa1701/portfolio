import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Seif Ali | Portfolio",
  description:
    "Computer Science student at the University of Wollongong specialising in AI and Big Data. Full-stack developer with a passion for machine learning and modern web technologies.",
  keywords: [
    "Seif Ali",
    "Computer Science",
    "AI",
    "Big Data",
    "University of Wollongong",
    "Portfolio",
    "Full Stack Developer",
  ],
  authors: [{ name: "Seif Ali" }],
  openGraph: {
    title: "Seif Ali | Portfolio",
    description:
      "Computer Science student at the University of Wollongong specialising in AI and Big Data.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a1a] text-[#e8e8f0]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
