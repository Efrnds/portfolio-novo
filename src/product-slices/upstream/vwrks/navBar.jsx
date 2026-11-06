"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Plus, ArrowLeft, ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import V from "./v"; // Importando o componente V
import mockProjects from "@/app/mock/projects.json";

const navigationLinks = [
  { href: "/trabalho", label: "TRABALHO" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/arquivo", label: "ARQUIVO" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(true);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectBgColor, setProjectBgColor] = useState(null);
  const [isProjectPage, setIsProjectPage] = useState(false);
  const [isWorkPage, setIsWorkPage] = useState(false);
  const [isArchivePage, setIsArchivePage] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Obter o projeto anterior
  const previousProject = useMemo(() => {
    if (currentProject) {
      const currentIndex = mockProjects.findIndex(
        (project) => project.id === currentProject.id
      );
      return mockProjects[currentIndex - 1] || null;
    }
    return null;
  }, [currentProject]);

  // Obter o próximo projeto
  const nextProject = useMemo(() => {
    if (currentProject) {
      const currentIndex = mockProjects.findIndex(
        (project) => project.id === currentProject.id
      );
      return mockProjects[currentIndex + 1] || null;
    }
    return null;
  }, [currentProject]);

  useEffect(() => {
    // Marcar o componente como montado
    setMounted(true);

    // Obter a rota atual sem a barra inicial
    const currentRoute = pathname.startsWith("/")
      ? pathname.substring(1)
      : pathname;

    // Encontrar o projeto correspondente no mockProjects
    const matchedProject = mockProjects.find(
      (p) =>
        p.projectRoute === pathname ||
        p.projectRoute === `/${currentRoute}` ||
        `/${p.projectName.toLowerCase()}` === pathname
    );

    if (matchedProject) {
      setCurrentProject(matchedProject);
      setProjectBgColor(matchedProject.bgColor);
      setIsProjectPage(true);
    } else {
      setCurrentProject(null);
      setProjectBgColor(null);
      setIsProjectPage(false);
    }

    // Set página atual
    setIsHomePage(pathname === "/");
    setIsAboutPage(pathname === "/sobre");
    setIsWorkPage(pathname === "/trabalho");
    setIsArchivePage(pathname === "/arquivo");
  }, [pathname]);

  // Aplicar cor de fundo do projeto à navbar
  useEffect(() => {
    if (projectBgColor) {
      // Selecionar todos os elementos com a classe navbar-gradient
      const navbarElements = document.querySelectorAll(".navbar-gradient");

      // Aplicar a cor de fundo a cada elemento
      navbarElements.forEach((element) => {
        element.style.animation = "none";
        element.style.backgroundColor = projectBgColor;
      });

      // Também aplicar a cor ao accordion mobile
      const accordionElement = document.querySelector(".mobile-accordion-menu");
      if (accordionElement) {
        accordionElement.style.animation = "none";
        accordionElement.style.backgroundColor = projectBgColor;
      }

      // Limpar ao desmontar
      return () => {
        navbarElements.forEach((element) => {
          element.style.animation = "gradientChange 15s ease infinite";
          element.style.backgroundColor = "";
        });

        if (accordionElement) {
          accordionElement.style.animation = "gradientChange 15s ease infinite";
          accordionElement.style.backgroundColor = "";
        }
      };
    }
  }, [projectBgColor]);

  // Sincronizar animação de gradiente entre html e elementos navbar-gradient
  useEffect(() => {
    if (!projectBgColor) {
      // Apenas sincronize quando não estiver em uma página de projeto (que tem cor específica)
      const htmlElement = document.documentElement;
      const navbarElements = document.querySelectorAll(".navbar-gradient");

      // Reiniciar a animação para sincronizar
      htmlElement.style.animation = "none";
      navbarElements.forEach((el) => {
        el.style.animation = "none";
      });

      // Forçar um reflow para aplicar as mudanças
      void htmlElement.offsetWidth;

      // Reiniciar a animação de gradiente com o mesmo tempo
      htmlElement.style.animation = "gradientChange 15s ease infinite";
      navbarElements.forEach((el) => {
        el.style.animation = "gradientChange 15s ease infinite";
      });
    }
  }, [mounted, projectBgColor]);

  // Adicionar evento de scroll para mostrar/ocultar botão de topo
  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão quando a página rolar mais de 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Função para rolar para o topo da página
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Função para voltar para a página anterior
  const handleGoBack = (e) => {
    e.preventDefault();

    // Para páginas de projetos: redirecionar para /trabalho
    if (isProjectPage) {
      router.push("/trabalho");
      return;
    }

    // Para páginas da navbar (trabalho, sobre, arquivo): redirecionar para o início
    if (isWorkPage || isAboutPage || isArchivePage) {
      router.push("/");
      return;
    }

    // Para outras páginas, comportamento padrão: voltar para a página anterior
    router.back();
  };

  // Função para mostrar logo (em trabalhos, arquivo e páginas de projetos)
  const shouldShowLogo = () => {
    return isWorkPage || isArchivePage || isProjectPage;
  };
  // Estilo inline para aplicar a cor do projeto (usado como fallback)
  const projectBgStyle = projectBgColor
    ? { backgroundColor: projectBgColor }
    : {};

  // Função para verificar se o link está ativo
  const isLinkActive = (href) => {
    return pathname === href;
  };

  return (
    <>
      {/* Logo fora da NavBar - apenas em desktop quando necessário */}
      {shouldShowLogo() && (
        <div className="hidden md:block">
          <V />
        </div>
      )}
      <nav className="hidden md:block w-full p-5 fixed top-0 left-0 z-50 mix-blend-difference">
        <div className="grid grid-cols-12 gap-4 w-full">
          {isHomePage ? (
            <>
              <div className="col-span-6"></div>
              <div className="col-span-3 flex justify-start items-center gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={`home-nav-${link.href}`}
                    href={link.href}
                    className={`font-regular w-fit text-white border-b-2 transition-colors ${
                      isLinkActive(link.href)
                        ? "border-b-white"
                        : "border-b-black hover:border-b-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="col-span-3 flex justify-end items-center"></div>
            </>
          ) : (
            <>
              <div className="col-span-6">
                <a
                  href="#"
                  onClick={handleGoBack}
                  className="flex items-center text-white border-b-2 border-b-black hover:border-b-white w-fit transition-colors "
                >
                  <ArrowLeft
                    size={17}
                    strokeWidth={3.5}
                    className="subpixel-antialiased mr-1"
                  />
                  VOLTAR
                </a>
              </div>
              <div className="col-span-4 flex justify-start items-center gap-4">
                <Link
                  href="/"
                  className={`text-white w-fit transition-colors border-b-2 ${
                    isLinkActive("/")
                      ? "border-b-white"
                      : "border-b-black hover:border-b-white"
                  }`}
                >
                  INÍCIO
                </Link>
                {navigationLinks.map((link) => (
                  <Link
                    key={`page-nav-${link.href}`}
                    href={link.href}
                    className={`text-white w-fit transition-colors border-b-2 text-authentic-sans-130 ${
                      isLinkActive(link.href)
                        ? "border-b-white"
                        : "border-b-black hover:border-b-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </nav>
      {/* NavBar Mobile no topo - Nova implementação */}
      {!isHomePage && (
        <nav className="md:hidden w-full p-4 fixed top-0 left-0 z-50 mix-blend-difference">
          <div className="flex items-center">
            <a
              href="#"
              onClick={handleGoBack}
              className="flex items-center text-white hover:underline transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={3.5} className="mr-1" />
              VOLTAR
            </a>
          </div>
        </nav>
      )}
      {/* Accordion Mobile Navigation no rodapé */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        {/* Accordion Menu */}
        <div
          className={`navbar-gradient mobile-accordion-menu transition-all duration-300 ease-in-out ${
            isAccordionOpen ? "h-fit opacity-100" : "max-h-0 opacity-0"
          }`}
          style={projectBgStyle}
        >
          {isAccordionOpen && (
            <div>
              {/* Separador no topo do menu */}
              <div className="border border-black w-full" />

              {/* Início */}
              <Link
                href="/"
                className="block py-4 mx-4 text-black font-authentic-sans-90 text-center transition group"
                onClick={() => setIsAccordionOpen(false)}
              >
                <span
                  className={`border-b-2 ${
                    isLinkActive("/")
                      ? "border-b-black"
                      : "border-b-transparent hover:border-b-black group-hover:border-b-black"
                  } transition`}
                >
                  INÍCIO
                </span>
              </Link>

              {/* Demais links */}
              {navigationLinks.map((link) => (
                <div key={`mobile-nav-${link.href}`}>
                  <hr className="border border-black mx-4" />
                  <Link
                    href={link.href}
                    className="block text-center text-black font-authentic-sans-90 mx-4 py-4 transition group"
                    onClick={() => setIsAccordionOpen(false)}
                  >
                    <span
                      className={`border-b-2 ${
                        isLinkActive(link.href)
                          ? "border-b-black"
                          : "border-b-transparent hover:border-b-black group-hover:border-b-black"
                      } transition`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </div>
              ))}

              {/* HR final para fechar o último item */}
              <hr className="border border-black mx-4" />
            </div>
          )}
        </div>

        {/* Botão de menu */}
        <div
          className={`w-full navbar-gradient text-black flex justify-between items-center ${
            isAccordionOpen ? "border-t-0" : "border-t-2"
          }`}
          style={projectBgStyle}
        >
          <button
            onClick={toggleAccordion}
            className="font-authentic-sans-90 text-base p-4 flex flex-col items-center text-center w-full"
          >
            <p className="w-fit mx-auto flex">
              {isAccordionOpen ? (
                <>
                  <ArrowDown size={16} className="m-auto mr-1" /> FECHAR
                </>
              ) : (
                <>
                  <Plus size={16} className="m-auto mr-1" /> MENU
                </>
              )}
            </p>
          </button>

          <div className="flex items-center">
            {shouldShowLogo() && <V height="56" width="56" />}
          </div>
        </div>
      </div>

      {/* Botão "Voltar ao Topo" e navegação entre projetos - agora com mix-blend-difference */}
      <div
        className={`fixed bottom-8 w-full z-50 transition-opacity duration-300 ease-in-out mix-blend-difference ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Versão desktop */}
        <div className="px-4 mx-auto">
          <div className="grid grid-cols-12 gap-4">
            {/* Botão "ANTERIOR" - apenas em páginas de projeto */}
            <div className="col-span-6">
              {isProjectPage && previousProject && (
                <Link
                  href={previousProject.projectRoute}
                  className="hidden text-white md:flex
                  font-bold transition-colors"
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={3.5}
                    className="mr-2 my-auto"
                  />
                  <span className="font-bold text-authentic-sans-130">
                    ANTERIOR: {previousProject.projectName.toUpperCase()}
                  </span>
                </Link>
              )}
            </div>

            {/* Botão "TOPO" - em todas as páginas */}
            <div className="col-span-1 ">
              <button
                onClick={handleGoToTop}
                className="hidden text-white md:flex justify-center items-center font-bold transition-colors"
              >
                <ArrowUp size={16} strokeWidth={3.5} className="mr-2" />
                <span className="font-bold text-authentic-sans-130">TOPO</span>
              </button>
            </div>

            {/* Botão "PRÓXIMO" - apenas em páginas de projeto */}
            <div className="col-span-5 flex justify-end">
              {isProjectPage && nextProject && (
                <Link
                  href={nextProject.projectRoute}
                  className="hidden text-white md:flex font-bold transition-colors"
                >
                  <span className="font-bold text-authentic-sans-130">
                    PRÓXIMO: {nextProject.projectName.toUpperCase()}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={3.5}
                    className="ml-2 my-auto"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Versão mobile - sem mix-blend-difference para manter clicável */}
      </div>
      <button
        onClick={handleGoToTop}
        className={`md:hidden z-20 flex items-center justify-center  fixed bottom-16 right-4 rounded-full transition-opacity ease-in-out duration-300 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Image
          src={"/cursors/click.svg"}
          className="rounded-full"
          width={30}
          height={30}
          alt=""
        />
      </button>
    </>
  );
}
