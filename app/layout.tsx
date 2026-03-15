import "./globals.css";
import Navbar from "./ui/navbar";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

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
        <div className="w-full h-14 bg-[#353570] b-1 "></div>
        <div className="flex h-[80px] justify-center  py-[16px] px-[72px]">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
