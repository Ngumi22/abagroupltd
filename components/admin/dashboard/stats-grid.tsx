import type { DashboardStat } from "@/lib/data/index";
import { StatCard } from "./stat-card";

export function StatsGrid({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
