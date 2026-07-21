const tableHeaders = [
  "Coin",
  "Current Price",
  "24h Change",
  "Market Cap",
  "Holdings",
  "Actions",
];

export default function PortfolioCoinTableHeader() {
  return (
    <thead className="sticky top-0 z-20">
      <tr className="bg-[var(--brand-gray)] dark:bg-foreground/5">
        {tableHeaders.map((header, index) => (
          <th
            key={header}
            scope="col"
            className={`h-11 px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground ${
              index === 0 ? "text-left" : "text-right"
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
