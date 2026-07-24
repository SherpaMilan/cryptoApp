const tableHeaders = [
  "Rank",
  "Coin",
  "Price",
  "24h",
  "24h Volume",
  "Market Cap",
  "Holdings",
  "Actions",
];

export default function PortfolioCoinTableHeader() {
  return (
    <thead className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10">
      <tr>
        {tableHeaders.map((header, index) => (
          <th
            key={header}
            scope="col"
            className={`
              h-11
              px-4
              text-[11px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-muted-foreground
              ${
                index === 0
                  ? "w-12 text-left"
                  : index === 1
                    ? "w-[260px] text-left"
                    : "text-right"
              }
            `}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
