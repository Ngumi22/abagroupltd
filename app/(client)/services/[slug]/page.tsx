import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MoveRight } from "lucide-react";
import { getServiceBySlug, services } from "@/lib/data/services";
import { getProjects } from "@/lib/data/projects";
import { SectionLabel } from "@/components/site/shared";
import { SITE } from "@/lib/constants";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Aba Group Ltd`,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Aba Group Ltd`,
      description: service.tagline,
      url: `${SITE.siteUrl}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((project) => service.relatedProjectTypes.includes(project.type))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    provider: { "@type": "Organization", name: SITE.name },
    areaServed: "Kenya",
  };

  return (
    <main className="bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-100 items-end overflow-hidden bg-ink pb-14 pt-28 sm:pt-32">
        <div
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,17,19,.95),rgba(12,17,19,.55))] bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage})` }}
        />
        <div className="relative mx-auto w-full max-w-5xl px-5 text-paper lg:px-10">
          <span className="font-mono text-xs text-bronze">
            {service.number}
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-paper/65">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Overview + Ideal for */}
      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.3fr_.9fr]">
          <div className="space-y-5 text-sm leading-7 text-ink/60">
            <SectionLabel>Overview</SectionLabel>
            {service.overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="border border-ink/10 bg-white/40 p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-bronze-dark">
              Ideal for
            </h2>
            <ul className="mt-4 space-y-3">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-ink/70"
                >
                  <Check size={15} className="mt-0.5 shrink-0 text-bronze" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-ink px-5 py-16 text-paper lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel dark>What's included</SectionLabel>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            What you get.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-paper/15 pt-4 text-sm text-paper/70"
              >
                <Check size={15} className="mt-0.5 shrink-0 text-bronze" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Our process.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title} className="border-t border-ink/20 pt-4">
                <span className="font-mono text-xs text-bronze-dark">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-paper px-5 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>Related work</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl">
                  See it in practice.
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden items-center gap-2 text-[10px] uppercase tracking-widest text-bronze-dark sm:inline-flex"
              >
                View all projects <MoveRight size={13} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.slug}
                  className="group relative min-h-64 overflow-hidden bg-ink"
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} construction project`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                    <span className="text-[9px] uppercase tracking-[.18em] text-bronze">
                      {project.type}
                    </span>
                    <h3 className="mt-1 font-serif text-lg">{project.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-ink px-5 py-16 text-paper lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel dark>Questions</SectionLabel>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Frequently asked.
          </h2>
          <div className="mt-10 divide-y divide-paper/15">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-serif text-lg">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/60">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 border border-ink/10 bg-white/40 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">
              Ready to start your {service.title.toLowerCase()} project?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/60">
              Tell us about your project and we'll get back to you with next
              steps.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-3 bg-ink px-6 py-3 text-[10px] font-semibold uppercase tracking-[.18em] text-paper"
          >
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
