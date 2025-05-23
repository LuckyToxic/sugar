import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { TimerWithRetry } from "../../features/auth/ui/TimerWithRetry/TimerWithRetry";
import { CodeInput } from "../../features/auth/ui/CodeInput/CodeInput";
import { useTimer } from "../../features/auth/hooks/useTimer";

export default function PasswordRecoveryCodePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(["", "", "", ""]);
  const { timer, reset } = useTimer(120);

  return (
    <form onSubmit={(e)=> e.preventDefault()}>
      <div className="text-white p-4 h-screen max-w-md mx-auto">
        <button type="button" onClick={() => navigate(-1)}>
          <img src="media/backArrow.svg" alt="back arrow" />
        </button>
        <div className="h-full flex flex-col items-center text-center py-4 gap-7">
          <img src="media/logo.svg" alt="logo" />
          <p className="text-[24px] font-[500] tracking-[0.5px]">
            Password recovery
          </p>
          <div className="flex flex-col gap-6 relative top-4">
            <p className="text-[17px] leading-[1.3] tracking-[0.4px]">
              A password recovery code has been sent to <br />
              your email address{" "}
              <span className="font-[600]">{location.state ?? "unknown"}</span>
            </p>

            <CodeInput code={code} onChange={setCode} />

            <TimerWithRetry timer={timer} onRetry={reset}/>

            <Button type="submit" className="relative" onClick={()=>navigate('/sign-in')}>
              Password recovery
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
