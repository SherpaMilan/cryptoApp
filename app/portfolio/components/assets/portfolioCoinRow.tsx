import Image from "next/image";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { Coin } from "@/types/coin";
import { useCurrency } from "@/store/useCurrencyStore";
import { STATS_BAR_ICON_PROPS } from "@/constants/statsbarIcons";

type Props = {
  coin: Coin;
  onOpenTransactionModal?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

const iconButtonClass =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition duration-200 hover:scale-105 active:scale-95";

function formatCurrentPrice(value: number, symbol: string) {
  return `${symbol} ${value.toLocaleString()}`;
}

export default function PortfolioCoinRow({
  coin,
  onOpenTransactionModal,
  onRemoveCoin,
}: Props) {
  const { currencyKey, currencySymbol } = useCurrency();

  const currentPrice = coin.current_price;
  const marketCap = coin.market_cap;
  const volume24h = coin.total_volume;
  const priceChange = coin.price_change_percentage_24h_in_currency;
  const rank = coin.market_cap_rank;

  const isPositive = priceChange != null && priceChange >= 0;

  return (
    <tr className="border-b border-black/5 transition-colors hover:bg-black/[0.025] dark:border-white/[0.06] dark:hover:bg-white/[0.03]">
      <td className="w-12 px-4 py-4 text-left">
        <p className="text-sm font-bold tabular-nums text-muted-foreground">
          {rank == null ? "—" : rank}
        </p>
      </td>

      <td className="w-[260px] px-4 py-4 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/[0.08]">
            <Image
              src={coin.image}
              alt={coin.name}
              width={26}
              height={26}
              className="h-[26px] w-[26px] rounded-full object-contain"
            />{" "}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{coin.name}</p>

            <p className="text-xs font-medium uppercase text-muted-foreground">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <p className="text-sm tabular-nums ">
          {currentPrice == null
            ? "—"
            : formatCurrentPrice(currentPrice, currencySymbol)}
        </p>
      </td>

      <td className="px-4 py-4 text-right">
        {priceChange == null ? (
          <span className="text-sm text-muted-foreground">N/A</span>
        ) : (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold tabular-nums
              ${
                isPositive
                  ? "bg-[var(--brand-green)]/10 text-[var(--brand-green)]"
                  : "bg-[var(--brand-red)]/10 text-[var(--brand-red)]"
              }
            `}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-right">
        <p className="text-sm tabular-nums">
          {volume24h == null
            ? "—"
            : formatCurrencyCompact(volume24h, currencyKey, currencySymbol)}
        </p>
      </td>

      <td className="px-4 py-4 text-right">
        <p className="text-sm tabular-nums">
          {marketCap == null
            ? "—"
            : formatCurrencyCompact(marketCap, currencyKey, currencySymbol)}
        </p>
      </td>

      <td className="px-4 py-4 text-right">
        <p className="text-[11px] text-muted-foreground/70">
          Add a transaction
        </p>
      </td>

      <td className="px-4 py-4 text-right">
        <div className="flex justify-end gap-1">
          <button
            type="button"
            title="Add Transaction"
            onClick={() => onOpenTransactionModal?.(coin)}
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
