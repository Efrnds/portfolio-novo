import { motion, useReducedMotion } from "framer-motion";
import { KineticTitle } from "./project-cases/CaseMotion";

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="hero-section scroll-mt-24">
      <div className="hero-section__copy">
        <motion.p
          className="eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Eduardo Fernandes / Full-stack + IT operations
        </motion.p>

        <h1>
          <KineticTitle>I build software that survives the handoff.</KineticTitle>
        </h1>

        <motion.p
          className="hero-section__intro"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          Products, internal tools, and the infrastructure behind them. From
          the first interface to the routine that has to work on Monday.
        </motion.p>

        <motion.div
          className="hero-section__actions"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <a className="action-link action-link--solid" href="#work">
            See the systems <span aria-hidden="true">↓</span>
          </a>
          <a className="action-link" href="mailto:contato.efrnds@outlook.com">
            Start a conversation
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-section__signature"
        initial={reduced ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
      >
        <p className="hero-signature__mark" aria-hidden="true">EF</p>
        <div className="hero-signature__note">
          <p>Product engineering with operational memory.</p>
          <dl>
            <div><dt>Products</dt><dd>Trato / Opinioteca / Calmera</dd></div>
            <div><dt>Practice</dt><dd>Full-stack engineering and IT operations</dd></div>
            <div><dt>Current</dt><dd>Prisma Tech / Texsa do Brasil</dd></div>
          </dl>
        </div>
      </motion.div>

      <div className="hero-section__meta" aria-label="Current details">
        <p>
          <span>Status</span>
          Building at Prisma Tech
        </p>
        <p>
          <span>Based in</span>
          Umuarama, Brazil
        </p>
        <p>
          <span>Working across</span>
          UI / API / Deploy / Operations
        </p>
      </div>
    </section>
  );
}
