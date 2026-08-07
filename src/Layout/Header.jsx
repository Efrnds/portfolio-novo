import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full left-0 right-0 bg-[#f0f0e9]/95 backdrop-blur-sm flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12 sm:py-6 z-30">
        <Link
          to="/"
          className="text-xl font-UrbanistBold hover:opacity-60 transition-opacity"
          aria-label="Eduardo Fernandes — home"
        >
          EF
        </Link>
        <p className="hidden text-sm sm:text-base tracking-wide text-neutral-700 sm:block">
          Full Stack Software Engineer
        </p>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="relative bg-black rounded-full h-7 w-7 hover:scale-110 transition-transform duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label="Open navigation menu"
          aria-expanded={isSidebarOpen}
        >
          <span className="sr-only">Menu</span>
        </button>
      </header>
      <div
        className="fixed top-14 sm:top-[4.5rem] left-5 right-5 sm:left-8 lg:left-12 sm:right-8 lg:right-12 h-0.5 bg-black z-30"
        aria-hidden="true"
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Header;
