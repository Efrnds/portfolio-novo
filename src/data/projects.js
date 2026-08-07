export const projects = [
  {
    slug: "vwrks",
    title: "Vwrks",
    years: "2025",
    role: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    tagline:
      "High-performance portfolio and institutional site for a design practice.",
    summary:
      "Pixel-perfect Next.js site delivered for a client — responsive layouts, SEO, fast loads, Vercel hand-off.",
    description: [
      "Through Align Websites I designed and shipped a customized portfolio for design professionals (live at vwrks.cc).",
      "The brief demanded sophistication and speed: extensive imagery, clean hierarchy, and a hand-off the client could own on Vercel.",
      "Stack choice was intentional — Next.js for performance and image optimization, Tailwind for precise responsive layout control.",
    ],
    highlights: [
      "Client-facing delivery with SEO and performance focus",
      "Responsive, pixel-accurate UI across devices",
      "Production deploy and seamless client hand-off on Vercel",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      { label: "Live site", href: "https://vwrks.cc" },
      { label: "Agency", href: "https://www.align-websites.tech/" },
    ],
    images: [
      {
        src: "/images/vwrks-desktop-full.png",
        thumbnail: "/images/vwrks-desktop.png",
        alt: "Vwrks desktop layout",
      },
    ],
    cardImages: {
      mobile: "/images/vwrks-mobile.png",
      desktop: "/images/vwrks-desktop.png",
      tablet: "/images/vwrks-tablet.png",
    },
    featured: true,
  },
  {
    slug: "trato",
    title: "Trato",
    years: "2024 — Present",
    role: "Co-Founder & Full Stack Engineer",
    company: "Prisma Tech",
    tagline:
      "B2B SaaS for barbershop operations — scheduling, finance, and inventory in one product.",
    summary:
      "End-to-end product I architected and shipped for real businesses: service scheduling, financial tracking, inventory, and multi-tenant operations.",
    description: [
      "Trato is a complete B2B management platform for barbershops. As co-founder and full stack engineer at Prisma Tech, I own the product from architecture to production deployment.",
      "I designed the backend with Node.js, Express, Prisma ORM, and PostgreSQL; built the frontend with Next.js, TypeScript, Tailwind CSS, and Shadcn UI; and productionized the stack with Docker, Nginx Proxy Manager, reverse proxy, and SSL.",
      "The goal was never a demo — it was a maintainable product operators can rely on day to day.",
    ],
    highlights: [
      "Full system architecture and production launch",
      "Scheduling, financial tracking, and inventory modules",
      "Containerized deploy pipeline with reverse proxy and SSL",
      "Modern React/Next UI focused on daily operational workflows",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Shadcn UI",
      "Tailwind CSS",
    ],
    links: [],
    images: [],
    featured: true,
  },
  {
    slug: "property-system",
    title: "Property System",
    years: "2023 — 2024",
    role: "Full Stack Developer",
    company: "Texsa / Internal",
    tagline:
      "Web inventory system that replaced fragile spreadsheet asset tracking.",
    summary:
      "Asset management web app that made corporate inventory practical and secure at scale.",
    description: [
      "Excel stopped scaling when asset data grew. We replaced it with a web system for secure, multi-user inventory of company assets.",
      "Frontend in React, API in Node.js/Express with MySQL, styled with Tailwind. Alongside the app we built a reusable component library for future internal products.",
    ],
    highlights: [
      "Replaced spreadsheet workflows with a web application",
      "Auth, inventory CRUD, and maintainable architecture",
      "Shared component library for internal products",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    links: [],
    images: [
      {
        src: "/images/pat-notebook.png",
        thumbnail: "/images/pat-notebook.png",
        alt: "Property System interface",
      },
    ],
    cardImages: {
      mobile: "/images/pat-mobile.png",
      desktop: "/images/pat-notebook.png",
      tablet: "/images/pat-ipad.png",
    },
    featured: true,
  },
  {
    slug: "y",
    title: "Y",
    years: "2024",
    role: "Full Stack Developer",
    company: "Academic project",
    tagline:
      "Social-style platform built for a college course on backend and frontend engineering.",
    summary:
      "Team-built full stack app with auth, social features, custom API, and modern web stack.",
    description: [
      "Y was developed to run a college course focused on real backend and frontend practices.",
      "We shipped a custom API for authentication, follows, and data management using React, Node.js, Express, MySQL, and Tailwind — built as a reference for professional workflow rather than a throwaway assignment.",
    ],
    highlights: [
      "Custom auth and social features API",
      "Collaborative team delivery",
      "Stack mirroring production web apps",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    links: [
      { label: "GitHub — Efrnds", href: "https://github.com/Efrnds" },
      { label: "GitHub — Dankei", href: "https://github.com/dankei" },
      { label: "GitHub — Pedrordgsr", href: "https://github.com/pedrordgsr" },
      { label: "GitHub — WendrellBr", href: "https://github.com/wendrellBr" },
    ],
    images: [
      {
        src: "/images/y-desktop.png",
        thumbnail: "/images/y-desktop.png",
        alt: "Y project interface",
      },
    ],
    cardImages: {
      mobile: "/images/y-mobile.png",
      desktop: "/images/y-desktop.png",
      tablet: "/images/y-tablet.png",
    },
    featured: true,
  },
  {
    slug: "texsa-tools",
    title: "Corporate Internal Tools",
    years: "2021 — Present",
    role: "IT Operations & Software Developer",
    company: "Texsa do Brasil",
    tagline:
      "Mission-critical internal systems: gifting platform, IT helpdesk, and asset workflows.",
    summary:
      "Built and maintain the internal systems that replace spreadsheets and email chaos for inventory, orders, tickets, and equipment.",
    description: [
      "At Texsa do Brasil I develop and operate internal software used every day across the company — not side experiments, but production tools that support real operations.",
      "That includes a corporate gifting platform for inventory and client order management, plus a full IT helpdesk for tickets, users, equipment, reports, and asset history.",
      "Alongside app work I automated Windows fleets with autounattend.xml and keep network infrastructure reliable for every sector.",
    ],
    highlights: [
      "Corporate gifting platform (inventory + client orders)",
      "IT helpdesk: tickets, equipment, reports, notifications",
      "Automated Windows deployment reducing machine setup time",
      "Network infrastructure for multi-sector high availability",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "Express",
      "Tailwind CSS",
      "Windows Deployment",
    ],
    links: [],
    images: [],
    featured: true,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export const skills = {
  Frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Shadcn UI"],
  Backend: ["Node.js", "Express", "Prisma ORM", "RESTful APIs", "Go"],
  Database: ["PostgreSQL", "MySQL", "SQLite"],
  "DevOps & Infra": ["Docker", "Linux", "Nginx Proxy Manager", "CI/CD", "Proxmox"],
};
