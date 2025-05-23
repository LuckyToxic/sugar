import { colors } from "../../../../app/styles/variables";

interface TimerWithRetryProps {
  timer: number;
  onRetry: () => void;
}

export function TimerWithRetry({ timer, onRetry }: TimerWithRetryProps) {
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(1, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <p className="tracking-[0.4px] leading-[1.4]">
      Didn`t get the code?
      <br />
      you can get a new code{" "}
      {timer === 0 ? (
        <span
          onClick={onRetry}
          className="border-b cursor-pointer"
          style={{ color: colors.main_blue, borderColor: colors.main_blue }}
        >
          send code
        </span>
      ) : (
        <>
          in{" "}
          <span
            style={{
              color: colors.main_blue,
              width: "4ch",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTimer(timer)}
          </span>{" "}
          minutes
        </>
      )}
    </p>
  );
}