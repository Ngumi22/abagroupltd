import type { DashboardStat } from "@/lib/data/index";

export function StatCard({ label, value, trend, icon: Icon }: DashboardStat) {
  return (
    <div className="border border-ink/10 bg-white/40 p-2 transition-colors hover:bg-white/60 sm:p-3">
      <div className="flex items-center justify-between text-bronze-dark">
        <span className="text-[8px] uppercase tracking-widest text-ink/55 sm:text-[9px] md:text-[10px]">
          {label}
        </span>
        <Icon
          size={15}
          className="shrink-0 sm:h-4.25 sm:w-4.25 md:h-5 md:w-5"
        />
      </div>
      <p className="mt-4 font-serif text-lg sm:mt-5 sm:text-xl md:mt-6 md:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-ink/50 sm:mt-1.5 sm:text-xs">
        {trend}
      </p>
    </div>
  );
}
