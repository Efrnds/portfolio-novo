import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getProject, projects } from "../data/projects";
import ImageModal from "../components/ImageModal";

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
  const devices = project.cardImages;
  const primary =
    project.images?.find((i) => i.src.includes("full"))?.src ||
    devices?.desktop ||
    devices?.mobile ||
    project.images?.[0]?.src;

  return (
    <article className="w-full px-5 sm:px-8 lg:px-12 py-10 pt-24 sm:pt-28 pb-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors mb-8"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header className="w-full mb-8 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 border-b border-black pb-8">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.24em] text-neutral-500 mb-3 tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")} — {project.years}
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
              <span className="font-UrbanistBold text-black block mb-0.5">
                Role
              </span>
              {project.role}
            </p>
            <p>
              <span className="font-UrbanistBold text-black block mb-0.5">
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
                    className="font-UrbanistBold underline underline-offset-4 hover:text-neutral-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>
      </motion.div>

      {primary && (
        <motion.section
          className="w-full mb-10 sm:mb-14 border border-black/10 bg-[#e6e6de] p-4 sm:p-8 lg:p-12 flex items-center justify-center"
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageModal
            src={
              project.images?.find((i) => i.src.includes("full"))?.src || primary
            }
            thumbnail={devices?.desktop || primary}
            alt={`${project.title} primary preview`}
            thumbnailClassName="w-full max-w-5xl h-auto object-contain cursor-pointer transition hover:scale-[1.01]"
          />
        </motion.section>
      )}

      {(devices?.mobile || devices?.tablet) && (
        <section className="w-full mb-12 sm:mb-16 grid grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {devices.mobile && (
            <ImageModal
              src={devices.mobile}
              alt={`${project.title} mobile`}
              thumbnailClassName="w-full h-auto object-contain cursor-pointer"
            />
          )}
          {devices.tablet && (
            <ImageModal
              src={devices.tablet}
              alt={`${project.title} tablet`}
              thumbnailClassName="w-full h-auto object-contain cursor-pointer"
            />
          )}
        </section>
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
              <h2 className="text-sm font-UrbanistBold uppercase tracking-[0.15em] mb-4">
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
            <h2 className="text-sm font-UrbanistBold uppercase tracking-[0.15em] mb-4">
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
        className="flex flex-wrap justify-between gap-4 mt-16 pt-8 border-t border-black text-sm sm:text-base"
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
