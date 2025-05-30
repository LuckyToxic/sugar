import { createPortal } from "react-dom";

interface ConfirmDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
}

export default function ConfirmDiaryModal({
  isOpen,
  onClose,
  onYes,
  onNo,
}: ConfirmDiaryModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={`
          fixed inset-0 z-50 flex items-center px-2 justify-center bg-black bg-opacity-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full shadow-xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center font-medium text-[18px] leading-[1.3] mb-6">
          Would you like to enter insulin and
          <br />
          exercise data for this meal?
        </div>
        <div className="flex justify-center gap-6 w-full mb-2">
          <button
            className="w-[40%] p-4 rounded-lg bg-[#00B2FF] text-white font-semibold text-[17px] transition-transform active:scale-95"
            onClick={onYes}
          >
            yes
          </button>
          <button
            className="w-[40%] p-4 rounded-xl bg-[#674EC8] text-white font-semibold text-[17px] transition-transform active:scale-95"
            onClick={onNo}
          >
            no
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
