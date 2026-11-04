import { useScroll, useSpring } from "motion/react";

export function useAssembly(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 24%"],
  });

  return useSpring(scrollYProgress, { stiffness: 65, damping: 28, mass: 0.55 });
}
