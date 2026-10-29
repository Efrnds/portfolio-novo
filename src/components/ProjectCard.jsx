import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

function TratoChapter({ project }) {
  const { copy } = useLanguage();
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
            <img src={project.cover} alt="Trato operations dashboard" loading="lazy" />
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

TratoChapter.propTypes = { project: PropTypes.object.isRequired };

function OpiniotecaChapter({ project }) {
  const { copy } = useLanguage();
  const mobile = project.gallery.find((image) => image.aspect === "9/16");
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
          <div className="opinioteca-case__media">
            <div className="opinioteca-case__desktop">
              <img src={project.cover} alt="Opinioteca social reading feed" loading="lazy" />
            </div>
            {messages && (
              <div className="opinioteca-case__messages">
                <img src={messages.src} alt="Opinioteca messages" loading="lazy" />
              </div>
            )}
            {mobile && (
              <div className="opinioteca-case__mobile">
                <img src={mobile.src} alt="Opinioteca mobile interface" loading="lazy" />
              </div>
            )}
          </div>
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

OpiniotecaChapter.propTypes = { project: PropTypes.object.isRequired };

function CalmeraChapter({ project }) {
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
        <figure className="calmera-case__hero">
          <img src={project.cover} alt="Calmera artisan candle storefront" loading="lazy" />
          <figcaption>{copy.homeCases.storefront}</figcaption>
        </figure>
        {catalog && (
          <figure className="calmera-case__catalog">
            <img src={catalog.src} alt="Calmera product catalog" loading="lazy" />
            <figcaption>{copy.homeCases.catalog}</figcaption>
          </figure>
        )}
        </Link>
      </MaskReveal>
    </div>
  );
}

CalmeraChapter.propTypes = { project: PropTypes.object.isRequired };

const layouts = {
  trato: TratoChapter,
  opinioteca: OpiniotecaChapter,
  "calmera-os": CalmeraChapter,
};

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stageScale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.96, 1, 1, 0.96]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [0.35, 1, 1, 0.45]);
  const number = String(index + 1).padStart(2, "0");
  const Layout = layouts[project.slug];

  return (
    <motion.article
      ref={ref}
      className={`project-chapter project-chapter--${project.slug}`}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="project-chapter__stage" style={reduced ? undefined : { scale: stageScale, opacity: stageOpacity }}>
        <div className="project-chapter__heading">
          <p className="eyebrow">{copy.work.case} {number} / {project.years}</p>
          <h3>{project.statement}</h3>
        </div>
        <Layout project={project} />
        <motion.div className="project-chapter__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </motion.div>
    </motion.article>
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
