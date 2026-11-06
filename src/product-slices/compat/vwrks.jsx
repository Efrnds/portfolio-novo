import { useEffect } from "react";
import PropTypes from "prop-types";
export const useIsMobile = () => false;
export const preloadMany = async () => {};
export function PagePreloader({ onComplete, onReady }) { useEffect(() => { onComplete?.(); onReady?.(); }, [onComplete, onReady]); return null; }
PagePreloader.propTypes = { onComplete: PropTypes.func, onReady: PropTypes.func };
export function ProgressivePreload() { return null; }
const root = () => document.querySelector('[data-product-slice="vwrks"]')?.shadowRoot;
export const scopedDocument = {
  get documentElement() { return root()?.querySelector(".slice-app") ?? document.createElement("div"); },
  querySelector(selector) { return root()?.querySelector(selector); },
  querySelectorAll(selector) { return root()?.querySelectorAll(selector) ?? []; },
};
