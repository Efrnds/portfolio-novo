import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { AssemblyEdges } from "./Assembly";
import BuildPiece from "./construction/BuildPiece";
import { useConstructionScene } from "../hooks/useConstructionScene";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
  const ref = useRef(null);
  const surface = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const { progress } = useConstructionScene(ref, { surface });
  const structure = useTransform(progress, [0, 0.38], [0, 1]);
  const panel = useTransform(progress, [0.04, 0.24], [0.015, 1]);
  const titleX = useTransform(progress, [0, 0.32, 0.83, 1], ["28vw", "0vw", "0vw", "-24vw"]);
  const titleY = useTransform(progress, [0, 0.32, 0.83, 1], ["12vh", "0vh", "0vh", "-16vh"]);

  return (
    <section ref={ref} id="about" className="hero-section live-construction scroll-mt-24">
      <div className="hero-section__stage construction-stage">
        <motion.div className="construction-axis" style={reduced ? undefined : { scaleX: structure }} aria-hidden="true" />
        <div className="hero-section__copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <motion.div className="hero-section__headline build-piece" style={reduced ? undefined : { x: titleX, y: titleY }}>
            <h1>{copy.hero.title}</h1>
          </motion.div>
          <BuildPiece progress={progress} start={0.14} end={0.4} y={40} depth={-160}>
            <p className="hero-section__intro">{copy.hero.intro}</p>
          </BuildPiece>
          <div className="hero-section__actions">
            <a className="action-link action-link--solid" href="#work">{copy.hero.primary} <span aria-hidden="true">↓</span></a>
            <a className="action-link" href="mailto:contato.efrnds@outlook.com">{copy.hero.secondary}</a>
          </div>
        </div>

        <div ref={surface} className="hero-section__signature">
          <motion.div className="hero-signature__backplane" style={reduced ? undefined : { scaleY: panel }} aria-hidden="true" />
          <AssemblyEdges progress={structure} />
          <div className="hero-signature__mark" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <BuildPiece key={index} className="hero-signature__fragment" progress={progress}
                start={0.02 + index * 0.045} end={0.25 + index * 0.05}
                x={index === 1 ? 42 : -38} y={index === 1 ? 0 : index === 0 ? -38 : 38}
                depth={-180 - index * 80} crop={`inset(${index * 33.333}% 0 ${(2 - index) * 33.333}% 0)`}
              ><span>EF</span></BuildPiece>
            ))}
          </div>
          <BuildPiece className="hero-signature__note" progress={progress} start={0.22} end={0.41} y={48}>
            <p>{copy.hero.note}</p>
            <dl>
              <div><dt>{copy.hero.products}</dt><dd>Trato / Opinioteca / Calmera</dd></div>
              <div><dt>{copy.hero.practice}</dt><dd>{copy.hero.practiceValue}</dd></div>
              <div><dt>{copy.hero.current}</dt><dd>{copy.hero.currentValue}</dd></div>
            </dl>
          </BuildPiece>
        </div>

        <div className="hero-section__meta" aria-label={copy.a11y.currentDetails}>
          <p><span>{copy.hero.status}</span>{copy.hero.statusValue}</p>
          <p><span>{copy.hero.based}</span>{copy.hero.basedValue}</p>
          <p><span>{copy.hero.across}</span>{copy.hero.acrossValue}</p>
        </div>
        <p className="hero-section__scroll">{copy.hero.scroll} <span aria-hidden="true">↓</span></p>
      </div>
    </section>
  );
}
