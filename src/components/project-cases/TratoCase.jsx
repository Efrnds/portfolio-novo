import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle } from "./CaseMotion";
import ProductEnvironment from "./ProductEnvironment";
import StoryFilm from "../StoryFilm";
import { useLanguage } from "../../i18n/LanguageContext";

export default function TratoCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.trato;
  const flow = copy.editorial.tratoFlow;

  return (
    <article id="main-content" className="project-detail trato-detail">
      <header className="trato-detail__hero">
        <BackToWork className="trato-detail__back" />
        <div className="trato-detail__title">
          <div>
            <p className="eyebrow">{labels.label} / {project.years}</p>
            <h1><KineticTitle>{project.title}</KineticTitle></h1>
          </div>
          <p>{copy.editorial.projects.trato.headline}</p>
        </div>
        <div className="trato-detail__facts">
          <p><span>{copy.case.role}</span>{project.role}</p>
          <p><span>{copy.case.company}</span>{project.company}</p>
          <ProjectLinks links={project.links} />
        </div>
      </header>

      <ProductEnvironment project={project} />

      <section className="trato-routine" aria-labelledby="trato-routine-title">
        <div><p className="eyebrow">{flow.label}</p><h2 id="trato-routine-title">{flow.title}</h2></div>
        <div>
          <ol>{flow.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
          <p>{flow.body}</p>
        </div>
      </section>

      <CaseReveal className="trato-detail__story" direction="left">
        <div className="trato-detail__statement">
          <p className="eyebrow">{labels.problem}</p>
          <h2>{labels.heading}</h2>
        </div>
        <div className="trato-detail__copy">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseReveal>

      <StoryFilm project={project} className="case-story-film" posterFallback={false} />

      <CaseReveal className="trato-detail__scope" direction="right">
        <div>
          <p className="eyebrow">{labels.owned}</p>
          <ProjectStack stack={project.stack} />
        </div>
        <ul>
          {project.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </CaseReveal>

      <AdjacentProjects prev={prev} next={next} className="trato-detail__adjacent" />
    </article>
  );
}

TratoCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
