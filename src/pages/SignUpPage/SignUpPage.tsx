import { colors } from "../../app/styles/variables";
import { CustomCheckbox } from "../../shared/ui/CustomCheckbox/CustomCheckbox";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../shared/ui/Button/Button";
import { EmailOrWhatsAppInput } from "../../features/auth/ui/EmailORWhatsAppInput/EmailOrWhatsAppInput";

export default function SignUpPage() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="px-3 py-6 text-white flex flex-col items-center h-screen">
        <div className="flex-grow flex items-center mb-12">
          <img src="media/logo.svg" alt="logo" className="w-44" />
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <button
            className="flex items-center justify-center gap-2 w-full rounded-lg p-3 text-[17px] font-[600] pr-8"
            style={{ backgroundColor: colors.main_blue }}
          >
            <img src="media/tg.svg" alt="tg" className="h-[18px] pr-1" />
            Telegram
          </button>

          <EmailOrWhatsAppInput
            value={inputValue}
            onChange={setInputValue}
            isWhatsApp={isWhatsApp}
            onSwitchChange={(checked) => {
              setIsWhatsApp(checked);
              setInputValue("");
            }}
          />

          <div className="flex gap-3 items-center text-[13px]">
            <CustomCheckbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="leading-[1.6]">
              I agree to the privacy policy and the terms of the licence
              agreement
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isChecked || !inputValue.trim()}
            onClick={() => navigate("/confirm-email", { state: inputValue })}
          >
            Create account
          </Button>

          <p className="text-[13px] relative top-1">
            Already have an account?
            <span
              className="border-b ml-1 cursor-pointer"
              onClick={() => navigate("/sign-in")}
              style={{ color: colors.main_blue, borderColor: colors.main_blue }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
