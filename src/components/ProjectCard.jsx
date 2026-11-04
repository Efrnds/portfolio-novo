import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import StoryFilm from "./StoryFilm";
import { AssemblyEdges } from "./Assembly";
import BuildPiece from "./construction/BuildPiece";
import { useConstructionScene } from "../hooks/useConstructionScene";
import { useSceneNavigation } from "../hooks/useSceneNavigation";
import { storyBeat } from "../utils/construction";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const surface = useRef(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const navigation = useSceneNavigation();
  const { raw: scrollYProgress, progress } = useConstructionScene(ref, { surface });
  const assembly = useTransform(progress, [0, 0.42], [0, 1]);
  const number = String(index + 1).padStart(2, "0");

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextBeat = storyBeat(value, project.story.length);
    setActiveBeat((current) => (current === nextBeat ? current : nextBeat));
  });

  return (
    <article
      ref={ref}
      className={`project-chapter live-construction project-chapter--${project.slug}`}
      style={{ "--story-beats": project.story.length }}
    >
      <div className="project-chapter__stage construction-stage">
        <header className="project-chapter__heading">
          <BuildPiece progress={progress} x={-4} start={0.03} end={0.22}>
            <p className="eyebrow">{copy.work.case} {number} / {project.years}</p>
          </BuildPiece>
          <BuildPiece progress={progress} x={4} y={3} start={0.04} end={0.25}>
            <h3>{project.statement}</h3>
          </BuildPiece>
        </header>

        <div className="project-story">
          <AssemblyEdges progress={assembly} />
          <div ref={surface} className="project-story__media" data-project-preview={project.slug}>
            <StoryFilm activeBeat={activeBeat} project={project} constructionProgress={progress} />
          </div>

          <BuildPiece className="project-story__rail" progress={progress} y={5} start={0.08} end={0.28}>
            <div className="project-story__identity">
              <p>{project.title}</p>
              <span>{project.company}</span>
            </div>

            <ol className="project-story__beats">
              {project.story.map((beat, beatIndex) => (
                <li key={beat.title} className={activeBeat === beatIndex ? "is-active" : ""}>
                  <button
                    type="button"
                    onClick={() => setActiveBeat(beatIndex)}
                    aria-current={activeBeat === beatIndex ? "step" : undefined}
                  >
                    <span>{String(beatIndex + 1).padStart(2, "0")}</span>
                    <span>{beat.label}</span>
                  </button>
                  <div className="project-story__mobile-copy">
                    <h4>{beat.title}</h4>
                    <p>{beat.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <motion.div
              key={activeBeat}
              className="project-story__active-copy"
              initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", y: 16 }}
              animate={{ clipPath: "inset(0 0 0 0)", y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4>{project.story[activeBeat].title}</h4>
              <p>{project.story[activeBeat].body}</p>
            </motion.div>

            <Link to={`/projects/${project.slug}`} className="action-link project-story__link"
              onClick={(event) => navigation.openProject(event, project, project.film.frames[activeBeat] || project.film.poster)}>
              {copy.homeCases.openStory}
            </Link>
          </BuildPiece>
        </div>

        <motion.div
          className="project-chapter__progress"
          style={reduced ? { scaleX: 1 } : { scaleX: progress }}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    company: PropTypes.string.isRequired,
    film: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    story: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
  }).isRequired,
};
