import { createContext } from "react";

// Definišemo tipove za context
export interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

// Kreiramo context sa početnom praznom implementacijom
export const ModalContext = createContext<ModalContextType | null>(null);
