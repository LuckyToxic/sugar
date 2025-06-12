import { Button } from "@/shared/ui/Button/Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ConfirmDiaryModal from "../ConfirmDiaryEntry/ConfirmDiaryModal";
import { useNavigate } from "react-router";

interface DiaryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { insulin: string; activity: string }) => void;
}

export default function DiaryEntryModal({
  isOpen,
  onClose,
  onSave,
}: DiaryEntryModalProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [insulin, setInsulin] = useState("");
  const [activity, setActivity] = useState("None");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 400);
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <div
          className={`
        fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-30
          transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
          onClick={() => {
            onClose();
            setInsulin("");
          }}
        >
          <div
            className={`
            w-full bg-white rounded-t-3xl pt-6 px-4 pb-8
            transition-transform duration-500
            ${isOpen ? "translate-y-0" : "translate-y-full"}
          `}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center font-semibold text-lg mb-4 text-[#674EC8]">
              Edit
            </h3>
            <div className="flex items-center border-2 border-[#674EC8] rounded-lg px-3 py-2.5 mb-4">
              <span className="mr-2">
                <img src="media/diary/insulin.svg" alt="insulin" />
              </span>
              <input
                className="flex-1 outline-none bg-transparent text-[#674EC8] placeholder:text-[#674EC8] placeholder:font-[500]"
                placeholder="Insulin UI"
                type="number"
                value={insulin}
                autoFocus
                onChange={(e) => setInsulin(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 border-[#674EC8] rounded-lg px-3 py-2.5 mb-4">
              <span className="mr-2">
                <img src="media/diary/glucose.svg" alt="glucose" />
              </span>
              <input
                className="flex-1 outline-none bg-transparent text-[#674EC8] placeholder:text-[#674EC8] placeholder:font-[500]"
                placeholder="Glucose level"
                type="number"
                value={insulin}
                autoFocus
                onChange={(e) => setInsulin(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 border-[#674EC8] rounded-lg px-3 py-2.5 mb-4">
              <span className="mr-2">
                <img src="media/diary/blood.svg" alt="insulin" />
              </span>
              <input
                className="flex-1 outline-none bg-transparent text-[#674EC8] placeholder:text-[#674EC8] placeholder:font-[500]"
                placeholder="Blood pressure"
                type="number"
                value={insulin}
                autoFocus
                onChange={(e) => setInsulin(e.target.value)}
              />
            </div>
            <div className="mb-3 text-[17px] text-[#6147C6]">
              Physical activity
            </div>
            <div className="flex gap-2 mb-6 text-[13px]">
              {["None", "Low", "Medium", "High"].map((level) => (
                <button
                  key={level}
                  className={`flex-1 py-2 rounded-lg border-2
                  ${
                    activity === level
                      ? "bg-[#674EC8] text-white border-[#674EC8]"
                      : "bg-white text-[#674EC8] border-[#674EC8]"
                  }
                `}
                  onClick={() => setActivity(level)}
                  type="button"
                >
                  {level}
                </button>
              ))}
            </div>
            <Button
              disabled={!insulin.trim()}
              onClick={() => setShowConfirm(true)}
              className="w-full py-3 rounded-lg bg-[#00B2FF] text-white font-semibold"
            >
              Save
            </Button>
          </div>
        </div>,
        document.body
      )}
      <ConfirmDiaryModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onYes={() => {
          setShowConfirm(false);
          onSave({ insulin, activity });
          navigate("/diary");
          onClose();
        }}
        onNo={() => {
          setShowConfirm(false);
          onClose();
          setInsulin("");
        }}
      />
    </>
  );
}
