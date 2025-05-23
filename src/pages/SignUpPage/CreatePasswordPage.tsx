import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { PasswordInput } from "../../features/auth/ui/PasswordInput/PasswordInput";

export default function CreatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const isValid =
    password.trim() !== "" &&
    repeatPassword.trim() !== "" &&
    password === repeatPassword;

  return (
    <div className="text-white px-3 py-4 h-screen">
      <button onClick={() => navigate(-1)}>
        <img src="media/backArrow.svg" alt="back arrow" />
      </button>
      <div className="h-full flex flex-col items-center py-4 gap-11 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-7">
          <img src="media/logo.svg" alt="logo" />
          <p className="text-[24px] font-[600]">Create password</p>
        </div>

        <p className="text-center text-[17px] leading-[1.2] tracking-[0.4px]">
          Please, create a password for the <br /> account and repeat it
        </p>

        <div className="flex flex-col relative bottom-3 gap-4 w-full">
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />
          <PasswordInput
            value={repeatPassword}
            onChange={setRepeatPassword}
            placeholder="Repeat password"
          />
        </div>
        <div className="w-full relative bottom-6">
          <Button
            disabled={!isValid}
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
