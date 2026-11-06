import { useId, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, useTransform } from "motion/react";
import { useGalleryMotion } from "../hooks/useGalleryMotion";
import { springs } from "../utils/choreography";
import { useLanguage } from "../i18n/LanguageContext";
import { demoBooks, demoCandles } from "../data/productDemos";
import ProductCrop from "./project-cases/environments/ProductCrop";

const captures = {
  trato: ["/images/trato/homepage.webp", "/images/trato/booking.webp"],
  opinioteca: ["/images/opinioteca/homepage.webp", "/images/opinioteca/explore.webp"],
  "calmera-os": ["/images/calmera/hero.webp", "/images/calmera/catalog.webp"],
};

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const indicator = useId();
  const { active, position, select, reduced } = useGalleryMotion(ref);
  const x = useTransform(position, [0, 1], ["0%", "-50%"]);
  const { language, copy } = useLanguage();
  const text = copy.editorial.projects[project.slug];
  const frames = captures[project.slug];

  return (
    <article id={`work-${project.slug}`} className={`work-feature work-feature--${project.slug}`} aria-labelledby={`title-${project.slug}`}>
      <header className="work-feature__heading">
        <p className="editorial-label">{String(index + 1).padStart(2, "0")} / {text.category}</p>
        <h3 id={`title-${project.slug}`}>{project.title}</h3>
        <p className="work-feature__headline">{text.headline}</p>
      </header>
      <div ref={ref} className="work-feature__sequence">
        <div className="work-feature__stage">
          <div className="work-feature__context">
            {project.slug === "opinioteca" && <div className="work-feature__books" aria-hidden="true">
              {demoBooks.map((book) => <ProductCrop key={book.id} item={book} label={book.title} />)}
            </div>}
            {project.slug === "calmera-os" && <div className="work-feature__candles" aria-hidden="true">
              {demoCandles.map((candle) => <ProductCrop key={candle.id} item={candle} label={candle.name[language]} />)}
            </div>}
            <p className="work-feature__description">{text.body}</p>
            <dl className="work-feature__ownership"><dt>{copy.editorial.scope}</dt><dd>{text.ownership}</dd></dl>
            <p className="work-feature__stack">{text.stack}</p>
            <Link to={`/projects/${project.slug}`} className="editorial-link">{copy.editorial.caseLink}<span aria-hidden="true">↗</span></Link>
          </div>
          <div className="work-feature__evidence">
            <div className="evidence-controls" role="group" aria-label={`${project.title}: ${copy.editorial.screens}`}>
              {text.views.map((view, viewIndex) => <button key={view} type="button" aria-pressed={active === viewIndex} onClick={() => select(viewIndex)}>
                <span>{String(viewIndex + 1).padStart(2, "0")}</span>{view}
                {active === viewIndex && <motion.i className="evidence-controls__indicator" layoutId={indicator} transition={reduced ? { duration: 0 } : springs.control} aria-hidden="true" />}
              </button>)}
              <span className="evidence-controls__hint">{copy.editorial.scroll}</span>
            </div>
            <div className="evidence-canvas" data-project-preview={project.slug}>
              <motion.div className="evidence-track" style={reduced ? { x: active ? "-50%" : "0%" } : { x }}>
                {frames.map((frame, frameIndex) => <img key={frame} src={frame} alt={`${project.title}: ${text.views[frameIndex]}`} aria-hidden={active !== frameIndex} width="1876" height="996" loading="lazy" />)}
              </motion.div>
            </div>
            <p className="evidence-caption" aria-live="polite"><span>{String(active + 1).padStart(2, "0")} / 02</span>{text.captions[active]}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({ slug: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired,
};
