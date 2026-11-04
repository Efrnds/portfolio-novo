import { useId } from "react";
import PropTypes from "prop-types";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight, FiRotateCcw } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { environmentCopy } from "./copy";

export function Environment({ kind, title, children }) {
  const reduced = useReducedMotion();
  const id = useId();
  return <section className={`product-environment product-environment--${kind}`} data-product-environment={kind} aria-labelledby={id}>
    <span className="sr-only" id={id}>{title}</span>
    <motion.div className="product-environment__content" initial={reduced ? false : { y: 30 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
  </section>;
}

Environment.propTypes = { kind: PropTypes.string.isRequired, title: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

export function DemoFooter({ note, reset, href }) {
  const { language, copy } = useLanguage();
  const text = environmentCopy[language];
  return <div className="product-environment__footer"><p>{note}<span>{text.local}</span></p><div>
    {reset && <button type="button" onClick={reset}><FiRotateCcw aria-hidden="true" />{text.reset}</button>}
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${text.website}, ${copy.a11y.external}`}>{text.website}<FiArrowUpRight aria-hidden="true" /></a>
  </div></div>;
}

DemoFooter.propTypes = { note: PropTypes.string.isRequired, reset: PropTypes.func, href: PropTypes.string.isRequired };
