import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nicko Balmes · Junior Software Engineer",
  description:
    "Nicko Balmes — Junior Software Engineer from Mauban, Philippines. Full-stack products, hackathon wins, and AI agents in the loop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="t-label fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-accent px-4 py-2 text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
