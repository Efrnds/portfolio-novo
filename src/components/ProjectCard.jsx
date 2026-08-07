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
  const image = project.cardImages?.desktop || project.cardImages?.mobile;
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-14 lg:py-16">
        {/* Meta rail — sticky on large screens for order, not clutter */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs sm:text-sm tabular-nums tracking-[0.2em] text-neutral-500">
              {String(index + 1).padStart(2, "0")} / {project.years}
            </span>
          </div>

          <div>
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-3 text-3xl sm:text-4xl lg:text-5xl tracking-tight hover:opacity-60 transition-opacity"
            >
              {project.title}
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <Arrow />
              </span>
            </Link>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              {project.role}
              <span className="text-neutral-400"> · </span>
              {project.company}
            </p>
          </div>

          <p className="text-sm sm:text-base text-neutral-700 max-w-sm leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
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
            className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-UrbanistBold underline underline-offset-4 hover:text-neutral-500 transition-colors"
          >
            Open case study
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Visual stage — ONE primary mockup, full width of this column */}
        <div className="lg:col-span-8">
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
              className="relative w-full overflow-hidden border border-black/10 bg-[#e6e6de] min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] flex items-center justify-center p-4 sm:p-8 lg:p-10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] noise-bg" />

              {image ? (
                <motion.img
                  src={image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="relative z-[1] w-full h-auto max-h-[52vh] lg:max-h-[58vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              ) : (
                <div className="relative z-[1] w-full h-full min-h-[240px] sm:min-h-[340px] flex flex-col justify-between bg-black text-[#f0f0e9] p-6 sm:p-10">
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

              <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 z-[2] text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500 bg-[#f0f0e9]/80 backdrop-blur px-2 py-1">
                Preview
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
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    cardImages: PropTypes.shape({
      mobile: PropTypes.string,
      desktop: PropTypes.string,
      tablet: PropTypes.string,
    }),
  }).isRequired,
};
