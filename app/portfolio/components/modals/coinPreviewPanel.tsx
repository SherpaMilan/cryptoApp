import { Coin } from "@/types/coin";

import MetricRow from "./metricRow";
import CoinPreviewChart from "./coinPreviewChart";

import ReadMore from "@/components/coinPage/ReadMore";
import { formatCurrencyCompact } from "@/utils/formatCurrency";

type Props = {
  coin: Coin;
  currencyKey: string;
  currencySymbol: string;
  description?: string;
};

export default function CoinPreviewPanel({
  coin,
  currencyKey,
  currencySymbol,
  description,
}: Props) {
  const rank = coin.market_cap_rank ?? null;
  const price = coin.current_price ?? 0;
  const marketCap = coin.market_cap ?? 0;
  const volume = coin.total_volume ?? 0;

  const change24h = coin.price_change_percentage_24h_in_currency ?? null;

  const change24hText =
    change24h === null
      ? "N/A (24h)"
      : `${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}% (24h)`;

  const change24hClassName =
    change24h === null
      ? "text-muted-foreground"
      : change24h >= 0
        ? "text-[var(--brand-green)]"
        : "text-[var(--brand-red)]";

  return (
    <div className="min-h-0 p-2.5">
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[22px] border border-black/5 bg-white/70 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />

        <div className="relative min-h-0 flex-1 overflow-y-auto p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Market Snapshot
            </p>

            <span className="rounded-full border border-black/5 bg-white/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
              {coin.symbol.toUpperCase()}
            </span>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/65 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <MetricRow label="Rank" value={`#${rank ?? "-"}`} />

            <MetricRow
              label="Current Price"
              value={`${currencySymbol}${price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}`}
              subValue={change24hText}
              subValueClassName={change24hClassName}
            />

            <MetricRow
              label="Market Cap"
              value={formatCurrencyCompact(
                marketCap,
                currencyKey,
                currencySymbol,
              )}
            />

            <MetricRow
              label="24h Volume"
              value={formatCurrencyCompact(volume, currencyKey, currencySymbol)}
            />
          </div>

          <div className="mt-2 rounded-2xl border border-black/5 bg-white/55 px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-0.5 flex items-center justify-between">
              <p className="text-xs font-bold tracking-tight">Last 7 days</p>

              <span className="text-[10px] font-semibold text-muted-foreground">
                Trend
              </span>
            </div>

            <div className="h-[100px] w-full overflow-hidden">
              <CoinPreviewChart coinId={coin.id} />
            </div>
          </div>

          <div className="mt-2 rounded-2xl border border-black/5 bg-gradient-to-b from-white/80 to-white/45 px-3.5 py-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02]">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              About
            </p>

            <ReadMore text={description} collapsedHeight={48} />
          </div>
        </div>
      </div>
    </div>
  );
}
