import { ConverterCoin } from "@/types/converterCoin";
import { SearchCoin } from "@/types/searchCoin";

export const normalizeSearchCoin = (coin: SearchCoin): ConverterCoin => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol,
  image: `https://assets.coingecko.com/coins/images/${coin.id}/large.png`,
});
