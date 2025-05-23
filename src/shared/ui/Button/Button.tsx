import type{ ButtonHTMLAttributes, ReactNode } from "react";
import { colors } from "../../../app/styles/variables";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary"; 
  className?: string;
}

export function Button({
  children,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full p-3 rounded-lg text-[17px] font-[600] transition-opacity duration-200 text-center";

  const variantStyles = {
    primary: {
      backgroundColor: colors.main_blue,
      disabledOpacity: "opacity-50 cursor-not-allowed",
    },
    secondary: {
      backgroundColor: "transparent",
      disabledOpacity: "opacity-50 cursor-not-allowed",
    },
  };

  const style = {
    backgroundColor: variantStyles[variant].backgroundColor,
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${disabled ? variantStyles[variant].disabledOpacity : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
