import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const currency = searchParams.get("currency") || "usd";
  const perPage = searchParams.get("perPage") || "20";
  const page = searchParams.get("page") || "1";
  if (!currency) {
    return NextResponse.json(
      { error: "currency query parameter is required" },
      { status: 400 }, // Bad Request
    );
  }

  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: currency,
          x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
          per_page: perPage,
          page: page,
          order: "market_cap_desc",
          price_change_percentage: "1h,24h,7d",
          sparkline: true,
        },
      },
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
