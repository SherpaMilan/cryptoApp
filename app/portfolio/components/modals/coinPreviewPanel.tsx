import { Coin } from "@/types/coin";
import MetricRow from "./metricRow";

type Props = {
  coin: Coin;
};

export default function CoinPreviewPanel({ coin }: Props) {
  return (
    <div className="min-h-0 p-5">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(124,58,237,0.09),rgba(124,58,237,0.025),transparent)] px-5 py-5">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[var(--brand-purple)]/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-[var(--brand-purple)]/10 blur-2xl" />

        <div className="relative">
          <MetricRow label="Rank" value={`#${coin.rank ?? "-"}`} />

          <MetricRow
            label="Current Price"
            value={coin.current_price}
            subValue={`${coin.price_change_percentage_1h_in_currency >= 0 ? "+" : ""}${coin.price_change_percentage_1h_in_currency.toFixed(2)}% (1h)`}
            subValueClassName={
              coin.price_change_percentage_1h_in_currency >= 0
                ? "text-[var(--brand-green)]"
                : "text-[var(--brand-red)]"
            }
          />

          <MetricRow label="Market Cap" value={coin.market_cap} />
          <MetricRow label="24h Volume" value={coin.total_volume} />

          <div className="py-3">
            <p className="mb-2 text-sm text-muted-foreground">Last 7 days</p>

            <div className="relative h-[130px] overflow-hidden">
              {/* chart here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
