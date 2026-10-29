import PropTypes from "prop-types";
import { AdjacentProjects, BackToWork, ProjectLinks, ProjectStack } from "./CaseParts";
import { CaseReveal, KineticTitle, MaskReveal, ParallaxImage } from "./CaseMotion";

function findImage(project, alt) {
  return project.gallery.find((image) => image.alt === alt);
}

export default function CalmeraCase({ project, prev, next }) {
  const catalog = findImage(project, "Catalogs");
  const cart = findImage(project, "Cart");
  const profile = findImage(project, "Profile");
  const collections = findImage(project, "Collections");

  return (
    <article id="main-content" className="project-detail calmera-detail">
      <header className="calmera-detail__header">
        <BackToWork />
        <div className="calmera-detail__title">
          <p className="eyebrow">Personal project / {project.years}</p>
          <h1><KineticTitle>{project.title}</KineticTitle></h1>
          <p>{project.statement}</p>
        </div>
        <div className="calmera-detail__meta">
          <p>{project.role}</p>
          <ProjectLinks links={project.links} />
        </div>
      </header>

      <MaskReveal className="calmera-detail__cover-reveal" from="bottom">
        <figure className="calmera-detail__cover">
          <ParallaxImage src={project.cover} alt="Calmera candle storefront" strength={30} />
          <figcaption>A customer-facing storefront connected to a real home production routine.</figcaption>
        </figure>
      </MaskReveal>

      <CaseReveal className="calmera-detail__origin" direction="left">
        <p className="eyebrow">Why it exists</p>
        <h2>Software made for one person before it was made for a portfolio.</h2>
        <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </CaseReveal>

      <section className="calmera-detail__workbench" aria-label="Calmera product views">
        {catalog && <MaskReveal from="left"><figure><img src={catalog.src} alt={catalog.alt} loading="lazy" /><figcaption>Catalog</figcaption></figure></MaskReveal>}
        {cart && <MaskReveal from="right" delay={0.08}><figure><img src={cart.src} alt={cart.alt} loading="lazy" /><figcaption>Cart</figcaption></figure></MaskReveal>}
      </section>

      <CaseReveal className="calmera-detail__notes" direction="right">
        <div>
          <p className="eyebrow">What the system holds together</p>
          <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <ProjectStack stack={project.stack} />
      </CaseReveal>

      {(profile || collections) && (
        <section className="calmera-detail__closing-images" aria-label="More Calmera interfaces">
          {profile && <figure><img src={profile.src} alt={profile.alt} loading="lazy" /></figure>}
          {collections && <figure><img src={collections.src} alt={collections.alt} loading="lazy" /></figure>}
        </section>
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
