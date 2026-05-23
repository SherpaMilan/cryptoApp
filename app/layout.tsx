import "./globals.css";
import Navbar from "./components/ui/navbar";
import MarketStatsBar from "./components/ui/marketStatsBar";
import { Space_Grotesk, Geist } from "next/font/google";
import type { Metadata } from "next";
import CurrencyProvider from "./context/currencyContext";
import { cn } from "@/lib/utils";
import Providers from "./provider/providers";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/ui/footer";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Cryptium",
  description: "Track cryptocurrency prices and manage your portfolio",
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
        className={`${spaceGrotesk.variable} font-[family-name:var(--font-space-grotesk)] antialiased`}
      >
        <Providers>
          <CurrencyProvider>
            <div className="w-full">
              <Navbar />
            </div>

            <div className="w-full">
              <MarketStatsBar />
            </div>

            <main className="w-full min-h-screen">{children}</main>

            <Footer />
          </CurrencyProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
