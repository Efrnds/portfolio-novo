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
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
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

export function KineticTitle({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <span className={`kinetic-title ${className}`}>
      <motion.span
        initial={reduced ? false : { y: "108%", rotate: 1.5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

export function CaseScrollScene({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 54, damping: 26, mass: 0.46 });
  const y = useTransform(smoothProgress, [0, 0.2, 0.72, 0.9], [64, 0, 0, -112]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.72, 0.9], [0.988, 1, 1, 0.996]);

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

function SequenceFrame({ index, progress, reduced, slide, total }) {
  const segment = 0.82 / Math.max(total - 1, 1);
  const start = 0.08 + Math.max(index - 1, 0) * segment;
  const end = Math.min(start + Math.min(segment * 0.72, 0.15), 0.94);
  const clipPath = useTransform(
    progress,
    [start, end],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <motion.div
      className={`case-media-sequence__frame ${slide.aspect === "9/16" ? "is-portrait" : ""}`}
      style={reduced || index === 0 ? undefined : { clipPath }}
    >
      <figure>
        <img
          src={slide.src}
          alt={slide.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <figcaption>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {slide.caption}
        </figcaption>
      </figure>
    </motion.div>
  );
}

SequenceFrame.propTypes = {
  index: PropTypes.number.isRequired,
  progress: PropTypes.object.isRequired,
  reduced: PropTypes.bool.isRequired,
  slide: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    aspect: PropTypes.string,
    caption: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  total: PropTypes.number.isRequired,
};

export function CaseMediaSequence({ ariaLabel, className = "", slides }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 28, mass: 0.5 });

  return (
    <section
      ref={ref}
      className={`case-media-sequence ${reduced ? "is-reduced" : ""} ${className}`}
      style={{ "--sequence-count": slides.length }}
      aria-label={ariaLabel}
    >
      <div className="case-media-sequence__stage">
        <ol className="case-media-sequence__track" aria-hidden="true">
          {slides.map((slide, index) => (
            <li key={slide.src}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{slide.caption}</span>
            </li>
          ))}
        </ol>
        <div className="case-media-sequence__canvas">
          {slides.map((slide, index) => (
            <SequenceFrame
              key={slide.src}
              index={index}
              progress={progress}
              reduced={reduced}
              slide={slide}
              total={slides.length}
            />
          ))}
        </div>
        <motion.span
          className="case-media-sequence__progress"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

CaseMediaSequence.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    aspect: PropTypes.string,
    caption: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
};
