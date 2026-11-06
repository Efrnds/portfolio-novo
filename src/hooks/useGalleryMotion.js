import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useViewport } from "./useViewport";
import { galleryPosition, springs, visibleGalleryIndex } from "../utils/choreography";

export function useGalleryMotion(ref) {
  const compact = useViewport();
  const reduced = useReducedMotion();
  const followsScroll = !compact && !reduced;
  const [active, setActive] = useState(0);
  const selected = useRef(0);
  const position = useSpring(0, springs.scroll);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72px", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (followsScroll) position.set(galleryPosition(value));
  });
  useMotionValueEvent(position, "change", (value) => {
    if (!followsScroll) return;
    const next = visibleGalleryIndex(value, selected.current);
    if (next === selected.current) return;
    selected.current = next;
    setActive(next);
  });

  useEffect(() => {
    position.jump(followsScroll ? galleryPosition(scrollYProgress.get()) : selected.current);
  }, [followsScroll, position, scrollYProgress]);

  const select = (next) => {
    const node = ref.current;
    if (!followsScroll || !node) {
      selected.current = next;
      setActive(next);
      if (reduced) position.jump(next);
      else position.set(next);
      return;
    }
    const start = node.getBoundingClientRect().top + window.scrollY - 72;
    const travel = Math.max(0, node.offsetHeight - window.innerHeight + 72);
    window.scrollTo({ top: start + travel * (next ? 0.9 : 0.1), behavior: "smooth" });
  };

  return { active, position, select, reduced };
}
