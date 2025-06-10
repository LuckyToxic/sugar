import { useState } from "react";
import { useNavigate } from "react-router";
import { message } from "antd";
import { validateEmail } from "@/shared/lib/validation/validateEmail";
import TelegramLoginButton from "@/shared/ui/TelegramLoginButton/TelegramLoginButton";
import { EmailOrWhatsAppInput } from "@/features/auth/ui/EmailORWhatsAppInput/EmailOrWhatsAppInput";
import { CustomCheckbox } from "@/shared/ui/CustomCheckbox/CustomCheckbox";
import { Button } from "@/shared/ui/Button/Button";
import { colors } from "@/app/styles/variables";
import { confirmEmail } from "@/api/confirmEmail";

export default function SignUpPage() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let valueToSend = inputValue.trim();

    if (isWhatsApp) {
      if (!valueToSend.startsWith("+")) {
        valueToSend = "+" + valueToSend;
      }
    } else {
      if (!validateEmail(valueToSend)) {
        message.error("Enter the correct email address");
        return;
      }
    }

    if (!isChecked) {
      message.error("To continue, you need to agree to the terms");
      return;
    }

    try {
      await confirmEmail(valueToSend);
      navigate("/confirm-email", { state: valueToSend });
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div className="px-3 py-6 text-white flex flex-col items-center h-screen-dynamic">
      <div className="min-h-full flex-1 flex flex-col items-center justify-between">
        <div className="flex-1 flex items-center">
          <img src="media/logo.svg" alt="logo" className="w-44" />
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <TelegramLoginButton />

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
            onClick={handleSubmit}
          >
            Create account
          </Button>

          <p className="text-[13px] relative top-1">
            Already have an account?
            <span
              className="border-b ml-1 cursor-pointer"
              onClick={() => navigate("/sign-in")}
              style={{
                color: colors.main_blue,
                borderColor: colors.main_blue,
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
