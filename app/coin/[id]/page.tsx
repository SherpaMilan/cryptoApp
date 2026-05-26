import CoinPage from "@/components/CoinPage/CoinPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CoinPage coinId={id} />;
}
