import { useEffect, useSyncExternalStore } from "react";
import PropTypes from "prop-types";
const subscribe = (callback) => { const query = window.matchMedia("(max-width: 767px)"); query.addEventListener("change", callback); return () => query.removeEventListener("change", callback); };
export const useIsMobile = () => useSyncExternalStore(subscribe, () => window.matchMedia("(max-width: 767px)").matches, () => false);
const media = new Map();
export function preloadMany(sources) {
  return Promise.all(sources.map((source) => {
    const path = source.replace("/assets/mobilepages/", "/assets/pages/").replace(/^\/?assets\//, "/product-slices/vwrks/assets/");
    if (!media.has(path)) media.set(path, new Promise((resolve) => { const image = new Image(); image.onload = () => { image.decode().catch(() => {}).then(resolve); }; image.onerror = resolve; image.src = path; }));
    return media.get(path);
  }));
}
export function sequenceInterval(callback) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  return window.setInterval(() => {
    const host = document.querySelector('[data-product-slice="vwrks"]');
    if (document.hidden || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = host.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) callback();
  }, 700);
}
export function PagePreloader({ onComplete, onReady }) { useEffect(() => { onComplete?.(); onReady?.(); }, [onComplete, onReady]); return null; }
PagePreloader.propTypes = { onComplete: PropTypes.func, onReady: PropTypes.func };
export function ProgressivePreload() { return null; }
const root = () => document.querySelector('[data-product-slice="vwrks"]')?.shadowRoot;
export const scopedDocument = {
  get documentElement() { return root()?.querySelector(".slice-app") ?? document.createElement("div"); },
  querySelector(selector) { return root()?.querySelector(selector); },
  querySelectorAll(selector) { return root()?.querySelectorAll(selector) ?? []; },
};
