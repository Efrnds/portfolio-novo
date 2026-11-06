"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { experiences, educations } from "@/app/mock/experiences.json";

export default function Sobre() {
  const [isMobile, setIsMobile] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const timeoutRef = useRef(null);

  // Função para alternar visibilidade do conteúdo com animação
  const toggleContent = () => {
    if (isContentVisible) {
      // Fechando o conteúdo
      setIsContentVisible(false);
      // Definir um timeout para remover o conteúdo após a animação terminar
      timeoutRef.current = setTimeout(() => {
        setShouldRenderContent(false);
      }, 500); // Ajustado para 500ms para corresponder à duração da animação
    } else {
      // Abrindo o conteúdo
      // Limpar qualquer timeout existente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Primeiro definir o conteúdo visível, depois abrir
      setShouldRenderContent(true);
      // Pequeno delay antes de abrir para permitir a renderização inicial
      setTimeout(() => {
        setIsContentVisible(true);
      }, 50);
    }
  };

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Componente de imagem para reutilização
  const ProfileImageComponent = React.useMemo(() => {
    return () => (
      <div className="col-span-8 relative">
        <Image
          className="md:aspect-auto aspect-square w-full object-cover"
          src={"/assets/VF.png"}
          width={1000}
          height={2000}
          alt="Foto de Victor"
          quality={100}
          unoptimized
        />
        <Image
          className="absolute size-16 lg:size-32 -bottom-8 lg:-bottom-20 -right-8 lg:-right-20"
          src={"/assets/SVG/logo.svg"}
          width={128}
          height={128}
          alt="Logo"
          unoptimized
        />
      </div>
    );
  }, []); // Empty dependency array ensures it's only created once

  return (
    <div className="grid grid-cols-12 gap-4 pb-20 mt-14 md:my-20 p-4">
      <div
        className={`${isMobile ? "col-span-12" : "col-span-5"} flex flex-col `}
      >
        <div className="flex flex-col ">
          <h2 className="font-EditorialNew-regular md:text-titulo text-[32px] mb-6">
            Olá &#x1F44B; sou o Victor
          </h2>
          <p>
            Designer multidisciplinar e autodidata com foco em identidade
            visual.
            <br />
            <br />
          </p>
          <p>
            No momento atuo como freelancer, aberto a oportunidades full-time.
            Minha última posição foi de Designer para Identidades Visuais no
            Estúdio Kimura.
            <br />
            <br />
            Apesar da abordagem generalista, me aprofundo nas áreas de
            Identidade Visual e Direção Criativa. Tenho quase uma década de
            experiência com design no geral, e mais de 4 anos em IDV.
            <br />
            <br />
            Acredito no design feito com propósito, para e com pessoas.
          </p>
        </div>

        {/* Insere a imagem e os links quando estiver em modo mobile */}
        {isMobile && (
          <>
            <div className=" grid grid-cols-12 mt-16 relative">
              <ProfileImageComponent />
            </div>
            <div className="col-span-12 mt-10">
              <a
                href="mailto:hey@vwrks.cc"
                className="font-authentic-sans-90 text-authentic-sans-90"
              >
                hey@vwrks.cc
              </a>
              <div className="flex flex-col mt-12 gap-3 font-authentic-sans-130 text-authentic-sans-130">
                <a
                  href="https://www.linkedin.com/in/vwrks/"
                  target="_blank"
                  className="flex items-center text-sm hover:border-b-black transition border-b border-b-transparent w-fit "
                >
                  <span>LINKEDIN</span>
                  <Image
                    className="w-3 ml-2  transition-opacity"
                    src={"assets/SVG/seta-diagonal-2.svg"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.behance.net/vwrks_"
                  target="_blank"
                  className="flex items-center text-sm hover:border-b-black transition border-b border-b-transparent w-fit "
                >
                  <span>BEHANCE</span>
                  <Image
                    className="w-3 ml-2  transition-opacity"
                    src={"assets/SVG/seta-diagonal-2.svg"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.instagram.com/vwrks_/"
                  target="_blank"
                  className="flex items-center text-sm hover:border-b-black transition border-b border-b-transparent w-fit "
                >
                  <span>INSTRAGRAM</span>
                  <Image
                    className="w-3 ml-2  transition-opacity"
                    src={"assets/SVG/seta-diagonal-2.svg"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </a>
                <a
                  href="https://br.pinterest.com/vwrks_/"
                  target="_blank"
                  className="flex items-center text-sm hover:border-b-black transition border-b border-b-transparent w-fit "
                >
                  <span>PINTEREST</span>
                  <Image
                    className="w-3 ml-2  transition-opacity"
                    src={"assets/SVG/seta-diagonal-2.svg"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </a>
                <a
                  href="https://x.com/vwrks_"
                  target="_blank"
                  className="flex items-center text-sm hover:border-b-black transition border-b border-b-transparent w-fit "
                >
                  <span>TWITTER</span>
                  <Image
                    className="w-3 ml-2  transition-opacity"
                    src={"assets/SVG/seta-diagonal-2.svg"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </>
        )}

        {/* Botão para alternar visibilidade */}
        <div className="mt-16">
          <button
            onClick={toggleContent}
            className="font-authentic-sans-90 text-authentic-sans-90 text-xs transition-opacity group"
          >
            {/* Botão MINIMIZAR */}
            <div
              className={`flex items-center gap-2 whitespace-nowrap transition-opacity duration-500 ease-in-out border-b border-transparent hover:border-black ${
                isContentVisible
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none absolute"
              }`}
            >
              MINIMIZAR
              <Image
                src={"/assets/SVG/seta-cima.svg"}
                className="w-3"
                width={100}
                height={100}
                alt=""
              />
            </div>

            {/* Botão VER CURRÍCULO COMPLETO */}
            <div
              className={`flex items-center gap-2 whitespace-nowrap transition-opacity duration-500 ease-in-out border-b border-transparent hover:border-black ${
                isContentVisible
                  ? "opacity-0 pointer-events-none absolute"
                  : "opacity-100"
              }`}
            >
              VER CURRÍCULO COMPLETO
              <Image
                src={"/assets/SVG/seta-baixo.svg"}
                className="w-3"
                width={100}
                height={100}
                alt=""
              />
            </div>
          </button>
        </div>

        {/* Conteúdo com animação de transição */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isContentVisible ? "max-h-[5000px]" : "max-h-0"
          }`}
        >
          {shouldRenderContent && (
            <div
              className={`flex flex-col gap-16 mt-4 transition-all duration-500 ${
                isContentVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-16 opacity-0"
              }`}
            >
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-minecraft">SERVIÇOS:</p>
                <p>
                  Design, Direção Criativa, Branding & Identidade Visual, UX/UI,
                  3D, Edição de Vídeo, Design Gráfico e Editorial, dentre
                  outros.
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-minecraft">
                  EXPERIÊNCIAS:
                </p>
                {experiences.map((experience) => (
                  <div className="border-t-2 py-4" key={experience.id}>
                    <p>{experience.title}</p>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p>{experience.location}</p>
                        {experience.location2 && <p>{experience.location2}</p>}
                      </div>
                      <div className="flex flex-col">
                        <p>{experience.date}</p>
                        {experience.date2 && <p>{experience.date2}</p>}
                      </div>
                    </div>
                  </div>
                ))}
                <p>
                  Além disso, também tive a oportunidade de trabalhar com
                  clientes esporádicos em diferentes áreas, assim como em
                  gráficas locais.
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-minecraft">EDUCAÇÃO:</p>
                {educations.map((education) => (
                  <div className="border-t-2 py-4" key={education.id}>
                    <p>{education.title}</p>
                    <div className="flex justify-between">
                      <p>{education.location}</p>
                      <p>{education.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Renderiza a coluna de espaçamento e a imagem apenas quando não for mobile */}
      {!isMobile && (
        <>
          <div className="col-span-1"></div>
          <div className="col-span-2 h-fit gap-4 relative">
            <ProfileImageComponent />

            <div className="mt-32">
              <a href="mailto:hey@vwrks.cc">hey@vwrks.cc</a>
              <div className="flex flex-col mt-20">
                <div className="flex flex-col mt-12 gap-3 font-authentic-sans-130 text-authentic-sans-130">
                  <a
                    href="https://www.linkedin.com/in/vwrks/"
                    target="_blank"
                    className="flex items-center text-sm group transition hover:border-b-black w-fit border-b border-b-transparent"
                  >
                    <span>LINKEDIN</span>
                    <Image
                      className="w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      src={"assets/SVG/seta-diagonal-2.svg"}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.behance.net/vwrks_"
                    target="_blank"
                    className="flex items-center text-sm group transition hover:border-b-black w-fit border-b border-b-transparent"
                  >
                    <span>BEHANCE</span>
                    <Image
                      className="w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      src={"assets/SVG/seta-diagonal-2.svg"}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/vwrks_/"
                    target="_blank"
                    className="flex items-center text-sm group transition hover:border-b-black w-fit border-b border-b-transparent"
                  >
                    <span>INSTRAGRAM</span>
                    <Image
                      className="w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      src={"assets/SVG/seta-diagonal-2.svg"}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://br.pinterest.com/vwrks_/"
                    target="_blank"
                    className="flex items-center text-sm group transition hover:border-b-black w-fit border-b border-b-transparent"
                  >
                    <span>PINTEREST</span>
                    <Image
                      className="w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      src={"assets/SVG/seta-diagonal-2.svg"}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </a>
                  <a
                    href="https://x.com/vwrks_"
                    target="_blank"
                    className="flex items-center text-sm group transition hover:border-b-black w-fit border-b border-b-transparent"
                  >
                    <span>TWITTER</span>
                    <Image
                      className="w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      src={"assets/SVG/seta-diagonal-2.svg"}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
