import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const scenarios = [
  {
    id: "booking",
    label: "Booking sync",
    input: "Customer confirms 14:30",
    output: "Slot reserved, cashflow forecast updated",
    flow: ["Client", "Scheduler", "API", "PostgreSQL", "Shop view"],
    tech: "React / Node.js / Prisma",
  },
  {
    id: "message",
    label: "Realtime message",
    input: "Reader sends a recommendation",
    output: "Conversation delivered without refreshing",
    flow: ["Reader", "Next.js", "Go API", "WebSocket", "Inbox"],
    tech: "Next.js / Go / WebSocket",
  },
  {
    id: "batch",
    label: "Batch costing",
    input: "Maker produces 12 candles",
    output: "Materials deducted and unit cost recorded",
    flow: ["Recipe", "Production", "Inventory", "Costing", "Cash view"],
    tech: "TypeScript / Prisma / SQLite",
  },
];

export default function Playground() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const reduced = useReducedMotion();
  const active = scenarios.find((scenario) => scenario.id === activeId);

  return (
    <section id="playground" className="playground-section scroll-mt-28">
      <div className="section-heading">
        <p className="eyebrow">03 / Working model</p>
        <h2>Small interactions. Full system thinking.</h2>
        <p>
          Pick a routine and follow what the software has to coordinate behind
          a single action.
        </p>
      </div>

      <div className="playground">
        <div className="playground__tabs" role="tablist" aria-label="System scenarios">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              type="button"
              role="tab"
              aria-selected={activeId === scenario.id}
              aria-controls="scenario-panel"
              className={activeId === scenario.id ? "is-active" : ""}
              onClick={() => setActiveId(scenario.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {scenario.label}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id="scenario-panel"
            role="tabpanel"
            className="playground__panel"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="playground__io">
              <p>
                <span>Input</span>
                {active.input}
              </p>
              <p>
                <span>Outcome</span>
                {active.output}
              </p>
            </div>

            <ol className="playground__flow" aria-label={`${active.label} flow`}>
              {active.flow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>

            <p className="playground__tech">
              <span className="system-map__signal" aria-hidden="true" />
              {active.tech}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
