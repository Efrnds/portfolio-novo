import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import PropTypes from "prop-types";

export default function Sidebar({ isOpen, onClose }) {
  // Fechar sidebar com tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Previne scroll do body quando sidebar está aberta
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out z-40 ${
          isOpen
            ? "opacity-100 bg-opacity-50"
            : "opacity-0 bg-opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#f0f0e9] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header da Sidebar */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <HiOutlineX size={24} />
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-6">
            <Link
              to="/"
              onClick={onClose}
              className="block text-lg hover:text-blue-600 transition-colors duration-200 py-2 border-b border-gray-800"
            >
              Home
            </Link>
            <Link
              to="/y"
              onClick={onClose}
              className="block text-lg hover:text-blue-600 transition-colors duration-200 py-2 border-b border-gray-800"
            >
              Y Project
            </Link>
            <Link
              to="/patrimonio"
              onClick={onClose}
              className="block text-lg hover:text-blue-600 transition-colors duration-200 py-2 border-b border-gray-800"
            >
              Property System
            </Link>
            <Link
              to="/vwrks"
              onClick={onClose}
              className="block text-lg hover:text-blue-600 transition-colors duration-200 py-2 border-b border-gray-800"
            >
              Vwrks
            </Link>
          </nav>

          {/* Seção adicional */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:seu-email@email.com"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Email
              </a>
              <a
                href="https://github.com/efrnds"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/seu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
