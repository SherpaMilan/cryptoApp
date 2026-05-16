export interface Coin {
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_1h_in_currency: number;
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  last_updated: string;
  price_change_percentage_24h: number | null;
}
