/*
Popraviti ako ima greske 
Napraviti admin verziju (updateCMS.ts i getServerCMS)
Poceti koristiti
*/

import { MojJSON } from "@/app/_components/ReservationList";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";

export interface ClientJSONStore {
  json: Record<string, MojJSON>;
  initializeJSON: (databaseJSON: Record<string, MojJSON>) => void;
  changeElementText: (elementId: string, newText: string) => void;
  changeElementIcon: (elementId: string, newIcon: string) => void;
  changeElementCSS: (elementId: string, type: string, value: string) => void;
}
export const useClientJSON = create<ClientJSONStore>((set) => ({
  json: {},
  initializeJSON: (databaseJSON: Record<string, MojJSON>) => {
    set(() => {
      return {
        json: databaseJSON,
      };
    });
  },
  changeElementText: (elementId: string, newText: string) => {
    set((state: ClientJSONStore) => {
      const stariElement = state.json[elementId] || {
        text: "",
        css: "",
        icon: "",
      };
      return {
        json: {
          ...state.json,
          [elementId]: {
            ...stariElement,
            text: newText.slice(0, 512),
          },
        },
      };
    });
  },
  changeElementIcon: (elementId: string, newIcon: string) => {
    set((state: ClientJSONStore) => {
      const stariElement = state.json[elementId] || {
        text: "",
        css: "",
        icon: "",
      };
      return {
        json: {
          ...state.json,
          [elementId]: { ...stariElement, icon: newIcon.slice(0, 64) },
        },
      };
    });
  },
  changeElementCSS: (elementId: string, type: string, value: string) => {
    let prosaoTest = true;
    switch (type) {
      case "font":
        prosaoTest = testFont(value);
        break;
      case "boja":
        prosaoTest = testBoja(value);
        break;
      case "border-radius":
        prosaoTest = testBorderRadius(value);
        break;
      case "poravnanje":
        prosaoTest = testPoravnanje(value);
        break;
      case "border":
        prosaoTest = testBorder(value);
        break;
      case "border-color":
        prosaoTest = testBorderColor(value);
        break;
      case "padding":
        prosaoTest = testPadding(value);
        break;
      case "margina":
        prosaoTest = testMargin(value);
        break;
      case "velicina-fonta":
        prosaoTest = testVelicinaFonta(value);
        break;
      case ":hover":
        prosaoTest = testHover(value);
        break;
      case "shadow":
        prosaoTest = testShadow(value);
        break;
      case "font-weight":
        prosaoTest = testFontWeight(value);
        break;
    }
    if (!prosaoTest) return;
    set((state: ClientJSONStore) => {
      const stariElement = state.json[elementId] || {
        text: "",
        css: "",
        icon: "",
      };
      return {
        json: {
          ...state.json,
          [elementId]: {
            ...stariElement,
            css: twMerge(state.json[elementId].css, value),
          },
        },
      };
    });
  },
}));
function testFont(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testBoja(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testBorderRadius(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testPoravnanje(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testBorder(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testBorderColor(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testPadding(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testMargin(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testVelicinaFonta(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testHover(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testShadow(value: string) {
  if (value.length < 32) return true;
  return false;
}
function testFontWeight(value: string) {
  if (value.length < 32) return true;
  return false;
}
