import { create } from "zustand";

export interface globalStylesObj {
  bg: string;
  primary: string;
  secondary: string;
  surface: string;
  text: string;
}

export interface ColorPaletteStore {
  globalStyles: globalStylesObj;
  initializeGlobalStyles: (databaseGlobalStyles: globalStylesObj) => void;
  changeGlobalStyle: (type: string, value: string) => void;
}
export const useColorPalette = create<ColorPaletteStore>((set) => ({
  globalStyles: {
    bg: "",
    primary: "",
    secondary: "",
    surface: "",
    text: "",
  },
  initializeGlobalStyles: (databaseGlobalStyles: globalStylesObj) => {
    set(() => {
      return {
        globalStyles: databaseGlobalStyles,
      };
    });
  },
  changeGlobalStyle: (type: string, value: string) => {
    if (!isTailwindColor(value)) return;
    set((state: ColorPaletteStore) => {
      const newGlobalStyles = { ...state.globalStyles };
      switch (type) {
        case "bg":
          newGlobalStyles.bg = value;
          break;
        case "primary":
          newGlobalStyles.primary = value;
          break;
        case "secondary":
          newGlobalStyles.secondary = value;
          break;
        case "surface":
          newGlobalStyles.surface = value;
          break;
        case "text":
          newGlobalStyles.text = value;
          break;
      }
      return {
        globalStyles: newGlobalStyles,
      };
    });
  },
}));
export function isTailwindColor(value: string): boolean {
  // Regex pokriva standardne Tailwind prefikse (text, bg, border, itd.)
  // i sve standardne boje (uključujući slate, zinc, neutral, amber, itd.)
  const tailwindColorRegex =
    /(inherit|current|transparent|black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d{2,3})?(\/\d{1,3})?$/;

  return tailwindColorRegex.test(value);
}
