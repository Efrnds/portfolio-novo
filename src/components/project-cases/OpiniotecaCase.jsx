import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

function findImage(project, alt) {
  return project.gallery.find((image) => image.alt === alt);
}

export default function OpiniotecaCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.opinioteca;
  const explore = findImage(project, "Explore");
  const messages = findImage(project, "Messages");
  const mobile = findImage(project, "Mobile screen");
  const views = [
    explore && { ...explore, label: labels.discover, note: labels.discoverNote },
    messages && { ...messages, label: labels.talk, note: labels.talkNote },
    mobile && { ...mobile, label: labels.carry, note: labels.carryNote },
  ].filter(Boolean);
  const [activeView, setActiveView] = useState(0);
  const reduced = useReducedMotion();
  const currentView = views[activeView];

  return (
    <article id="main-content" className="project-detail opinioteca-detail">
      <header className="opinioteca-detail__hero">
        <BackToWork />
        <p className="opinioteca-detail__kicker">{labels.kicker}</p>
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
          <figcaption>{labels.caption}</figcaption>
        </figure>
      </MaskReveal>

      <CaseReveal className="opinioteca-detail__essay" direction="right">
        <p className="opinioteca-detail__lead">{project.description[0]}</p>
        <div>
          {project.description.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseReveal>

      <CaseReveal className="opinioteca-detail__reading-room">
        <div className="opinioteca-detail__reading-index">
          <p className="eyebrow">{labels.room}</p>
          <h2>{labels.roomTitle}</h2>
          <p className="opinioteca-detail__reading-intro">
            {labels.roomIntro}
          </p>
          <div className="opinioteca-detail__reading-controls" aria-label="Choose a path through Opinioteca">
            {views.map((view, index) => (
              <button
                key={view.src}
                type="button"
                className={index === activeView ? "is-active" : ""}
                aria-pressed={index === activeView}
                onClick={() => setActiveView(index)}
              >
                <span className="opinioteca-detail__reading-number">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{view.label}</strong>
                  <small>{view.note}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={`opinioteca-detail__reading-stage ${currentView.aspect === "9/16" ? "is-portrait" : ""}`} aria-live="polite">
          <div className="opinioteca-detail__reading-stage-head">
            <span>Opinioteca / {labels.stage}</span>
            <span>{labels.stageMeta}</span>
          </div>
          <div className="opinioteca-detail__reading-media">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={currentView.src}
                initial={reduced ? false : { opacity: 0, x: 48, clipPath: "inset(0 0 0 18%)" }}
                animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
                exit={reduced ? undefined : { opacity: 0, x: -32 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={currentView.src} alt={currentView.alt} loading="lazy" />
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="opinioteca-detail__reading-stage-foot">
            <p>{currentView.note}</p>
            <span>{String(activeView + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")}</span>
          </div>
        </div>
      </CaseReveal>

      <CaseReveal className="opinioteca-detail__surface">
        <div>
          <p className="eyebrow">{labels.surface}</p>
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
