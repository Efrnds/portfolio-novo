import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";
import { SceneNavigationContext } from "./ConstructionContext";
import { acceptsTransition } from "../../utils/construction";

const readRect = (node) => {
  const box = node.getBoundingClientRect();
  return { left: box.left, top: box.top, width: box.width, height: box.height };
};

function RouteFlight({ flight, onComplete }) {
  const target = flight.to || flight.from;
  return (
    <motion.div
      layout
      layoutRoot
      className="route-flight"
      initial={false}
      style={target}
      transition={{ layout: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }}
      onLayoutAnimationComplete={() => { if (flight.to) onComplete(); }}
      aria-hidden="true"
    >
      <motion.img layout src={flight.src} alt="" />
      <span>{flight.title}</span>
    </motion.div>
  );
}

RouteFlight.propTypes = { flight: PropTypes.object.isRequired, onComplete: PropTypes.func.isRequired };

export default function SceneNavigation({ children }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const positions = useRef(new Map());
  const previousLocation = useRef(location);
  const returnFlight = useRef(null);
  const [flight, setFlight] = useState(null);
  const finish = useCallback(() => setFlight(null), []);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useEffect(() => {
    const save = () => positions.current.set(location.key, window.scrollY);
    const captureReturn = () => {
      if (!location.pathname.startsWith("/projects/")) return;
      const image = document.querySelector("[data-route-image]");
      if (!image) return;
      returnFlight.current = { from: readRect(image), src: image.src, title: location.state?.previewTitle || "", slug: location.pathname.split("/").pop() };
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("popstate", captureReturn);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("popstate", captureReturn);
    };
  }, [location]);

  useLayoutEffect(() => {
    const previous = previousLocation.current;
    previousLocation.current = location;
    let secondFrame;
    const frame = requestAnimationFrame(() => {
      const header = window.innerWidth <= 900 ? 64 : 72;
      const hero = document.querySelector("[data-route-hero]");
      const returning = navigationType === "POP";
      if (returning && positions.current.has(location.key)) {
        window.scrollTo({ top: positions.current.get(location.key), behavior: "instant" });
      } else if (location.hash) {
        const node = document.getElementById(location.hash.slice(1));
        if (node) {
          const reading = node.id === "experience" ? Math.max(0, node.offsetHeight - window.innerHeight) * 0.44 : 0;
          window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - header + reading, behavior: "instant" });
        }
      } else if (location.state?.fromHome && hero) {
        window.scrollTo({ top: hero.getBoundingClientRect().top + window.scrollY - header, behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      const outgoing = returnFlight.current;
      returnFlight.current = null;
      const preview = outgoing && document.querySelector(`[data-project-preview="${outgoing.slug}"]`);
      if (!reduced && returning && location.pathname === "/" && preview && outgoing.from.top < window.innerHeight && outgoing.from.top + outgoing.from.height > 0) {
        setFlight({ ...outgoing, to: null });
        secondFrame = requestAnimationFrame(() => setFlight((current) => current ? { ...current, to: readRect(preview) } : null));
      } else if (previous.pathname !== location.pathname && hero) {
        secondFrame = requestAnimationFrame(() => setFlight((current) => current ? { ...current, to: readRect(hero.querySelector("figure") || hero) } : null));
      }
      window.dispatchEvent(new Event("construction:restore"));
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame); };
  }, [location, navigationType, reduced]);

  useEffect(() => {
    if (!flight) return undefined;
    const timer = setTimeout(finish, 1300);
    return () => clearTimeout(timer);
  }, [flight, finish]);

  const openProject = useCallback((event, project, src) => {
    if (!acceptsTransition(event)) return;
    const node = event.currentTarget.closest("article")?.querySelector("[data-project-preview]");
    positions.current.set(location.key, window.scrollY);
    event.preventDefault();
    if (node && !reduced) setFlight({ from: readRect(node), src, title: project.title, to: null });
    navigate(`/projects/${project.slug}`, { state: { fromHome: true, previewSrc: src, previewTitle: project.title } });
  }, [location.key, navigate, reduced]);

  const backToWork = useCallback((event) => {
    if (!location.state?.fromHome || !acceptsTransition(event)) return;
    event.preventDefault();
    navigate(-1);
  }, [location.state, navigate]);

  const context = useMemo(() => ({ openProject, backToWork, travelling: Boolean(flight) }), [openProject, backToWork, flight]);

  return (
    <SceneNavigationContext.Provider value={context}>
      {children}
      {flight && <RouteFlight flight={flight} onComplete={finish} />}
    </SceneNavigationContext.Provider>
  );
}

SceneNavigation.propTypes = { children: PropTypes.node.isRequired };
