import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { KineticTitle } from "./project-cases/CaseMotion";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 64, damping: 24, mass: 0.36 });
  const markScale = useTransform(smoothProgress, [0, 1], [1, 1.18]);
  const markRotate = useTransform(smoothProgress, [0, 1], [0, -4]);
  const copyY = useTransform(smoothProgress, [0, 1], [0, -36]);

  return (
    <section ref={ref} id="about" className="hero-section scroll-mt-24">
      <div className="hero-section__stage">
        <motion.div className="hero-section__copy" style={reduced ? undefined : { y: copyY }}>
          <motion.p className="eyebrow" initial={reduced ? false : { y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.35 }}>
            {copy.hero.eyebrow}
          </motion.p>
          <h1><KineticTitle>{copy.hero.title}</KineticTitle></h1>
          <motion.p className="hero-section__intro" initial={reduced ? false : { y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.12 }}>
            {copy.hero.intro}
          </motion.p>
          <motion.div className="hero-section__actions" initial={reduced ? false : { y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
            <a className="action-link action-link--solid" href="#work">{copy.hero.primary} <span aria-hidden="true">↓</span></a>
            <a className="action-link" href="mailto:contato.efrnds@outlook.com">{copy.hero.secondary}</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-section__signature" initial={reduced ? false : { x: 18 }} animate={{ x: 0 }} transition={{ duration: 0.55, delay: 0.16 }}>
          <motion.p className="hero-signature__mark" aria-hidden="true" style={reduced ? undefined : { scale: markScale, rotate: markRotate }}>EF</motion.p>
          <div className="hero-signature__note">
            <p>{copy.hero.note}</p>
            <dl>
              <div><dt>{copy.hero.products}</dt><dd>Trato / Opinioteca / Calmera</dd></div>
              <div><dt>{copy.hero.practice}</dt><dd>{copy.hero.practiceValue}</dd></div>
              <div><dt>{copy.hero.current}</dt><dd>{copy.hero.currentValue}</dd></div>
            </dl>
          </div>
        </motion.div>

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
