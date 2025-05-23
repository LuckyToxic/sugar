import * as React from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";
import type { Theme } from "@mui/joy";
import { colors } from "../../../app/styles/variables";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomSwitch({ checked, onChange }: CustomSwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      sx={(theme: Theme) => ({
        display: "inherit",
        "--Switch-thumbShadow": theme.vars.shadow.sm,
        "--Switch-thumbSize": "23px",
        "--Switch-trackWidth": "54px",
        "--Switch-trackHeight": "27px",
        "--Switch-trackBackground": "#EBEBEB",
        "--Switch-thumbBackground": `${colors.main_blue}`, // цвет бегунка по умолчанию
        "&:hover": {
          "--Switch-trackBackground": "#EBEBEB",
        },
        [theme.getColorSchemeSelector("dark")]: {
          "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
        },
        [`&.${switchClasses.checked}`]: {
          "--Switch-trackBackground": "#EBEBEB",
          "--Switch-thumbBackground": `${colors.main_blue}`, // цвет бегунка при checked
        },
      })}
    />
  );
}
