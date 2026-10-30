import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, CaseScrollScene, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

export default function VwrksCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.vwrks;
  const [home, about, projectView, works, archive] = project.gallery;

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

      {home && <CaseScrollScene className="vwrks-detail__hero-reveal"><figure className="vwrks-detail__hero-image"><ParallaxImage src={home.src} alt={home.alt} strength={26} /><figcaption>{labels.pages[0]} / 01</figcaption></figure></CaseScrollScene>}

      <CaseReveal className="vwrks-detail__brief" direction="left">
        <p className="eyebrow">{labels.brief}</p>
        <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      <CaseScrollScene className="vwrks-detail__archive-scene">
        <section className="vwrks-detail__archive" aria-label={copy.a11y.vwrksArchive}>
          {about && <MaskReveal className="vwrks-detail__about" from="left"><figure><img src={about.src} alt={about.alt} loading="lazy" decoding="async" /><figcaption>{labels.pages[1]} / 02</figcaption></figure></MaskReveal>}
          {works && <MaskReveal className="vwrks-detail__works" from="right" delay={0.06}><figure><img src={works.src} alt={works.alt} loading="lazy" decoding="async" /><figcaption>{labels.pages[2]} / 03</figcaption></figure></MaskReveal>}
          {projectView && <MaskReveal className="vwrks-detail__project" from="bottom"><figure><img src={projectView.src} alt={projectView.alt} loading="lazy" decoding="async" /><figcaption>{labels.pages[3]} / 04</figcaption></figure></MaskReveal>}
          {archive && <MaskReveal className="vwrks-detail__archive-view" from="left" delay={0.08}><figure><img src={archive.src} alt={archive.alt} loading="lazy" decoding="async" /><figcaption>{labels.pages[4]} / 05</figcaption></figure></MaskReveal>}
        </section>
      </CaseScrollScene>

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
