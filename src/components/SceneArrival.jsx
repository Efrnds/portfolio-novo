import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";
import { useSceneNavigation } from "../hooks/useSceneNavigation";
import { springs } from "../utils/choreography";

const elements = { div: motion.div, header: motion.header, li: motion.li, p: motion.p };

export default function SceneArrival({ as = "div", children, className, delay = 0, direction = "up", ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const navigation = useSceneNavigation();
  const [focused, setFocused] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [arrived, setArrived] = useState(!!navigation?.restored || !!reduced);
  useEffect(() => { if (inView || focused || navigation?.restored || reduced) setArrived(true); }, [inView, focused, navigation?.restored, reduced]);
  const Element = elements[as];
  const start = direction === "up" ? { y: 32 } : { x: direction === "left" ? -28 : 28 };
  return <Element {...props} ref={ref} className={className}
    initial={reduced || navigation?.restored ? false : "approach"}
    variants={{ approach: start, settled: { x: 0, y: 0 } }}
    animate={arrived ? "settled" : "approach"}
    onFocusCapture={() => setFocused(true)}
    transition={{ ...springs.surface, delay: reduced ? 0 : delay }}>{children}</Element>;
}

SceneArrival.propTypes = {
  as: PropTypes.oneOf(Object.keys(elements)), children: PropTypes.node.isRequired,
  className: PropTypes.string, delay: PropTypes.number, direction: PropTypes.oneOf(["up", "left", "right"]),
};

export function TypeArrival({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const navigation = useSceneNavigation();
  const visible = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });
  const [arrived, setArrived] = useState(!!navigation?.restored || !!reduced);
  useEffect(() => { if (visible || navigation?.restored || reduced) setArrived(true); }, [visible, navigation?.restored, reduced]);
  return <span ref={ref} className={`type-arrival ${className}`} data-arrived={arrived ? "true" : "false"}>
    <motion.span initial={reduced || navigation?.restored ? false : "approach"}
      variants={{ approach: { y: "105%" }, settled: { y: 0 } }} animate={arrived ? "settled" : "approach"}
      transition={{ ...springs.surface, delay: reduced ? 0 : delay }}>{children}</motion.span>
  </span>;
}
TypeArrival.propTypes = { children: PropTypes.node.isRequired, delay: PropTypes.number, className: PropTypes.string };
