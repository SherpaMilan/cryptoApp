import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const coin = searchParams.get("coin");
  const currency = searchParams.get("currency");
  const days = searchParams.get("days");

  if (!coin || !currency || !days) {
    return Response.json(
      { error: "Missing required query params" },
      { status: 400 },
    );
  }
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
      {
        params: {
          vs_currency: currency,
          days,
          interval: "daily",
        },
      },
    );
    if (!data?.prices || !data?.total_volumes) {
      throw new Error("Invalid CoinGecko response");
    }
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch coins",
        message,
      },
      { status: 500 }, // HTTP 500 = server error
    );
  }
}
