import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/search",
      {
        params: {
          query,
        },
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      },
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 },
    );
  }
}
