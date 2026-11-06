import { useEffect } from "react";
import { animate, useReducedMotion } from "motion/react";
import { springs } from "../utils/choreography";

function layoutTop(node) {
  let top = 0;
  for (let item = node; item; item = item.offsetParent) top += item.offsetTop;
  return top;
}

export function useProductMotion(shadow, kind) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!shadow) return;
    const running = new Map();
    const originals = new WeakMap();
    let positions = new Map();
    let step;
    let bookingNode;
    let bookingHeight;
    let resizing;
    let frame;
    const play = (node, values, transition = springs.control) => {
      if (!originals.has(node)) originals.set(node, node.style.transform);
      running.get(node)?.stop();
      const control = animate(node, values, transition);
      running.set(node, control);
      control.then(() => { if (running.get(node) !== control) return; node.style.transform = originals.get(node); originals.delete(node); running.delete(node); });
    };
    const measure = () => {
      const nodes = reduced ? [] : shadow.querySelectorAll("[data-demo-post], [data-demo-comment]");
      const next = new Map([...nodes].map((node) => [node, layoutTop(node)]));
      const changes = [...next].map(([node, top]) => ({ node, difference: positions.has(node) ? positions.get(node) - top : 0, currentY: running.has(node) ? new DOMMatrix(getComputedStyle(node).transform).m42 : 0, added: positions.size > 0 && !positions.has(node) }));
      positions = next;
      for (const { node, difference, currentY, added } of changes) {
        if (Math.abs(difference) > 1 && node.matches("[data-demo-post]")) play(node, { y: [difference + currentY, 0] }, springs.reflow);
        else if (added && node.matches("[data-demo-comment]")) play(node, { y: [12, 0] });
      }
      if (kind === "trato") {
        const booking = shadow.querySelector("[data-demo-step]");
        const current = Number(booking?.dataset.demoStep);
        if (booking && !reduced) {
          const from = resizing ? booking.offsetHeight : bookingHeight;
          resizing?.stop();
          booking.style.height = "";
          const target = booking.offsetHeight;
          if (bookingNode === booking && from && Math.abs(target - from) > 2) {
            const resize = animate(booking, { height: [from, target] }, { duration: 0.32, ease: [0.25, 0.8, 0.25, 1] });
            resizing = resize;
            resize.then(() => { if (resizing !== resize) return; booking.style.height = ""; resizing = undefined; });
          } else resizing = undefined;
          bookingNode = booking;
          bookingHeight = target;
        }
        if (step !== undefined && current !== step && booking) {
          const entry = booking.querySelector(".animate-in");
          if (entry && !reduced) play(entry, { x: [current > step ? 24 : -24, 0] }, springs.panel);
          const heading = booking.querySelector("h1,h2,h3");
          const viewport = shadow.host.closest("[data-browser-viewport]");
          const edge = viewport ? viewport.getBoundingClientRect().top + 16 : 96;
          if (heading && booking.getBoundingClientRect().bottom > edge && heading.getBoundingClientRect().top < edge) {
            const scroller = shadow.querySelector("[data-browser-scroll]");
            const container = scroller ?? window;
            container.scrollTo({ top: (scroller ? scroller.scrollTop : window.scrollY) + heading.getBoundingClientRect().top - edge, behavior: reduced ? "instant" : "smooth" });
          }
        }
        step = Number.isFinite(current) ? current : undefined;
      }
    };
    const observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(shadow, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-demo-step"] });
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      resizing?.stop();
      if (bookingNode) bookingNode.style.height = "";
      running.forEach((control, node) => { control.stop(); node.style.transform = originals.get(node) ?? ""; });
    };
  }, [shadow, kind, reduced]);
}
