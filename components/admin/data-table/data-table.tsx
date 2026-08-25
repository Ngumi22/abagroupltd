"use client";

import { Fragment, useMemo, useState } from "react";
import { Search } from "lucide-react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  searchValue?: (row: T) => string;
  hideBelow?: "sm" | "md" | "lg" | "xl";
  primary?: boolean;
  align?: "left" | "right";
}

const HIDE_BELOW_CLASS: Record<
  NonNullable<DataTableColumn<unknown>["hideBelow"]>,
  string
> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (row: T) => string;
  searchPlaceholder?: string;
  renderRowActions?: (row: T) => React.ReactNode;
  filters?: React.ReactNode;
  emptyMessage?: string;
  title?: string;
  description?: string;
  headerActions?: React.ReactNode;
  renderExpandedContent?: (row: T) => React.ReactNode;
  isRowExpanded?: (row: T) => boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = "Search…",
  renderRowActions,
  filters,
  emptyMessage = "No results found.",
  title,
  description,
  headerActions,
  renderExpandedContent,
  isRowExpanded,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const searchableColumns = useMemo(
    () => columns.filter((c) => c.searchValue),
    [columns],
  );

  const visible = useMemo(() => {
    if (!query.trim() || searchableColumns.length === 0) return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) =>
      searchableColumns.some((col) =>
        col.searchValue!(row).toLowerCase().includes(q),
      ),
    );
  }, [data, query, searchableColumns]);

  const primaryColumns = columns.filter((c) => c.primary);
  const secondaryColumns = columns.filter((c) => !c.primary);
  const colSpan = columns.length + (renderRowActions ? 1 : 0);

  return (
    <section className="w-full border border-ink/10 bg-white/40">
      {(title || headerActions) && (
        <div className="flex flex-col items-start gap-3 border-b border-ink/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 md:p-6">
          <div className="min-w-0 w-full sm:w-auto">
            {title && (
              <h3 className="truncate font-serif text-xl sm:text-2xl md:text-3xl">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-[10px] text-ink/50 sm:mt-1 sm:text-xs">
                {description}
              </p>
            )}
          </div>
          {headerActions && <div className="shrink-0">{headerActions}</div>}
        </div>
      )}

      <div className="flex flex-col gap-3 border-b border-ink/10 p-4 sm:p-5">
        {filters}
        {searchableColumns.length > 0 && (
          <div className="flex items-center gap-2 border border-ink/15 bg-white/60 px-3 py-2">
            <Search size={14} className="shrink-0 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </div>
        )}
      </div>

      <ul className="divide-y divide-ink/10 md:hidden">
        {visible.map((row) => {
          const expanded = isRowExpanded?.(row) ?? false;
          return (
            <li
              key={keyExtractor(row)}
              className="flex flex-col gap-2 px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-0.5">
                  {primaryColumns.map((col) => (
                    <div key={col.key} className="truncate text-sm">
                      {col.accessor(row)}
                    </div>
                  ))}
                </div>
                {renderRowActions && (
                  <div className="shrink-0">{renderRowActions(row)}</div>
                )}
              </div>
              {secondaryColumns.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/60">
                  {secondaryColumns.map((col) => (
                    <div key={col.key} className="min-w-0 max-w-full">
                      {col.accessor(row)}
                    </div>
                  ))}
                </div>
              )}
              {expanded && renderExpandedContent && (
                <div className="mt-1 border-t border-ink/10 pt-3">
                  {renderExpandedContent(row)}
                </div>
              )}
            </li>
          );
        })}
        {visible.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-ink/50">
            {emptyMessage}
          </p>
        )}
      </ul>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-150 text-left text-sm">
          <thead className="text-[9px] uppercase tracking-widest text-ink/40 sm:text-[10px]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-normal sm:px-5 sm:py-4 ${
                    col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : ""
                  } ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.header}
                </th>
              ))}
              {renderRowActions && <th className="px-4 py-3 sm:px-5 sm:py-4" />}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const expanded = isRowExpanded?.(row) ?? false;
              return (
                <Fragment key={keyExtractor(row)}>
                  <tr
                    key={keyExtractor(row)}
                    className="border-t border-ink/10 align-top"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 sm:px-5 sm:py-4 ${
                          col.hideBelow ? HIDE_BELOW_CLASS[col.hideBelow] : ""
                        } ${col.align === "right" ? "text-right" : ""}`}
                      >
                        {col.accessor(row)}
                      </td>
                    ))}
                    {renderRowActions && (
                      <td className="px-4 py-3 sm:px-5 sm:py-4">
                        {renderRowActions(row)}
                      </td>
                    )}
                  </tr>
                  {expanded && renderExpandedContent && (
                    <tr
                      key={`${keyExtractor(row)}-expanded`}
                      className="border-t border-ink/10 bg-[#eee9df]/40"
                    >
                      <td colSpan={colSpan} className="px-4 py-4 sm:px-5">
                        {renderExpandedContent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-ink/50">
            {emptyMessage}
          </p>
        )}
      </div>
    </section>
  );
}
