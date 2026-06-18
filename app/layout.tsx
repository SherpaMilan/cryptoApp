import "./globals.css";
import type { Metadata } from "next";

import MarketStatsBar from "./components/ui/MarketStatsBar";
import Footer from "@/components/layouts/Footer";

import { Space_Grotesk, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import CurrencyProvider from "./context/currencyContext";
import ThemeProvider from "./context/themeContext";
import Providers from "./provider/providers";

import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/layouts/Navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          spaceGrotesk.variable,
          "font-[family-name:var(--font-space-grotesk)] antialiased bg-background text-foreground flex flex-col min-h-screen",
        )}
      >
        <Providers>
          <ThemeProvider>
            <CurrencyProvider>
              <div className="sticky top-0 z-50">
                <MarketStatsBar />
                <Navbar />
              </div>
              <main className="flex-1 w-full pt-[22px]">{children}</main>
              <Footer />
            </CurrencyProvider>
          </ThemeProvider>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
