import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { springs } from "../utils/choreography";

export default function Footer() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const text = copy.editorial.footer;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useSpring(scrollYProgress, springs.scroll);
  const y = useTransform(progress, [0, 1], [36, 0]);
  const toTheTop = () => window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });

  return (
    <footer ref={ref} id="contact" className="editorial-footer">
      <div className="editorial-footer__intro"><p className="editorial-label">{text.label}</p><span aria-hidden="true">ef.</span></div>
      <motion.div className="editorial-footer__main" style={reduced ? undefined : { y }}>
        <h2>{text.title.map((line) => <span key={line}>{line}</span>)}</h2>
        <div><p>{text.note}</p><a className="editorial-link" href="mailto:contato.efrnds@outlook.com">{text.link}<span aria-hidden="true">↗</span></a></div>
      </motion.div>
      <div className="editorial-footer__bottom">
        <p>© {new Date().getFullYear()} Eduardo Fernandes</p><p>{copy.footer.location}</p>
        <nav aria-label={copy.a11y.socialLinks}>
          <a href="https://github.com/Efrnds" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/edudfrs" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <button type="button" onClick={toTheTop}>{copy.footer.top}<span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
