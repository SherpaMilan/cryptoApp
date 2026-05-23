import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="w-full mt-6 bg-[var(--brand-gray)]/80 backdrop-blur-md border-t border-white/10"
      aria-label="Site footer"
    >
      <div className="max-w-[1440px] mx-auto px-[72px] py-6">
        <div className="grid grid-cols-3 items-center">
          {/* LEFT — TECH STACK */}
          <div className="hidden md:flex flex-wrap gap-4 text-xs text-gray-500">
            <span>Next.js 15</span>
            <span>TypeScript</span>
            <span>CoinGecko API</span>
            <span>shadcn/ui</span>
          </div>

          {/* CENTER — BRAND */}
          <div className="flex justify-center">
            <p className="text-xs text-gray-400 text-center">
              Crafted from scratch by{" "}
              <span className="text-[var(--brand-purple-text)] font-medium">
                SherpaMilan
              </span>{" "}
              © 2026
            </p>
          </div>

          {/* RIGHT — STATS + SOCIAL */}
          <div className="flex items-center justify-end gap-6">
            <div className="hidden md:flex gap-4 text-xs text-gray-500">
              <span>1000+ Coins</span>
              <span>Live Prices</span>
              <span>Optimized</span>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/SherpaMilan"
                className="w-9 h-9 flex items-center justify-center rounded-full border hover:border-[#0A66C2]/40 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/milansherpa/"
                className="w-9 h-9 flex items-center justify-center rounded-full border hover:border-[#0A66C2]/40 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
