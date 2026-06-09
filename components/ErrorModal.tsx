"use client";

type ErrorModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

export default function ErrorModal({
  isOpen,
  message,
  onClose,
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ross-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white max-w-md w-full p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 bg-ross-offwhite mb-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2L18 17H2L10 2Z"
              stroke="#0a0a0a"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M10 8V11"
              stroke="#0a0a0a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="14" r="0.75" fill="#0a0a0a" />
          </svg>
        </div>

        <h3 className="font-serif font-light text-ross-black text-2xl mb-3">
          Something went wrong
        </h3>
        <p className="font-sans font-light text-ross-midgrey text-sm leading-relaxed mb-8">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-ross-black text-white text-xs font-sans font-medium tracking-widest uppercase py-4 hover:bg-ross-black/90 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
