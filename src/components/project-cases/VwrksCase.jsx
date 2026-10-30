import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseMediaSequence, CaseReveal, KineticTitle } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function VwrksCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.vwrks;
  const slides = project.gallery.map((image, index) => ({
    ...image,
    caption: labels.pages[index] || image.alt,
  }));

  return (
    <article id="main-content" className="project-detail vwrks-detail">
      <header className="vwrks-detail__header">
        <BackToWork />
        <div className="vwrks-detail__index">
          <p>{labels.label}</p>
          <p>{project.years}</p>
          <p>{project.company}</p>
        </div>
        <h1><KineticTitle>{project.title}</KineticTitle></h1>
        <div className="vwrks-detail__intro">
          <p>{project.statement}</p>
          <ProjectLinks links={project.links} />
        </div>
      </header>

      <CaseMediaSequence
        ariaLabel={`${project.title}: ${copy.a11y.projectScreens}`}
        className="vwrks-media-sequence"
        slides={slides}
      />

      <CaseReveal className="vwrks-detail__brief" direction="left">
        <p className="eyebrow">{labels.brief}</p>
        <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      <CaseReveal className="vwrks-detail__handoff" direction="right">
        <h2>{labels.handoff}</h2>
        <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
      </CaseReveal>

      <AdjacentProjects prev={prev} next={next} />
    </article>
  );
}

VwrksCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
