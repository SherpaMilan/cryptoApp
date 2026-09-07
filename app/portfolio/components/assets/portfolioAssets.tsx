import { Coin } from "@/types/coin";
import PortfolioCoinTable from "./portfolioCoinTable";

type Props = {
  coinIds: string[];
  onOpenTransactionModal?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

export default function PortfolioAssets({
  coinIds,
  onOpenTransactionModal,
  onRemoveCoin,
}: Props) {
  return (
    <PortfolioCoinTable
      coinIds={coinIds}
      onOpenTransactionModal={onOpenTransactionModal}
      onRemoveCoin={onRemoveCoin}
    />
  );
}
