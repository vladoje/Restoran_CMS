import { createContext, useContext } from "react";

interface CalendarContextType {
  day: number | null;
  dayOfWeek: number | null;
  nastavak: string;
  month: number | null;
  year: number | null;
  active: number | null;
  prviUMjesecu: number;
  max: number;
  nedelja: number | undefined;

  prvaSedmica: number[];
  prvaSedmicaSledecegMjeseca: number[];
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleSelectDay: (
    dan: number,
    k: number,
    sledeci: boolean,
    prosli: boolean,
  ) => 5 | undefined;
}
export const CalendarContext = createContext<CalendarContextType>({
  day: null,
  dayOfWeek: null,
  nastavak: "",
  month: null,
  year: null,
  active: null,
  prviUMjesecu: 0,
  max: 31,
  nedelja: undefined,

  prvaSedmica: [],
  prvaSedmicaSledecegMjeseca: [],
  handleNextMonth: () => {},
  handlePrevMonth: () => {},
  handleSelectDay: () => {},
});
export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined)
    throw new Error("koristio si izvan opsega useCalendar");
  return context;
}
