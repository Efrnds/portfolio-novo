import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, CaseScrollScene, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";
import { useLanguage } from "../../i18n/LanguageContext";

function findImage(project, alt) {
  return project.gallery.find((image) => image.alt === alt);
}

export default function CalmeraCase({ project, prev, next }) {
  const { copy } = useLanguage();
  const labels = copy.details.calmera;
  const catalog = findImage(project, "Catalogs");
  const cart = findImage(project, "Cart");
  const profile = findImage(project, "Profile");
  const collections = findImage(project, "Collections");

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

      <CaseScrollScene className="calmera-detail__cover-reveal">
        <figure className="calmera-detail__cover">
          <ParallaxImage src={project.cover} alt="Calmera candle storefront" strength={30} />
          <figcaption>{labels.caption}</figcaption>
        </figure>
      </CaseScrollScene>

      <CaseReveal className="calmera-detail__origin" direction="left">
        <p className="eyebrow">{labels.why}</p>
        <h2>{labels.heading}</h2>
        <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </CaseReveal>

      <section className="calmera-detail__workbench" aria-label={copy.a11y.calmeraViews}>
        {catalog && <MaskReveal from="left"><figure><img src={catalog.src} alt={catalog.alt} loading="lazy" decoding="async" /><figcaption>{labels.catalog}</figcaption></figure></MaskReveal>}
        {cart && <MaskReveal from="right" delay={0.08}><figure><img src={cart.src} alt={cart.alt} loading="lazy" decoding="async" /><figcaption>{labels.cart}</figcaption></figure></MaskReveal>}
      </section>

      <CaseReveal className="calmera-detail__notes" direction="right">
        <div>
          <p className="eyebrow">{labels.system}</p>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      {(profile || collections) && (
        <CaseScrollScene className="calmera-detail__closing-scene">
          <section className="calmera-detail__closing-images" aria-label={copy.a11y.calmeraInterfaces}>
            {profile && <figure><img src={profile.src} alt={profile.alt} loading="lazy" decoding="async" /></figure>}
            {collections && <figure><img src={collections.src} alt={collections.alt} loading="lazy" decoding="async" /></figure>}
          </section>
        </CaseScrollScene>
      )}

      <AdjacentProjects prev={prev} next={next} />
    </article>
  );
}

CalmeraCase.propTypes = {
  project: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
};
