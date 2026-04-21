import { Coin } from "@/types/coin";
export default function VolumeChart({ coin }: { coin: Coin }) {
  return (
    <div className="h-full flex items-center justify-center  bg-[var(--brand-white)] rounded">
      <span className="text-[var(--brand-black)]">
        Volume Chart Placeholder {coin.name}
      </span>
    </div>
  );
}
