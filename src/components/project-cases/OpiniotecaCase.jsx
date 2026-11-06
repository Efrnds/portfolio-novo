import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle } from "./CaseMotion";
import ProductEnvironment from "./ProductEnvironment";
import StoryFilm from "../StoryFilm";
import { useLanguage } from "../../i18n/LanguageContext";

export default function OpiniotecaCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.opinioteca;

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

      <ProductEnvironment project={project} />

      <CaseReveal className="opinioteca-detail__essay" direction="right">
        <p className="opinioteca-detail__lead">{project.description[0]}</p>
        <div>
          {project.description.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseReveal>

      <StoryFilm project={project} className="case-story-film" posterFallback={false} />

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
