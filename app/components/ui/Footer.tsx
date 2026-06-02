import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full mt-6 bg-background backdrop-blur-md border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-[72px] py-6">
        <div className="grid grid-cols-3 items-center">
          <div className="hidden md:flex flex-wrap gap-4 text-xs text-foreground">
            <span>Next.js 15</span>
            <span>TypeScript</span>
            <span>CoinGecko API</span>
          </div>

          <div className="flex justify-center">
            <p className="text-xs text-foreground text-center">
              Crafted from scratch by{" "}
              <span className="text-foreground font-medium">SherpaMilan</span> ©
              2026
            </p>
          </div>

          <div className="flex items-center justify-end gap-6">
            <div className="hidden md:flex gap-4 text-xs text-foreground">
              <span>1000+ Coins</span>
              <span>Live Prices</span>
              <span>Optimized</span>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/SherpaMilan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:text-emerald-600 hover:scale-105 transition"
              >
                <FaGithub size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/milansherpa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center  rounded-full hover:text-[var(--brand-purple)] hover:scale-105 transition"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
