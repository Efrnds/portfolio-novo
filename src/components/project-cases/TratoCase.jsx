import PropTypes from "prop-types";
import ProjectCarousel from "../ProjectCarousel";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";

export default function TratoCase({ project, prev, next }) {
  return (
    <article id="main-content" className="project-detail trato-detail">
      <header className="trato-detail__hero">
        <BackToWork className="trato-detail__back" />
        <div className="trato-detail__title">
          <div>
            <p className="eyebrow">Product case / {project.years}</p>
            <h1><KineticTitle>{project.title}</KineticTitle></h1>
          </div>
          <p>{project.statement}</p>
        </div>
        <div className="trato-detail__facts">
          <p><span>Role</span>{project.role}</p>
          <p><span>Company</span>{project.company}</p>
          <ProjectLinks links={project.links} />
        </div>
      </header>

      <MaskReveal className="trato-detail__cover-reveal">
        <figure className="trato-detail__cover">
          <ParallaxImage src={project.cover} alt="Trato daily operations dashboard" />
          <figcaption>A working view for the shop, not a presentation screen.</figcaption>
        </figure>
      </MaskReveal>

      <CaseReveal className="trato-detail__story" direction="left">
        <div className="trato-detail__statement">
          <p className="eyebrow">The operating problem</p>
          <h2>One place for the work that used to be split across the day.</h2>
        </div>
        <div className="trato-detail__copy">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseReveal>

      <CaseReveal className="trato-detail__scope" direction="right">
        <div>
          <p className="eyebrow">Owned end to end</p>
          <ProjectStack stack={project.stack} />
        </div>
        <ul>
          {project.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </CaseReveal>

      <CaseReveal className="trato-detail__gallery">
        <div className="trato-detail__gallery-title">
          <p className="eyebrow">Inside the product</p>
          <h2 id="trato-gallery-title">Scheduling, numbers, and stock in the same operating surface.</h2>
        </div>
        <ProjectCarousel project={project} />
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
