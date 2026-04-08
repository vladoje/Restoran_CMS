// import { create } from "zustand";
// import { SlobodanDan } from "../_lib/Interfaces";
import { ActiveDays } from "./store";

// export interface SpecialDatesStore {
//   specialDates: SlobodanDan[];
//   toggleDay: (date: string) => void;
//   initialize: (specialDates: SlobodanDan[]) => void;
//   toggleHours: (start: string, end: string, date: string) => void;
//   toggleNote: (note: string, date: string) => void;
//   // create: (date: string) => void;
// }
// export const useSpecialDates = create<SpecialDatesStore>((set) => ({
//   specialDates: [],
//   toggleDay: (date: string) => {
//     set((state) => {
//       const specialDate = state.specialDates.find((d) => d.date === date);
//       if (!specialDate) return { specialDates: [...state.specialDates] };
//       return {
//         specialDates: [
//           {
//             slobodanDanId: specialDate.slobodanDanId,
//             restoranId: specialDate.restoranId,
//             date,
//             isOpen: !specialDate.isOpen,
//             start: specialDate.start,
//             end: specialDate.end,
//             note: specialDate.note,
//           },
//           ...state.specialDates,
//         ],
//       };
//     });
//   },
//   initialize: (specialDates: SlobodanDan[]) => {
//     set(() => {
//       return {
//         specialDates: specialDates,
//       };
//     });
//   },
//   // create: (date: string) => {
//   //   set((state: SpecialDatesStore) => {
//   //     const activeDays = useActiveDays((state) => state.activeDays);
//   //     const [dan, mjesec, godina] = date.split("-");

//   //     const danUSedmici = new Date(
//   //       Number(godina),
//   //       Number(mjesec) - 1,
//   //       Number(dan),
//   //     ).getDay();
//   //     const activeDay = activeDays[danUSedmici];

//   //     return {
//   //       specialDates: [
//   //         ...state.specialDates,
//   //         {
//   //           slobodanDanId: -1,
//   //           restoranId: -1,
//   //           date,
//   //           isOpen: activeDay.isOpen,
//   //           start: activeDay.startTime,
//   //           end: activeDay.endTime,
//   //           note: "",
//   //         },
//   //       ],
//   //     };
//   //   });
//   // },
//   toggleHours: (start: string, end: string, date: string) => {
//     set((state) => {
//       let specialDate = state.specialDates.find((d) => d.date === date);

//       if (!specialDate) {
//         const activeDays = useActiveDays.getState().activeDays;
//         specialDate = createSpecialDate(date, activeDays);
//       }

//       return {
//         specialDates: state.specialDates.some((d) => d.date === date)
//           ? state.specialDates.map((d) =>
//               d.date === date ? { ...d, start, end } : d,
//             )
//           : [...state.specialDates, { ...specialDate, start, end }],
//       };
//     });
//   },
//   toggleNote: (note: string, date: string) => {
//     set((state) => {
//       let specialDate = state.specialDates.find((d) => d.date === date);

//       if (!specialDate) {
//         const activeDays = useActiveDays.getState().activeDays;
//         specialDate = createSpecialDate(date, activeDays);
//       }

//       return {
//         specialDates: state.specialDates.some((d) => d.date === date)
//           ? state.specialDates.map((d) =>
//               d.date === date ? { ...d, note } : d,
//             )
//           : [...state.specialDates, { ...specialDate, note }],
//       };
//     });
//   },
// }));
export const createSpecialDate = (date: string, activeDays: ActiveDays) => {
  const [godina, mjesec, dan] = date.split("-");

  let danUSedmici = new Date(
    Number(godina),
    Number(mjesec) - 1,
    Number(dan),
  ).getDay();

  danUSedmici = danUSedmici - 1 !== -1 ? danUSedmici - 1 : 6;

  const activeDay = activeDays[danUSedmici];

  return {
    slobodanDanId: -1,
    restoranId: -1,
    date,
    isOpen: activeDay.isOpen,
    start: activeDay.startTime,
    end: activeDay.endTime,
    note: "",
  };
};
