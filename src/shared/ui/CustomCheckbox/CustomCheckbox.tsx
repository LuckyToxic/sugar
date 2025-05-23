import { Checkbox } from "@mui/joy";
import { colors } from "../../../app/styles/variables";

interface CustomCheckboxProps {
  checked :boolean;
  onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
}

export function CustomCheckbox({checked,onChange}:CustomCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        width: 32,
        height: 32,
        "& .MuiCheckbox-checkbox": {
          width: 32,
          height: 32,
          backgroundColor: checked ? colors.main_blue : undefined,
        },
        "&.Mui-checked": {
          color: colors.main_blue,
          "& .MuiCheckbox-checkbox": {
            backgroundColor: colors.main_blue,
          },
        },
      }}
    />
  );
}
