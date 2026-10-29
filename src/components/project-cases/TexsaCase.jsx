import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle } from "./CaseMotion";

export default function TexsaCase({ project, prev, next }) {
  return (
    <article id="main-content" className="project-detail texsa-detail">
      <header className="texsa-detail__header">
        <BackToWork />
        <p className="texsa-detail__label">Internal systems / ongoing practice</p>
        <h1><KineticTitle>{project.title}</KineticTitle></h1>
        <p className="texsa-detail__statement">{project.statement}</p>
        <div className="texsa-detail__role">
          <p><span>Role</span>{project.role}</p>
          <p><span>Company</span>{project.company}</p>
          <p><span>Period</span>{project.years}</p>
        </div>
      </header>

      <section className="texsa-detail__memo">
        <p className="eyebrow">Field report</p>
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
          <p className="eyebrow">Work kept moving</p>
          <h2>Tools, support, and infrastructure belong to the same responsibility.</h2>
        </div>
        <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
      </CaseReveal>

      <CaseReveal className="texsa-detail__stack" direction="right">
        <p>Technologies used across the internal environment</p>
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
