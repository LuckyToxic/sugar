import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../shared/ui/Button/Button";

export default function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="text-white px-3 py-4 h-screen-dynamic">
        <button type="button" onClick={() => navigate(-1)}>
          <img src="media/backArrow.svg" alt="back arrow" />
        </button>
        <div className="h-full flex flex-col items-center text-center py-4 gap-7">
          <img src="media/logo.svg" alt="logo" />
          <p className="text-[24px] font-[500] tracking-[0.5px]">
            Password recovery
          </p>
          <div className="mt-4 flex flex-col gap-6">
            <p className="text-[17px] leading-[1.3] tracking-[0.3px]">
              Enter the email address provided during <br />
              registration, a password recovery code will be sent to it
            </p>

            <div className="relative w-full ">
              <input
                type="email"
                placeholder="Email"
                className="rounded-lg py-[10px] px-5 w-full border border-gray-300 bg-white/10 text-white placeholder-white placeholder:text-[17px] font-medium focus:outline-none"
                style={{ backdropFilter: "blur(10px)" }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                <img src="media/message.svg" alt="message" />
              </span>
            </div>
          </div>
            <p className="text-[14px]  text-center">
              Please check your email inbox after submitting the form.
            </p>
          <Button
            disabled={!inputValue.trim()}
            onClick={() =>
              navigate("/password-recovery-code", { state: inputValue })
            }
            className="relative top-3"
          >
            Send code
          </Button>
        </div>
      </div>
    </form>
  );
}
