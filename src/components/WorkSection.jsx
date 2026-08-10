import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function WorkSection() {
  const reduced = useReducedMotion();
  const withVisuals = projects.filter(
    (p) => p.cover || p.gallery?.length || p.cardImages?.desktop || p.cardImages?.mobile
  ).length;

  return (
    <section id="projects" className="w-full scroll-mt-28 pt-6 sm:pt-10">
      <motion.div
        className="w-full mb-2 sm:mb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-black pb-6"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500 mb-3">
            02 / Portfolio
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none">
            Selected work
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl text-sm sm:text-base leading-relaxed">
            Real client and product work. Details on the left, main screenshot on
            the right.
          </p>
        </div>
        <div className="lg:col-span-5 lg:text-right flex lg:flex-col gap-4 lg:gap-2 lg:items-end text-sm text-neutral-500">
          <p className="tabular-nums">
            <span className="text-black text-2xl sm:text-3xl">
              {projects.length}
            </span>{" "}
            projects
          </p>
          <p className="tabular-nums">
            <span className="text-black">{withVisuals}</span> with live previews
          </p>
        </div>
      </motion.div>

      {/* Jump links into each project row */}
      <motion.nav
        aria-label="Project index"
        className="hidden md:flex flex-wrap gap-x-1 gap-y-2 py-5 border-b border-black/15 text-sm"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {projects.map((project, index) => (
          <a
            key={project.slug}
            href={`#work-${project.slug}`}
            className="group/index inline-flex items-center gap-2 px-3 py-1.5 border border-transparent hover:border-black/20 hover:bg-black/[0.03] transition-colors"
          >
            <span className="tabular-nums text-neutral-400 group-hover/index:text-neutral-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.title}
          </a>
        ))}
      </motion.nav>

      <div className="w-full">
        {projects.map((project, index) => (
          <div key={project.slug} id={`work-${project.slug}`} className="scroll-mt-28">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
