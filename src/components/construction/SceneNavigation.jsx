import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import PropTypes from "prop-types";
import { SceneNavigationContext } from "./ConstructionContext";
import { acceptsTransition } from "../../utils/construction";

export default function SceneNavigation({ children }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const positions = useRef(new Map());
  const views = useRef(new Map());
  const previousLocation = useRef(location);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useEffect(() => {
    const save = () => positions.current.set(location.key, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key]);

  useLayoutEffect(() => {
    const previous = previousLocation.current;
    previousLocation.current = location;
    const frame = requestAnimationFrame(() => {
      const header = window.innerWidth <= 900 ? 64 : 72;
      const returning = navigationType === "POP";
      if (returning && positions.current.has(location.key)) {
        window.scrollTo({ top: positions.current.get(location.key), behavior: "instant" });
      } else if (location.hash) {
        const node = document.getElementById(location.hash.slice(1));
        if (node) {
          const reading = Number(node.dataset.sceneReadOffset ?? 0);
          const top = node.getBoundingClientRect().top + window.scrollY - header + reading;
          const samePage = previous.pathname === location.pathname && previous.key !== location.key;
          window.scrollTo({ top, behavior: samePage && !reduced && !returning ? "smooth" : "instant" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      window.dispatchEvent(new Event("construction:restore"));
    });
    return () => cancelAnimationFrame(frame);
  }, [location, navigationType, reduced]);

  const openProject = useCallback((event, project, src) => {
    if (!acceptsTransition(event)) return;
    positions.current.set(location.key, window.scrollY);
    event.preventDefault();
    navigate(`/projects/${project.slug}`, { state: { fromHome: true, previewSrc: src, previewTitle: project.title } });
  }, [location.key, navigate]);

  const backToWork = useCallback((event) => {
    if (!location.state?.fromHome || !acceptsTransition(event)) return;
    event.preventDefault();
    navigate(-1);
  }, [location.state, navigate]);

  const readView = useCallback((id) => views.current.get(`${location.key}:${id}`), [location.key]);
  const saveView = useCallback((id, value) => views.current.set(`${location.key}:${id}`, value), [location.key]);
  const navigateToSection = useCallback((id) => {
    positions.current.set(location.key, window.scrollY);
    navigate(`/#${id}`);
  }, [location.key, navigate]);
  const restored = navigationType === "POP" && positions.current.has(location.key);
  const context = useMemo(() => ({ openProject, backToWork, readView, saveView, navigateToSection, restored, travelling: false }), [openProject, backToWork, readView, saveView, navigateToSection, restored]);

  return <SceneNavigationContext.Provider value={context}>{children}</SceneNavigationContext.Provider>;
}

SceneNavigation.propTypes = { children: PropTypes.node.isRequired };
