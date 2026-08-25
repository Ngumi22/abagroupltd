"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Plus, X, type LucideIcon } from "lucide-react";

export const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

export function SettingsSection({
  icon: Icon,
  title,
  count,
  addLabel,
  addForm,
  children,
}: {
  icon: LucideIcon;
  title: string;
  count: number;
  addLabel: string;
  addForm: ReactNode;
  children: ReactNode;
}) {
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setIsAdding(false);
  }, [count]);

  return (
    <section className="border border-ink/10 bg-white/40 p-4 transition-colors hover:bg-white/50 sm:p-5 md:p-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Icon
            size={16}
            className="shrink-0 text-bronze-dark sm:h-4.5 sm:w-4.5"
          />
          <h2 className="truncate font-serif text-xl sm:text-2xl">{title}</h2>
          <span className="shrink-0 text-[10px] text-ink/40 sm:text-xs">
            {count}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding((v) => !v)}
          className="flex shrink-0 items-center gap-1 text-[9px] uppercase tracking-widest text-ink/60 transition hover:text-ink sm:text-[10px]"
        >
          {isAdding ? (
            <>
              <X size={12} className="sm:h-3.25 sm:w-3.25" /> Cancel
            </>
          ) : (
            <>
              <Plus size={12} className="sm:h-3.25 sm:w-3.25" /> {addLabel}
            </>
          )}
        </button>
      </div>

      <div className="mt-4 sm:mt-5">{children}</div>

      {isAdding && (
        <div className="mt-4 border-t border-ink/10 pt-4 sm:mt-5 sm:pt-5">
          {addForm}
        </div>
      )}
    </section>
  );
}

export function SettingsEmptyState({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 py-3 text-sm text-ink/50 sm:py-4">
      <Icon size={14} className="shrink-0 text-ink/30 sm:h-3.75 sm:w-3.75" />
      <span className="text-xs sm:text-sm">{label}</span>
    </div>
  );
}
