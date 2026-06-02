import { NextResponse } from "next/server";
import axios from "axios";
import { Coin } from "@/types/coin";

type CoinDetail = Coin;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const { data } = await axios.get<CoinDetail>(
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
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      },
    );

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
      {
        status: status || 500,
      },
    );
  }
}
