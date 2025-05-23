import { useState } from "react";
import { useNavigate } from "react-router";
import { colors } from "../../app/styles/variables";
import { Button } from "../../shared/ui/Button/Button";
import { PasswordInput } from "../../features/auth/ui/PasswordInput/PasswordInput";
import { EmailOrWhatsAppInput } from "../../features/auth/ui/EmailORWhatsAppInput/EmailOrWhatsAppInput";

export default function SignInPage() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="px-3 py-6 text-white flex flex-col items-center h-screen">
      <div className="flex-grow flex items-center">
        <img src="media/logo.svg" alt="logo" className="w-44" />
      </div>
      <div className="flex flex-col items-center gap-5 w-full max-w-md relative bottom-5">
        <button
          className="flex items-center justify-center gap-2 w-full rounded-lg p-3 text-[17px] font-[600] pr-8"
          style={{ backgroundColor: colors.main_blue }}
        >
          <img src="media/tg.svg" alt="tg" className="h-[18px] pr-1" />
          Telegram
        </button>
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
          <Button
            disabled={!inputValue.trim()}
            onClick={()=> navigate('/services')}
          >
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
            onClick={() => navigate("/")}
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
