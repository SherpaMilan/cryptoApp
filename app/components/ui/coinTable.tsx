export default function CoinTable() {
  const tableheads = [
    { name: "#" },
    { name: "Name" },
    { name: "Price" },
    { name: "1h%" },
    { name: "24h%" },
    { name: "7d%" },
    { name: "24h Volume / Market Cap" },
    { name: "Circulating / Total Supply" },
    { name: "Last 7d" },
  ];

  const mockCoins = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 78975,
      change1h: -0.59,
      change24h: 0.73,
      change7d: 1.35,
      volume24h: 7.14,
      marketcap: 10,
      circulatingSupply: 2,
      totalSupply: 20,
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 2340,
      change1h: -0.59,
      change24h: 1.23,
      change7d: 0.73,
      volume24h: 7.14,
      marketcap: 10,
      circulatingSupply: 2,
      totalSupply: 20,
      image:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    },
  ];

  // ✅ added column gap to fix "connected bars" issue
  const grid =
    "grid grid-cols-[50px_2fr_1fr_0.6fr_0.6fr_0.6fr_2fr_2fr_1.5fr] gap-x-4";

  const ProgressBar = ({ value }: { value: number }) => {
    return (
      <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-1.5 bg-teal-500 rounded"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-[var(--brand-gray)] px-[72px]">
      <h2 className="mt-6 text-sm font-bold text-gray-500">Market Overview</h2>

      {/* HEADER */}
      <div className={`${grid} mt-6 px-4  text-gray-500 whitespace-nowrap`}>
        {tableheads.map((head) => (
          <div key={head.name} className="whitespace-nowrap text-[14px]">
            {head.name}
          </div>
        ))}
      </div>

      {/* ROWS */}
      <div className="mt-3 space-y-3">
        {mockCoins.map((coin) => (
          <div
            key={coin.rank}
            className={`${grid} items-center bg-white rounded-xl px-4 py-4 shadow-sm text-sm`}
          >
            {/* rank */}
            <div>{coin.rank}</div>

            {/* name */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={coin.image}
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />

              <div className="flex flex-col min-w-0">
                <span className="font-medium">{coin.name}</span>
                <span className="text-gray-400 text-xs">{coin.symbol}</span>
              </div>
            </div>

            {/* price */}
            <div>${coin.price}</div>

            {/* changes */}
            <div>{coin.change1h}%</div>
            <div>{coin.change24h}%</div>
            <div>{coin.change7d}%</div>

            {/* 24h Volume / Market Cap */}
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{coin.volume24h}b</span>
                <span>{coin.marketcap}b</span>
              </div>

              <ProgressBar value={(coin.volume24h / coin.marketcap) * 100} />
            </div>

            {/* Circulating / Total Supply */}
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{coin.circulatingSupply}t</span>
                <span>{coin.totalSupply}t</span>
              </div>

              <ProgressBar
                value={(coin.circulatingSupply / coin.totalSupply) * 100}
              />
            </div>

            {/* chart */}
            <div className="h-10 w-full bg-gradient-to-r from-teal-200 to-teal-400 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
