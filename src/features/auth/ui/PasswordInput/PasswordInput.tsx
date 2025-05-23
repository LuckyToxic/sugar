import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg py-3 px-6 w-full border border-gray-300 bg-white/10 text-white placeholder-white placeholder:text-[17px] font-medium focus:outline-none"
        style={{ backdropFilter: "blur(10px)" }}
      />
      <span
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
      >
        {show ? (
          <img src="media/eyeHide.svg" alt="eye hide" />
        ) : (
          <img src="media/eye.svg" alt="eye" />
        )}
      </span>
    </div>
  );
}
