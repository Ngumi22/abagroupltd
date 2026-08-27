"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  UserRound,
  FileText,
  Building2,
  Newspaper,
} from "lucide-react";
import { globalSearch, type SearchResult } from "@/lib/actions/search";

const TYPE_ICON = {
  lead: UserRound,
  inquiry: FileText,
  project: Building2,
  blog: Newspaper,
} as const;

const TYPE_LABEL = {
  lead: "Lead",
  inquiry: "Inquiry",
  project: "Project",
  blog: "Blog",
} as const;

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    setQuery("");
    setResults([]);
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const handle = setTimeout(() => {
      startTransition(async () => {
        const data = await globalSearch(query);
        setResults(data);
      });
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  function handleSelect(result: SearchResult) {
    setOpen(false);
    router.push(result.href);
  }

  return (
    <>
      <button
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="text-ink/70 transition-colors hover:text-ink"
      >
        <Search size={16} className="sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh]">
          <div
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-lg min-w-0 overflow-hidden rounded-lg bg-paper shadow-xl ring-1 ring-ink/10">
            <div className="flex w-full min-w-0 items-center gap-2 border-b border-ink/10 px-3 py-2.5">
              <Search size={16} className="shrink-0 text-ink/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads, inquiries, projects, blog posts…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-ink/40"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="shrink-0 text-ink/40 hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-80 w-full min-w-0 overflow-y-auto">
              {isPending && (
                <p className="px-3 py-6 text-center text-xs text-ink/50">
                  Searching…
                </p>
              )}
              {!isPending && query.trim().length < 2 && (
                <p className="px-3 py-6 text-center text-xs text-ink/50">
                  Type at least 2 characters to search.
                </p>
              )}
              {!isPending &&
                query.trim().length >= 2 &&
                results.length === 0 && (
                  <p className="px-3 py-6 text-center text-xs text-ink/50">
                    No results for &ldquo;{query}&rdquo;.
                  </p>
                )}
              {!isPending &&
                results.map((result) => {
                  const Icon = TYPE_ICON[result.type];
                  return (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result)}
                      className="flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-ink/5"
                    >
                      <Icon size={15} className="shrink-0 text-ink/40" />
                      <span className="min-w-0 flex-1 truncate text-sm">
                        {result.title}{" "}
                        <span className="text-xs text-ink/40">
                          {result.subtitle}
                        </span>
                      </span>
                      <span className="shrink-0 text-[10px] uppercase tracking-widest text-ink/40">
                        {TYPE_LABEL[result.type]}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
