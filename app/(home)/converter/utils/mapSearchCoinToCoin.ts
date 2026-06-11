import { Coin } from "@/types/coin";
import { SearchCoin } from "@/types/searchCoin";

export function mapSearchCoinToCoin(coin: SearchCoin): Coin {
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,

    // 🔥 FIX IMAGE MAPPING
    image: coin.thumb,

    // safe UI defaults (required by Coin type)
    current_price: 0,
    market_cap: 0,
    total_volume: 0,
    circulating_supply: 0,
    total_supply: 0,

    sparkline_in_7d: {
      price: [],
    },

    price_change_percentage_24h_in_currency: 0,
    price_change_percentage_7d_in_currency: 0,
    price_change_percentage_1h_in_currency: 0,

    last_updated: "",
    price_change_percentage_24h: null,
  };
}
