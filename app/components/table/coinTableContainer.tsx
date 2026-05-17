"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import CoinTable from "./coinTable";
import { useCoinsInfiniteQuery } from "@/hooks/useCoinsInfiniteQuery";
import { useCurrency } from "@/context/currencyContext";

const MAX_PAGES = 5;

export default function CoinTableContainer() {
  const { defaultCurrency } = useCurrency();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCoinsInfiniteQuery(defaultCurrency, true);

  const coins = data?.pages.flatMap((p) => p) ?? [];

  const pageCount = data?.pages.length ?? 0;
  const reachedLimit = pageCount >= MAX_PAGES;

  const canFetchMore = hasNextPage && !reachedLimit;

  return (
    <div className="max-h-[720px] overflow-y-auto relative">
      <InfiniteScroll
        dataLength={coins.length}
        next={fetchNextPage}
        hasMore={canFetchMore}
        loader={
          <div className="flex justify-center py-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin" />
              Loading more coins...
            </div>
          </div>
        }
      >
        <CoinTable coins={coins} />

        {reachedLimit && (
          <div className="flex justify-center py-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-xs px-3 py-1 rounded-full text-purple-700 border border-purple-500/30 shadow-sm">
                ⚡ You’ve reached the current display limit
              </div>

              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingNextPage ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Load more "
                )}
              </button>
            </div>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
