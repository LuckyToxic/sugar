import { useRef } from "react";

interface CodeInputProps {
  code: string[];
  onChange: (code: string[]) => void;
}

export function CodeInput({ code, onChange }: CodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newCode = [...code];
    newCode[idx] = val[0];
    onChange(newCode);
    if (idx < 3) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[idx]) {
        newCode[idx] = "";
        onChange(newCode);
      } else if (idx > 0) {
        newCode[idx - 1] = "";
        onChange(newCode);
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center w-full gap-4">
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          type="tel"
          value={digit}
          autoComplete="off"
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-[80px] h-[62px] rounded-2xl bg-white/10 text-white text-center text-[28px] font-bold border-2 border-white focus:outline-none"
          style={{ backdropFilter: "blur(10px)" }}
        />
      ))}
    </div>
  );
}
