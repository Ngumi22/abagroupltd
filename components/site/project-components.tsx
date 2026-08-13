import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "./shared";
import { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex min-h-80 overflow-hidden bg-ink"
    >
      <img
        src={project.image}
        alt={`${project.name} construction project in ${project.location}`}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
      <div className="relative mt-auto w-full p-6 text-paper">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[.18em] text-bronze">
            {project.type}
          </span>
          <ArrowUpRight
            size={16}
            className="text-bronze transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
        <h2 className="mt-2 font-serif text-3xl">{project.name}</h2>
        <p className="mt-1 flex items-center gap-2 text-xs text-paper/60">
          <MapPin size={12} />
          {project.location}
        </p>
      </div>
    </Link>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="bg-paper text-ink">
      <section className="relative flex min-h-130 items-end overflow-hidden bg-ink pb-16 pt-36 text-paper">
        <img
          src={project.image}
          alt={`${project.name} project exterior`}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-ink/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10">
          <Link
            href="/projects"
            className="mb-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-paper/70 transition hover:text-paper"
          >
            <ArrowLeft size={14} /> All projects
          </Link>
          <SectionLabel dark>
            {project.type} · {project.year}
          </SectionLabel>
          <h1 className="font-serif text-5xl sm:text-7xl">{project.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-paper/70">
            {project.summary}
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.3fr_.7fr] lg:px-10 lg:py-28">
        <div>
          <SectionLabel>Project story</SectionLabel>
          <p className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
            Built around the way people live, work, and gather.
          </p>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-ink/60">
            {project.description}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${project.name} detail ${index + 1}`}
                className="h-64 w-full object-cover"
              />
            ))}
          </div>
        </div>
        <aside className="h-fit border-t border-ink/20 pt-5">
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-bronze-dark">
                Location
              </dt>
              <dd className="mt-1">{project.location}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-bronze-dark">
                Year
              </dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-bronze-dark">
                Status
              </dt>
              <dd className="mt-1">{project.status}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-bronze-dark">
                Our scope
              </dt>
              <dd className="mt-2 grid gap-2">
                {project.scope.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          </dl>
          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-3 border border-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-widest transition hover:bg-ink hover:text-paper"
          >
            Start a project <ArrowUpRight size={15} />
          </Link>
        </aside>
      </section>
    </main>
  );
}
