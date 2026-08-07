/**
 * Image fields:
 * - cover: home list thumbnail
 * - gallery: ordered slides for the project page carousel
 *
 * Add dry screenshots under public/images and list them in cover/gallery.
 */
export const projects = [
  {
    slug: "vwrks",
    title: "Vwrks",
    years: "2025",
    role: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    tagline: "Portfolio site for a design studio, built for speed and SEO.",
    summary:
      "Next.js client site with responsive layouts, basic SEO, and a Vercel deploy clients can own.",
    description: [
      "Through Align Websites I shipped a portfolio for a design studio (live at vwrks.cc).",
      "The brief needed a clean layout, lots of images, and a simple deploy on Vercel.",
      "I used Next.js for routing and image handling, with Tailwind for the UI.",
    ],
    highlights: [
      "Client project with SEO and performance in mind",
      "Responsive layout across desktop and mobile",
      "Deployed on Vercel and handed off to the client",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      { label: "Live site", href: "https://vwrks.cc" },
      { label: "Agency", href: "https://www.align-websites.tech/" },
    ],
    cover: "/images/vwrks-desktop-full.png",
    gallery: [
      { src: "/images/vwrks-desktop-full.png", alt: "Vwrks homepage" },
      { src: "/images/vwrks-desktop.png", alt: "Vwrks desktop" },
      { src: "/images/vwrks-tablet.png", alt: "Vwrks tablet" },
      { src: "/images/vwrks-mobile.png", alt: "Vwrks mobile" },
    ],
    featured: true,
  },
  {
    slug: "trato",
    title: "Trato",
    years: "2024 - Present",
    role: "Co-Founder & Full Stack Engineer",
    company: "Prisma Tech",
    tagline:
      "B2B SaaS for barbershops: scheduling, finance, and inventory.",
    summary:
      "Full product I built from schema to deploy for real shops: scheduling, cashflow, stock, and multi-tenant setup.",
    description: [
      "Trato is a barbershop management platform. At Prisma Tech I own the stack from architecture to production.",
      "Backend is Node.js, Express, Prisma, and PostgreSQL. Frontend is Next.js, TypeScript, Tailwind, and Shadcn UI. Deploy runs on Docker with Nginx Proxy Manager for SSL.",
      "It has to hold up daily work in a shop, not just look good in a demo.",
    ],
    highlights: [
      "Product from architecture through production",
      "Scheduling, finance, and inventory modules",
      "Docker deploy with reverse proxy and SSL",
      "React/Next UI for day-to-day shop work",
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
    // cover: "/images/trato-01.png",
    // gallery: [
    //   { src: "/images/trato-01.png", alt: "Trato dashboard" },
    //   { src: "/images/trato-02.png", alt: "Trato scheduling" },
    // ],
    cover: null,
    gallery: [],
    featured: true,
  },
  {
    slug: "property-system",
    title: "Property System",
    years: "2023 - 2024",
    role: "Full Stack Developer",
    company: "Texsa / Internal",
    tagline: "Asset inventory that replaced spreadsheet tracking.",
    summary:
      "Internal web app for asset inventory, so staff stop wrestling with multi-sheet Excel.",
    description: [
      "Spreadsheets fell over once asset data grew. We built a web app for multi-user inventory.",
      "React front, Node/Express API, MySQL, Tailwind. We also extracted a small component set for other internal tools.",
    ],
    highlights: [
      "Moved inventory off spreadsheets",
      "Auth and CRUD for assets",
      "Shared UI pieces for later internal apps",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    links: [],
    cover: "/images/pat-notebook.png",
    gallery: [
      { src: "/images/pat-notebook.png", alt: "Property System asset detail" },
      { src: "/images/pat-ipad.png", alt: "Property System inventory list" },
      { src: "/images/pat-mobile.png", alt: "Property System login" },
    ],
    featured: true,
  },
  {
    slug: "y",
    title: "Y",
    years: "2024",
    role: "Full Stack Developer",
    company: "Academic project",
    tagline: "Social-style app for a college full stack course.",
    summary:
      "Team full stack app with auth, follow features, a custom API, and a standard React/Node stack.",
    description: [
      "Y was built for a college course that pushed real backend and frontend practice.",
      "We shipped auth, follows, and data APIs with React, Node.js, Express, MySQL, and Tailwind. Goal was to work like a real product, not a throwaway assignment.",
    ],
    highlights: [
      "Custom auth and social API",
      "Built with a team",
      "Stack close to real web apps",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    links: [
      { label: "GitHub (Efrnds)", href: "https://github.com/Efrnds" },
      { label: "GitHub (Dankei)", href: "https://github.com/dankei" },
      { label: "GitHub (Pedrordgsr)", href: "https://github.com/pedrordgsr" },
      { label: "GitHub (WendrellBr)", href: "https://github.com/wendrellBr" },
    ],
    cover: "/images/y-desktop.png",
    gallery: [
      { src: "/images/y-desktop.png", alt: "Y landing desktop" },
      { src: "/images/y-tablet.png", alt: "Y tablet" },
      { src: "/images/y-mobile.png", alt: "Y mobile" },
    ],
    featured: true,
  },
  {
    slug: "texsa-tools",
    title: "Corporate Internal Tools",
    years: "2021 - Present",
    role: "IT Operations & Software Developer",
    company: "Texsa do Brasil",
    tagline:
      "Internal apps for gifting, IT helpdesk, and asset workflows.",
    summary:
      "I build and run the tools staff use for inventory, orders, tickets, and equipment instead of email chains and sheets.",
    description: [
      "At Texsa I write and support internal software people use every day.",
      "That covers a corporate gifting platform (inventory and client orders) and an IT helpdesk for tickets, users, equipment, and reports.",
      "I also automate Windows deploys with autounattend.xml and keep the company network up for all sectors.",
    ],
    highlights: [
      "Gifting platform for inventory and orders",
      "IT helpdesk: tickets, equipment, reports",
      "Faster Windows machine setup via autounattend",
      "Network upkeep across company sectors",
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
    cover: null,
    gallery: [],
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
  "DevOps & Infra": [
    "Docker",
    "Linux",
    "Nginx Proxy Manager",
    "CI/CD",
    "Proxmox",
  ],
};
