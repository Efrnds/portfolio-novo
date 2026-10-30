import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseMediaSequence, CaseReveal, KineticTitle } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function CalmeraCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.calmera;
  const slides = project.gallery.map((image, index) => ({
    ...image,
    caption: labels.views[index] || image.alt,
  }));

  return (
    <article id="main-content" className="project-detail calmera-detail">
      <header className="calmera-detail__header">
        <BackToWork />
        <div className="calmera-detail__title">
          <p className="eyebrow">{labels.label} / {project.years}</p>
          <h1><KineticTitle>{project.title}</KineticTitle></h1>
          <p>{project.statement}</p>
        </div>
        <div className="calmera-detail__meta">
          <p>{project.role}</p>
          <ProjectLinks links={project.links} />
        </div>
      </header>

      <CaseReveal className="calmera-detail__origin" direction="left">
        <p className="eyebrow">{labels.why}</p>
        <h2>{labels.heading}</h2>
        <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </CaseReveal>

      <CaseMediaSequence
        ariaLabel={`${project.title}: ${copy.a11y.projectScreens}`}
        className="calmera-media-sequence"
        slides={slides}
      />

      <CaseReveal className="calmera-detail__notes" direction="right">
        <div>
          <p className="eyebrow">{labels.system}</p>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      <AdjacentProjects prev={prev} next={next} />
    </article>
  );
}

CalmeraCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
