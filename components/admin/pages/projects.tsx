import { projects } from "@/lib/data";
import AdminPageFrame from "./AdminPageFrame";
import Image from "next/image";

export function ProjectsPage() {
  return (
    <AdminPageFrame
      eyebrow="Delivery studio"
      title="Projects"
      description="Monitor active work, delivery status, and the portfolio records shown on the public site."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="overflow-hidden border border-ink/10 bg-[#eee9df]"
          >
            <Image
              src={project.image}
              alt=""
              height={200}
              width={200}
              className="h-48 w-full object-cover"
            />
            <div className="p-3">
              <p className="text-xs uppercase tracking-[.12em] text-bronze-dark">
                {project.type} · {project.status}
              </p>
              <h2 className="mt-2 font-serif text-2xl">{project.name}</h2>
              <p className="mt-2 text-sm text-ink/55">{project.location}</p>
            </div>
          </article>
        ))}
      </div>
    </AdminPageFrame>
  );
}
