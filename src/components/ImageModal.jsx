import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import PropTypes from 'prop-types';

export default function ImageModal({ 
  src, 
  alt, 
  thumbnail, 
  thumbnailClassName = "w-3/4 mx-auto hover:scale-[101%] cursor-pointer transition",
  modalImageClassName = "w-full mx-auto h-full object-contain rounded-lg max-w-[90vw] max-h-[90vh]"
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Previne scroll do body quando modal está aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup ao desmontar o componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Thumbnail clicável */}
      <img 
        src={thumbnail || src} 
        alt={alt} 
        className={thumbnailClassName}
        onClick={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="min-h-full flex items-center justify-center">
            <div className="relative w-screen h-screen flex items-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 hover:scale-[101%] text-white text-2xl font-bold bg-black bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 transition-all p-1.5 z-10"
              >
                <GrClose/>
              </button>
              <img
                src={src}
                alt={alt}
                className={modalImageClassName}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  thumbnailClassName: PropTypes.string,
  modalImageClassName: PropTypes.string
};
