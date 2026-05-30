import { NextResponse } from "next/server";
import axios from "axios";
import { Coin } from "@/types/coin";

type CoinDetail = Coin;
const cache = new Map<string, { data: CoinDetail; time: number }>();
const CACHE_TTL = 1000 * 60; // 1 minute

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const now = Date.now();
  const cached = cache.get(id);

  if (cached && now - cached.time < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
        headers: {
          "x-cg-demo-api-key": process.env.CRYPTO_API_KEY,
        },
      },
    );

    cache.set(id, { data, time: now });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: unknown) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;

    return NextResponse.json(
      {
        error: status === 404 ? "NOT_FOUND" : "COINGECKO_ERROR",
      },
      { status: status || 500 },
    );
  }
}
