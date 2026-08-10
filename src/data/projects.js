/**
 * Image fields:
 * - cover: home list thumbnail
 * - gallery: ordered slides for the project page carousel
 *
 * Add dry screenshots under public/images and list them in cover/gallery.
 */
export const projects = [
  {
    slug: "trato",
    title: "Trato",
    years: "2024 - Present",
    role: "Co-Founder & Full Stack Engineer",
    company: "Prisma Tech",
    tagline: "B2B SaaS for barbershops: scheduling, finance, and inventory.",
    summary:
      "Full product from schema to deploy for real shops: scheduling, cashflow, stock, and multi-tenant setup.",
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
    links: [
      { label: "Website", href: "https://trato.prismapp.com.br" },
    ],
    cover: "/images/trato/login.png",
    gallery: [
      { src: "/images/trato/homepage.png", alt: "Homepage" },
      { src: "/images/trato/booking.png", alt: "Booking" },
      { src: "/images/trato/listing.png", alt: "Listing" },
      { src: "/images/trato/reports.png", alt: "Reports" },
      { src: "/images/trato/subscriptions.png", alt: "Subscriptions" },
      { src: "/images/trato/finances.png", alt: "Finances" },
      {
        src: "/images/trato/mobile.png",
        alt: "Mobile screen",
        aspect: "9/16",
      },
    ],
    featured: true,
  },
  {
    slug: "opinioteca",
    title: "Opinioteca",
    years: "2025 - Present",
    role: "Full Stack Engineer",
    company: "Personal product",
    tagline:
      "Social network for book lovers: reviews, shelves, reading diary, DMs, and discovery.",
    summary:
      "Full product with a Go API, Next.js app, PostgreSQL, WebSockets, and subscription tiers (OpinioTop / OpinioPro).",
    description: [
      "Opinioteca is a social network built around books. Users rate titles, keep a shelf and reading diary, message each other, explore recommendations, and move across free and paid plans.",
      "The backend is Go with PostgreSQL, session auth, file uploads, and real-time messaging over WebSocket. The frontend is Next.js (App Router) with Auth.js, Tailwind, and a full product UI (home, explore, books, profiles, admin).",
      "Admin covers users, books, reports, categories, and plan assignment. The API and app are designed to ship as a real multi-user product, not a course demo.",
    ],
    highlights: [
      "Go API with PostgreSQL, uploads, and WebSocket DMs",
      "Next.js app: social feed, shelves, reviews, discovery",
      "Subscription tiers (free, OpinioTop, OpinioPro)",
      "Admin for users, catalogs, reports, and plans",
    ],
    stack: [
      "Go",
      "PostgreSQL",
      "WebSocket",
      "Next.js",
      "React",
      "TypeScript",
      "Auth.js",
      "Tailwind CSS",
      "Docker",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/efrnds/opinioteca" },
      { label: "Website", href: "https://opinioteca.prismapp.com.br" },
    ],
    cover: "/images/opinioteca/login.png",
    gallery: [
      { src: "/images/opinioteca/login.png", alt: "Starting page" },
      { src: "/images/opinioteca/homepage.png", alt: "Homepage" },
      { src: "/images/opinioteca/explore.png", alt: "Explore" },
      { src: "/images/opinioteca/messages.png", alt: "Messages" },
      { src: "/images/opinioteca/profile.png", alt: "Profile" },
      {
        src: "/images/opinioteca/mobile.png",
        alt: "Mobile screen",
        aspect: "9/16",
      },
    ],
    featured: true,
  },
  {
    slug: "calmera-os",
    title: "Calmera OS",
    years: "2025 - Present",
    role: "Full Stack Engineer",
    company: "Personal project",
    tagline:
      "Ops tool I built for my wife's artisan candle hobby: stock, recipes, batches, sales, and cash.",
    summary:
      "Home system for candle making at home: inventory, recipes, production lots, sales, clients, expenses, and simple PDFs.",
    description: [
      "Calmera OS came out of a real need. My wife makes artisan candles as a hobby and needed a single place to control stock, recipes, production lots, sales, and money, instead of scattered notes and spreadsheets.",
      "I built the app so she can log materials with unit cost, keep production recipes, plan batches, register sales and expenses, track clients, and pull basic performance numbers. PDFs cover simple quotes and care cards.",
      "Stack is Next.js, React, TypeScript, Prisma (SQLite), and Tailwind. It is not a commercial SaaS pitch. It is software for someone at home who actually runs a small candle setup.",
    ],
    highlights: [
      "Built for my wife's home candle production",
      "Recipes and lots tied to stock and unit cost",
      "Sales, expenses, and simple cash views",
      "PDF quotes and care cards",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "SQLite",
      "Tailwind CSS",
      "Radix UI",
      "PDF",
    ],
    links: [
      {label: "Website", href: "https://calmera.prismapp.com.br/"},
    ],
    cover: "/images/calmera/hero.png",
    gallery: [
      { src: "/images/calmera/hero.png", alt: "Hero" },
      { src: "/images/calmera/catalog.png", alt: "Catalogs" },
      { src: "/images/calmera/cart.png", alt: "Cart" },
      { src: "/images/calmera/profile.png", alt: "Profile" },
      { src: "/images/calmera/collections.png", alt: "Collections" },
    ],
    featured: true,
  },
  {
    slug: "vwrks",
    title: "Vwrks",
    years: "2025",
    role: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    tagline: "Portfolio site for a designer, built for speed and SEO.",
    summary:
      "Next.js client site with responsive layouts, basic SEO, and a Vercel deploy so the client can own it.",
    description: [
      "Through Align Websites I shipped a portfolio for a designer, Victor Fernandes (live at vwrks.cc).",
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
      { label: "Website", href: "https://vwrks.cc" },
    ],
    cover: "/images/vwrks/home.png",
    gallery: [
      { src: "/images/vwrks/home.png", alt: "Homepage" },
      { src: "/images/vwrks/about.png", alt: "About" },
      { src: "/images/vwrks/project.png", alt: "Project" },
      { src: "/images/vwrks/works.png", alt: "Works" },
      { src: "/images/vwrks/archive.png", alt: "Archive" },
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
      "Internal apps for gifting, IT helpdesk, and equipment workflows.",
    summary:
      "I build and run the tools staff use for orders, tickets, and equipment instead of email chains and sheets.",
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

/**
 * Skills auto-built from project stacks so the site stays in sync
 * without hand-editing a second list every time.
 */
export function getSkillsFromProjects() {
  const buckets = {
    Frontend: new Set(),
    Backend: new Set(),
    Database: new Set(),
    "DevOps & Infra": new Set(),
  };

  const classify = (tech) => {
    const t = tech.toLowerCase();
    if (
      /react|next|typescript|tailwind|shadcn|radix|auth\.js|pdf/.test(t) &&
      !/api/.test(t)
    ) {
      return "Frontend";
    }
    if (/postgres|mysql|sqlite/.test(t)) return "Database";
    if (/docker|nginx|vercel|linux|ci\/cd|proxmox|windows/.test(t)) {
      return "DevOps & Infra";
    }
    if (/node|express|go|prisma|websocket|restful|api/.test(t)) {
      return "Backend";
    }
    return "Backend";
  };

  buckets["DevOps & Infra"].add("Linux");
  buckets["DevOps & Infra"].add("CI/CD");
  buckets["DevOps & Infra"].add("Proxmox");
  buckets.Backend.add("RESTful APIs");

  for (const project of projects) {
    for (const tech of project.stack) {
      buckets[classify(tech)].add(tech);
    }
  }

  // Prisma is ORM, keep it under backend
  if (buckets.Database.has("Prisma")) {
    buckets.Database.delete("Prisma");
    buckets.Backend.add("Prisma");
  }

  return Object.fromEntries(
    Object.entries(buckets).map(([k, set]) => [
      k,
      [...set].sort((a, b) => a.localeCompare(b)),
    ])
  );
}
