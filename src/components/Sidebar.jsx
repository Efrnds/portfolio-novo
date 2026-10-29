import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import PropTypes from "prop-types";
import { projects } from "../data/projects";

const contacts = [
  {
    label: "Email",
    href: "mailto:contato.efrnds@outlook.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/Efrnds",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/edudfrs",
    external: true,
  },
  {
    label: "Resume",
    href: "mailto:contato.efrnds@outlook.com?subject=Request%20for%20resume",
  },
];

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const handleEscKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
      if (isOpen && previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  const goToSection = (id) => {
    onClose();
    if (window.location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={dialogRef}
        id="site-menu"
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#ece9df] z-50"
        aria-label="Site navigation"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex flex-col h-full p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm uppercase tracking-[0.2em]">Menu</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="w-11 h-11 -mr-2 flex items-center justify-center hover:bg-black/5 transition-colors"
              aria-label="Close menu"
            >
              <HiOutlineX size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
              Sections
            </p>
            {sections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className="min-h-11 py-3 text-lg text-left border-b border-black/20 hover:text-neutral-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <nav className="flex flex-col gap-1 mt-10">
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
              Projects
            </p>
            {projects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                onClick={onClose}
                className="py-3 text-base border-b border-black/15 hover:text-neutral-500 transition-colors flex justify-between gap-3"
              >
                <span>{project.title}</span>
                <span className="text-xs text-neutral-400 shrink-0 self-center">
                  {project.years.split(" - ")[0].trim()}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-12">
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-3">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              {contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-base hover:text-neutral-500 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
