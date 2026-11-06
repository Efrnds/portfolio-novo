import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { springs } from "../utils/choreography";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { ...springs.scroll, skipInitialAnimation: true });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-black z-[60] origin-left"
      style={reduced ? { scaleX: scrollYProgress } : { scaleX }}
      aria-hidden="true"
    />
  );
}
