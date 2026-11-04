import { useContext, useLayoutEffect } from "react";
import { useMotionValue, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { ConstructionContext } from "../components/construction/ConstructionContext";
import { clamp, scenePhase, sceneRange } from "../utils/construction";

export function useConstructionScene(ref, { surface } = {}) {
  const { scrollY } = useContext(ConstructionContext);
  const range = useMotionValue({ start: 0, end: 1 });
  const raw = useTransform(() => {
    const limits = range.get();
    return clamp((scrollY.get() - limits.start) / (limits.end - limits.start));
  });
  const progress = useSpring(raw, { stiffness: 105, damping: 32, mass: 0.38 });
  useMotionValueEvent(raw, "change", (value) => {
    const node = ref.current;
    const phase = scenePhase(value);
    if (node && node.dataset.constructionPhase !== phase) node.dataset.constructionPhase = phase;
  });

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let frame;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const bounds = node.getBoundingClientRect();
      const compact = window.matchMedia("(max-width: 900px)").matches;
      const header = compact ? 64 : 72;
      const panel = surface?.current;
      const anchor = compact && panel ? panel.getBoundingClientRect() : bounds;
      const limits = sceneRange(anchor.top + window.scrollY, node.offsetHeight, window.innerHeight, header, compact);
      range.set(limits);
    };
    const schedule = () => { if (!disposed) { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); } };
    const restore = () => {
      scrollY.jump(window.scrollY);
      const limits = range.get();
      progress.jump(clamp((window.scrollY - limits.start) / (limits.end - limits.start)));
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    if (surface?.current) observer.observe(surface.current);
    window.addEventListener("resize", schedule);
    window.addEventListener("construction:restore", restore);
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("construction:restore", restore);
    };
  }, [ref, surface, range, progress, scrollY]);

  return { raw, progress };
}
