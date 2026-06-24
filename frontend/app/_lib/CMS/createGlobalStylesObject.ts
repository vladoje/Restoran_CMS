function createGlobalStylesObject(
  backgroundColor: string,
  primaryColor: string,
  secondaryColor: string,
  surfaceColor: string,
  textColor: string,
) {
  return {
    bg: backgroundColor,
    primary: primaryColor,
    secondary: secondaryColor,
    surface: surfaceColor,
    text: textColor,
  };
}

export default createGlobalStylesObject;
