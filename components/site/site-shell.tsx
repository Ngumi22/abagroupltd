import { Logo } from "./shared";
import {
  About,
  Blogs,
  Contact,
  Hero,
  Process,
  ProjectsPreview,
  Services,
  Stats,
} from "./sections";

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-8 text-paper/60 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <Logo />
        <div>
          <p className="text-xs">Nairobi · Kenya</p>
          <div className="mt-3 flex gap-4">
            <a href="#contact" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="#contact" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest">
          © 2025 Aba Group Ltd
        </p>
      </div>
    </footer>
  );
}

export function PublicSite() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <ProjectsPreview />
      <Services />
      <Process />
      <Blogs />
      <Contact />
    </main>
  );
}
