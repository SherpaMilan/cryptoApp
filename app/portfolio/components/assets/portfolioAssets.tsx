import { Coin } from "@/types/coin";
import PortfolioCoinTable from "./portfolioCoinTable";

type Props = {
  coinIds: string[];
  onAddTransaction?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

export default function PortfolioAssets({
  coinIds,
  onAddTransaction,
  onRemoveCoin,
}: Props) {
  return (
    <PortfolioCoinTable
      coinIds={coinIds}
      onAddTransaction={onAddTransaction}
      onRemoveCoin={onRemoveCoin}
    />
  );
}
