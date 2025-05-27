import Radio, { radioClasses } from "@mui/joy/Radio";
import { styled } from "@mui/joy/styles";

export const CustomRadio = styled(Radio)(() => ({
  [`& .${radioClasses.radio}`]: {
    width: 24,
    height: 24,
    backgroundColor: "#868686",
    borderRadius: "50%",
    border: "none",
    boxShadow: "none",
  },
  [`& .${radioClasses.icon}`]: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "transparent",
  },
  [`&.${radioClasses.checked} .${radioClasses.icon}`]: {
    backgroundColor: "rgb(122, 95, 230)",
    boxShadow: "none",
  },
}));
