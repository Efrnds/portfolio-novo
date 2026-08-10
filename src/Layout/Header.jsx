import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";

function MenuToggle({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center gap-2.5 sm:gap-3 pl-2.5 pr-2 sm:pl-3 sm:pr-2.5 py-2 border border-black bg-[#f0f0e9] active:bg-black active:text-[#f0f0e9] sm:hover:bg-black sm:hover:text-[#f0f0e9] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black min-h-11"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="site-menu"
    >
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

  return (
    <>
      <header className="fixed top-0 w-full left-0 right-0 bg-[#f0f0e9]/95 backdrop-blur-sm flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12 sm:py-5 z-30">
        <Link
          to="/"
          className="text-xl hover:opacity-60 transition-opacity"
          aria-label="Eduardo Fernandes home"
        >
          EF
        </Link>
        <p className="hidden text-sm sm:text-base tracking-wide text-neutral-700 sm:block">
          Full Stack Software Engineer
        </p>
        <MenuToggle
          open={isSidebarOpen}
          onClick={() => setIsSidebarOpen((v) => !v)}
        />
      </header>
      <div
        className="fixed top-16 sm:top-[4.25rem] left-5 right-5 sm:left-8 lg:left-12 sm:right-8 lg:right-12 h-px bg-black z-30"
        aria-hidden="true"
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Header;
