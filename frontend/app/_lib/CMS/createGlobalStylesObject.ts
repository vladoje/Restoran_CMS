import { Sajt } from "../Interfaces";

function createGlobalStylesObject(sajt: Sajt) {
  return {
    bg: sajt.backgroundColor,
    primary: sajt.primaryColor,
    secondary: sajt.secondaryColor,
    surface: sajt.surfaceColor,
    text: sajt.textColor,
  };
}

export default createGlobalStylesObject;
