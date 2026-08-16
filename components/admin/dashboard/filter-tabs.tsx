// components/admin/dashboard/filter-tabs.tsx
"use client";

interface FilterTabsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-ink/10 px-5 py-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-widest ${
            value === option ? "bg-bronze" : "text-ink/50 hover:text-ink"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
