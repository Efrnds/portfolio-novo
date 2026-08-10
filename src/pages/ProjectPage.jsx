import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getProject, projects } from "../data/projects";
import ProjectCarousel from "../components/ProjectCarousel";
import { getProjectSlides } from "../utils/gallery";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const reduced = useReducedMotion();

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];
  const slides = getProjectSlides(project);

  return (
    <article className="w-full px-5 sm:px-8 lg:px-12 py-10 pt-24 sm:pt-28 pb-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 link-draw mb-8"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header className="relative w-full mb-8 sm:mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 border-b border-black pb-8 overflow-hidden">
          <span
            className="pointer-events-none select-none absolute -right-2 -top-4 sm:right-0 text-[7rem] sm:text-[10rem] leading-none tracking-tighter text-black/[0.04] tabular-nums"
            aria-hidden="true"
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="relative z-[1] lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-3 tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")} / {project.years}
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-neutral-800 max-w-3xl">
              {project.tagline}
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4 text-sm sm:text-base text-neutral-700 lg:pt-8">
            <p>
              <span className="text-black block mb-0.5 text-xs uppercase tracking-[0.12em]">
                Role
              </span>
              {project.role}
            </p>
            <p>
              <span className="text-black block mb-0.5 text-xs uppercase tracking-[0.12em]">
                Context
              </span>
              {project.company}
            </p>
            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-1">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>
      </motion.div>

      {slides.length > 0 && (
        <motion.div
          className="w-full mb-12 sm:mb-16"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <ProjectCarousel project={project} />
        </motion.div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <section className="lg:col-span-7 flex flex-col gap-4 text-base sm:text-lg leading-relaxed text-neutral-800">
          {project.description.map((paragraph, i) => (
            <motion.p
              key={paragraph.slice(0, 48)}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </section>

        <aside className="lg:col-span-5 flex flex-col gap-8">
          {project.highlights?.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-[0.15em] text-neutral-500 mb-4">
                Highlights
              </h2>
              <ul className="flex flex-col gap-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-black pl-3 text-sm sm:text-base text-neutral-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-sm uppercase tracking-[0.15em] text-neutral-500 mb-4">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm border border-black/30 px-3 py-1 text-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <nav
        className="flex flex-wrap justify-between gap-4 mt-16 pt-8 border-t border-black/20 text-sm sm:text-base"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            to={`/projects/${prev.slug}`}
            className="hover:text-neutral-500 transition-colors max-w-[45%]"
          >
            <span className="block text-xs text-neutral-500 mb-1">Previous</span>
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/projects/${next.slug}`}
            className="text-right hover:text-neutral-500 transition-colors max-w-[45%] ml-auto"
          >
            <span className="block text-xs text-neutral-500 mb-1">Next</span>
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
