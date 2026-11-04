import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useConstructionScene } from "../hooks/useConstructionScene";
import BuildPiece from "./construction/BuildPiece";
import { AssemblyEdges } from "./Assembly";

export default function Experience() {
  const ref = useRef(null);
  const surface = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const { progress } = useConstructionScene(ref, { surface });
  const structure = useTransform(progress, [0, 0.4], [0, 1]);
  const background = useTransform(progress, [0, 0.18], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  const textOpacity = useTransform(progress, [0, 0.14, 0.8, 0.94], [0, 1, 1, 0]);
  const headingX = useTransform(progress, [0, 0.36, 0.8, 0.94], ["-34vw", "0vw", "0vw", "-16vw"]);

  return (
    <section ref={ref} id="experience" className="experience-section live-construction scroll-mt-20">
      <div className="experience-section__stage construction-stage">
        <motion.div className="experience-section__backplane" style={reduced ? undefined : { clipPath: background }} aria-hidden="true" />
        <motion.div className="experience-section__lead build-piece" style={reduced ? undefined : { opacity: textOpacity, x: headingX }}>
          <p className="eyebrow">{copy.experience.eyebrow}</p>
          <h2>{copy.experience.title}</h2>
          <p>{copy.experience.body}</p>
          <strong className="experience-section__bridge">{copy.experience.bridge}</strong>
        </motion.div>

        <div ref={surface} className="experience-list-surface">
          <AssemblyEdges progress={structure} />
          <motion.ol className="experience-list" style={reduced ? undefined : { opacity: textOpacity }}>
            {copy.experience.roles.map((role, index) => (
              <li key={role[0]}>
                <BuildPiece className="experience-list__item" progress={progress} start={0.08 + index * 0.045} end={0.28 + index * 0.06} x={index % 2 ? 42 : -42} y={index * 10}>
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <p><strong>{role[0]}</strong>{role[1]}</p>
                  <p>{role[2]}</p>
                </BuildPiece>
              </li>
            ))}
          </motion.ol>
        </div>
        <motion.div className="experience-section__progress" style={reduced ? { scaleX: 1 } : { scaleX: progress }} aria-hidden="true" />
      </div>
    </section>
  );
}
