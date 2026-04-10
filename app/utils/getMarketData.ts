import axios from "axios";

export default async function getMarketData() {
  const { data } = await axios.get("https://api.coingecko.com/api/v3/global");
  return data;
}
