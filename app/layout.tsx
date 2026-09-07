import "./globals.css";
import type { Metadata } from "next";

import MarketStatsBar from "./components/ui/MarketStatsBar";
import Footer from "@/components/layouts/Footer";

import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

import Providers from "./provider/providers";

import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/layouts/Navbar";
import ThemeSync from "./components/providers/themeSync";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cryptium",
  description:
    "Track crypto prices, convert currencies, and monitor your portfolio holdings.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(manrope.variable, plexMono.variable)}>
      <body
        className="
          font-sans
          antialiased
          bg-background
          text-foreground
          flex
          flex-col
          min-h-screen
        "
      >
        <Providers>
          <ThemeSync />

          <div className="sticky top-0 z-50">
            <MarketStatsBar />
            <Navbar />
          </div>

          <main className="w-full pt-[22px]">{children}</main>

          <Footer />
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
