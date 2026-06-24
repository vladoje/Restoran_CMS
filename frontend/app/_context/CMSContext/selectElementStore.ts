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
font 
boja 
tekst
border-radius
poravnanje(lijevo,centar,desno)
border
boja bordera
padding
margina
velicina fonta 
:hover
shadow
font weight (bold italic)
*/
