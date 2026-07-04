import ActionButton from "../buttons/actionButton";

type Props = {
  selectedCount: number;
};

export default function CoinModalFooter({ selectedCount }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-black/10 bg-background px-7 py-5 dark:border-white/10">
      <p className="text-lg font-semibold">
        <span className="mr-2 text-4xl font-bold text-[var(--brand-purple)]">
          {selectedCount}
        </span>
        selected
      </p>

      <ActionButton
        disabled={selectedCount === 0}
        className="
          bg-[var(--blue-energy)]
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:opacity-40
          disabled:hover:translate-y-0
        "
      >
        Add Coins
      </ActionButton>
    </div>
  );
}
