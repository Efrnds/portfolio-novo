import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";

function findImage(project, alt) {
  return project.gallery.find((image) => image.alt === alt);
}

export default function OpiniotecaCase({ project, prev, next }) {
  const explore = findImage(project, "Explore");
  const messages = findImage(project, "Messages");
  const mobile = findImage(project, "Mobile screen");
  const views = [
    explore && { ...explore, label: "Discovery", note: "Books, profiles, and recommendations." },
    messages && { ...messages, label: "Messages", note: "Realtime conversations between readers." },
    mobile && { ...mobile, label: "Mobile", note: "The reading routine in a narrower context." },
  ].filter(Boolean);
  const [activeView, setActiveView] = useState(0);
  const reduced = useReducedMotion();
  const currentView = views[activeView];

  return (
    <article id="main-content" className="project-detail opinioteca-detail">
      <header className="opinioteca-detail__hero">
        <BackToWork />
        <p className="opinioteca-detail__kicker">A social product built around books</p>
        <h1><KineticTitle>{project.title}</KineticTitle></h1>
        <div className="opinioteca-detail__intro">
          <p>{project.statement}</p>
          <div>
            <span>{project.role}</span>
            <span>{project.years}</span>
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </header>

      <MaskReveal className="opinioteca-detail__feed-reveal" from="left">
        <figure className="opinioteca-detail__feed">
          <ParallaxImage src={project.cover} alt="Opinioteca reading feed" strength={28} />
          <figcaption>Reviews and reading activity form the main social surface.</figcaption>
        </figure>
      </MaskReveal>

      <CaseReveal className="opinioteca-detail__essay" direction="right">
        <p className="opinioteca-detail__lead">{project.description[0]}</p>
        <div>
          {project.description.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseReveal>

      <CaseReveal className="opinioteca-detail__gallery">
        <div className="opinioteca-detail__gallery-heading">
          <div>
            <p className="eyebrow">Walk through the product</p>
            <h2>One interface at a time.</h2>
          </div>
          <div className="opinioteca-detail__gallery-controls" aria-label="Choose an Opinioteca view">
            {views.map((view, index) => (
              <button
                key={view.src}
                type="button"
                className={index === activeView ? "is-active" : ""}
                aria-pressed={index === activeView}
                onClick={() => setActiveView(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`opinioteca-detail__gallery-stage ${currentView.aspect === "9/16" ? "is-portrait" : ""}`} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={currentView.src}
              initial={reduced ? false : { opacity: 0, x: 48, clipPath: "inset(0 0 0 18%)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
              exit={reduced ? undefined : { opacity: 0, x: -32 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={currentView.src} alt={currentView.alt} loading="lazy" />
              <figcaption>
                <strong>{currentView.label}</strong>
                {currentView.note}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </CaseReveal>

      <CaseReveal className="opinioteca-detail__surface">
        <div>
          <p className="eyebrow">Product surface</p>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      <AdjacentProjects prev={prev} next={next} />
    </article>
  );
}

OpiniotecaCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
