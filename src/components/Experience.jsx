import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { easeInOut, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useViewport } from "../hooks/useViewport";
import { springs } from "../utils/choreography";

export default function Experience() {
  const ref = useRef(null);
  const content = useRef(null);
  const [travel, setTravel] = useState(0);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const compact = useViewport();
  const { copy } = useLanguage();
  const text = copy.editorial.operations;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72px", "end end"], trackContentSize: true });
  const progress = useSpring(scrollYProgress, { ...springs.scroll, skipInitialAnimation: true });
  const opacity = useTransform(progress, [0, 0.17, 0.7, 0.9, 1], [0, 1, 1, 0, 0], { ease: easeInOut });
  const y = useTransform(progress, [0, 0.17, 0.7, 0.9], [28, 0, 0, -28], { ease: easeInOut });
  const pinned = travel > 0 && !compact && !reduced;

  useLayoutEffect(() => {
    const measure = () => {
      const stage = content.current?.parentElement;
      if (!stage) return;
      const style = getComputedStyle(stage);
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 72;
      const available = window.innerHeight - header;
      const needed = content.current.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      setTravel(!compact && !reduced && needed <= available ? Math.round(Math.max(available * 1.3, needed * 1.4)) : 0);
    };
    const observer = new ResizeObserver(measure);
    if (content.current) observer.observe(content.current);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [compact, reduced]);

  return (
    <section ref={ref} id="experience" className={`editorial-operations${pinned ? " is-pinned" : ""}`} aria-labelledby="operations-title"
      data-scene-read-offset={pinned ? travel * 0.22 : 0} style={pinned ? { "--reading-travel": `${travel}px` } : undefined}>
      <div className="editorial-operations__stage">
        <motion.div ref={content} className="editorial-operations__content" style={pinned && !focused ? { opacity, y } : { opacity: 1, y: 0 }}
          onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <header>
            <p className="editorial-label">02 / {text.label}</p>
            <h2 id="operations-title">{text.title}</h2>
            <p>{text.intro}</p>
          </header>
          <div className="editorial-operations__entries">
            {text.entries.map((entry, index) => <article key={entry.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{entry.title}</h3><p>{entry.body}</p></div>
            </article>)}
            <Link className="editorial-link" to="/projects/texsa-tools">{text.link}<span aria-hidden="true">↗</span></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
