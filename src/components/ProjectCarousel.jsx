import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { GrClose } from "react-icons/gr";
import { getProjectSlides } from "../utils/gallery";

export default function ProjectCarousel({ project, className = "" }) {
  const slides = getProjectSlides(project);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);

  const count = slides.length;
  const current = slides[index];

  const go = useCallback(
    (next) => {
      if (count <= 1) return;
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [count, index]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    setIndex(0);
    setDirection(0);
  }, [project.slug]);

  useEffect(() => {
    if (!lightbox) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, next, prev]);

  useEffect(() => {
    if (lightbox || count <= 1) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, count, next, prev]);

  if (!count) return null;

  const variants = {
    enter: (dir) => ({
      x: reduced ? 0 : dir > 0 ? 48 : -48,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: reduced ? 0 : dir > 0 ? -48 : 48,
      opacity: 0,
    }),
  };

  const onPointerDown = (e) => setDragStartX(e.clientX);
  const onPointerUp = (e) => {
    if (dragStartX == null) return;
    const delta = e.clientX - dragStartX;
    setDragStartX(null);
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section
      className={`w-full ${className}`}
      aria-roledescription="carousel"
      aria-label={`${project.title} screenshots`}
    >
      <div
        className="relative w-full border border-black/15 bg-[#1a1a1a] overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[72vh]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.button
              key={current.src + index}
              type="button"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduced ? 0.15 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-zoom-in"
              onClick={() => setLightbox(true)}
              aria-label={`Expand slide ${index + 1}: ${current.alt}`}
            >
              <img
                src={current.src}
                alt={current.alt}
                draggable={false}
                className="w-full h-full object-cover object-top"
              />
            </motion.button>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#f0f0e9] text-black hover:bg-white transition-colors"
              aria-label="Previous screenshot"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#f0f0e9] text-black hover:bg-white transition-colors"
              aria-label="Next screenshot"
            >
              →
            </button>
          </>
        )}

        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-6 gap-4">
          <p className="text-xs sm:text-sm tabular-nums tracking-[0.18em] text-white/80">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>

          {count > 1 && (
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Slides"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-[#f0f0e9]"
                      : "w-3 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          <p className="hidden sm:block text-xs uppercase tracking-[0.18em] text-white/55">
            Drag, arrows, or click to expand
          </p>
        </div>
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={`thumb-${slide.src}`}
              type="button"
              onClick={() => go(i)}
              className={`relative shrink-0 w-20 h-14 sm:w-28 sm:h-16 overflow-hidden border transition-colors ${
                i === index
                  ? "border-black opacity-100"
                  : "border-black/15 opacity-55 hover:opacity-100"
              }`}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <img
                src={slide.src}
                alt=""
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center z-10"
            aria-label="Close lightbox"
          >
            <GrClose />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 hover:bg-white/10"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white text-2xl w-12 h-12 hover:bg-white/10"
                aria-label="Next"
              >
                →
              </button>
            </>
          )}

          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[88vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

ProjectCarousel.propTypes = {
  className: PropTypes.string,
  project: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
    cardImages: PropTypes.shape({
      mobile: PropTypes.string,
      desktop: PropTypes.string,
      tablet: PropTypes.string,
    }),
  }).isRequired,
};
