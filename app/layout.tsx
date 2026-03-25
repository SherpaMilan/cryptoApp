import "./globals.css";
import Navbar from "./ui/navbar";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import Topbar from "./ui/topbar";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Cryptium",
  description: "Track cryptocurrency prices and manage your portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-[family-name:var(--font-space-grotesk)] antialiased`}
      >
        <div className="w-full bg-[#353570]">
          <Topbar />
        </div>

        <div className="w-full bg-[var(--brand-white)]">
          <Navbar />
        </div>

        {children}
      </body>
    </html>
  );
}
