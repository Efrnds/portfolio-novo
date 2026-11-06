import { useRef } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { springs } from "../../utils/choreography";
import SceneArrival from "../SceneArrival";
import { useSceneNavigation } from "../../hooks/useSceneNavigation";

export function CaseReveal({ children, className = "", delay = 0, direction = "up" }) {
  return (
    <SceneArrival
      className={`assembly-part ${className}`}
      delay={Math.min(delay, 0.12)} direction={direction}
    >
      {children}
    </SceneArrival>
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
  const navigation = useSceneNavigation();

  return (
    <span className={`kinetic-title ${className}`}>
      <motion.span
        initial={reduced || navigation?.restored ? false : { y: "105%" }}
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
