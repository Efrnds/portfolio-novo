"use client";

import { useState, type MouseEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { Package, Scissors, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GaleriaImagens } from "@/components/galeria-imagens";

const SIZE_CLASS = {
  sm: "size-10",
  md: "size-14",
  lg: "size-16",
} as const;

const SIZE_PX = {
  sm: 40,
  md: 56,
  lg: 64,
} as const;

type CatalogoFotoSize = keyof typeof SIZE_PX;

type CatalogoFotoProps = {
  src?: string | null;
  /** Galeria completa; se omitido, usa só `src`. */
  fotos?: string[] | null;
  alt?: string;
  /** sm=40 · md=56 · lg=64 — ignorado se `fill` */
  size?: CatalogoFotoSize;
  fallback?: "servico" | "produto";
  className?: string;
  /** Prefer lazy for lists; eager for above-the-fold heroes only. */
  priority?: boolean;
  /**
   * Preenche o container pai (position relative + aspect).
   * Útil em cards de agendamento.
   */
  fill?: boolean;
  /** Abrir lightbox ao clicar (padrão: true se houver imagem). */
  galeria?: boolean;
};

const FALLBACK_ICON: Record<"servico" | "produto", LucideIcon> = {
  servico: Scissors,
  produto: Package,
};

function normalizarUrls(
  fotos?: string[] | null,
  src?: string | null,
): string[] {
  const fromArray = Array.isArray(fotos)
    ? fotos
        .filter((u): u is string => typeof u === "string")
        .map((u) => u.trim())
        .filter(Boolean)
    : [];
  if (fromArray.length > 0) return fromArray;
  if (typeof src === "string" && src.trim()) return [src.trim()];
  return [];
}

/**
 * Foto de catálogo (serviço/produto) via next/image.
 * Thumb de lista: moldura bem leve. Em modo `fill` (cards de agendamento)
 * a borda fica no card pai — não duplica frame aqui.
 * Em onError, mostra o ícone de fallback — nunca o ícone quebrado do browser.
 * Clique abre galeria ampliada (prev/next se houver várias fotos).
 */
export function CatalogoFoto({
  src,
  fotos,
  alt = "",
  size = "md",
  fallback = "servico",
  className,
  priority = false,
  fill = false,
  galeria = true,
}: CatalogoFotoProps) {
  const px = SIZE_PX[size];
  const FallbackIcon = FALLBACK_ICON[fallback];
  const galleryUrls = normalizarUrls(fotos, src);
  const url = galleryUrls[0] ?? "";
  const [failed, setFailed] = useState(false);
  const [galeriaAberta, setGaleriaAberta] = useState(false);
  const showImage = Boolean(url) && !failed;
  const podeAbrirGaleria = galeria && showImage && galleryUrls.length > 0;

  const abrirGaleria = (e: MouseEvent | KeyboardEvent) => {
    if (!podeAbrirGaleria) return;
    e.preventDefault();
    e.stopPropagation();
    setGaleriaAberta(true);
  };

  return (
    <>
      <div
        tabIndex={podeAbrirGaleria ? 0 : undefined}
        aria-label={podeAbrirGaleria ? "Ver fotos em tamanho maior" : undefined}
        onClick={podeAbrirGaleria ? abrirGaleria : undefined}
        onKeyDown={
          podeAbrirGaleria
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") abrirGaleria(e);
              }
            : undefined
        }
        className={cn(
          "relative shrink-0 overflow-hidden bg-muted/60 flex items-center justify-center",
          !fill && ["rounded-md border border-border/40", SIZE_CLASS[size]],
          fill && "size-full rounded-none border-0",
          podeAbrirGaleria && "cursor-zoom-in",
          className,
        )}
      >
        {showImage ? (
          fill ? (
            <Image
              src={url}
              alt={alt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 640px) 50vw, 240px"
              loading={priority ? undefined : "lazy"}
              priority={priority}
              onError={() => setFailed(true)}
              draggable={false}
            />
          ) : (
            <Image
              src={url}
              alt={alt}
              width={px}
              height={px}
              className="size-full object-cover pointer-events-none"
              sizes={`${px}px`}
              loading={priority ? undefined : "lazy"}
              priority={priority}
              onError={() => setFailed(true)}
              draggable={false}
            />
          )
        ) : (
          <FallbackIcon
            className={cn(
              "text-muted-foreground",
              fill ? "size-10" : "size-5",
            )}
            aria-hidden
          />
        )}
      </div>

      {podeAbrirGaleria && (
        <GaleriaImagens
          imagens={galleryUrls}
          open={galeriaAberta}
          onOpenChange={setGaleriaAberta}
          indiceInicial={0}
          alt={alt}
        />
      )}
    </>
  );
}
