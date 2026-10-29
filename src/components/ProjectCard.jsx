import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { MaskReveal } from "./project-cases/CaseMotion";
import { useLanguage } from "../i18n/LanguageContext";

function CaseLink({ project, children }) {
  return (
    <Link to={`/projects/${project.slug}`} className="action-link">
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}

CaseLink.propTypes = {
  children: PropTypes.node.isRequired,
  project: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired,
};

function ScrollSwap({ slides, progress, className = "" }) {
  const reduced = useReducedMotion();
  const firstY = useTransform(progress, [0, 0.25, 0.75, 1], ["0%", "0%", "-100%", "-100%"]);
  const secondY = useTransform(progress, [0, 0.25, 0.75, 1], ["100%", "100%", "0%", "0%"]);

  return (
    <div className={`scroll-swap ${reduced ? "is-reduced" : ""} ${className}`}>
      {slides.slice(0, 2).map((slide, index) => (
        <motion.figure
          key={slide.src}
          className={`scroll-swap__slide ${index === 1 ? "scroll-swap__slide--secondary" : ""}`}
          style={reduced ? undefined : { y: index === 0 ? firstY : secondY }}
        >
          <img src={slide.src} alt={slide.alt} loading="lazy" />
          {slide.caption && <figcaption>{slide.caption}</figcaption>}
        </motion.figure>
      ))}
    </div>
  );
}

ScrollSwap.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.object.isRequired,
  slides: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string,
    src: PropTypes.string.isRequired,
  })).isRequired,
};

function TratoChapter({ project, progress }) {
  const { copy } = useLanguage();
  const reports = project.gallery.find((image) => image.alt === "Reports");
  return (
    <div className="trato-case">
      <div className="trato-case__brief">
        <div>
          <p className="project-chapter__context">{project.company} / {project.role}</p>
          <h4>{project.title}</h4>
          <p>{project.summary}</p>
        </div>
        <div className="trato-case__ownership">
          <p>{copy.homeCases.ownership}</p>
          <strong>{copy.homeCases.ownershipValue}</strong>
        </div>
        <CaseLink project={project}>{copy.homeCases.readTrato}</CaseLink>
      </div>

      <MaskReveal className="trato-case__console-reveal">
        <Link
          to={`/projects/${project.slug}`}
          className="trato-case__console"
          aria-label="Read the Trato case study"
        >
          <div className="trato-case__status">
            <span>{copy.homeCases.shop}</span>
            <span><i aria-hidden="true" /> {copy.homeCases.production}</span>
          </div>
          <div className="trato-case__screen">
            <ScrollSwap
              progress={progress}
              slides={[
                { src: project.cover, alt: "Trato operations dashboard", caption: copy.homeCases.daily },
                { src: reports?.src || project.gallery[1].src, alt: "Trato reports and operating numbers", caption: copy.homeCases.production },
              ]}
            />
          </div>
          <div className="trato-case__console-note">
            <span>{copy.homeCases.daily}</span>
            <span>{project.stack.slice(0, 3).join(" / ")}</span>
          </div>
        </Link>
      </MaskReveal>
    </div>
  );
}

TratoChapter.propTypes = { project: PropTypes.object.isRequired, progress: PropTypes.object.isRequired };

function OpiniotecaChapter({ project, progress }) {
  const { copy } = useLanguage();
  const messages = project.gallery.find((image) => image.alt === "Messages");

  return (
    <div className="opinioteca-case">
      <MaskReveal className="opinioteca-case__network-reveal" from="left">
        <Link
          to={`/projects/${project.slug}`}
          className="opinioteca-case__network"
          aria-label="Read the Opinioteca case study"
        >
          <div className="opinioteca-case__index">
            <span>{copy.homeCases.reader}</span>
            <span>{copy.homeCases.readerModes}</span>
          </div>
          <ScrollSwap
            className="opinioteca-case__media"
            progress={progress}
            slides={[
              { src: project.cover, alt: "Opinioteca social reading feed", caption: copy.homeCases.reader },
              { src: messages?.src || project.gallery[2].src, alt: "Opinioteca realtime messages", caption: copy.homeCases.readerModes },
            ]}
          />
        </Link>
      </MaskReveal>

      <div className="opinioteca-case__brief">
        <p className="project-chapter__context">{project.company} / {project.role}</p>
        <h4>{project.title}</h4>
        <p>{project.summary}</p>
        <div className="opinioteca-case__scope">
          <span>{copy.homeCases.surface}</span>
          <p>{project.tagline}</p>
        </div>
        <CaseLink project={project}>{copy.homeCases.readOpinioteca}</CaseLink>
      </div>
    </div>
  );
}

OpiniotecaChapter.propTypes = { project: PropTypes.object.isRequired, progress: PropTypes.object.isRequired };

function CalmeraChapter({ project, progress }) {
  const { copy } = useLanguage();
  const catalog = project.gallery.find((image) => image.alt === "Catalogs");

  return (
    <div className="calmera-case">
      <div className="calmera-case__brief">
        <div>
          <p className="project-chapter__context">{project.company} / {project.role}</p>
          <h4>{project.title}</h4>
          <p>{project.summary}</p>
        </div>
        <div className="calmera-case__note">
          <p>{copy.homeCases.calmeraNote}</p>
          <p>{project.stack.slice(0, 4).join(" / ")}</p>
        </div>
        <CaseLink project={project}>{copy.homeCases.readCalmera}</CaseLink>
      </div>

      <MaskReveal className="calmera-case__storefront-reveal" from="bottom">
        <Link
          to={`/projects/${project.slug}`}
          className="calmera-case__storefront"
          aria-label="Read the Calmera case study"
        >
          <div className="calmera-case__index">
            <span>{copy.homeCases.storefront}</span>
            <span>01 → 02</span>
          </div>
          <ScrollSwap
            progress={progress}
            slides={[
              { src: project.cover, alt: "Calmera artisan candle storefront", caption: copy.homeCases.storefront },
              { src: catalog?.src || project.gallery[1].src, alt: "Calmera product catalog", caption: copy.homeCases.catalog },
            ]}
          />
        </Link>
      </MaskReveal>
    </div>
  );
}

CalmeraChapter.propTypes = { project: PropTypes.object.isRequired, progress: PropTypes.object.isRequired };

const layouts = {
  trato: TratoChapter,
  opinioteca: OpiniotecaChapter,
  "calmera-os": CalmeraChapter,
};

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { copy } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 52, damping: 22, mass: 0.42 });
  const number = String(index + 1).padStart(2, "0");
  const Layout = layouts[project.slug];

  return (
    <article ref={ref} className={`project-chapter project-chapter--${project.slug}`}>
      <div className="project-chapter__stage">
        <div className="project-chapter__heading">
          <p className="eyebrow">{copy.work.case} {number} / {project.years}</p>
          <h3>{project.statement}</h3>
        </div>
        <div className="project-chapter__body">
          <Layout project={project} progress={smoothProgress} />
        </div>
        <motion.div className="project-chapter__progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    cover: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        aspect: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
