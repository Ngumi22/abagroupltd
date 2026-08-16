import type { Blog, Lead, ProcessStep, Project, Service } from "./types";

export const projects: Project[] = [
  {
    slug: "kilimani-house",
    name: "Kilimani House",
    type: "Residential",
    location: "Nairobi, Kenya",
    year: "2024",
    status: "Completed",
    summary:
      "A calm, light-filled family home shaped around indoor-outdoor living.",
    description:
      "Kilimani House is a contemporary family residence designed for generous daylight, natural ventilation, and easy connection to the garden. Aba Group led the project from architectural design through construction and handover.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    ],
    scope: [
      "Architecture & design",
      "Construction management",
      "Interior fit-out",
    ],
  },
  {
    slug: "the-foundry",
    name: "The Foundry",
    type: "Commercial",
    location: "Westlands, Nairobi",
    year: "2023",
    status: "Completed",
    summary:
      "A flexible commercial address for a growing creative business community.",
    description:
      "The Foundry transforms a compact Westlands site into a warm, flexible workplace with a durable material palette and carefully considered shared spaces.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    ],
    scope: ["Commercial build", "Project management", "Landscape coordination"],
    progress: 62,
    deliveryStatus: "On track",
  },
  {
    slug: "muthaiga-villa",
    name: "Muthaiga Villa",
    type: "Residential",
    location: "Muthaiga, Kenya",
    year: "2025",
    status: "In progress",
    summary:
      "A private villa balancing quiet interiors with a generous garden edge.",
    description:
      "Muthaiga Villa is a bespoke home in progress, planned as a series of connected, human-scale volumes around a planted courtyard.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    ],
    scope: [
      "Residential construction",
      "Interiors",
      "Client-side coordination",
    ],
    progress: 100,
    deliveryStatus: "Completed",
  },
  {
    slug: "athi-river-offices",
    name: "Athi River Offices",
    type: "Commercial",
    location: "Athi River, Kenya",
    year: "2022",
    status: "Completed",
    summary:
      "A practical, bright workplace built for collaboration and growth.",
    description:
      "Athi River Offices brings durable construction and adaptable planning together for a growing logistics company.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85",
    ],
    scope: ["Commercial build", "Space planning", "Construction delivery"],
    progress: 100,
    deliveryStatus: "Completed",
  },
];

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

export const blogs: Blog[] = [
  {
    title: "Designing for Kenya’s climate",
    date: "May 22, 2025",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "What makes a home feel like yours?",
    date: "April 09, 2025",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Materials that last generations",
    date: "March 14, 2025",
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d7a0?auto=format&fit=crop&w=900&q=80",
  },
];
