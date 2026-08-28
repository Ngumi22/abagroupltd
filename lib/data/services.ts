export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  overview: string[];
  idealFor: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  /** Matches against Project.type to surface related work on this page. */
  relatedProjectTypes: string[];
}

export const services: Service[] = [
  {
    slug: "architecture-design",
    number: "01",
    title: "Architecture & Design",
    tagline: "Concepts that balance beauty, purpose, and the way people live.",
    description:
      "Concepts that balance beauty, purpose, and the way people live.",
    heroImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    overview: [
      "Every strong building starts with a design that understands how it will actually be used. Our architecture and design team works closely with you to translate ambition, budget, and site constraints into a concept that holds up from the first sketch to the final walkthrough.",
      "We handle concept design, space planning, structural coordination, and full architectural drawings — either as a standalone service or as the first phase of a complete build with Aba Group.",
    ],
    idealFor: [
      "Landowners with a site and an idea, but no drawings yet",
      "Homeowners planning a new build or major renovation",
      "Businesses needing architectural drawings for approval and construction",
    ],
    deliverables: [
      "Concept design and space planning",
      "Full architectural drawing set for approval",
      "3D visualizations of key spaces",
      "Coordination with structural and MEP engineers",
      "County approval and permit documentation support",
    ],
    process: [
      {
        title: "Discovery & site visit",
        description:
          "We walk the site with you, understand your budget and priorities, and review any existing survey or title documents.",
      },
      {
        title: "Concept design",
        description:
          "We develop initial layouts and massing options, and refine them with you until the direction feels right.",
      },
      {
        title: "Detailed drawings",
        description:
          "Once a concept is approved, we produce full architectural drawings ready for engineering coordination and county submission.",
      },
      {
        title: "Approvals & handover",
        description:
          "We support the approval process with the relevant county authority and hand over a construction-ready drawing set.",
      },
    ],
    faqs: [
      {
        question: "Do I need approved drawings before Aba Group can build?",
        answer:
          "Yes, in most cases county approval is required before construction begins. If you engage us for design, we carry the project through to approval before construction starts.",
      },
      {
        question: "Can you work from a concept I already have?",
        answer:
          "Yes. We regularly take an existing concept or reference images and develop them into full construction drawings.",
      },
      {
        question: "How long does the design phase typically take?",
        answer:
          "A typical residential design phase runs 4–8 weeks from initial concept to approval-ready drawings, depending on scope and how quickly feedback is turned around.",
      },
    ],
    relatedProjectTypes: ["Residential", "Mixed-use"],
  },
  {
    slug: "residential-construction",
    number: "02",
    title: "Residential Construction",
    tagline:
      "Thoughtfully built homes with rigorous attention to every detail.",
    description:
      "Thoughtfully built homes with rigorous attention to every detail.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    overview: [
      "From a single family home to a multi-unit residential development, we manage the full construction process with one accountable team — so you're never left coordinating between separate contractors and consultants.",
      "We work with approved drawings (yours or ours), manage procurement and site supervision, and keep you informed with regular progress updates throughout the build.",
    ],
    idealFor: [
      "Families building a new home from the ground up",
      "Landlords developing rental or multi-unit residential property",
      "Homeowners undertaking a major structural renovation",
    ],
    deliverables: [
      "Full site supervision and project management",
      "Materials procurement and quality control",
      "Structural, finishing, and MEP works",
      "Regular progress reporting and site visits",
      "Snagging and defects-free handover",
    ],
    process: [
      {
        title: "Pre-construction planning",
        description:
          "We finalize the build program, procurement plan, and site logistics before breaking ground.",
      },
      {
        title: "Foundation & structure",
        description:
          "Groundworks, foundation, and structural works are completed under continuous site supervision.",
      },
      {
        title: "Finishes & fit-out",
        description:
          "Plastering, flooring, electrical, plumbing, and finishing works are carried out to specification.",
      },
      {
        title: "Handover",
        description:
          "We walk the completed home with you, resolve any snags, and hand over with full documentation.",
      },
    ],
    faqs: [
      {
        question: "Can you build from my own architect's drawings?",
        answer:
          "Yes. We're happy to build from drawings you already have, and our team will review them for constructability before starting.",
      },
      {
        question: "How do you handle project delays?",
        answer:
          "We build realistic timelines up front and communicate proactively if site conditions or approvals cause a shift, so you're never caught off guard.",
      },
      {
        question: "Do you offer phased or staged construction?",
        answer:
          "Yes, particularly for larger residential builds. We can structure the build in stages to align with your cash flow.",
      },
    ],
    relatedProjectTypes: ["Residential"],
  },
  {
    slug: "commercial-builds",
    number: "03",
    title: "Commercial Builds",
    tagline: "High-performance spaces made for ambitious Kenyan businesses.",
    description:
      "High-performance spaces made for ambitious Kenyan businesses.",
    heroImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
    overview: [
      "Commercial construction comes with a different set of pressures — tighter timelines, regulatory compliance, and the need for a space that performs from day one of operation.",
      "We deliver offices, retail spaces, and mixed-use commercial developments with a focus on structural integrity, code compliance, and minimizing disruption to your business timeline.",
    ],
    idealFor: [
      "Businesses building or fitting out a new office or retail space",
      "Developers delivering commercial or mixed-use property",
      "Organizations expanding into a purpose-built facility",
    ],
    deliverables: [
      "Commercial-grade structural construction",
      "Code and regulatory compliance management",
      "Fire safety, accessibility, and MEP coordination",
      "Coordination with tenants and business stakeholders",
      "Certificate of occupancy support",
    ],
    process: [
      {
        title: "Feasibility & planning",
        description:
          "We review the site, use case, and regulatory requirements to confirm the project is viable as scoped.",
      },
      {
        title: "Design coordination",
        description:
          "We coordinate architectural, structural, and MEP design to meet commercial building codes.",
      },
      {
        title: "Construction",
        description:
          "Structural and finishing works proceed under a schedule built around minimizing disruption and cost overrun.",
      },
      {
        title: "Compliance & handover",
        description:
          "We support certificate of occupancy and compliance sign-off before final handover.",
      },
    ],
    faqs: [
      {
        question: "Can you work around our business's operating hours?",
        answer:
          "Yes, particularly for fit-outs and renovations of active premises — we can schedule noisy or disruptive works outside your operating hours where needed.",
      },
      {
        question: "Do you handle certificate of occupancy applications?",
        answer:
          "Yes, we support the full compliance process required to obtain occupancy certification with the relevant authorities.",
      },
      {
        question: "What size of commercial projects do you take on?",
        answer:
          "We take on projects ranging from single-tenant office fit-outs to multi-unit commercial developments — reach out with your scope and we'll advise on fit.",
      },
    ],
    relatedProjectTypes: ["Commercial", "Mixed-use"],
  },
  {
    slug: "interiors-fitouts",
    number: "04",
    title: "Interiors & Fit-outs",
    tagline: "Warm, functional interiors that make your space feel complete.",
    description:
      "Warm, functional interiors that make your space feel complete.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    overview: [
      "A well-built shell isn't a finished space. Our interiors and fit-out team handles everything from material selection to final styling, so the inside of your home or business matches the ambition of the build itself.",
      "We work on both new-build interior fit-outs and standalone renovation projects for existing spaces.",
    ],
    idealFor: [
      "Homeowners finishing a newly built home",
      "Businesses fitting out office or retail interiors",
      "Anyone renovating an existing space without a full rebuild",
    ],
    deliverables: [
      "Interior material and finish selection",
      "Custom joinery and built-in fixtures",
      "Lighting design and electrical fit-out",
      "Flooring, wall finishes, and ceiling detailing",
      "Furnishing and styling coordination",
    ],
    process: [
      {
        title: "Space assessment",
        description:
          "We assess the space, your functional needs, and your style direction before proposing finishes and layout.",
      },
      {
        title: "Material selection",
        description:
          "We present material and finish options aligned to your budget and design direction.",
      },
      {
        title: "Fit-out execution",
        description:
          "Our team carries out joinery, finishing, and installation works with close attention to detail.",
      },
      {
        title: "Styling & handover",
        description:
          "Final styling touches are added and the space is handed over ready to use.",
      },
    ],
    faqs: [
      {
        question: "Can you fit out a space Aba Group didn't build?",
        answer:
          "Yes, we regularly take on interior fit-out projects for existing structures built by others.",
      },
      {
        question: "Do you supply furniture, or just built-in fixtures?",
        answer:
          "We handle custom joinery and built-in fixtures directly, and can coordinate loose furniture procurement as part of the project if needed.",
      },
      {
        question: "How long does a typical fit-out take?",
        answer:
          "A single residential interior typically takes 3–6 weeks depending on scope; commercial fit-outs vary more depending on size and complexity.",
      },
    ],
    relatedProjectTypes: ["Residential", "Commercial"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
