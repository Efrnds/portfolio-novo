import { motion, useReducedMotion } from "framer-motion";

function Footer() {
  const reduced = useReducedMotion();
  const toTheTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <motion.div
        className="site-footer__cta"
        initial={reduced ? false : { opacity: 0, y: 48, clipPath: "inset(0 0 22% 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">Open channel</p>
        <h2>Have a system that needs to work beyond the demo?</h2>
        <a href="mailto:contato.efrnds@outlook.com" className="action-link action-link--light">
          Tell me where it gets difficult
        </a>
      </motion.div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Eduardo Fernandes</p>
        <p>Umuarama, Brazil / BRT</p>
        <nav aria-label="Social links">
          <a href="https://github.com/Efrnds" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/edudfrs" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
        <button type="button" onClick={toTheTop}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
