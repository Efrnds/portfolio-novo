import { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTransform } from "motion/react";
import { AssemblyEdges } from "../Assembly";
import { useConstructionScene } from "../../hooks/useConstructionScene";
import { useLanguage } from "../../i18n/LanguageContext";
import BuildPiece from "./BuildPiece";

export default function ArchiveScene({ projects, offset }) {
  const ref = useRef(null);
  const surface = useRef(null);
  const { copy } = useLanguage();
  const { progress } = useConstructionScene(ref, { surface });
  const structure = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="archive-scene live-construction">
      <div className="project-archive construction-stage">
        <BuildPiece className="project-archive__heading" progress={progress} x={-34} end={0.34}>
          <p className="eyebrow">{copy.work.more}</p>
          <p>{copy.work.moreBody}</p>
        </BuildPiece>
        <div ref={surface} className="project-archive__list">
          <AssemblyEdges progress={structure} />
          {projects.map((project, index) => (
            <BuildPiece key={project.slug} progress={progress} x={index % 2 ? 42 : -42} y={20} start={0.08 + index * 0.08} end={0.32 + index * 0.06}>
              <Link to={`/projects/${project.slug}`}>
                <span>{String(index + offset + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <p>{project.statement}</p>
                <span>{project.years}</span>
              </Link>
            </BuildPiece>
          ))}
        </div>
      </div>
    </section>
  );
}

ArchiveScene.propTypes = { projects: PropTypes.array.isRequired, offset: PropTypes.number.isRequired };
