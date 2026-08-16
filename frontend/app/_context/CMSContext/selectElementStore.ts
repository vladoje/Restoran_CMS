import { create } from "zustand";

export interface SelectElementStore {
  selectedElementId: string;
  selectElement: (id: string) => void;
  deselectElement: () => void;
}
export const useSelectMode = create<SelectElementStore>((set) => ({
  selectedElementId: "",
  selectElement: (id: string) => {
    set(() => {
      return {
        selectedElementId: id,
      };
    });
  },
  deselectElement: () => {
    set(() => {
      return {
        selectedElementId: "",
      };
    });
  },
}));
/*
font https://ae9is.github.io/react-fontpicker/
boja npx untitledui@latest add color-picker https://www.untitledui.com/react/components/color-pickers
tekst
border-radius (0-30)
poravnanje (lijevo,centar,desno)
border (0-10)
boja bordera
padding (0-48)
margina (0-48)
velicina fonta (12-48(72))
shadow (none 2xl xl lg md sm xs 2xs)
shadow boja
font weight (bold italic)
*/
//napraviti sidebar za editovanje ovih vrijednostiS