import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full min-h-[88vh] sm:min-h-[92vh] scroll-mt-28 flex items-end lg:items-center overflow-hidden -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[#f0f0e9]" aria-hidden="true" />
        }
      >
        <HeroCanvas />
      </Suspense>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-16 sm:py-24">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.28em] text-neutral-500"
            variants={fadeUp(0)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            Full Stack Software Engineer
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9]"
            variants={fadeUp(0.08)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            eduardo
            <br />
            fernandes
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl max-w-xl text-neutral-800"
            variants={fadeUp(0.16)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            Product-minded engineer shipping B2B SaaS and internal tools
            end-to-end.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base text-neutral-600"
            variants={fadeUp(0.24)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <span>Umuarama, PR</span>
            <span className="w-1 h-1 rounded-full bg-black/40" />
            <span>Remote-ready</span>
            <span className="w-1 h-1 rounded-full bg-black/40" />
            <span>English B2</span>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={fadeUp(0.3)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <a
              href="mailto:contato.efrnds@outlook.com"
              className="inline-flex items-center gap-2 bg-black text-[#f0f0e9] px-5 py-3 text-sm sm:text-base font-UrbanistBold hover:bg-neutral-800 transition-colors"
            >
              Let&apos;s talk
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-black px-5 py-3 text-sm sm:text-base hover:bg-black hover:text-[#f0f0e9] transition-colors"
            >
              Selected work
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end gap-4 text-sm sm:text-base leading-relaxed text-neutral-700 max-w-md lg:ml-auto"
          variants={fadeUp(0.22)}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <p>
            Over 4 years bridging software development and IT operations —
            architecture, UI, APIs, Docker, and the boring ops that keep
            products alive.
          </p>
          <p>
            Co-founder at{" "}
            <span className="font-UrbanistBold text-black">Prisma Tech</span>{" "}
            (Trato) ·{" "}
            <span className="font-UrbanistBold text-black">
              IT Ops &amp; Software
            </span>{" "}
            at Texsa do Brasil.
          </p>
          <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
            <span>React / Next.js</span>
            <span>Node.js</span>
            <span>TypeScript</span>
            <span>Docker</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
