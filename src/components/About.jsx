import { motion, useReducedMotion } from "framer-motion";
import OperationalFlow from "./OperationalFlow";

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

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.04 }}
        >
          I build software that survives the handoff.
        </motion.h1>

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
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-section__system"
        initial={reduced ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
      >
        <OperationalFlow />
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
