import { ArrowUpRight, MoveRight } from "lucide-react";
import { process, services } from "@/lib/data";
import { Button, SectionLabel } from "./shared";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";
import type { Blog } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-130 items-end overflow-hidden bg-ink pb-14 pt-10 sm:min-h-160 sm:pb-16 sm:pt-28 lg:min-h-150 lg:pb-20 lg:pt-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,17,19,.98)_0%,rgba(12,17,19,.76)_40%,rgba(12,17,19,.08)_100%),linear-gradient(0deg,rgba(12,17,19,.7),transparent_45%),url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_360px] lg:px-10">
        <div className="max-w-2xl">
          <SectionLabel dark>Building Kenya&apos;s next chapter</SectionLabel>
          <h1 className="max-w-2xl font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[.98] text-paper">
            Built with <em className="text-bronze not-italic">intention.</em>
            <br />
            Made to endure.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-paper/65">
            Aba Group Ltd brings architecture, construction, and development
            together to create spaces that elevate how Kenya lives and works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/projects">Explore our work</Button>
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-2 py-3 text-[10px] uppercase tracking-[0.16em] text-paper/80"
            >
              Start a project <MoveRight size={15} className="text-bronze" />
            </Link>
          </div>
        </div>
        <div className="hidden self-end border-l border-paper/20 pl-6 lg:block">
          <p className="font-serif text-2xl text-paper">
            Spaces with a point of view.
          </p>
          <p className="mt-3 text-xs leading-5 text-paper/55">
            From first sketch to final handover, we make the process feel as
            considered as the result.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Stats({ projectsCompleted }: { projectsCompleted: number }) {
  const stats: [string, string][] = [
    ["12+", "Years of experience"],
    [`${projectsCompleted}`, "Projects completed"],
    ["98%", "Client satisfaction"],
    ["24", "Industry awards"],
  ];

  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
      <div className="grid grid-cols-2 border border-paper/10 bg-ink/95 p-5 shadow-2xl backdrop-blur sm:grid-cols-4 sm:p-7">
        {stats.map(([n, l]) => (
          <div
            key={l}
            className="border-paper/15 px-4 py-2 first:border-0 sm:border-l"
          >
            <strong className="font-serif text-3xl font-normal text-bronze">
              {n}
            </strong>
            <span className="mt-1 block text-[10px] uppercase tracking-wider text-paper/55">
              {l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section className="bg-paper pt-10 pb-16 text-ink lg:pt-14 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
        <div>
          <SectionLabel>Who we are</SectionLabel>
          <h2 className="max-w-md font-serif text-4xl leading-tight sm:text-5xl">
            More than builders.
            <br />
            <span className="text-bronze-dark">Partners in possibility.</span>
          </h2>
        </div>
        <div className="max-w-xl lg:pt-10">
          <p className="text-xl leading-8">
            We believe the best spaces begin with a better conversation.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-3 border-b border-bronze pb-2 text-[10px] font-semibold uppercase tracking-[.18em]"
          >
            Learn more about us{" "}
            <MoveRight size={15} className="text-bronze-dark" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);

  return (
    <section className="bg-paper pt-6 pb-20 text-ink lg:pt-8 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Places that{" "}
              <em className="text-bronze-dark not-italic">speak.</em>
            </h2>
          </div>
          <Button light href="/projects">
            View all projects
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="text-sm text-ink/50">No projects published yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Link
                href={`/projects/${p.slug}`}
                key={p.slug}
                className={`group relative min-h-72 overflow-hidden bg-ink ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} construction project`}
                  priority={i === 0}
                  fill
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                  <span className="text-[9px] uppercase tracking-[.18em] text-bronze">
                    {p.type}
                  </span>
                  <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
                  <p className="mt-1 text-xs text-paper/60">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Homepage teaser — shows 4 services, links out to the full /services page.
 *  Static content: no Service model exists yet in the schema. If services
 *  should be admin-editable, add a `Service` Prisma model + admin CRUD first. */
export function ServicesTeaser() {
  return (
    <section className="bg-ink pt-6 pb-20 text-paper lg:pt-8 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel dark>What we do</SectionLabel>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              End-to-end
              <br />
              <span className="text-bronze">expertise.</span>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-paper/55">
              One accountable team from the first idea to the final detail.
            </p>
            <Button href="/services">Explore services</Button>
          </div>
          <div className="grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.number}
                className="bg-ink p-6 transition duration-300 hover:bg-ink-soft"
              >
                <span className="font-mono text-xs text-bronze">
                  {service.number}
                </span>
                <h3 className="mt-8 font-serif text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/55">
                  {service.description}
                </p>
                <ArrowUpRight size={18} className="mt-8 text-bronze" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Static content: no ProcessStep model exists in the schema either. */
export function Process() {
  return (
    <section className="bg-paper pt-10 pb-20 text-ink lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionLabel>How we work</SectionLabel>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              A clearer path
              <br />
              to <span className="text-bronze-dark">better work.</span>
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step.title} className="border-t border-ink/20 pt-4">
                <span className="font-mono text-xs text-bronze-dark">
                  0{i + 1}
                </span>
                <h3 className="mt-8 font-serif text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Homepage teaser — shows 3 posts, links out to the full /blogs page */
export function BlogsTeaser({ blogs }: { blogs: Blog[] }) {
  const featured = blogs.slice(0, 3);

  return (
    <section className="bg-ink pt-6 pb-20 text-paper lg:pt-8 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <SectionLabel dark>From our journal</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Ideas for <span className="text-bronze">better places.</span>
            </h2>
          </div>
          <Button light href="/blogs">
            View all articles
          </Button>
        </div>

        {featured.length === 0 ? (
          <p className="text-sm text-paper/50">No articles published yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((blog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog.slug}
                className="group relative min-h-72 overflow-hidden border border-paper/15"
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[9px] uppercase tracking-widest text-bronze">
                    {blog.publishedAt ? formatDate(blog.publishedAt) : ""}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl">{blog.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-widest">
                    Read article <MoveRight size={13} className="text-bronze" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
