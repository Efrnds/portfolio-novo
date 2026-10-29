import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function BackToWork({ className = "" }) {
  return (
    <Link to="/#work" className={`case-back ${className}`}>
      <span aria-hidden="true">←</span> Selected work
    </Link>
  );
}

BackToWork.propTypes = { className: PropTypes.string };

export function ProjectLinks({ links, className = "" }) {
  if (!links.length) return null;

  return (
    <div className={`case-links ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label}, opens in a new tab`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

ProjectLinks.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export function ProjectStack({ stack, className = "" }) {
  return (
    <ul className={`case-stack ${className}`} aria-label="Technology stack">
      {stack.map((technology) => <li key={technology}>{technology}</li>)}
    </ul>
  );
}

ProjectStack.propTypes = {
  className: PropTypes.string,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export function AdjacentProjects({ prev, next, className = "" }) {
  return (
    <nav className={`case-adjacent ${className}`} aria-label="Project navigation">
      {prev ? (
        <Link to={`/projects/${prev.slug}`}>
          <span>Previous case</span>
          ← {prev.title}
        </Link>
      ) : <span />}
      {next ? (
        <Link to={`/projects/${next.slug}`}>
          <span>Next case</span>
          {next.title} →
        </Link>
      ) : <span />}
    </nav>
  );
}

const adjacentProject = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

AdjacentProjects.propTypes = {
  className: PropTypes.string,
  next: adjacentProject,
  prev: adjacentProject,
};
