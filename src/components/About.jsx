import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full min-h-[78vh] sm:min-h-[85vh] lg:min-h-[88vh] scroll-mt-24 flex items-end lg:items-center overflow-hidden -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[#f0f0e9]" aria-hidden="true" />
        }
      >
        <HeroCanvas />
      </Suspense>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-12 sm:py-20">
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-neutral-500"
            variants={fadeUp(0)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            Full Stack Software Engineer
          </motion.p>

          <motion.h1
            className="text-[2.6rem] sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-black"
            variants={fadeUp(0.06)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            eduardo
            <br />
            fernandes
          </motion.h1>

          <motion.p
            className="text-base sm:text-xl max-w-md text-neutral-700 leading-snug"
            variants={fadeUp(0.1)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            I build B2B SaaS and internal tools with React, Next.js, and Node.
          </motion.p>

          <motion.p
            className="text-sm text-neutral-500"
            variants={fadeUp(0.14)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            Umuarama, PR · Remote-ready · English B2
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm sm:text-base"
            variants={fadeUp(0.18)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <a
              href="mailto:contato.efrnds@outlook.com"
              className="link-draw text-sm sm:text-base"
            >
              Let&apos;s talk
            </a>
            <a href="#projects" className="link-draw text-sm sm:text-base">
              Selected work
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3 text-sm sm:text-base leading-relaxed text-neutral-600 max-w-md lg:ml-auto lg:pt-10"
          variants={fadeUp(0.16)}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <p>
            4+ years between software and IT ops: UIs, APIs, Docker deploys, and
            the maintenance work that keeps tools running.
          </p>
          <p>
            Co-founder at Prisma Tech (Trato). IT Ops &amp; Software at Texsa do
            Brasil.
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 pt-1">
            React / Next.js · Node.js · TypeScript · Docker
          </p>
        </motion.div>
      </div>
    </section>
  );
}
