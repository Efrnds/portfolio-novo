import { motion, useReducedMotion } from "framer-motion";

const roles = [
  {
    title: "Co-Founder & Full Stack Engineer",
    company: "Prisma Tech",
    period: "Jan 2024 - Present",
  },
  {
    title: "IT Operations & Software Developer",
    company: "Texsa do Brasil",
    period: "Oct 2021 - Present",
  },
  {
    title: "Frontend Engineer (Freelance)",
    company: "Align Websites",
    period: "Apr 2025 - Jun 2025",
  },
];

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="experience-section scroll-mt-28">
      <motion.div
        className="experience-section__lead"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="eyebrow">01 / Field notes</p>
        <h2>I work on the whole distance between request and routine.</h2>
        <p>
          Four years across product engineering and IT operations taught me to
          care about what happens after launch: deployment, adoption,
          maintenance, and the person using the tool under real pressure.
        </p>
      </motion.div>

      <ul className="experience-list">
        {roles.map((role, i) => (
          <motion.li
            key={role.company + role.title}
            className="experience-list__item"
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <p><strong>{role.title}</strong>{role.company}</p>
            <p>{role.period}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
