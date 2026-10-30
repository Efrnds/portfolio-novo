/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const copy = {
  en: {
    nav: { about: "Approach", experience: "Experience", work: "Work", contact: "Start a project", menu: "Menu", close: "Close", language: "Language" },
    meta: {
      homeTitle: "Eduardo Fernandes | Full-stack & Systems Engineer",
      homeDescription: "Eduardo Fernandes builds product software, internal tools, and the infrastructure behind them, from interface to real operations.",
    },
    a11y: {
      skip: "Skip to content",
      home: "Eduardo Fernandes home",
      primaryNav: "Primary navigation",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      siteNav: "Site navigation",
      currentDetails: "Current details",
      socialLinks: "Social links",
      projectNav: "Project navigation",
      readCase: "Read the case study for",
      external: "opens in a new tab",
      chooseOpinioteca: "Choose a path through Opinioteca",
      calmeraViews: "Calmera product views",
      calmeraInterfaces: "More Calmera interfaces",
      vwrksArchive: "Vwrks page archive",
      carousel: {
        screenshots: "screenshots",
        expand: "Expand slide",
        previousScreenshot: "Previous screenshot",
        nextScreenshot: "Next screenshot",
        slides: "Slides",
        goTo: "Go to slide",
        thumbnail: "Thumbnail",
        instruction: "Drag, use the arrows, or click to expand",
        close: "Close image",
        previous: "Previous image",
        next: "Next image",
      },
    },
    hero: {
      eyebrow: "Eduardo Fernandes / Product engineer + IT operations",
      title: "I turn real routines into software people can rely on.",
      intro: "I design, build, deploy, and maintain digital products. My work starts with the person doing the job and continues through the infrastructure that keeps it working after launch.",
      primary: "Enter the work", secondary: "Start a conversation",
      note: "Product engineering with operational context, from interface decisions to production support.",
      products: "Products", practice: "Practice", current: "Current",
      practiceValue: "Product engineering and IT operations", currentValue: "Prisma Tech / Texsa do Brasil",
      status: "Status", statusValue: "Building products at Prisma Tech", based: "Based in", basedValue: "Umuarama, Brazil", across: "Working across", acrossValue: "Research / UI / API / Deploy / Support",
      scroll: "Scroll to enter",
    },
    experience: {
      eyebrow: "01 / The operating context",
      title: "The work does not end when the interface ships.",
      body: "I work across product engineering and IT operations. That combination changed how I build: I account for deployment, adoption, maintenance, and the person using the system under real pressure, not only the ideal flow in a mockup.",
      bridge: "From request to routine",
      roles: [
        ["Co-Founder & Full Stack Engineer", "Prisma Tech", "Jan 2024 – Present"],
        ["IT Operations & Software Developer", "Texsa do Brasil", "Oct 2021 – Present"],
        ["Frontend Engineer (Freelance)", "Align Websites", "Apr 2025 – Jun 2025"],
      ],
    },
    work: { eyebrow: "02 / Products in use", title: "Each project enters a different world because each one supports a different routine.", body: "The visuals change with the product, but the standard stays the same: understand the context, make the workflow legible, and leave behind something that can keep operating.", more: "Additional work", moreBody: "Client delivery and internal operations.", case: "Case" },
    homeCases: {
      ownership: "What I owned", ownershipValue: "Product decisions, architecture, interface, deployment, and ongoing maintenance.", readTrato: "Open the operating case", shop: "Barbershop operating view", production: "Live product", daily: "Daily operating surface",
      reader: "Reader network", readerModes: "Feed / catalog / realtime", surface: "Product promise", readOpinioteca: "Enter the reader network",
      calmeraNote: "Built for my wife’s real candle-making routine.", storefront: "Customer storefront", catalog: "Catalog connected to production", readCalmera: "Open the production journal",
    },
    case: { back: "Selected work", role: "Role", company: "Company", period: "Period", previous: "Previous case", next: "Next case", stack: "Technology stack" },
    sidebar: { sections: "Sections", projects: "Projects", contact: "Contact", resume: "Resume" },
    footer: { eyebrow: "Open channel", title: "Have a routine that deserves better software?", link: "Tell me what has to work", location: "Umuarama, Brazil / BRT", top: "Back to top" },
    details: {
      trato: { label: "Product case", caption: "The dashboard is a working surface for the shop, not a presentation screen.", problem: "The operating problem", heading: "Appointments, money, and stock were part of the same day, but lived in separate places.", owned: "Built and operated end to end", inside: "Inside the product", gallery: "Scheduling, financial visibility, and inventory inside one operating system." },
      opinioteca: { kicker: "A social product built around books", caption: "Reviews and reading activity form the main social surface.", room: "Inside the reader network", roomTitle: "A book becomes a conversation.", roomIntro: "Follow one reading habit from discovery to discussion and back to the shelf.", discover: "Find the next read", discoverNote: "Books, profiles, and recommendations meet in one discovery surface.", talk: "Talk with readers", talkNote: "Realtime conversations keep the community close to every book.", carry: "Carry the shelf", carryNote: "The social feed becomes part of a mobile reading routine.", surface: "What the product supports", stage: "Reader network", stageMeta: "Reviews / shelves / diary / messages" },
      calmera: { label: "Personal product", caption: "A storefront connected to the reality of home production.", why: "Why it exists", heading: "It was built for one person before it became a portfolio project.", system: "What the system keeps connected", catalog: "Catalog", cart: "Cart" },
      vwrks: { label: "Client portfolio", brief: "The brief", handoff: "A visual portfolio should feel authored, load quickly, and remain easy for the client to own.", pages: ["Homepage", "About", "Work", "Project", "Archive"] },
      texsa: { label: "Internal systems / ongoing practice", field: "Field report", log: "Work kept moving", heading: "Support, infrastructure, and internal tools are parts of the same responsibility.", stack: "Technologies used across the internal environment" },
    },
  },
  pt: {
    nav: { about: "Abordagem", experience: "Experiência", work: "Projetos", contact: "Iniciar projeto", menu: "Menu", close: "Fechar", language: "Idioma" },
    meta: {
      homeTitle: "Eduardo Fernandes | Engenharia Full Stack e Sistemas",
      homeDescription: "Eduardo Fernandes constrói produtos digitais, ferramentas internas e a infraestrutura que sustenta operações reais.",
    },
    a11y: {
      skip: "Ir para o conteúdo",
      home: "Início de Eduardo Fernandes",
      primaryNav: "Navegação principal",
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
      siteNav: "Navegação do site",
      currentDetails: "Detalhes atuais",
      socialLinks: "Links sociais",
      projectNav: "Navegação entre projetos",
      readCase: "Ler o estudo de caso de",
      external: "abre em uma nova aba",
      chooseOpinioteca: "Escolha um caminho pela Opinioteca",
      calmeraViews: "Telas do produto Calmera",
      calmeraInterfaces: "Outras interfaces do Calmera",
      vwrksArchive: "Arquivo de páginas do Vwrks",
      carousel: {
        screenshots: "capturas de tela",
        expand: "Ampliar slide",
        previousScreenshot: "Captura anterior",
        nextScreenshot: "Próxima captura",
        slides: "Slides",
        goTo: "Ir para o slide",
        thumbnail: "Miniatura",
        instruction: "Arraste, use as setas ou clique para ampliar",
        close: "Fechar imagem",
        previous: "Imagem anterior",
        next: "Próxima imagem",
      },
    },
    hero: {
      eyebrow: "Eduardo Fernandes / Engenharia de produto + operações de TI",
      title: "Transformo rotinas reais em software no qual as pessoas podem confiar.",
      intro: "Eu desenho, construo, publico e mantenho produtos digitais. Meu trabalho começa com quem executa a tarefa e continua na infraestrutura que mantém tudo funcionando depois do lançamento.",
      primary: "Entrar nos projetos", secondary: "Começar uma conversa",
      note: "Engenharia de produto com contexto operacional, das decisões de interface ao suporte em produção.",
      products: "Produtos", practice: "Atuação", current: "Agora",
      practiceValue: "Engenharia de produto e operações de TI", currentValue: "Prisma Tech / Texsa do Brasil",
      status: "Status", statusValue: "Construindo produtos na Prisma Tech", based: "Base", basedValue: "Umuarama, Brasil", across: "Atuação", acrossValue: "Pesquisa / UI / API / Deploy / Suporte",
      scroll: "Role para entrar",
    },
    experience: {
      eyebrow: "01 / O contexto operacional",
      title: "O trabalho não termina quando a interface vai ao ar.",
      body: "Atuo entre engenharia de produto e operações de TI. Essa combinação mudou minha forma de construir: considero publicação, adoção, manutenção e a pessoa usando o sistema sob pressão real, não apenas o fluxo ideal do mockup.",
      bridge: "Da solicitação à rotina",
      roles: [
        ["Cofundador e Engenheiro Full Stack", "Prisma Tech", "Jan 2024 – Atual"],
        ["Operações de TI e Desenvolvimento", "Texsa do Brasil", "Out 2021 – Atual"],
        ["Engenheiro Frontend (Freelance)", "Align Websites", "Abr 2025 – Jun 2025"],
      ],
    },
    work: { eyebrow: "02 / Produtos em uso", title: "Cada projeto entra em um mundo diferente porque cada um sustenta uma rotina diferente.", body: "O visual muda com o produto, mas o critério é o mesmo: entender o contexto, tornar o fluxo legível e entregar algo que continue funcionando.", more: "Outros trabalhos", moreBody: "Entrega para cliente e operação interna.", case: "Caso" },
    homeCases: {
      ownership: "Minha responsabilidade", ownershipValue: "Decisões de produto, arquitetura, interface, publicação e manutenção contínua.", readTrato: "Abrir o caso operacional", shop: "Operação da barbearia", production: "Produto em produção", daily: "Superfície de trabalho diário",
      reader: "Rede de leitores", readerModes: "Feed / catálogo / tempo real", surface: "Promessa do produto", readOpinioteca: "Entrar na rede de leitores",
      calmeraNote: "Criado para a rotina real de produção de velas da minha esposa.", storefront: "Loja para clientes", catalog: "Catálogo ligado à produção", readCalmera: "Abrir o diário de produção",
    },
    case: { back: "Projetos selecionados", role: "Função", company: "Empresa", period: "Período", previous: "Caso anterior", next: "Próximo caso", stack: "Tecnologias" },
    sidebar: { sections: "Seções", projects: "Projetos", contact: "Contato", resume: "Currículo" },
    footer: { eyebrow: "Canal aberto", title: "Tem uma rotina que merece um software melhor?", link: "Conte o que precisa funcionar", location: "Umuarama, Brasil / BRT", top: "Voltar ao topo" },
    details: {
      trato: { label: "Caso de produto", caption: "O painel é uma superfície de trabalho da barbearia, não uma tela de apresentação.", problem: "O problema operacional", heading: "Agenda, dinheiro e estoque faziam parte do mesmo dia, mas viviam em lugares separados.", owned: "Construído e operado de ponta a ponta", inside: "Por dentro do produto", gallery: "Agendamento, visão financeira e estoque dentro do mesmo sistema operacional." },
      opinioteca: { kicker: "Um produto social construído ao redor de livros", caption: "Avaliações e atividade de leitura formam a principal superfície social.", room: "Dentro da rede de leitores", roomTitle: "Um livro vira conversa.", roomIntro: "Acompanhe um hábito de leitura da descoberta à conversa e de volta para a estante.", discover: "Encontrar a próxima leitura", discoverNote: "Livros, perfis e recomendações se encontram na mesma superfície de descoberta.", talk: "Conversar com leitores", talkNote: "Conversas em tempo real mantêm a comunidade perto de cada livro.", carry: "Levar a estante", carryNote: "O feed social passa a fazer parte da rotina móvel de leitura.", surface: "O que o produto sustenta", stage: "Rede de leitores", stageMeta: "Avaliações / estantes / diário / mensagens" },
      calmera: { label: "Produto pessoal", caption: "Uma loja conectada à realidade da produção em casa.", why: "Por que existe", heading: "Foi criado para uma pessoa antes de virar projeto de portfólio.", system: "O que o sistema mantém conectado", catalog: "Catálogo", cart: "Carrinho" },
      vwrks: { label: "Portfólio para cliente", brief: "O briefing", handoff: "Um portfólio visual precisa parecer autoral, carregar rápido e continuar simples para o cliente assumir.", pages: ["Início", "Sobre", "Trabalhos", "Projeto", "Arquivo"] },
      texsa: { label: "Sistemas internos / prática contínua", field: "Relato de campo", log: "O trabalho continuou andando", heading: "Suporte, infraestrutura e ferramentas internas fazem parte da mesma responsabilidade.", stack: "Tecnologias usadas no ambiente interno" },
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("portfolio-language") || "pt");

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    copy: copy[language],
    localizeProject: (project) => ({ ...project, ...(project.i18n?.[language] || {}) }),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

LanguageProvider.propTypes = { children: PropTypes.node.isRequired };

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
