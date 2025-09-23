import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full left-0 right-0 bg-[#f0f0e9] flex justify-between p-5 sm:pb-4 sm:p-10 z-30">
        <Link
          to="/"
          className="text-xl hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          EF
        </Link>
        <p className="hidden text-xl sm:block">
          front-end developer & ux / ui designer
        </p>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-black rounded-full h-[28px] w-[28px] hover:scale-110 transition-transform duration-200 cursor-pointer"
          aria-label="Open navigation menu"
        ></button>
      </header>
      <hr className="fixed top-16 sm:top-20 left-5 right-5 sm:left-10 sm:right-10 border-2 border-black rounded-full bg-[#f0f0e9] z-30" />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Header;
