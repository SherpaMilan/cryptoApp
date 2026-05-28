type Props = {
  volume: number;
  supply: number;
  currencySymbol: string;
  ath: number;
  atl: number;
  athDate: string;
  atlDate: string;
};

export default function StatsPanel({
  volume,
  supply,
  currencySymbol,
  ath,
  atl,
  athDate,
  atlDate,
}: Props) {
  return (
    <aside className="space-y-8 text-sm">
      <div>
        <p className="text-xs text-gray-500">Volume (24h)</p>
        <p className="font-medium">
          {currencySymbol} {volume.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Circulating Supply</p>
        <p className="font-medium">{supply.toLocaleString()}</p>
      </div>

      <div className="p-4 rounded-xl border border-green-200 bg-green-50">
        <p className="text-xs text-green-600 font-semibold">All Time High</p>
        <p className="text-lg font-bold text-green-600">
          {currencySymbol} {ath.toLocaleString()}
        </p>
        <p className="text-[10px] text-gray-500">{athDate}</p>
      </div>

      <div className="p-4 rounded-xl border border-red-200 bg-red-50">
        <p className="text-xs text-red-600 font-semibold">All Time Low</p>
        <p className="text-lg font-bold text-red-600">
          {currencySymbol} {atl.toLocaleString()}
        </p>
        <p className="text-[10px] text-gray-500">{atlDate}</p>
      </div>
    </aside>
  );
}
