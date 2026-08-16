import type { Metadata } from "next";
import {
  AboutTeaser,
  BlogsTeaser,
  Hero,
  Process,
  ProjectsPreview,
  ServicesTeaser,
  Stats,
} from "@/components/site/sections";
import { Contact } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Aba Group Ltd | Construction & Development in Kenya",
  description:
    "Aba Group Ltd brings architecture, construction, and development together to create spaces that elevate how Kenya lives and works.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <AboutTeaser />
      <ProjectsPreview />
      <ServicesTeaser />
      <Process />
      <BlogsTeaser />
      <Contact />
    </main>
  );
}
