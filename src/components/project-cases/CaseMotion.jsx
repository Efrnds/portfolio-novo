import { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const offsets = {
  left: { x: -56, y: 0 },
  right: { x: 56, y: 0 },
  up: { x: 0, y: 48 },
};

export function CaseReveal({ children, className = "", delay = 0, direction = "up" }) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={reduced ? false : offset}
      whileInView={{ x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

CaseReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(["left", "right", "up"]),
};

export function MaskReveal({ children, className = "", delay = 0, from = "right" }) {
  const reduced = useReducedMotion();
  const hidden = {
    right: "inset(0 100% 0 0)",
    left: "inset(0 0 0 100%)",
    bottom: "inset(100% 0 0 0)",
  }[from];

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.35, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

MaskReveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  from: PropTypes.oneOf(["right", "left", "bottom"]),
};

export function KineticTitle({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <span className={`kinetic-title ${className}`}>
      <motion.span
        initial={reduced ? false : { y: "108%", rotate: 1.5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

KineticTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export function ParallaxImage({ alt, className = "", loading, src, strength = 36 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const y = useSpring(rawY, { stiffness: 80, damping: 24, mass: 0.35 });

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      style={reduced ? undefined : { y, scale: 1.06 }}
    />
  );
}

ParallaxImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["eager", "lazy"]),
  src: PropTypes.string.isRequired,
  strength: PropTypes.number,
};

export function CaseScrollScene({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 22, mass: 0.42 });
  const y = useTransform(smoothProgress, [0, 0.2, 0.72, 0.96], [72, 0, 0, -120]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.72, 0.96], [0.985, 1, 1, 0.995]);

  return (
    <section ref={ref} className={`case-scroll-scene ${className}`}>
      <motion.div className="case-scroll-scene__stage" style={reduced ? undefined : { y, scale }}>
        <div className="case-scroll-scene__content">{children}</div>
        <motion.span className="case-scroll-scene__progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      </motion.div>
    </section>
  );
}

CaseScrollScene.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
