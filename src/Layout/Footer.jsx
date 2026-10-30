import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

function Footer() {
  const reduced = useReducedMotion();
  const { copy } = useLanguage();
  const toTheTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <motion.div
        className="site-footer__cta"
        initial={reduced ? false : { y: 48, clipPath: "inset(0 0 22% 0)" }}
        whileInView={{ y: 0, clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">{copy.footer.eyebrow}</p>
        <h2>{copy.footer.title}</h2>
        <a href="mailto:contato.efrnds@outlook.com" className="action-link action-link--light">
          {copy.footer.link}
        </a>
      </motion.div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Eduardo Fernandes</p>
        <p>{copy.footer.location}</p>
        <nav aria-label={copy.a11y.socialLinks}>
          <a href="https://github.com/Efrnds" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/edudfrs" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
        <button type="button" onClick={toTheTop}>
          {copy.footer.top} <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
