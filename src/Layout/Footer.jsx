import { useRef } from "react";
import { useTransform } from "motion/react";
import { AssemblyEdges } from "../components/Assembly";
import BuildPiece from "../components/construction/BuildPiece";
import { useConstructionScene } from "../hooks/useConstructionScene";
import { useLanguage } from "../i18n/LanguageContext";

function Footer() {
  const ref = useRef(null);
  const surface = useRef(null);
  const { progress } = useConstructionScene(ref, { surface });
  const assembly = useTransform(progress, [0, 0.4], [0, 1]);
  const { copy } = useLanguage();
  const toTheTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="site-footer live-construction">
      <div className="site-footer__stage construction-stage">
      <AssemblyEdges progress={assembly} />
      <div ref={surface} className="site-footer__cta">
      <BuildPiece className="site-footer__assembly" progress={progress} x={-35} y={36} end={0.42}>
        <p className="eyebrow">{copy.footer.eyebrow}</p>
        <h2>{copy.footer.title}</h2>
        <a href="mailto:contato.efrnds@outlook.com" className="action-link action-link--light">
          {copy.footer.link}
        </a>
      </BuildPiece>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Eduardo Fernandes</p>
        <p>{copy.footer.location}</p>
        <nav aria-label={copy.a11y.socialLinks}>
          <a href="https://github.com/Efrnds" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/edudfrs" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <button type="button" onClick={toTheTop}>{copy.footer.top} <span aria-hidden="true">↑</span></button>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
