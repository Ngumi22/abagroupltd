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
    <section className="border border-ink/10 bg-white/40 p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-bronze-dark" />
          <h2 className="font-serif text-2xl">{title}</h2>
          <span className="text-xs text-ink/40">{count}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding((v) => !v)}
          className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-ink/60 transition hover:text-ink"
        >
          {isAdding ? (
            <>
              <X size={13} /> Cancel
            </>
          ) : (
            <>
              <Plus size={13} /> {addLabel}
            </>
          )}
        </button>
      </div>

      <div className="mt-5">{children}</div>

      {isAdding && (
        <div className="border-t border-ink/10 pt-5 mt-5">{addForm}</div>
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
    <div className="flex items-center gap-2 py-4 text-sm text-ink/50">
      <Icon size={15} className="text-ink/30" />
      {label}
    </div>
  );
}
