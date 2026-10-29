import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";

function findImage(project, alt) {
  return project.gallery.find((image) => image.alt === alt);
}

export default function OpiniotecaCase({ project, prev, next }) {
  const explore = findImage(project, "Explore");
  const messages = findImage(project, "Messages");
  const mobile = findImage(project, "Mobile screen");

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

      <section className="opinioteca-detail__collage" aria-label="Opinioteca product views">
        {explore && <CaseReveal className="opinioteca-detail__explore" direction="left"><figure><img src={explore.src} alt={explore.alt} loading="lazy" /><figcaption>Discovery</figcaption></figure></CaseReveal>}
        {messages && <CaseReveal className="opinioteca-detail__messages" direction="right" delay={0.08}><figure><img src={messages.src} alt={messages.alt} loading="lazy" /><figcaption>Realtime conversation</figcaption></figure></CaseReveal>}
        {mobile && <CaseReveal className="opinioteca-detail__phone" delay={0.14}><figure><img src={mobile.src} alt={mobile.alt} loading="lazy" /><figcaption>Mobile reading routine</figcaption></figure></CaseReveal>}
      </section>

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
