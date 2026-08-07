import { motion, useReducedMotion } from "framer-motion";

const roles = [
  {
    title: "Co-Founder & Full Stack Engineer",
    company: "Prisma Tech",
    period: "Jan 2024 — Present",
  },
  {
    title: "IT Operations & Software Developer",
    company: "Texsa do Brasil",
    period: "Oct 2021 — Present",
  },
  {
    title: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    period: "Apr 2025 — Jun 2025",
  },
];

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="w-full my-16 sm:my-24 scroll-mt-28">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-500 mb-3">
          01 — Career
        </p>
        <h2 className="text-2xl sm:text-4xl tracking-tight mb-8">Experience</h2>
      </motion.div>

      <ul className="flex flex-col border-y border-black">
        {roles.map((role, i) => (
          <motion.li
            key={role.company + role.title}
            className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-5 sm:py-6 border-b border-black/15 last:border-b-0 group hover:bg-black/[0.03] transition-colors px-1"
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <p className="sm:col-span-5 text-base sm:text-lg font-UrbanistBold">
              {role.title}
            </p>
            <p className="sm:col-span-4 text-sm sm:text-base text-neutral-700 self-center">
              {role.company}
            </p>
            <p className="sm:col-span-3 text-sm text-neutral-500 sm:text-right self-center">
              {role.period}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
