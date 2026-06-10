import { Coin } from "@/types/coin";
import { SearchCoin } from "@/types/searchCoin";
import { ConverterCoin } from "@/types/converterCoin";
import { normalizeSearchCoin } from "./coinMapper";

// Convert ANY coin type into UI-safe ConverterCoin
export const toConverterCoin = (coin: Coin | SearchCoin): ConverterCoin => {
  // SearchCoin (API search result)
  if (!("image" in coin)) {
    return normalizeSearchCoin(coin as SearchCoin);
  }

  // Coin (full API coin)
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
  };
};
