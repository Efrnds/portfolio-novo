import { useEffect } from "react";
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
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
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

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#f0f0e9] z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Site navigation"
      >
        <div className="flex flex-col h-full p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm uppercase tracking-[0.2em]">Menu</p>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-black/5 transition-colors"
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
                className="py-3 text-lg text-left border-b border-black/20 hover:text-neutral-500 transition-colors"
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
                  {project.years.split("—")[0].trim()}
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
