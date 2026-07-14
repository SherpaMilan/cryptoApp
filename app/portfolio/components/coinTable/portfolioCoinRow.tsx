import Image from "next/image";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { Coin } from "@/types/coin";
import { useCurrency } from "@/store/useCurrencyStore";
import { STATS_BAR_ICON_PROPS } from "@/constants/statsbarIcons";

type Props = {
  coin: Coin;
  onAddTransaction?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

const cellClass = "px-5 py-4 text-right";

const iconButtonClass =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition duration-200 hover:scale-105 active:scale-95";

function formatCurrentPrice(value: number, symbol: string) {
  return `${symbol} ${value.toLocaleString()}`;
}

export default function PortfolioCoinRow({
  coin,
  onAddTransaction,
  onRemoveCoin,
}: Props) {
  const { currencyKey, currencySymbol } = useCurrency();
  const currentPrice = coin.current_price ?? 0;
  const marketCap = coin.market_cap ?? 0;
  const priceChange = coin.price_change_percentage_24h_in_currency ?? 0;
  const isPositive = (priceChange ?? 0) >= 0;

  return (
    <tr className="border-b border-black/5 transition-colors hover:bg-black/[0.025] dark:border-white/[0.06] dark:hover:bg-white/[0.03]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={coin.image}
            alt={coin.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-contain"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{coin.name}</p>

            <p className="text-xs font-medium uppercase text-muted-foreground">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      <td className={cellClass}>
        <p className="text-sm font-bold tabular-nums">
          {currentPrice == null
            ? "—"
            : formatCurrentPrice(currentPrice, currencySymbol)}
        </p>
      </td>

      <td className={cellClass}>
        {priceChange == null ? (
          <span className="text-sm text-muted-foreground">N/A</span>
        ) : (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              isPositive
                ? "bg-[var(--brand-green)]/10 text-[var(--brand-green)]"
                : "bg-[var(--brand-red)]/10 text-[var(--brand-red)]"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        )}
      </td>

      <td className={cellClass}>
        <p className="text-sm font-bold tabular-nums">
          {marketCap == null
            ? "—"
            : formatCurrencyCompact(marketCap, currencyKey, currencySymbol)}
        </p>
      </td>

      <td className={cellClass}>
        <p className="text-sm font-semibold text-muted-foreground">
          No holdings
        </p>

        <p className="text-[11px] text-muted-foreground/70">
          Add a transaction
        </p>
      </td>

      <td className={cellClass}>
        <div className="flex justify-end gap-1">
          <button
            type="button"
            title="Add Transaction"
            onClick={() => onAddTransaction?.(coin)}
            aria-label={`Add transaction for ${coin.name}`}
            className={`${iconButtonClass} hover:text-[var(--brand-purple)]`}
          >
            <PlusIcon {...STATS_BAR_ICON_PROPS} />
          </button>

          <button
            type="button"
            title="Remove Coin"
            onClick={() => onRemoveCoin(coin.id)}
            aria-label={`Remove ${coin.name}`}
            className={`${iconButtonClass} hover:bg-[var(--brand-red)]/10 hover:text-[var(--brand-red)]`}
          >
            <TrashIcon {...STATS_BAR_ICON_PROPS} />
          </button>
        </div>
      </td>
    </tr>
  );
}
