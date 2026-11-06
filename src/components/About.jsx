import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { springs } from "../utils/choreography";
import { useSceneNavigation } from "../hooks/useSceneNavigation";
import SceneArrival from "./SceneArrival";

export default function About() {
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const text = copy.editorial;
  const navigation = useSceneNavigation();

  return (
    <section className="editorial-hero" aria-labelledby="intro-title">
      <div className="editorial-hero__folio">
        <p>Eduardo Fernandes</p>
        <p>{text.role}</p>
      </div>
      <div className="editorial-hero__body">
        <h1 id="intro-title" className="editorial-hero__title">
          {text.heroLines.map((line, index) => (
            <span className="editorial-hero__line" key={index}>
              <motion.span initial={reduced || navigation?.restored ? false : { y: "105%" }} animate={{ y: 0 }}
                transition={{ ...springs.surface, delay: index * 0.045 }}>{line}</motion.span>
            </span>
          ))}
        </h1>
        <SceneArrival as="p" delay={0.1} className="editorial-hero__intro">{text.intro}</SceneArrival>
      </div>
      <div className="editorial-hero__bottom">
        <a className="editorial-link editorial-link--down" href="#work" onClick={(event) => { if (navigation) { event.preventDefault(); navigation.navigateToSection("work"); } }}>{text.workLink}<span aria-hidden="true">↓</span></a>
        <p className="editorial-hero__location">{copy.hero.basedValue}<br />Prisma Tech / Texsa do Brasil</p>
      </div>
    </section>
  );
}
