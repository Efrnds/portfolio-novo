import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

export default function WorkSection() {
  const reduced = useReducedMotion();
  const { copy, localizeProject } = useLanguage();
  const localizedProjects = projects.map(localizeProject);
  const featured = localizedProjects.slice(0, 3);
  const archive = localizedProjects.slice(3);

  return (
    <section id="work" className="work-section scroll-mt-28">
      <motion.div
        className="section-heading section-heading--work"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <p className="eyebrow">{copy.work.eyebrow}</p>
          <h2>{copy.work.title}</h2>
        </div>
        <p>{copy.work.body}</p>
      </motion.div>

      <div className="work-section__chapters">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <motion.div
        className="project-archive"
        initial={reduced ? false : { opacity: 0, clipPath: "inset(0 0 16% 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-archive__heading">
          <p className="eyebrow">{copy.work.more}</p>
          <p>{copy.work.moreBody}</p>
        </div>
        <div className="project-archive__list">
          {archive.map((project, index) => (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <span>{String(index + 4).padStart(2, "0")}</span>
              <strong>{project.title}</strong>
              <p>{project.statement}</p>
              <span>{project.years}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
