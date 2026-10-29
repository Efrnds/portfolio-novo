import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function Experience() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const headingX = useTransform(scrollYProgress, [0, 0.16, 0.62, 0.82], [-60, 0, 0, -180]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12, 0.64, 0.82], [0, 1, 1, 0]);
  const listY = useTransform(scrollYProgress, [0, 0.18, 0.64, 0.84], [60, 0, 0, -180]);
  const listOpacity = useTransform(scrollYProgress, [0, 0.14, 0.66, 0.84], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="experience" className="experience-section scroll-mt-20">
      <div className="experience-section__stage">
        <motion.div className="experience-section__lead" style={reduced ? undefined : { x: headingX, opacity: headingOpacity }}>
          <p className="eyebrow">{copy.experience.eyebrow}</p>
          <h2>{copy.experience.title}</h2>
          <p>{copy.experience.body}</p>
          <strong className="experience-section__bridge">{copy.experience.bridge}</strong>
        </motion.div>

        <motion.ul className="experience-list" style={reduced ? undefined : { y: listY, opacity: listOpacity }}>
          {copy.experience.roles.map((role, index) => (
            <li key={role[0]} className="experience-list__item">
              <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <p><strong>{role[0]}</strong>{role[1]}</p>
              <p>{role[2]}</p>
            </li>
          ))}
        </motion.ul>
        <motion.div className="experience-section__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </div>
    </section>
  );
}
