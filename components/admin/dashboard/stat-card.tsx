import type { DashboardStat } from "@/lib/data/index";

export function StatCard({ label, value, trend, icon: Icon }: DashboardStat) {
  return (
    <div className="border border-ink/10 bg-white/40 p-5">
      <div className="flex items-center justify-between text-bronze-dark">
        <span className="text-[10px] uppercase tracking-widest text-ink/55">
          {label}
        </span>
        <Icon size={17} />
      </div>
      <p className="mt-6 font-serif text-3xl">{value}</p>
      <p className="mt-1 text-xs text-ink/50">{trend}</p>
    </div>
  );
}
