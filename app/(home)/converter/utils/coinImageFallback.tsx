import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
};

export default function CoinImageFallback({ src, alt }: Props) {
  const [error, setError] = useState(false);

  const symbol = alt?.charAt(0)?.toUpperCase() || "•";

  // no image OR failed load → show fallback
  if (!src || error) {
    return (
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 shadow-sm flex items-center justify-center relative overflow-hidden">
        {/* soft inner glow */}
        <div className="absolute inset-0 bg-white/5" />

        {/* symbol */}
        <span className="text-[10px] font-bold text-[var(--brand-purple)] relative z-10">
          {symbol}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={24}
      height={24}
      className="rounded-full"
      onError={() => setError(true)}
    />
  );
}
