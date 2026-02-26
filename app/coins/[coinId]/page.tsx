export default async function Page({
  params,
}: {
  params: Promise<{ coinId: string }>;
}) {
  const { coinId } = await params;
  return <h1>Coin: {coinId}</h1>;
}
