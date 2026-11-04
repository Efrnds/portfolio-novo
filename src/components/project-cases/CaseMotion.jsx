import { useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { AssemblyEdges } from "../Assembly";
import { useAssembly } from "../../hooks/useAssembly";
import { useConstructionScene } from "../../hooks/useConstructionScene";
import ConstructionSurface from "../construction/ConstructionSurface";

const easeOut = [0.22, 1, 0.36, 1];

export function CaseReveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const progress = useAssembly(ref);
  const start = Math.min(0.16 + delay, 0.5);
  const revealX = useTransform(progress, [start, 1], [direction === "left" ? -48 : direction === "right" ? 48 : 0, 0]);
  const revealY = useTransform(progress, [start, 1], [direction === "up" ? 36 : 0, 0]);
  const clipPath = useTransform(progress, [start, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return (
    <motion.div
      ref={ref}
      className={`assembly-part ${className}`}
      style={reduced ? undefined : { x: revealX, y: revealY, clipPath }}
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
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, ease: easeOut }}
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
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.44 });

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

export function CaseHeroMedia({ image, title }) {
  const ref = useRef(null);
  const { pathname, state } = useLocation();
  const kind = pathname.split("/").pop();
  const { progress } = useConstructionScene(ref);
  const assembly = useTransform(progress, [0, 0.42], [0, 1]);
  const coverProgress = useTransform(progress, [0, 1], [state?.fromHome ? 0.42 : 0, 1]);
  const src = state?.previewSrc || image.src;

  return (
    <section ref={ref} className="case-hero-media live-construction" data-route-hero aria-label={image.alt}>
      <figure className="construction-stage">
        <AssemblyEdges progress={assembly} />
        <img className="route-image-reference" data-route-image src={src} alt="" aria-hidden="true" />
        <ConstructionSurface src={src} alt={image.alt} kind={kind} progress={coverProgress} loading="eager" />
        <figcaption><span>01</span>{state?.previewTitle ? `${state.previewTitle} / ` : ""}{title}</figcaption>
      </figure>
    </section>
  );
}

CaseHeroMedia.propTypes = {
  image: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
