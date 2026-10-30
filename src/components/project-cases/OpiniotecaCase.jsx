import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseMediaSequence, CaseReveal, KineticTitle } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function OpiniotecaCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.opinioteca;
  const slides = project.gallery.map((image, index) => ({
    ...image,
    caption: labels.views[index] || image.alt,
  }));

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

      <CaseReveal className="opinioteca-detail__sequence-intro" direction="left">
        <div>
          <p className="eyebrow">{labels.room}</p>
          <h2>{labels.roomTitle}</h2>
        </div>
        <p>{labels.roomIntro}</p>
      </CaseReveal>

      <CaseMediaSequence
        ariaLabel={`${project.title}: ${copy.a11y.projectScreens}`}
        className="opinioteca-media-sequence"
        slides={slides}
      />

      <CaseReveal className="opinioteca-detail__essay" direction="right">
        <p className="opinioteca-detail__lead">{project.description[0]}</p>
        <div>
          {project.description.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
