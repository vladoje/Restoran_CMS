import { create } from "zustand";

export interface EditModeStore {
  isEditing: boolean;
  leaveEditing: () => void;
  startEditing: () => void;
  toggleEditing: () => void;
}
export const useEditMode = create<EditModeStore>((set) => ({
  isEditing: false,
  leaveEditing: () => {
    set(() => {
      return {
        isEditing: false,
      };
    });
  },
  startEditing: () => {
    set(() => {
      return {
        isEditing: true,
      };
    });
  },
  toggleEditing: () => {
    set((state: EditModeStore) => {
      return {
        isEditing: !state.isEditing,
      };
    });
  },
}));
