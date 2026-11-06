"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import mockProjects from "@/app/mock/projects.json";
import SequenceImage from "@/app/componentes/SequenceImage";
import PagePreloader from "@/app/componentes/PagePreloader";
import ProgressivePreload from "@/app/componentes/ProgressivePreload";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export default function Trabalho() {
  const isMobileFlag = useIsMobile();
  const isMobile = isMobileFlag === true;
  const [currentImages, setCurrentImages] = useState({});
  const [mediaReady, setMediaReady] = useState(false);
  const intervalRefs = useRef({});
  const projectRefs = useRef({});

  const resolveSrc = (src) => {
    if (!src) return "/placeholder.svg";
    if (isMobile) return src.replace("/assets/pages/", "/assets/mobilepages/");
    return src;
  };

  // First frame of each project only — rest warms via SequenceImage after reveal
  const allTrabalhoSources = useMemo(
    () =>
      mockProjects
        .map((project) => {
          const first = (project.imagensTrabalho || [])[0];
          return first ? resolveSrc(first.src) : null;
        })
        .filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile]
  );

  const restTrabalhoSources = useMemo(
    () =>
      mockProjects.flatMap((project) =>
        (project.imagensTrabalho || [])
          .slice(1)
          .map((img) => resolveSrc(img.src))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile]
  );

  useEffect(() => {
    const initialImages = {};
    mockProjects.forEach((project) => {
      initialImages[project.id] = 0;
    });
    setCurrentImages(initialImages);

    mockProjects.forEach((project) => {
      projectRefs.current[project.id] =
        projectRefs.current[project.id] || { current: null };
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) return;

    const observers = {};
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px",
      threshold: [0.7, 0.8, 0.9],
    };

    const handleIntersection = (projectId) => (entries) => {
      entries.forEach((entry) => {
        const isHighlyVisible = entry.intersectionRatio >= 0.7;

        if (isHighlyVisible) {
          const project = mockProjects.find((p) => p.id === projectId);
          if (
            project?.imagensTrabalho.length > 1 &&
            !intervalRefs.current[projectId]
          ) {
            intervalRefs.current[projectId] = setInterval(() => {
              setCurrentImages((prev) => ({
                ...prev,
                [projectId]:
                  (prev[projectId] + 1) % project.imagensTrabalho.length,
              }));
            }, 400);
          }
        } else {
          if (intervalRefs.current[projectId]) {
            clearInterval(intervalRefs.current[projectId]);
            intervalRefs.current[projectId] = null;
          }
        }
      });
    };

    mockProjects.forEach((project) => {
      const element = projectRefs.current[project.id]?.current;
      if (element) {
        observers[project.id] = new IntersectionObserver(
          handleIntersection(project.id),
          observerOptions
        );
        observers[project.id].observe(element);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => {
        observer.disconnect();
      });

      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [isMobile]);

  useEffect(() => {
    // breakpoint change: clear hover/scroll frame intervals
    Object.values(intervalRefs.current).forEach((interval) => {
      if (interval) clearInterval(interval);
    });
    intervalRefs.current = {};
  }, [isMobile]);

  if (isMobileFlag === null) return null;

  const handleMouseEnter = (projectId) => {
    if (
      !isMobile &&
      mockProjects.find((p) => p.id === projectId)?.imagensTrabalho.length > 1
    ) {
      // avoid stacking intervals
      if (intervalRefs.current[projectId]) {
        clearInterval(intervalRefs.current[projectId]);
      }
      intervalRefs.current[projectId] = setInterval(() => {
        setCurrentImages((prev) => {
          const project = mockProjects.find((p) => p.id === projectId);
          const nextIndex =
            (prev[projectId] + 1) % project.imagensTrabalho.length;
          return { ...prev, [projectId]: nextIndex };
        });
      }, 400);
    }
  };

  const handleMouseLeave = (projectId) => {
    if (!isMobile && intervalRefs.current[projectId]) {
      clearInterval(intervalRefs.current[projectId]);
      intervalRefs.current[projectId] = null;
      setCurrentImages((prev) => ({ ...prev, [projectId]: 0 }));
    }
  };

  const renderProjectImage = (project, wide = false) => {
    const frames = (project.imagensTrabalho || []).map((img) => ({
      src: resolveSrc(img.src),
      alt: img.alt || `Trabalho ${project.titulo}`,
    }));

    return (
      <SequenceImage
        frames={frames}
        index={currentImages[project.id] || 0}
        alt={project.titulo}
        className={
          wide
            ? "w-full max-h-[944px] aspect-[2/1]"
            : "w-full max-h-[944px] aspect-square"
        }
        width={wide ? 2000 : 1000}
        height={wide ? 1125 : 1000}
        priority={project.id < 2 || wide}
      />
    );
  };

  return (
    <>
      <PagePreloader
        sources={allTrabalhoSources}
        minDuration={350}
        maxDuration={8000}
        onComplete={() => setMediaReady(true)}
      />
      {mediaReady && (
        <ProgressivePreload sources={restTrabalhoSources} enabled />
      )}
      <div
        className={`page-reveal ${mediaReady ? "is-ready" : ""}`}
        style={{
          visibility: mediaReady ? "visible" : "hidden",
          pointerEvents: mediaReady ? "auto" : "none",
        }}
      >
        <div className="grid gap-4 grid-cols-12 mt-14 md:my-20">
          <div className="px-4 grid grid-cols-12 col-span-12 gap-4 mb-16 md:mb-10">
            <p className="text-xs md:text-sm font-minecraft col-span-12">
              IDENTIDADE VISUAL & DIREÇÃO CRIATIVA
            </p>
            <h2 className="mt-auto h-fit font-EditorialNew-regular text-[32px] col-span-12 md:col-span-6 md:text-[64px] leading-none">
              Trabalhos Selecionados
            </h2>
            <div className="col-span-10 md:col-span-4 flex flex-col gap-4 py-2">
              <p className="font-authentic-sans-90 h-full text-xs md:text-base ">
                Essa é uma coleção com projetos que melhor representam meu
                trabalho de identidade visual e direção criativa.
              </p>
              <p className="font-authentic-sans-90 h-full text-xs col-span-12 md:col-span-6 md:text-base ">
                Para conhecer minha produção em outras áreas, visite o arquivo.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 h-fit p-4 md:pb-4 pb-32">
          {mockProjects.length % 2 === 0 || isMobile == true ? (
            <div className="grid grid-cols-12 gap-4 col-span-full">
              {mockProjects.map((project) => (
                <Link
                  className="col-span-12 md:col-span-6"
                  href={project.projectRoute}
                  key={project.id}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                  ref={(el) =>
                    (projectRefs.current[project.id] = { current: el })
                  }
                >
                  {renderProjectImage(project)}
                </Link>
              ))}
            </div>
          ) : (
            <div className=" grid grid-cols-12 gap-4 col-span-12">
              <Link
                className="col-span-full h-fit"
                href={mockProjects[0].projectRoute}
                onMouseEnter={() => handleMouseEnter(mockProjects[0].id)}
                onMouseLeave={() => handleMouseLeave(mockProjects[0].id)}
                ref={(el) =>
                  (projectRefs.current[mockProjects[0].id] = { current: el })
                }
              >
                {renderProjectImage(mockProjects[0], true)}
              </Link>
              <div className="grid grid-cols-12 gap-4 col-span-full">
                {mockProjects.slice(1).map((project) => (
                  <Link
                    className="col-span-12 md:col-span-6"
                    href={project.projectRoute}
                    key={project.id}
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project.id)}
                    ref={(el) =>
                      (projectRefs.current[project.id] = { current: el })
                    }
                  >
                    {renderProjectImage(project)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
