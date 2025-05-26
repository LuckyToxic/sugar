import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CodeInput } from "../../features/auth/ui/CodeInput/CodeInput";
import { TimerWithRetry } from "../../features/auth/ui/TimerWithRetry/TimerWithRetry";
import { Button } from "../../shared/ui/Button/Button";
import { useTimer } from "../../features/auth/hooks/useTimer";

export default function ConfirmEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const [code, setCode] = useState(["", "", "", ""]);
  const { timer, reset } = useTimer(120);

  return (
    <div className="text-white p-4 h-screen-dynamic max-w-md mx-auto">
      <button onClick={() => navigate(-1)}>
        <img src="media/backArrow.svg" alt="back arrow" />
      </button>
      <div className="h-full flex flex-col items-center gap-11 py-4 text-center">
        <div className="flex flex-col items-center gap-7">
          <img src="media/logo.svg" alt="logo" />
          <p className="text-[24px] font-[600]">Confirm email</p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[17px] leading-[1.3] tracking-[0.3px]">
            A verification code has been sent to your email <br />
            <span className="font-[700]">{state}</span><br/> Enter the code below
          </p>

          <CodeInput code={code} onChange={setCode} />

          <TimerWithRetry timer={timer} onRetry={reset} />

          <Button onClick={() => navigate("/create-password")} className="relative bottom-1">
            Confirm email
          </Button>
        </div>
      </div>
    </div>
  );
}
