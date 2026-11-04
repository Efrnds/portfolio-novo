import PropTypes from "prop-types";
import { motion, useReducedMotion, useTransform } from "motion/react";

export function AssemblyEdges({ progress }) {
  const reduced = useReducedMotion();
  const horizontal = useTransform(progress, [0, 0.38], [0, 1]);
  const vertical = useTransform(progress, [0.14, 0.58], [0, 1]);
  const closing = useTransform(progress, [0.36, 0.78], [0, 1]);

  return (
    <div className="assembly-edges" aria-hidden="true">
      <motion.span className="assembly-edges__top" style={reduced ? undefined : { scaleX: horizontal }} />
      <motion.span className="assembly-edges__right" style={reduced ? undefined : { scaleY: vertical }} />
      <motion.span className="assembly-edges__bottom" style={reduced ? undefined : { scaleX: closing }} />
      <motion.span className="assembly-edges__left" style={reduced ? undefined : { scaleY: vertical }} />
    </div>
  );
}

AssemblyEdges.propTypes = { progress: PropTypes.object.isRequired };

export function AssemblyPart({ children, className = "", end = 0.9, from = "up", progress, start = 0.18 }) {
  const reduced = useReducedMotion();
  const x = useTransform(progress, [start, end], [from === "left" ? -56 : from === "right" ? 56 : 0, 0]);
  const y = useTransform(progress, [start, end], [from === "up" ? 36 : 0, 0]);
  const clipPath = useTransform(progress, [start, end], [
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(0 0 100% 0)",
    "inset(0 0 0 0)",
  ]);

  return (
    <motion.div className={`assembly-part ${className}`} style={reduced ? undefined : { x, y, clipPath }}>
      {children}
    </motion.div>
  );
}

AssemblyPart.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  end: PropTypes.number,
  from: PropTypes.oneOf(["left", "right", "up"]),
  progress: PropTypes.object.isRequired,
  start: PropTypes.number,
};
