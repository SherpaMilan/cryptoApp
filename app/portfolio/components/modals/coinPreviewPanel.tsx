import { Coin } from "@/types/coin";
import MetricRow from "./metricRow";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import ReadMore from "@/components/coinPage/ReadMore";

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
  const rank = coin?.market_cap_rank ?? null;
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
    <div className="min-h-0 p-5">
      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white/70 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
        <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-slate-400/10 blur-3xl" />

        <div className="relative min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Market Snapshot
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight">
                {coin.name}
              </h3>
            </div>

            <span className="shrink-0 rounded-full border border-black/5 bg-gradient-to-b from-white to-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
              {currencyKey.toUpperCase()}
            </span>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white/65 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
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

          <div className="mt-4 rounded-3xl border border-black/5 bg-white/55 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold tracking-tight">Last 7 days</p>
              <span className="text-[11px] font-semibold text-muted-foreground">
                Trend
              </span>
            </div>

            <div className="relative h-[115px] overflow-hidden rounded-2xl bg-slate-100/70 dark:bg-white/[0.04]">
              {/* Chart goes here */}
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-black/5 bg-gradient-to-b from-white/80 to-white/45 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-white/10 dark:from-white/[0.05] dark:to-white/[0.02]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  About
                </p>
              </div>
            </div>

            <ReadMore text={description} collapsedHeight={88} />
          </div>
        </div>
      </div>
    </div>
  );
}
