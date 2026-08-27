import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/data/projects";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { ProjectDropdown } from "@/components/admin/projects/ProjectDropdown";
import { StatusBadge } from "@/components/admin/projects/StatusBadge";
import { requirePageAccess } from "@/lib/auth/require-page-access";

export default async function ProjectsPage() {
  await requirePageAccess({ lead: ["read"] });
  const projects = await getProjects();

  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Projects"
      description="Monitor active work, delivery status, and the portfolio records shown on the public site."
      action={
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper hover:bg-ink/90 transition-colors"
        >
          <Plus size={15} /> Add project
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group overflow-hidden border border-ink/10 bg-[#eee9df] relative"
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
              <div className="absolute right-2 top-2">
                <ProjectDropdown
                  projectId={project.id}
                  projectSlug={project.slug}
                  currentStatus={project.status}
                />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[.12em] text-bronze-dark">
                    {project.type}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl">{project.name}</h2>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-2 text-sm text-ink/55">{project.location}</p>
              {project.progress !== null && project.progress !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink/55">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-ink/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bronze rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {project.deliveryStatus && (
                <p className="mt-2 text-xs uppercase tracking-wider text-ink/55">
                  Delivery: {project.deliveryStatus}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="border border-dashed border-ink/20 bg-[#eee9df] p-10 text-center">
          <h2 className="font-serif text-2xl">No projects yet</h2>
          <p className="mt-2 text-sm text-ink/55">
            Add your first project to get started.
          </p>
        </div>
      )}
    </AdminPageFrame>
  );
}
