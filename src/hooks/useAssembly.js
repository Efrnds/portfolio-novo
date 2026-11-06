import { useScroll, useSpring } from "motion/react";
import { springs } from "../utils/choreography";

export function useAssembly(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 24%"],
  });

  return useSpring(scrollYProgress, springs.scroll);
}
