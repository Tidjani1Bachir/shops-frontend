import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
