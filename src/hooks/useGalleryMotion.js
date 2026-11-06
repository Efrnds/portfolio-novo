import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useViewport } from "./useViewport";
import { useSceneNavigation } from "./useSceneNavigation";
import { nextGalleryState, springs } from "../utils/choreography";

export function useGalleryMotion(ref, id) {
  const compact = useViewport();
  const reduced = useReducedMotion();
  const navigation = useSceneNavigation();
  const initial = useRef(navigation?.readView(id) ?? 0);
  const [active, setActive] = useState(initial.current);
  const selection = useRef({ index: initial.current });
  const ready = useRef(false);
  const [fits, setFits] = useState(true);
  const position = useSpring(initial.current, springs.gallery);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72px", "end end"], trackContentSize: true });

  const commit = (next, instant = false) => {
    selection.current = next;
    navigation?.saveView(id, next.index);
    setActive(next.index);
    if (reduced || instant) position.jump(next.index);
    else position.set(next.index);
  };

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!ready.current || compact || reduced || !fits) return;
    const next = nextGalleryState(selection.current, value);
    if (next.index === selection.current.index) { selection.current = next; return; }
    commit(next, value === 0 || value === 1);
  });

  useEffect(() => {
    const stage = ref.current?.querySelector(".work-feature__stage");
    if (!stage) return;
    const measure = () => setFits(stage.offsetHeight <= window.innerHeight - 72 + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [ref]);

  useEffect(() => {
    let frame;
    let second;
    const restore = () => {
      ready.current = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(second);
      const saved = navigation?.readView(id);
      if (saved !== undefined) {
        selection.current = { index: saved };
        position.jump(saved);
        setActive(saved);
      }
      frame = requestAnimationFrame(() => { second = requestAnimationFrame(() => {
        const index = saved ?? nextGalleryState(selection.current, scrollYProgress.get()).index;
        selection.current = { index };
        position.jump(index);
        setActive(index);
        ready.current = true;
      }); });
    };
    window.addEventListener("construction:restore", restore);
    restore();
    return () => { ready.current = false; cancelAnimationFrame(frame); cancelAnimationFrame(second); window.removeEventListener("construction:restore", restore); };
  }, [id, navigation, position, scrollYProgress]);

  const select = (index) => commit({ index, manualOrigin: scrollYProgress.get() });

  return { active, position, select, reduced, flow: compact || reduced || !fits };
}
