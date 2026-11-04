import PropTypes from "prop-types";
import { motion, useReducedMotion, useTransform } from "motion/react";

export default function ConstructionSurface({ src, alt, progress, kind = "trato", className = "", loading = "lazy" }) {
  const reduced = useReducedMotion();
  const inset = useTransform(progress, [0, 0.28], ["inset(4% 3% 4% 3%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.div className={`construction-surface construction-surface--${kind} ${className}`} style={reduced ? undefined : { clipPath: inset }}>
      <img src={src} alt={alt} loading={loading} decoding="async" draggable="false" />
    </motion.div>
  );
}

ConstructionSurface.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  kind: PropTypes.string,
  loading: PropTypes.oneOf(["eager", "lazy"]),
  progress: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
};
