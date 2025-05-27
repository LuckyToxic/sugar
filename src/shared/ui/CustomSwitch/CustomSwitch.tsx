import * as React from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";
import type { Theme } from "@mui/joy";
import { colors } from "../../../app/styles/variables";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  thumbColor?: string;
  thumbCheckedColor?: string;
  trackColor?: string;
  trackCheckedColor?: string;
  // Новые пропсы для размеров
  thumbSize?: string; // например, "23px"
  trackWidth?: string; // например, "54px"
  trackHeight?: string; // например, "27px"
}

export function CustomSwitch({
  checked,
  onChange,
  thumbColor = colors.main_blue,
  thumbCheckedColor = colors.main_blue,
  trackColor = "#EBEBEB",
  trackCheckedColor = "#EBEBEB",
  thumbSize = "23px",
  trackWidth = "54px",
  trackHeight = "27px",
}: CustomSwitchProps) {
  return (
    <Switch
      variant="solid"
      checked={checked}
      onChange={onChange}
      sx={(theme: Theme) => ({
        display: "inherit",
        "--Switch-thumbShadow": theme.vars.shadow.sm,
        "--Switch-thumbSize": thumbSize,
        "--Switch-trackWidth": trackWidth,
        "--Switch-trackHeight": trackHeight,
        "--Switch-trackBackground": trackColor,
        "--Switch-thumbBackground": thumbColor,
        transition: "background-color 0.3s cubic-bezier(.4,0,.2,1)",
        [`& .${switchClasses.thumb}`]: {
          transition:
            "background-color 0.3s cubic-bezier(.4,0,.2,1), " +
            "transform 0.35s cubic-bezier(.4,0,.2,1), " +
            "left 0.2s cubic-bezier(.4,0,.2,1), " +
            "width 0.2s cubic-bezier(.4,0,.2,1)",
        },
        [`& .${switchClasses.track}`]: {
          transition: "background-color 0.3s cubic-bezier(.4,0,.2,1)",
        },
        [`&.${switchClasses.checked}`]: {
          "--Switch-trackBackground": trackCheckedColor,
          "--Switch-thumbBackground": thumbCheckedColor,
        },
      })}
    />
  );
}
