import { useRef } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useAssembly } from "../../hooks/useAssembly";
import { springs } from "../../utils/choreography";

export function CaseReveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const progress = useAssembly(ref);
  const start = Math.min(delay, 0.3);
  const revealX = useTransform(progress, [start, 1], [direction === "left" ? -12 : direction === "right" ? 12 : 0, 0]);
  const revealY = useTransform(progress, [start, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      className={`assembly-part ${className}`}
      style={reduced ? undefined : { x: revealX, y: revealY }}
    >
      {children}
    </motion.div>
  );
}

CaseReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(["left", "right", "up"]),
};

export function KineticTitle({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <span className={`kinetic-title ${className}`}>
      <motion.span
        initial={reduced ? false : { y: "65%" }}
        animate={{ y: 0 }}
        transition={springs.surface}
      >
        {children}
      </motion.span>
    </span>
  );
}

KineticTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export function CaseScrollScene({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72px", "end end"] });
  const progress = useSpring(scrollYProgress, springs.scroll);

  return (
    <section ref={ref} className={`case-scroll-scene ${className}`}>
      <div className="case-scroll-scene__stage">
        <div className="case-scroll-scene__content">{children}</div>
        <motion.span className="case-scroll-scene__progress" style={reduced ? { scaleX: 1 } : { scaleX: progress }} aria-hidden="true" />
      </div>
    </section>
  );
}

CaseScrollScene.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
