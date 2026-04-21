import { Coin } from "@/types/coin";
export default function PriceChart({ coin }: { coin: Coin }) {
  return (
    <div className="h-full flex items-center justify-center rounded bg-[var(--brand-white)]">
      <span className="text-[var(--brand-black)]">
        Price Chart Placeholder {coin.name}
      </span>
    </div>
  );
}
