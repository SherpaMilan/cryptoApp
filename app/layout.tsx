import "./globals.css";
import Navbar from "./components/ui/Navbar";
import MarketStatsBar from "./components/ui/MarketStatsBar";
import { Space_Grotesk, Geist } from "next/font/google";
import type { Metadata } from "next";
import CurrencyProvider from "./context/currencyContext";
import { cn } from "@/lib/utils";
import Providers from "./provider/providers";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/ui/Footer";
import ThemeProvider from "./context/themeContext";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${spaceGrotesk.variable} font-[family-name:var(--font-space-grotesk)] antialiased bg-background text-foreground`}
      >
        <Providers>
          <ThemeProvider>
            <CurrencyProvider>
              <div className="sticky top-0 z-100">
                <MarketStatsBar />
                <Navbar />
              </div>

              <main className="w-full min-h-screen pt-[22px]">{children}</main>

              <Footer />
            </CurrencyProvider>
          </ThemeProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
