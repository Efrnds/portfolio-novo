import { useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import SceneArrival, { TypeArrival } from "../components/SceneArrival";

export default function Footer() {
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const text = copy.editorial.footer;
  const toTheTop = () => window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });

  return (
    <footer id="contact" className="editorial-footer">
      <div className="editorial-footer__intro"><p className="editorial-label">{text.label}</p><span aria-hidden="true">ef.</span></div>
      <div className="editorial-footer__main">
        <h2>{text.title.map((line, index) => <TypeArrival key={index} delay={index * 0.06}>{line}</TypeArrival>)}</h2>
        <SceneArrival delay={0.08}><p>{text.note}</p><a className="editorial-link" href="mailto:contato.efrnds@outlook.com">{text.link}<span aria-hidden="true">↗</span></a></SceneArrival>
      </div>
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
