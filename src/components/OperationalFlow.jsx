import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const stages = [
  {
    label: "Interface",
    code: "01",
    detail: "The point where a person decides what needs to happen.",
  },
  {
    label: "API",
    code: "02",
    detail: "Business rules turn intent into a predictable operation.",
  },
  {
    label: "Database",
    code: "03",
    detail: "Product state stays structured, traceable, and useful.",
  },
  {
    label: "Deploy",
    code: "04",
    detail: "Containers, proxy, and infrastructure make it reachable.",
  },
  {
    label: "Real work",
    code: "05",
    detail: "The software meets the routine it was built to support.",
  },
];

export default function OperationalFlow() {
  const [active, setActive] = useState(stages.length - 1);
  const reduced = useReducedMotion();

  return (
    <div className="system-map" aria-label="Software delivery flow">
      <div className="system-map__topline">
        <p>Operational path</p>
        <p className="tabular-nums">EF.SYS / 01</p>
      </div>

      <ol className="system-map__stages">
        {stages.map((stage, index) => (
          <li key={stage.label} className="system-map__stage">
            <button
              type="button"
              className={`system-map__node ${active === index ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>{stage.code}</span>
              <strong>{stage.label}</strong>
            </button>
            {index < stages.length - 1 && (
              <span className="system-map__connector" aria-hidden="true">
                <motion.span
                  initial={false}
                  animate={{ scaleX: active > index ? 1 : 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.28 }}
                />
              </span>
            )}
          </li>
        ))}
      </ol>

      <motion.div
        key={stages[active].label}
        className="system-map__readout"
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        aria-live="polite"
      >
        <span className="system-map__signal" aria-hidden="true" />
        <p>
          <strong>{stages[active].label}</strong>
          {stages[active].detail}
        </p>
      </motion.div>
    </div>
  );
}
