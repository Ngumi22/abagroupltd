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
    <div className="flex gap-1 overflow-x-auto border-b border-ink/10 px-3 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ink/20 sm:gap-2 sm:px-5 sm:py-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`whitespace-nowrap px-2 py-1.5 text-[8px] uppercase tracking-widest transition-colors sm:px-3 sm:py-2 sm:text-[10px] md:px-4 ${
            value === option
              ? "bg-bronze text-paper"
              : "text-ink/50 hover:text-ink hover:bg-ink/5"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
