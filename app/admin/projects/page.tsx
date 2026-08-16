import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/lib/data/projects";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Projects"
      description="Monitor active work, delivery status, and the portfolio records shown on the public site."
      action={
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper"
        >
          <Plus size={15} /> Add project
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="overflow-hidden border border-ink/10 bg-[#eee9df]"
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-[.12em] text-bronze-dark">
                {project.type} · {project.status}
              </p>
              <h2 className="mt-2 font-serif text-2xl">{project.name}</h2>
              <p className="mt-2 text-sm text-ink/55">{project.location}</p>
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
