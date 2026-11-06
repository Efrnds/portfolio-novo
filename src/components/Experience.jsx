import { useRef } from "react";
import { Link } from "react-router-dom";
import { easeInOut, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useViewport } from "../hooks/useViewport";
import { springs } from "../utils/choreography";

export default function Experience() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const compact = useViewport();
  const { copy } = useLanguage();
  const text = copy.editorial.operations;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72px", "end end"] });
  const progress = useSpring(scrollYProgress, springs.scroll);
  const opacity = useTransform(progress, [0, 0.16, 0.76, 0.97], [0, 1, 1, 0], { ease: easeInOut });
  const y = useTransform(progress, [0, 0.18, 0.76, 0.97], [24, 0, 0, -20], { ease: easeInOut });

  return (
    <section ref={ref} id="experience" className="editorial-operations" aria-labelledby="operations-title">
      <div className="editorial-operations__stage">
        <motion.div className="editorial-operations__content" style={reduced || compact ? undefined : { opacity, y }}>
          <header>
            <p className="editorial-label">02 / {text.label}</p>
            <h2 id="operations-title">{text.title}</h2>
            <p>{text.intro}</p>
          </header>
          <div className="editorial-operations__entries">
            {text.entries.map((entry, index) => <article key={entry.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{entry.title}</h3><p>{entry.body}</p></div>
            </article>)}
            <Link className="editorial-link" to="/projects/texsa-tools">{text.link}<span aria-hidden="true">↗</span></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
