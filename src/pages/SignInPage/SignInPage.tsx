import { useState } from "react";
import { useNavigate } from "react-router";
import { colors } from "../../app/styles/variables";
import { Button } from "../../shared/ui/Button/Button";
import { PasswordInput } from "../../features/auth/ui/PasswordInput/PasswordInput";
import { EmailOrWhatsAppInput } from "../../features/auth/ui/EmailORWhatsAppInput/EmailOrWhatsAppInput";
import { validateEmail } from "../../shared/lib/validation/validateEmail";
import { message } from "antd";
import TelegramLoginButton from "../../shared/ui/TelegramLoginButton/TelegramLoginButton";
import { auth } from "@/api/auth";

export default function SignInPage() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
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

    if (password.trim().length < 8) {
      message.error("The password must be at least 8 characters long.");
      return;
    }

    try {
      await auth({ login: valueToSend, password });
      message.success("User is authorized");
      navigate("/services");
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
      <div className="flex-1 flex items-center justify-center">
        <img src="media/logo.svg" alt="logo" className="w-44" />
      </div>
      <div className="flex flex-col items-center gap-5 w-full max-w-md relative bottom-5">
        <TelegramLoginButton />
        <div className="w-full relative bottom-1">
          <EmailOrWhatsAppInput
            value={inputValue}
            onChange={setInputValue}
            isWhatsApp={isWhatsApp}
            onSwitchChange={(checked) => {
              setIsWhatsApp(checked);
              setInputValue("");
            }}
          />
        </div>

        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
        <div className="w-full relative bottom-1">
          <Button disabled={!inputValue.trim()} onClick={handleSubmit}>
            Log in
          </Button>
        </div>

        <div className="flex justify-center relative top-2">
          <span
            onClick={() => navigate("/password-recovery")}
            className="border-b cursor-pointer leading-none"
            style={{
              color: colors.main_blue,
              borderBlockColor: colors.main_blue,
            }}
          >
            Forgot password?
          </span>
        </div>

        <p className="text-[14px] tracking-[0.7px] relative top-2">
          Don`t have an account yet?
          <span
            onClick={() => navigate("/sign-up")}
            className="border-b ml-1 cursor-pointer"
            style={{ color: colors.main_blue, borderColor: colors.main_blue }}
          >
            Registration
          </span>
        </p>
      </div>
    </div>
  );
}
