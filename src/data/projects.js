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
    tagline: "One operating system for the appointments, money, and stock that shape a barbershop’s day.",
    summary:
      "A production B2B platform that brings booking, customer history, cash flow, subscriptions, and inventory into one daily workspace.",
    statement: "The shop’s day, from the first booking to the closing numbers.",
    description: [
      "Trato was created for barbershops that had appointments in one place, financial records in another, and stock decisions living in memory. The product turns those fragments into one operating routine.",
      "I co-founded the product and own its path from domain modeling to production: a Next.js interface, a Node and PostgreSQL backend, multi-tenant rules, recurring services, financial views, inventory, and a Docker deployment behind Nginx and SSL.",
      "The standard is practical: the agenda must stay clear during a busy day, the numbers must help the owner decide, and the system must remain maintainable after the first release.",
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
    cover: "/images/trato/homepage.webp",
    gallery: [
      { src: "/images/trato/homepage.webp", alt: "Homepage" },
      { src: "/images/trato/booking.webp", alt: "Booking" },
      { src: "/images/trato/listing.webp", alt: "Listing" },
      { src: "/images/trato/reports.webp", alt: "Reports" },
      { src: "/images/trato/subscriptions.webp", alt: "Subscriptions" },
      { src: "/images/trato/finances.webp", alt: "Finances" },
      {
        src: "/images/trato/mobile.webp",
        alt: "Mobile screen",
        aspect: "9/16",
      },
    ],
    featured: true,
    i18n: { pt: {
      role: "Cofundador e Engenheiro Full Stack", company: "Prisma Tech",
      tagline: "Um sistema operacional para agenda, dinheiro e estoque que moldam o dia da barbearia.",
      summary: "Uma plataforma B2B em produção que reúne agenda, histórico de clientes, caixa, assinaturas e estoque no mesmo espaço de trabalho.",
      statement: "O dia da barbearia, do primeiro agendamento ao fechamento do caixa.",
      description: [
        "O Trato nasceu para barbearias que mantinham os agendamentos em um lugar, o financeiro em outro e as decisões de estoque na memória. O produto transforma esses fragmentos em uma única rotina operacional.",
        "Cofundei o produto e cuido do caminho entre modelagem de domínio e produção: interface em Next.js, backend Node com PostgreSQL, regras multiempresa, serviços recorrentes, visão financeira, estoque e deploy em Docker com Nginx e SSL.",
        "O critério é prático: a agenda precisa continuar clara durante o movimento, os números precisam ajudar o proprietário a decidir e o sistema precisa permanecer sustentável depois da primeira versão.",
      ],
      highlights: ["Produto da arquitetura à operação em produção", "Agenda, clientes, financeiro e estoque conectados", "Ambiente multiempresa com serviços e assinaturas", "Deploy em Docker com proxy reverso e SSL"],
    } },
  },
  {
    slug: "opinioteca",
    title: "Opinioteca",
    years: "2025 - Present",
    role: "Full Stack Engineer",
    company: "Personal product",
    tagline:
      "A social network where discovering a book, recording a reading, and talking about it belong to the same experience.",
    summary:
      "A multi-user reading product with a Go API, social feed, personal shelves, reviews, realtime messages, moderation, and paid plans.",
    statement: "Books become identity, memory, and conversation.",
    description: [
      "Opinioteca treats reading as a social activity. A person can discover a title, understand what trusted readers thought, record progress, organize a shelf, publish a review, and continue the discussion in a direct message.",
      "I designed it as a real multi-user system: Go and PostgreSQL handle the API, sessions, uploads, catalog data, social relationships, and WebSocket conversations; Next.js provides the feed, discovery, book, profile, messaging, and administration surfaces.",
      "Free and paid plans shape product access, while moderation tools cover reports, users, categories, books, and plan assignment. The challenge is not displaying covers. It is making catalog data and human conversation feel like one network.",
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
    cover: "/images/opinioteca/homepage.webp",
    gallery: [
      { src: "/images/opinioteca/login.webp", alt: "Starting page" },
      { src: "/images/opinioteca/homepage.webp", alt: "Homepage" },
      { src: "/images/opinioteca/explore.webp", alt: "Explore" },
      { src: "/images/opinioteca/messages.webp", alt: "Messages" },
      { src: "/images/opinioteca/profile.webp", alt: "Profile" },
      {
        src: "/images/opinioteca/mobile.webp",
        alt: "Mobile screen",
        aspect: "9/16",
      },
    ],
    featured: true,
    i18n: { pt: {
      role: "Engenheiro Full Stack", company: "Produto pessoal",
      tagline: "Uma rede social em que descobrir um livro, registrar a leitura e conversar sobre ela fazem parte da mesma experiência.",
      summary: "Produto multiusuário com API em Go, feed social, estantes, avaliações, mensagens em tempo real, moderação e planos pagos.",
      statement: "Livros viram identidade, memória e conversa.",
      description: [
        "A Opinioteca trata leitura como atividade social. A pessoa descobre um título, entende o que leitores confiáveis acharam, registra o progresso, organiza a estante, publica uma avaliação e continua a conversa por mensagem.",
        "Projetei o produto como um sistema multiusuário real: Go e PostgreSQL cuidam da API, sessões, uploads, catálogo, relações sociais e conversas por WebSocket; o Next.js entrega feed, descoberta, livros, perfis, mensagens e administração.",
        "Planos gratuitos e pagos definem o acesso, enquanto as ferramentas de moderação cobrem denúncias, usuários, categorias, livros e atribuição de planos. O desafio não é exibir capas. É fazer catálogo e conversa humana parecerem uma única rede.",
      ],
      highlights: ["API em Go com PostgreSQL, uploads e mensagens via WebSocket", "Feed, estantes, avaliações, descoberta e perfis", "Planos gratuito, OpinioTop e OpinioPro", "Administração de catálogo, usuários, denúncias e planos"],
    } },
  },
  {
    slug: "calmera-os",
    title: "Calmera OS",
    years: "2025 - Present",
    role: "Full Stack Engineer",
    company: "Personal project",
    tagline:
      "A storefront and a quiet back office for the materials, recipes, batches, orders, and money behind home candle production.",
    summary:
      "A connected system for selling candles and understanding what it takes to produce each one at home.",
    statement: "Home production translated into a calm, connected system.",
    description: [
      "Calmera OS began with my wife’s candle-making routine. Materials, formulas, batches, sales, and expenses were related in practice but separated across notes and spreadsheets.",
      "The system connects the public storefront to the work behind it. Materials carry unit costs, recipes explain consumption, batches update production, and sales and expenses reveal a simple cash position. Quotes and care cards can leave as PDFs.",
      "It is intentionally smaller than a generic ERP. Next.js, Prisma, SQLite, and a focused interface keep the product appropriate for one person producing at home, the actual context it needs to serve.",
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
      { label: "Website", href: "https://calmera.prismapp.com.br/" },
    ],
    cover: "/images/calmera/hero.webp",
    gallery: [
      { src: "/images/calmera/hero.webp", alt: "Hero" },
      { src: "/images/calmera/catalog.webp", alt: "Catalogs" },
      { src: "/images/calmera/cart.webp", alt: "Cart" },
      { src: "/images/calmera/profile.webp", alt: "Profile" },
      { src: "/images/calmera/collections.webp", alt: "Collections" },
    ],
    featured: true,
    i18n: { pt: {
      role: "Engenheiro Full Stack", company: "Produto pessoal",
      tagline: "Uma loja e um backoffice tranquilo para materiais, receitas, lotes, pedidos e dinheiro da produção caseira de velas.",
      summary: "Um sistema conectado para vender velas e entender o que é necessário para produzir cada uma em casa.",
      statement: "Produção em casa traduzida em um sistema calmo e conectado.",
      description: [
        "O Calmera OS começou com a rotina de produção de velas da minha esposa. Materiais, fórmulas, lotes, vendas e despesas eram relacionados na prática, mas estavam separados entre anotações e planilhas.",
        "O sistema conecta a loja pública ao trabalho por trás dela. Materiais carregam custo unitário, receitas explicam consumo, lotes atualizam a produção e vendas e despesas revelam uma posição simples de caixa. Orçamentos e cartões de cuidado saem em PDF.",
        "Ele é intencionalmente menor do que um ERP genérico. Next.js, Prisma, SQLite e uma interface focada mantêm o produto adequado para uma pessoa produzindo em casa, que é o contexto real que precisa atender.",
      ],
      highlights: ["Criado para uma rotina real de produção caseira", "Receitas e lotes ligados a estoque e custo unitário", "Loja, clientes, vendas, despesas e caixa simples", "Orçamentos e cartões de cuidado em PDF"],
    } },
  },
  {
    slug: "vwrks",
    title: "Vwrks",
    years: "2025",
    role: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    tagline: "An image-led portfolio that preserves the designer’s voice without sacrificing speed, responsiveness, or ownership.",
    summary:
      "A client portfolio built around visual work, responsive composition, media performance, discoverability, and a clean handoff.",
    statement: "A visual archive where the work speaks first and the interface knows when to disappear.",
    description: [
      "Through Align Websites, I developed the portfolio of designer Victor Fernandes. The site needed to feel like his work rather than a template wrapped around it.",
      "The interface gives large images room to lead, while transitions, typography, and the changing background create rhythm between the home, archive, about, and project views.",
      "Next.js handles routing and media delivery; responsive layouts preserve the composition on smaller screens; SEO and Vercel deployment make the finished site discoverable and straightforward for the client to own.",
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
    cover: "/images/vwrks/home.webp",
    gallery: [
      { src: "/images/vwrks/home.webp", alt: "Homepage" },
      { src: "/images/vwrks/about.webp", alt: "About" },
      { src: "/images/vwrks/project.webp", alt: "Project" },
      { src: "/images/vwrks/works.webp", alt: "Works" },
      { src: "/images/vwrks/archive.webp", alt: "Archive" },
    ],
    featured: true,
    i18n: { pt: {
      role: "Engenheiro Frontend (Freelance)", company: "Align Websites",
      tagline: "Um portfólio guiado por imagens que preserva a voz do designer sem abrir mão de velocidade, responsividade ou autonomia.",
      summary: "Portfólio para cliente construído ao redor do trabalho visual, composição responsiva, desempenho de mídia, descoberta e handoff limpo.",
      statement: "Um arquivo visual em que o trabalho fala primeiro e a interface sabe quando desaparecer.",
      description: [
        "Pela Align Websites, desenvolvi o portfólio do designer Victor Fernandes. O site precisava parecer uma extensão do trabalho dele, não um template envolvendo as imagens.",
        "A interface dá espaço para imagens grandes conduzirem a leitura, enquanto transições, tipografia e a mudança de fundo criam ritmo entre home, arquivo, sobre e projetos.",
        "Next.js cuida das rotas e entrega de mídia; layouts responsivos preservam a composição em telas menores; SEO e publicação na Vercel tornam o resultado encontrável e simples para o cliente assumir.",
      ],
      highlights: ["Direção visual guiada pelo portfólio do cliente", "Composições responsivas com foco em mídia", "Tratamento de imagens, desempenho e SEO", "Publicação na Vercel e entrega para autonomia do cliente"],
    } },
  },
  {
    slug: "texsa-tools",
    title: "Internal Systems",
    years: "2021 - Present",
    role: "IT Operations & Software Developer",
    company: "Texsa do Brasil",
    tagline:
      "Internal software and IT operations that replace inbox chains, scattered sheets, and repetitive machine setup.",
    summary:
      "Tools and infrastructure for orders, tickets, equipment, deployment, and the daily continuity of work across the company.",
    statement: "When the internal system is clear, the rest of the company can keep moving.",
    description: [
      "At Texsa, software development and IT operations meet in the same responsibility: keep people equipped, unblock requests, and remove repeated manual work.",
      "I build and support a corporate gifting platform for inventory and client orders, plus an IT service desk for tickets, users, equipment history, and reporting. These tools move operational knowledge out of inboxes and individual spreadsheets.",
      "The same context includes Windows deployment automation and network support across departments. Working close to users turns problems into product requirements quickly, and the result can be verified in the routine it improves.",
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
    i18n: { pt: {
      title: "Sistemas Internos", role: "Operações de TI e Desenvolvimento", company: "Texsa do Brasil",
      tagline: "Software interno e operações de TI que substituem correntes de e-mail, planilhas dispersas e configuração repetitiva de máquinas.",
      summary: "Ferramentas e infraestrutura para pedidos, chamados, equipamentos, implantação e continuidade do trabalho diário da empresa.",
      statement: "Quando o sistema interno é claro, o restante da empresa consegue continuar andando.",
      description: [
        "Na Texsa, desenvolvimento de software e operações de TI se encontram na mesma responsabilidade: manter as pessoas equipadas, destravar solicitações e remover trabalho manual repetitivo.",
        "Construo e sustento uma plataforma de brindes corporativos para estoque e pedidos de clientes, além de uma central de serviços de TI para chamados, usuários, histórico de equipamentos e relatórios. Essas ferramentas tiram o conhecimento operacional de e-mails e planilhas individuais.",
        "O mesmo contexto inclui automação da instalação do Windows e suporte de rede entre setores. Trabalhar perto dos usuários transforma problemas em requisitos rapidamente, e o resultado pode ser verificado na rotina que melhora.",
      ],
      highlights: ["Plataforma de brindes para estoque e pedidos", "Central de TI para chamados, equipamentos e relatórios", "Instalação do Windows automatizada com autounattend", "Suporte de rede e continuidade entre setores"],
    } },
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
