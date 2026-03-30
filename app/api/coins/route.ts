import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const vsCurrency = searchParams.get("currency") || "usd";
  const perPage = searchParams.get("perPage") || "100";
  const page = searchParams.get("page") || "1";
  if (!vsCurrency) {
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
          vs_currency: vsCurrency,
          x_cg_demo_api_key: process.env.CRYPTO_API_KEY,
          per_page: perPage,
          page: page,
        },
      },
    );
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
