import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";

function MenuToggle({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group menu-toggle"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="site-menu"
    >
      <span>{open ? "Close" : "Menu"}</span>
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
};

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const isVwrks = pathname === "/projects/vwrks";

  return (
    <>
      <header className={`site-header ${isVwrks ? "site-header--vwrks" : ""}`}>
        <Link
          to="/"
          className="site-header__mark"
          aria-label="Eduardo Fernandes home"
        >
          <span>EF</span>
          <span>Systems / 26</span>
        </Link>
        <nav className="site-header__nav" aria-label="Primary navigation">
          <Link to="/#about">About</Link>
          <Link to="/#experience">Experience</Link>
          <Link to="/#work">Work</Link>
        </nav>
        <a className="site-header__contact" href="mailto:contato.efrnds@outlook.com">
          Start a project
        </a>
        <div className="site-header__mobile-menu">
          <MenuToggle
            open={isSidebarOpen}
            onClick={() => setIsSidebarOpen((v) => !v)}
          />
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Header;
