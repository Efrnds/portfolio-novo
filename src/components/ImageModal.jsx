import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import PropTypes from "prop-types";

export default function ImageModal({
  src,
  alt,
  thumbnail,
  thumbnailClassName = "w-full h-auto object-contain mx-auto cursor-pointer transition hover:opacity-90",
  modalImageClassName = "w-full mx-auto h-auto object-contain max-w-[92vw] max-h-[90vh]",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        type="button"
        className="block w-full p-0 border-0 bg-transparent cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Expand image: ${alt}`}
      >
        <img
          src={thumbnail || src}
          alt={alt}
          className={thumbnailClassName}
          loading="lazy"
        />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 overflow-auto"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/80 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black transition-all z-10"
                aria-label="Close image preview"
              >
                <GrClose />
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
  modalImageClassName: PropTypes.string,
};
