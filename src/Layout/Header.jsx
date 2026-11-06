import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../i18n/LanguageContext";
import { springs } from "../utils/choreography";

function MenuToggle({ open, onClick, labels, a11y }) {
  const reduced = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onClick}
      className="group menu-toggle"
      aria-label={open ? a11y.closeMenu : a11y.openMenu}
      aria-expanded={open}
      aria-controls="site-menu"
    >
      <span>{open ? labels.close : labels.menu}</span>
      <span className="relative w-5 h-3.5 shrink-0" aria-hidden="true">
        {[-1, 0, 1].map((line) => <motion.span key={line} className="absolute left-0 top-1/2 h-[2px] w-5 bg-current"
          initial={false} animate={{ y: open ? 0 : line * 5, rotate: open ? line * -45 : 0, scaleX: open && line === 0 ? 0 : 1 }}
          transition={reduced ? { duration: 0 } : springs.control} />)}
      </span>
    </button>
  );
}

MenuToggle.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  labels: PropTypes.shape({ close: PropTypes.string, menu: PropTypes.string }).isRequired,
  a11y: PropTypes.shape({ closeMenu: PropTypes.string, openMenu: PropTypes.string }).isRequired,
};

function Header() {
  const reduced = useReducedMotion();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, setLanguage, copy } = useLanguage();
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  return (
    <>
      <header className="site-header">
        <Link
          to="/"
          className="site-header__mark"
          aria-label={copy.a11y.home}
        >
          <span>ef.</span>
        </Link>
        <nav className="site-header__nav" aria-label={copy.a11y.primaryNav}>
          <Link to="/#work">{copy.nav.work}</Link>
          <Link to="/#about">{copy.nav.about}</Link>
          <Link to="/#contact">{copy.nav.contact}</Link>
        </nav>
        <div className="site-header__actions">
          <div className="language-switch" aria-label={copy.nav.language}>
            <motion.i className="language-switch__indicator" aria-hidden="true" initial={false} animate={{ x: language === "pt" ? 0 : 44 }} transition={reduced ? { duration: 0 } : springs.control} />
            {['pt', 'en'].map((item) => (
              <button key={item} type="button" className={language === item ? "is-active" : ""} onClick={() => setLanguage(item)} aria-pressed={language === item}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="site-header__mobile-menu">
          <MenuToggle
            open={isSidebarOpen}
            onClick={() => setIsSidebarOpen((v) => !v)}
            labels={copy.nav}
            a11y={copy.a11y}
          />
        </div>
      </header>

      <AnimatePresence>{isSidebarOpen && <Sidebar key="menu" isOpen onClose={closeSidebar} />}</AnimatePresence>
    </>
  );
}

export default Header;
