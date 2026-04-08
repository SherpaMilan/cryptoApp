export interface MarketData {
  data: {
    markets: number;
    active_cryptocurrencies: number;
    active_exchanges: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: {
      btc: number;
      eth: number;
      [key: string]: number;
    };
    market_cap_change_percentage_24h_usd: number;
    volume_change_percentage_24h_usd: number;
    updated_at: number;
  };
}