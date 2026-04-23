type MarketChartData = {
  prices: [number, number][];
};

export const formatChartData = (marketChartData: MarketChartData) => {
  if (!marketChartData?.prices) return [];

  return marketChartData.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toISOString(),
    price,
  }));
};
