import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { springs } from "../utils/choreography";

export default function About() {
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const text = copy.editorial;

  return (
    <section className="editorial-hero" aria-labelledby="intro-title">
      <div className="editorial-hero__folio">
        <p>Eduardo Fernandes</p>
        <p>{text.role}</p>
      </div>
      <div className="editorial-hero__body">
        <h1 id="intro-title" className="editorial-hero__title">
          {text.heroLines.map((line, index) => (
            <span className="editorial-hero__line" key={line}>
              <motion.span initial={reduced ? false : { y: "65%" }} animate={{ y: 0 }}
                transition={{ ...springs.surface, delay: index * 0.055 }}>{line}</motion.span>
            </span>
          ))}
        </h1>
        <p className="editorial-hero__intro">{text.intro}</p>
      </div>
      <div className="editorial-hero__bottom">
        <a className="editorial-link" href="#work">{text.workLink}<span aria-hidden="true">↓</span></a>
        <p className="editorial-hero__location">{copy.hero.basedValue}<br />Prisma Tech / Texsa do Brasil</p>
      </div>
    </section>
  );
}
