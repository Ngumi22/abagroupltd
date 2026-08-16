import { CheckCircle2, ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectPulse({ projects }: { projects: Project[] }) {
  return (
    <section className="border border-ink/10 bg-ink p-5 text-paper">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl">Project pulse</h3>
          <p className="mt-1 text-xs text-paper/50">Live delivery overview</p>
        </div>
        <button aria-label="Project settings">
          <Settings size={16} />
        </button>
      </div>
      <div className="mt-7 grid gap-6">
        {projects.map((project) => (
          <div key={project.slug}>
            <div className="flex justify-between">
              <div>
                <p className="text-sm">{project.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-paper/45">
                  {project.type}
                </p>
              </div>
              <span className="text-xs text-bronze">{project.progress}%</span>
            </div>
            <div className="mt-3 h-1 bg-paper/15">
              <div
                className="h-1 bg-bronze"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-paper/50">
              <CheckCircle2 size={13} className="text-bronze" />
              {project.deliveryStatus}
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/admin/projects"
        className="mt-8 inline-flex items-center gap-2 border-b border-bronze pb-1 text-[10px] uppercase tracking-widest"
      >
        View all projects <ChevronDown size={14} className="-rotate-90" />
      </Link>
    </section>
  );
}
