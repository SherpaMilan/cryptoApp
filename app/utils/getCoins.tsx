import axios from "axios";

export default async function getCoins() {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        x_cg_demo_api_key: process.env.CRYPTO_API_KEY,
        per_page: 100,
        page: 1,
      },
    },
  );
  return data;
}
