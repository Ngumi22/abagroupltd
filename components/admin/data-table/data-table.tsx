"use client";

import { useMemo, useState } from "react";
import {
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { features, type DataTableFeatures } from "./data-table-features";

export interface DataTableColumnMeta {
  hideBelow?: "sm" | "md" | "lg" | "xl";
  primary?: boolean;
}

const HIDE_BELOW_CLASS: Record<
  NonNullable<DataTableColumnMeta["hideBelow"]>,
  string
> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  columnMeta?: Record<string, DataTableColumnMeta>;
  getSearchText?: (row: TData) => string;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  headerActions?: React.ReactNode;
  title?: string;
  description?: string;
  emptyMessage?: string;
  pageSize?: number;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  columnMeta = {},
  getSearchText,
  searchPlaceholder = "Search…",
  filters,
  headerActions,
  title,
  description,
  emptyMessage = "No results found.",
  pageSize = 10,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [query, setQuery] = useState("");

  const searchedData = useMemo(() => {
    if (!getSearchText || !query.trim()) return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) => getSearchText(row).toLowerCase().includes(q));
  }, [data, query, getSearchText]);

  const table = useTable({
    features,
    data: searchedData,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: { sorting, pagination },
  });

  const rows = table.getRowModel().rows;
  const primaryIds = Object.entries(columnMeta)
    .filter(([, m]) => m.primary)
    .map(([id]) => id);

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden border border-ink/10 bg-white/40">
      {(title || headerActions) && (
        <div className="flex w-full min-w-0 flex-col items-start gap-2 border-b border-ink/10 px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="truncate font-serif text-xl sm:text-2xl md:text-3xl">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 truncate text-[10px] text-ink/50 sm:mt-1 sm:text-xs">
                {description}
              </p>
            )}
          </div>
          {headerActions && <div className="shrink-0">{headerActions}</div>}
        </div>
      )}

      <div className="flex w-full min-w-0 flex-col gap-2 border-b border-ink/10 px-1.5 py-2">
        {filters}
        {getSearchText && (
          <div className="flex w-full min-w-0 items-center gap-2 border border-ink/15 bg-white/60 px-2">
            <Search size={12} className="shrink-0 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-w-0 bg-transparent py-1.5 text-xs outline-none placeholder:text-ink/40"
            />
          </div>
        )}
      </div>

      <ul className="w-full min-w-0 divide-y divide-ink/10 md:hidden">
        {rows.map((row) => {
          const allCells = row.getAllCells();
          const actionsCell = allCells.find((c) => c.column.id === "actions");
          const primaryCells = allCells.filter((c) =>
            primaryIds.includes(c.column.id),
          );
          const secondaryCells = allCells.filter(
            (c) =>
              c.column.id !== "actions" && !primaryIds.includes(c.column.id),
          );
          return (
            <li
              key={row.id}
              className="flex w-full min-w-0 flex-col gap-1.5 px-2 py-3"
            >
              <div className="flex w-full min-w-0 items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-0.5 overflow-hidden">
                  {primaryCells.map((cell) => (
                    <div key={cell.id} className="min-w-0 truncate text-sm">
                      <table.FlexRender cell={cell} />
                    </div>
                  ))}
                </div>
                {actionsCell && (
                  <div className="shrink-0">
                    <table.FlexRender cell={actionsCell} />
                  </div>
                )}
              </div>
              {secondaryCells.length > 0 && (
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink/60">
                  {secondaryCells.map((cell) => (
                    <div
                      key={cell.id}
                      className="min-w-0 max-w-full overflow-hidden"
                    >
                      <table.FlexRender cell={cell} />
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
        {rows.length === 0 && (
          <p className="px-2 py-8 text-center text-sm text-ink/50">
            {emptyMessage}
          </p>
        )}
      </ul>

      <div className="hidden w-full min-w-0 overflow-x-auto md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = columnMeta[header.column.id];
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        meta?.hideBelow ? HIDE_BELOW_CLASS[meta.hideBelow] : ""
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => {
                    const meta = columnMeta[cell.column.id];
                    return (
                      <TableCell
                        key={cell.id}
                        className={
                          meta?.hideBelow
                            ? HIDE_BELOW_CLASS[meta.hideBelow]
                            : ""
                        }
                      >
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-xs text-ink/50"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full min-w-0 items-center justify-between gap-3 border-t border-ink/10 px-2 py-3">
        <p className="truncate text-xs text-ink/50">
          Page {pagination.pageIndex + 1} of {table.getPageCount() || 1} ·{" "}
          {rows.length} results
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1 border border-ink/20 px-2 py-1 text-xs transition hover:bg-ink/5 disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1 border border-ink/20 px-2 py-1 text-xs transition hover:bg-ink/5 disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
