import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getProject, projects } from "../data/projects";
import ProjectCarousel from "../components/ProjectCarousel";
import { getProjectSlides } from "../utils/gallery";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const reduced = useReducedMotion();

  if (!project) return <Navigate to="/" replace />;

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];
  const slides = getProjectSlides(project);
  const number = String(currentIndex + 1).padStart(2, "0");

  return (
    <article id="main-content" className={`case-page case-page--${project.slug}`}>
      <motion.header
        className="case-page__hero"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Link to="/#work" className="case-page__back">
          <span aria-hidden="true">←</span> Systems in the wild
        </Link>

        <div className="case-page__headline">
          <div>
            <p className="eyebrow">Case {number} / {project.years}</p>
            <h1>{project.title}</h1>
          </div>
          <p>{project.statement}</p>
        </div>

        <div className="case-page__meta">
          <p><span>Role</span>{project.role}</p>
          <p><span>Context</span>{project.company}</p>
          <p><span>System</span>{project.stack.slice(0, 4).join(" / ")}</p>
          {project.links?.length > 0 && (
            <div>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.header>

      {slides.length > 0 && (
        <motion.div
          className="case-page__gallery"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <ProjectCarousel project={project} />
        </motion.div>
      )}

      <section className="case-page__flow" aria-labelledby="system-flow-title">
        <div>
          <p className="eyebrow">Operational path</p>
          <h2 id="system-flow-title">What one action sets in motion.</h2>
        </div>
        <ol>
          {project.flow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <div className="case-page__story">
        <section aria-labelledby="case-context-title">
          <p className="eyebrow">Context and decisions</p>
          <h2 id="case-context-title" className="sr-only">Project context</h2>
          {project.description.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>

        <aside>
          <p className="eyebrow">What shipped</p>
          <ul>
            {project.highlights.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="case-page__stack">
            {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </aside>
      </div>

      <nav className="case-page__navigation" aria-label="Project navigation">
        {prev ? (
          <Link to={`/projects/${prev.slug}`}>
            <span>Previous case</span>
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/projects/${next.slug}`}>
            <span>Next case</span>
            {next.title} →
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
