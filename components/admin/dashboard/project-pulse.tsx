"use client";

import { CheckCircle2, ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectPulse({ projects }: { projects: Project[] }) {
  return (
    <section className="border border-ink/10 bg-ink p-4 text-paper sm:p-5 md:p-6 w-full">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-xl sm:text-2xl md:text-3xl">
            Project pulse
          </h3>
          <p className="mt-0.5 text-[10px] text-paper/50 sm:mt-1 sm:text-xs">
            Live delivery overview
          </p>
        </div>
        <button
          aria-label="Project settings"
          className="shrink-0 transition-opacity hover:opacity-70"
        >
          <Settings size={16} className="sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-6 md:mt-8 md:gap-7">
        {projects.map((project) => (
          <div key={project.slug} className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium sm:text-base">
                  {project.name}
                </p>
                <p className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-paper/45 sm:mt-1 sm:text-[10px]">
                  {project.type}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-bronze sm:text-base">
                {project.progress}%
              </span>
            </div>

            <div className="h-1.5 w-full bg-paper/15 sm:h-2">
              <div
                className="h-1.5 bg-bronze transition-all duration-500 sm:h-2"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-paper/50 sm:gap-2 sm:text-[10px]">
              <CheckCircle2
                size={12}
                className="shrink-0 text-bronze sm:h-3.25 sm:w-3.25"
              />
              <span className="truncate">{project.deliveryStatus}</span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/projects"
        className="mt-6 inline-flex items-center gap-2 border-b border-bronze pb-1 text-[9px] uppercase tracking-widest transition-colors hover:border-bronze/70 hover:text-bronze/80 sm:mt-8 sm:text-[10px]"
      >
        View all projects
        <ChevronDown size={12} className="-rotate-90 sm:h-3.5 sm:w-3.5" />
      </Link>
    </section>
  );
}
