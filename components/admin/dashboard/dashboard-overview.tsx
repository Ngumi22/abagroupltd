import Link from "next/link";
import { Plus } from "lucide-react";
import type { DashboardStat, Lead, Project } from "@/lib/types";
import { StatsGrid } from "./stats-grid";
import { LeadsTable } from "./leads-table";
import { ProjectPulse } from "./project-pulse";

interface DashboardOverviewProps {
  stats: DashboardStat[];
  leads: Lead[];
  pulseProjects: Project[];
}

export function DashboardOverview({
  stats,
  leads,
  pulseProjects,
}: DashboardOverviewProps) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[.2em] text-bronze-dark">
            Overview
          </p>
          <h2 className="mt-2 font-serif text-4xl">
            Your business at a glance.
          </h2>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper"
        >
          <Plus size={15} /> Add project
        </Link>
      </div>

      <StatsGrid stats={stats} />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <LeadsTable leads={leads} />
        <ProjectPulse projects={pulseProjects} />
      </div>
    </>
  );
}
