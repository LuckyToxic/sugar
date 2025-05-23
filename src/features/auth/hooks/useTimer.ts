import { useEffect, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const reset = () => setTimer(initialSeconds);

  return { timer, reset };
}
