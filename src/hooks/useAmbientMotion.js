import { useEffect } from "react";

export function useAmbientMotion(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let visible = false;
    const update = () => { node.dataset.ambientPaused = String(document.hidden || !visible); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [ref]);
}
