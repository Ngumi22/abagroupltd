import type { Lead, ProcessStep, Service } from "./types";

export const services: Service[] = [
  {
    number: "01",
    title: "Architecture & Design",
    description:
      "Concepts that balance beauty, purpose, and the way people live.",
  },
  {
    number: "02",
    title: "Residential Construction",
    description:
      "Thoughtfully built homes with rigorous attention to every detail.",
  },
  {
    number: "03",
    title: "Commercial Builds",
    description:
      "High-performance spaces made for ambitious Kenyan businesses.",
  },
  {
    number: "04",
    title: "Interiors & Fit-outs",
    description:
      "Warm, functional interiors that make your space feel complete.",
  },
];

export const process: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We listen closely to your vision, brief, budget, and ambition.",
  },
  {
    title: "Design",
    description:
      "We turn the brief into a clear, buildable and beautiful plan.",
  },
  {
    title: "Build",
    description:
      "Our team delivers with quality control and open communication.",
  },
  {
    title: "Handover",
    description:
      "We finish carefully and stay close beyond the final walk-through.",
  },
];

export const leads: Lead[] = [
  {
    name: "Wanjiku & Co.",
    project: "Commercial build",
    status: "New lead",
    date: "Today",
  },
  {
    name: "David Kamau",
    project: "Residential build",
    status: "Proposal sent",
    date: "Yesterday",
  },
  {
    name: "Mara Foundation",
    project: "Office fit-out",
    status: "Site visit",
    date: "Mon, 12 May",
  },
  {
    name: "Njeri Residence",
    project: "Residential build",
    status: "Qualified",
    date: "Sun, 11 May",
  },
];
