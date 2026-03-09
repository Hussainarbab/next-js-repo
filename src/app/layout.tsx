import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gilgit-Baltistan Job Platform",
  description: "Find jobs in Gilgit-Baltistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">GB Job Platform</Link>
            <div className="space-x-4">
              <Link href="/jobs">Jobs</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
