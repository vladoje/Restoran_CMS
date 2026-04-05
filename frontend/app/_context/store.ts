import { create } from "zustand";
import { OpeningHour } from "../_lib/Interfaces";

// export const useAppointment = create((set) => ({
//   termin: { start: "", end: "", index: "", posible: false },
//   update: (newTermin) => set({ termin: newTermin }),
// }));
// export const useService = create((set) => ({
//   service: "",
//   update: (newService) => set({ service: newService }),
// }));
// export const useEmployee = create((set) => ({
//   employee: "",
//   update: (newEmployee) => set({ employee: newEmployee }),
// }));
// export const useSalon = create((set) => ({
//   salon: "",
//   update: (newSalon) => set({ salon: newSalon }),
// }));
export interface Day {
  isOpen: boolean;
  start: string;
  end: string;
}
export type ActiveDays = Record<number, OpeningHour>;
export interface ActiveDaysStore {
  activeDays: ActiveDays;
  toggleDay: (index: number) => void;
  initialize: (activeDays: ActiveDays) => void;
  ToggleHours: (startTime: string, endTime: string, dayOfWeek: number) => void;
}
export const useActiveDays = create<ActiveDaysStore>((set) => ({
  activeDays: {
    0: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    1: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    2: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    3: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    4: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    5: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
    6: {
      isOpen: true,
      startTime: "",
      endTime: "",
      dayOfWeek: 0,
      restoranId: 0,
      id: 0,
    },
  },
  toggleDay: (index: number) => {
    set((state: ActiveDaysStore) => {
      return {
        activeDays: {
          ...state.activeDays,
          [index]: {
            ...state.activeDays[index],
            isOpen: !state.activeDays[index].isOpen,
          },
        },
      };
    });
  },
  initialize: (activeDays: ActiveDays) => {
    set(() => {
      return {
        activeDays: activeDays,
      };
    });
  },
  ToggleHours: (startTime: string, endTime: string, dayOfWeek: number) => {
    set((state: ActiveDaysStore) => {
      return {
        activeDays: {
          ...state.activeDays,
          [dayOfWeek]: {
            ...state.activeDays[dayOfWeek],
            startTime: startTime,
            endTime: endTime,
            isOpen: state.activeDays[dayOfWeek].isOpen,
          },
        },
      };
    });
  },
}));
