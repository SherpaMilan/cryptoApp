export interface Coin {
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
