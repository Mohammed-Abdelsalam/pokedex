import { useCallback, useMemo } from "react";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ page, total, onChange }) => {
  // Check if the page and total are valid
  const isValid = page >= 1 && page <= total && total >= 1;

  // create an array of page numbers with "dots" for gaps
  const pages = useMemo<(number | "dots")[]>(() => {
    if (!isValid) return [];

    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);

    const items: (number | "dots")[] = [];
    let start = Math.max(1, page - 1);
    const end = Math.min(total, start + 2);

    if (start > 1) {
      items.push(1);
      if (start > 2) items.push("dots");
    }

    if (end - start < 2) start = Math.max(1, end - 2);

    for (let i = start; i <= end; i++) items.push(i);

    if (end < total - 1) {
      items.push("dots");
      items.push(total);
    }

    return items;
  }, [page, total, isValid]);

  // Button class generator
  const btnCls = useCallback(
    (active = false) =>
      `min-w-14 px-4 py-2 text-sm rounded-xl transition-all duration-300 select-none font-medium ${
        active
          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 scale-105"
          : "bg-white/80 dark:bg-slate-800/80 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-500 hover:scale-105 hover:shadow-md"
      }`,
    []
  );

  // page change with validation
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= total && newPage !== page) {
        onChange(newPage);
      }
    },
    [page, total, onChange]
  );

  // invalid state
  if (!isValid) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`${btnCls()} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none`}
      >
        <span className="inline md:hidden">←</span>
        <span className="hidden md:inline">Prev</span>
      </button>

      {/* Numbers & Dots */}
      {pages.map((p, idx) =>
        p === "dots" ? (
          <span
            key={`dots-${idx}`}
            className="px-3 text-gray-400 dark:text-slate-500 font-medium"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={btnCls(p === page)}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === total}
        className={`${btnCls()} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none`}
      >
        <span className="hidden md:inline">Next</span>
        <span className="inline md:hidden">→</span>
      </button>
    </nav>
  );
};
