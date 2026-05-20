import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="w-full mt-6 bg-[var(--brand-gray)]/80 backdrop-blur-md border-t border-white/10"
      aria-label="Site footer"
    >
      <div className="max-w-[1440px] mx-auto px-[72px] py-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Built, designed & maintained end-to-end by{" "}
            <span className="text-[var(--brand-purple-text)] font-medium">
              SherpaMilan
            </span>{" "}
            © 2026
          </p>
          <nav
            className="hidden md:flex items-center gap-6 text-xs text-gray-500"
            aria-label="Footer navigation"
          >
            <span className="hover:text-gray-300 transition">
              Crypto Dashboard
            </span>
            <span className="hover:text-gray-300 transition">Market Data</span>
            <span className="hover:text-gray-300 transition">v1.0</span>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SherpaMilan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-[#0A66C2]/40  transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/milansherpa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
