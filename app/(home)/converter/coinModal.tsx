import { Coin } from "@/types/coin";
import Image from "next/image";

export default function CoinModal({
  open,
  setOpen,
  coins,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  coins: Coin[];
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[380px] h-[420px] bg-background rounded-xl shadow-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search coin..."
          className="w-full bg-muted/30 px-3 py-2 rounded-lg text-sm outline-none"
        />

        <div className="mt-3 space-y-1 overflow-y-auto h-[340px]">
          {coins.map((coin) => (
            <button
              key={coin.symbol}
              className="w-full flex items-center gap-3 p-2 hover:bg-muted/40 rounded-lg"
              onClick={() => setOpen(false)}
            >
              <Image
                src={coin.image}
                alt={`${coin.name} icon`}
                width={20}
                height={20}
              />
              <span className="text-sm">
                {coin.name} ({coin.symbol})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
