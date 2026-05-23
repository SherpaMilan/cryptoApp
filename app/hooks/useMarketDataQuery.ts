import { useQuery } from "@tanstack/react-query";
import getMarketData from "@/utils/getMarketData";

export function useMarketDataQuery() {
  return useQuery({
    queryKey: ["market-data"],
    queryFn: getMarketData,
    staleTime: 1000 * 60 * 2,
  });
}
