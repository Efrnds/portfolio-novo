import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function TexsaCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.texsa;
  return (
    <article id="main-content" className="project-detail texsa-detail">
      <header className="texsa-detail__header">
        <BackToWork />
        <p className="texsa-detail__label">{labels.label}</p>
        <h1><KineticTitle>{project.title}</KineticTitle></h1>
        <p className="texsa-detail__statement">{project.statement}</p>
        <div className="texsa-detail__role">
          <p><span>{copy.case.role}</span>{project.role}</p>
          <p><span>{copy.case.company}</span>{project.company}</p>
          <p><span>{copy.case.period}</span>{project.years}</p>
        </div>
      </header>

      <section className="texsa-detail__memo">
        <p className="eyebrow">{labels.field}</p>
        <div>
          {project.description.map((paragraph, index) => (
            <CaseReveal key={paragraph} direction={index % 2 ? "right" : "left"} delay={index * 0.06}>
              <article>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </article>
            </CaseReveal>
          ))}
        </div>
      </section>

      <CaseReveal className="texsa-detail__worklog">
        <div>
          <p className="eyebrow">{labels.log}</p>
          <h2>{labels.heading}</h2>
        </div>
        <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
      </CaseReveal>

      <CaseReveal className="texsa-detail__stack" direction="right">
        <p>{labels.stack}</p>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      <AdjacentProjects prev={prev} next={next} />
    </article>
  );
}

TexsaCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
