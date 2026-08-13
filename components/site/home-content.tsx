import {
  About,
  Contact,
  Hero,
  Blogs,
  Process,
  ProjectsPreview,
  Services,
  Stats,
} from "./sections";

export function HomeContent() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ProjectsPreview />
      <Services />
      <Process />
      <Blogs />
      <Contact />
    </>
  );
}
