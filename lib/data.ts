import type {
  GalleryImage,
  Lead,
  ProcessStep,
  Service,
  Testimonial,
} from "./types";

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

const gallerySources = [
  "1600607687920-4e2a09cf159d",
  "1486406146926-c627a92ad1ab",
  "1600566753190-17f0baa2a6c3",
  "1497366811353-6870744d04b2",
  "1600210492486-724fe5c67fb0",
  "1511818966892-d7d671e672a2",
  "1531835551805-16d864c8d7a0",
  "1600585154340-be6161a56a0c",
  "1600566753086-00f18fb6b3ea",
  "1600047509807-ba8f99d2cdde",
  "1600607688969-a5bfcd646154",
  "1600607688066-890987f18a86",
  "1600566753086-00f18fb6b3ea",
  "1494526585095-c41746248156",
  "1600573472550-8090a52a79b1",
  "1600607687939-ce8a6c25118c",
  "1600210492486-724fe5c67fb0",
  "1600607687920-4e2a09cf159d",
];
export const galleryImages: GalleryImage[] = gallerySources.map(
  (photoId, index) => ({
    id: `gallery-${index + 1}`,
    slug: `aba-gallery-${index + 1}`,
    title: `Construction study ${String(index + 1).padStart(2, "0")}`,
    category:
      index % 3 === 0
        ? "Architecture"
        : index % 3 === 1
          ? "Interiors"
          : "Craft & detail",
    alt: `Aba Group construction and design project image ${index + 1}`,
    src: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1400&q=85`,
    width: 1400,
    height: 1050,
    featured: index < 15,
    sortOrder: index + 1,
  }),
);

export const testimonialReviews: Testimonial[] = [
  {
    id: "review-1",
    quote:
      "Aba Group brought structure to a complex build and delivered a home that feels considered in every detail.",
    name: "Miriam W.",
    role: "Homeowner",
    project: "Kilimani House",
    source: "Google",
    rating: 5,
  },
  {
    id: "review-2",
    quote:
      "Clear communication, reliable site teams, and a finish that reflects the quality we wanted for our workplace.",
    name: "Brian O.",
    role: "Managing Director",
    project: "The Foundry",
    source: "LinkedIn",
    rating: 5,
  },
  {
    id: "review-3",
    quote:
      "From the first conversation to handover, the team listened well and kept the process calm and transparent.",
    name: "Aisha K.",
    role: "Property developer",
    project: "Muthaiga Villa",
    source: "Instagram",
    rating: 5,
  },
];
