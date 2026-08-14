import { useCurrency } from "@/store/useCurrencyStore";
import { Coin } from "@/types/coin";
import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";

type Props = {
  coin: Coin;
  onClose: () => void;
};

const softSurface =
  "rounded-2xl border border-black/[0.06] bg-black/[0.025] dark:border-white/[0.08] dark:bg-white/[0.04]";

const secondaryButton =
  "h-12 rounded-2xl bg-black/[0.04] text-sm font-semibold text-muted-foreground transition hover:text-foreground dark:bg-white/[0.06]";

const primaryButton =
  "h-12 rounded-2xl bg-[var(--brand-purple)] text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110";

export default function AddTransactionModal({ coin, onClose }: Props) {
  const { currencySymbol } = useCurrency();
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] bg-background/95 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              New Transaction
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a trade to your portfolio
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/[0.04] text-muted-foreground transition hover:text-foreground dark:bg-white/[0.06]"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Coin Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={coin.image}
              alt={coin.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-contain"
            />

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {coin.name}
              </h3>

              <p className="text-sm uppercase text-muted-foreground">
                {coin.symbol}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Current Price
            </p>

            <p className="mt-1 font-semibold text-foreground">
              {currencySymbol}
              {coin.current_price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Buy / Sell */}
        <div className="mb-7 grid grid-cols-2 gap-3">
          <button type="button" className={primaryButton}>
            Buy
          </button>

          <button type="button" className={secondaryButton}>
            Sell
          </button>
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Quantity
          </label>

          <div className={`${softSurface} flex items-center px-5 py-4`}>
            <input
              type="number"
              placeholder="1.00"
              className="w-full bg-transparent text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground"
            />

            <span className="text-sm font-semibold uppercase text-muted-foreground">
              {coin.symbol}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-7">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Price per coin
          </label>

          <div className={`${softSurface} flex items-center px-5 py-4`}>
            <input
              type="number"
              placeholder="1000.00"
              className="w-full bg-transparent text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground"
            />

            <button
              type="button"
              className="cursor-pointer whitespace-nowrap rounded-full bg-[var(--brand-purple-light)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-dark-purple)] transition-all duration-200 hover:scale-[1.03] hover:brightness-95 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              Use Market
            </button>
          </div>
        </div>
        {/* Date & Time */}
        <div className="mb-7">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Date & Time
          </label>

          <div className={`${softSurface} grid grid-cols-2 gap-4 px-5 py-4`}>
            <input
              type="date"
              min="2010-01-01"
              max={today}
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
            />

            <div>
              <input
                type="time"
                className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
              />
            </div>
          </div>
        </div>
        {/* Estimated Total */}
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-black/[0.04] px-5 py-4 dark:bg-white/[0.06]">
          <span className="text-sm font-medium text-muted-foreground">
            Estimated Total
          </span>

          <span className="text-xl font-semibold text-foreground">
            {currencySymbol}0.00
          </span>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 cursor-pointer rounded-2xl bg-black/[0.04] text-sm font-semibold text-foreground transition hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
          >
            Cancel
          </button>

          <button type="button" className={`${primaryButton} flex-1`}>
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
