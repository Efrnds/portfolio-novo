import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../i18n/LanguageContext";

function MenuToggle({ open, onClick, labels, a11y }) {
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
        <span
          className={`absolute left-0 h-[2px] bg-current transition-all duration-300 ease-out ${
            open
              ? "top-1/2 w-5 -translate-y-1/2 rotate-45"
              : "top-0 w-5 group-hover:w-4"
          }`}
        />
        <span
          className={`absolute left-0 top-1/2 h-[2px] w-3.5 -translate-y-1/2 bg-current transition-all duration-300 ease-out ${
            open ? "opacity-0 scale-x-0" : "opacity-100 group-hover:w-5"
          }`}
        />
        <span
          className={`absolute left-0 h-[2px] bg-current transition-all duration-300 ease-out ${
            open
              ? "top-1/2 w-5 -translate-y-1/2 -rotate-45"
              : "bottom-0 w-4 group-hover:w-5"
          }`}
        />
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, setLanguage, copy } = useLanguage();

  return (
    <>
      <header className="site-header">
        <Link
          to="/"
          className="site-header__mark"
          aria-label={copy.a11y.home}
        >
          <span>EF</span>
          <span>Systems / 26</span>
        </Link>
        <nav className="site-header__nav" aria-label={copy.a11y.primaryNav}>
          <Link to="/#about">{copy.nav.about}</Link>
          <Link to="/#experience">{copy.nav.experience}</Link>
          <Link to="/#work">{copy.nav.work}</Link>
        </nav>
        <div className="site-header__actions">
          <div className="language-switch" aria-label={copy.nav.language}>
            {['pt', 'en'].map((item) => (
              <button key={item} type="button" className={language === item ? "is-active" : ""} onClick={() => setLanguage(item)} aria-pressed={language === item}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="site-header__contact" href="mailto:contato.efrnds@outlook.com">{copy.nav.contact}</a>
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

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Header;
