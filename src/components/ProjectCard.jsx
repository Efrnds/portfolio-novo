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
      className="w-4 h-4 fill-current"
      viewBox="0 0 27 27"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3.06659 26.75L0.208252 23.8917L19.8083 4.29168H2.24992V0.208344H26.7499V24.7083H22.6666V7.15001L3.06659 26.75Z" />
    </svg>
  );
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
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });

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
      className="group relative w-full border-t border-black"
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 py-8 sm:py-12 lg:py-16">
        {/* Sticky project meta on large screens */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start flex flex-col gap-3 sm:gap-4 order-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs sm:text-sm tabular-nums tracking-[0.16em] text-neutral-500">
              {String(index + 1).padStart(2, "0")} / {project.years}
            </span>
          </div>

          <div>
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-2xl sm:text-4xl lg:text-5xl tracking-tight hover:opacity-60 transition-opacity leading-tight"
            >
              {project.title}
              <span className="opacity-40 sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300">
                <Arrow />
              </span>
            </Link>
            <p className="mt-2 text-sm text-neutral-600 leading-snug">
              {project.role}
              <span className="text-neutral-400"> / </span>
              {project.company}
            </p>
          </div>

          <p className="text-sm text-neutral-700 max-w-sm leading-relaxed">
            {project.tagline}
          </p>

          <div className="hidden sm:flex flex-wrap gap-2 pt-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs border border-black/25 px-2.5 py-1 text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="mt-1 inline-flex w-fit items-center gap-2 text-sm underline underline-offset-4 decoration-black/40 hover:decoration-black hover:text-neutral-600 transition-colors"
          >
            View project
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Image after title on mobile for recognition */}
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
              className="relative w-full overflow-hidden border border-black/15 bg-[#1a1a1a] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
            >
              {image ? (
                <motion.img
                  src={image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  whileHover={reduced ? undefined : { scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between bg-black text-[#f0f0e9] p-6 sm:p-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-400 mb-4">
                      {project.company}
                    </p>
                    <h3 className="text-2xl sm:text-4xl max-w-md mb-4">
                      {project.title}
                    </h3>
                    <p className="max-w-md text-sm sm:text-base text-neutral-300">
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs border border-white/20 px-2 py-1 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 text-[8rem] sm:text-[12rem] leading-none font-UrbanistBold text-white/[0.04] select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="pointer-events-none absolute left-4 bottom-4 sm:left-5 sm:bottom-5 z-[2] text-[0.65rem] uppercase tracking-[0.2em] text-white/80">
                View project →
              </div>
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
