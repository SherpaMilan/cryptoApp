import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface PortfolioPaginationProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  onChangePage: (page: number) => void;
}

export default function PortfolioPagination({
  startIndex,
  endIndex,
  totalItems,
  currentPage,
  totalPages,
  pageNumbers,
  onChangePage,
}: PortfolioPaginationProps) {
  const paginationButtonClass =
    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-muted-foreground transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-white/10";

  return (
    <div className="mt-4 flex items-center justify-between px-6 py-4">
      <p className="text-xs font-medium text-muted-foreground">
        Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of{" "}
        {totalItems}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={paginationButtonClass}
        >
          <CaretLeftIcon size={15} weight="bold" />
        </button>

        {pageNumbers.map((page) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onChangePage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`${paginationButtonClass} ${
                isActive
                  ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple)]"
                  : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={paginationButtonClass}
        >
          <CaretRightIcon size={15} weight="bold" />
        </button>
      </div>
    </div>
  );
}
