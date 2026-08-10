import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function Arrow() {
  return (
    <svg
      className="w-3.5 h-3.5 fill-current"
      viewBox="0 0 27 27"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3.06659 26.75L0.208252 23.8917L19.8083 4.29168H2.24992V0.208344H26.7499V24.7083H22.6666V7.15001L3.06659 26.75Z" />
    </svg>
  );
}

function monogram(title) {
  const clean = title.replace(/[^a-zA-Z0-9\s.]/g, " ").trim();
  const parts = clean.split(/[\s.]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export default function ProjectCard({ project, index }) {
  const reduced = useReducedMotion();
  const image =
    project.cover ||
    project.gallery?.[0]?.src ||
    project.images?.[0]?.src ||
    project.cardImages?.desktop ||
    project.cardImages?.mobile;
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });
  const num = String(index + 1).padStart(2, "0");
  const mark = monogram(project.title);

  const onMove = (e) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      className="group relative w-full border-t border-black/20 first:border-black"
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 py-8 sm:py-12 lg:py-16">
        <div className="relative lg:col-span-4 lg:sticky lg:top-28 lg:self-start flex flex-col gap-3 sm:gap-4 order-1 overflow-hidden">
          {/* Giant watermark number */}
          <span
            className="pointer-events-none select-none absolute -left-1 -top-6 sm:-top-8 text-[6.5rem] sm:text-[8rem] lg:text-[9rem] leading-none tracking-tighter text-black/[0.045] tabular-nums"
            aria-hidden="true"
          >
            {num}
          </span>

          <div className="relative z-[1] flex items-center justify-between gap-4">
            <span className="text-xs sm:text-sm tabular-nums tracking-[0.16em] text-neutral-500">
              {num} / {project.years}
            </span>
          </div>

          <div className="relative z-[1]">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight link-draw"
            >
              {project.title}
              <span className="opacity-40 sm:opacity-0 sm:group-hover:opacity-60 transition-opacity duration-300">
                <Arrow />
              </span>
            </Link>
            <p className="mt-2 text-sm text-neutral-600 leading-snug">
              {project.role}
              <span className="text-neutral-400"> / </span>
              {project.company}
            </p>
          </div>

          <p className="relative z-[1] text-sm text-neutral-700 max-w-sm leading-relaxed">
            {project.tagline}
          </p>

          <div className="relative z-[1] hidden sm:flex flex-wrap gap-2 pt-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs border border-black/20 px-2.5 py-1 text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="relative z-[1] mt-1 inline-flex w-fit items-center gap-2 text-sm link-draw"
          >
            View project
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="lg:col-span-8 order-2">
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`Open ${project.title}`}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              ref={cardRef}
              style={
                reduced
                  ? undefined
                  : {
                      rotateX: rx,
                      rotateY: ry,
                      transformPerspective: 1200,
                    }
              }
              className="relative w-full overflow-hidden border border-black/20 bg-[#ebebe3] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
            >
              {image ? (
                <>
                  <motion.img
                    src={image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="pointer-events-none absolute left-4 bottom-4 sm:left-5 sm:bottom-5 z-[2] text-[0.65rem] uppercase tracking-[0.18em] text-white/85">
                    View project →
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 text-black bg-[#ebebe3]">
                  {/* Soft wireframe rings — same family as hero 3D, static */}
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]"
                    aria-hidden="true"
                  >
                    <span className="absolute w-[42%] max-w-[220px] aspect-square rounded-full border border-black" />
                    <span className="absolute w-[58%] max-w-[300px] aspect-square rounded-full border border-black/70" />
                    <span className="absolute w-[28%] max-w-[140px] aspect-square rotate-45 border border-black/50" />
                  </div>

                  <div className="relative z-[1] flex justify-between items-start gap-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      {project.company}
                    </p>
                    <p className="text-xs tabular-nums tracking-[0.16em] text-neutral-400">
                      {num}
                    </p>
                  </div>

                  <div className="relative z-[1] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    <div>
                      <p
                        className="text-[4.5rem] sm:text-[6rem] leading-none tracking-tight text-black/90 select-none"
                        aria-hidden="true"
                      >
                        {mark}
                      </p>
                      <h3 className="text-xl sm:text-2xl mt-3 max-w-sm">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-neutral-600 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 shrink-0">
                      View project →
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    role: PropTypes.string,
    company: PropTypes.string,
    cover: PropTypes.string,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
      })
    ),
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
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
