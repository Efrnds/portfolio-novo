import { useContext } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { ConstructionContext } from "./ConstructionContext";

export default function BuildPiece({ children, className = "", progress, start = 0.08, end = 0.4, x = 0, y = 0, depth = 0, crop, style }) {
  const reduced = useReducedMotion();
  const context = useContext(ConstructionContext);
  const distance = context?.compact ? 0.24 : 1;
  const positionX = useTransform(progress, [start, end], [`${x * distance}vw`, "0vw"]);
  const positionY = useTransform(progress, [start, end], [`${y * distance}vh`, "0vh"]);
  const z = useTransform(progress, [start, end], [depth * distance, 0]);

  return (
    <motion.div
      className={`build-piece ${className}`}
      style={{ ...style, clipPath: crop, ...(reduced ? {} : { x: positionX, y: positionY, z }) }}
    >
      {children}
    </motion.div>
  );
}

BuildPiece.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  crop: PropTypes.string,
  depth: PropTypes.number,
  end: PropTypes.number,
  progress: PropTypes.object.isRequired,
  start: PropTypes.number,
  style: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
};
