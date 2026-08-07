import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data/projects";

export default function Skills() {
  const reduced = useReducedMotion();
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="w-full my-16 sm:my-24 scroll-mt-28">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500 mb-3">
          03 / Tools
        </p>
        <h2 className="text-2xl sm:text-4xl tracking-tight mb-8">Stack</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-black">
        {entries.map(([category, items], i) => (
          <motion.div
            key={category}
            className={`p-5 sm:p-6 hover:bg-black/[0.03] transition-colors duration-300 ${
              i < entries.length - 1 ? "border-b sm:border-b-0" : ""
            } ${i % 2 === 0 ? "sm:border-r" : ""} ${
              i < entries.length - 1 ? "lg:border-r" : "lg:border-r-0"
            } border-black`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">
              {category}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed">
              {items.join(", ")}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
