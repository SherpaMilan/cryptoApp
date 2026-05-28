import CoinPage from "@/components/coinPage/CoinPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CoinPage coinId={id} />;
}
