import toast from "react-hot-toast";
import { useState } from "react";
export const pet = ["", "", "", "", ""];
export const sedam = ["", "", "", "", "", "", ""];
export const daysOfWeek = {
  0: "Nedjelja",
  1: "Ponedjeljak",
  2: "Utorak",
  3: "Srijeda",
  4: "Četvrtak",
  5: "Petak",
  6: "Subota",
};
export const daysOfWeek2 = {
  0: "Ponedjeljak",
  1: "Utorak",
  2: "Srijeda",
  3: "Četvrtak",
  4: "Petak",
  5: "Subota",
  6: "Nedjelja",
};
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const months: Record<MonthIndex, [number, string]> = {
  0: [31, "Januar"],
  1: [28, "Februar"],
  2: [31, "Mart"],
  3: [30, "April"],
  4: [31, "Maj"],
  5: [30, "Jun"],
  6: [31, "Jul"],
  7: [31, "Avgust"],
  8: [30, "Septembar"],
  9: [31, "Oktobar"],
  10: [30, "Novembar"],
  11: [31, "Decembar"],
};
import {
  getMax,
  getNastavak,
  getPrviUMjesecu,
  prvaSedmicaa,
} from "../../utils/helpers/calendarHelpers";
import { CalendarContext } from "../_hooks/useCalendar";

export function CalendarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [year, setYear] = useState(new Date().getFullYear() || null);
  const [day, setDay] = useState(new Date().getDate() || null);
  const [month, setMonth] = useState(new Date().getMonth() || null);
  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay() || null);
  const [active, setActive] = useState(day);

  const prviUMjesecu = getPrviUMjesecu(month!, year!);

  const max = getMax(month! as MonthIndex, year!);
  const prvaSedmica = prvaSedmicaa(year!, month! as MonthIndex);
  const prvaSedmicaSledecegMjeseca = prvaSedmicaa(
    month === 11 ? year! + 1 : year!,
    month === 11 ? 0 : ((month! + 1) as MonthIndex),
  );
  const nedelja = prvaSedmica.at(6);
  const nastavak = getNastavak(day!);

  function handleNextMonth() {
    setActive(null);
    setDay(null);
    setDayOfWeek(null);
    if (month === 11) {
      setYear((y) => y! + 1);
      setMonth(0);
    } else {
      setMonth((m) => m! + 1);
    }
  }
  function handlePrevMonth() {
    setDay(null);
    setDayOfWeek(null);
    setActive(null);
    if (month === 0) {
      setMonth(11);
      setYear((y) => y! - 1);
    } else setMonth((m) => m! - 1);
  }

  function handleSelectDay(
    dan: number,
    k: number,
    sledeci: boolean,
    prosli: boolean,
  ) {
    // console.log(dan, k, month, year, sledeci, prosli);
    const k2 = k === 7 ? 0 : k;
    let dan2 = dan + 1 > max ? dan - max + 1 : dan;
    if (prosli) dan2 = dan;

    let targetMonth = month;
    let targetYear = year;

    if (prosli) {
      targetMonth = month === 0 ? 11 : month! - 1;
      targetYear = month === 0 ? year! - 1 : year;
    } else if (sledeci) {
      targetMonth = month === 11 ? 0 : month! + 1;
      targetYear = month === 11 ? year! + 1 : year;
    }
    // console.log(targetYear!, targetMonth!, dan2);
    const selectedDate = new Date(targetYear!, targetMonth!, dan2);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(selectedDate, today);
    if (selectedDate < today) {
      toast.error("Ne možete mijenjati radno vrijeme za datume u prošlosti");
      return 5; //bilo sta da returnujem da mogu prepoznati da nisu usojesno promjenjeni d m g a dw
    }

    if (prosli || sledeci) {
      setMonth(targetMonth);
      setYear(targetYear);
    }
    setActive(dan2);
    setDay(dan2);
    setDayOfWeek(k2);
  }

  return (
    <CalendarContext.Provider
      value={{
        day,
        dayOfWeek,
        nastavak,
        month,
        year,
        active,
        prviUMjesecu,
        max,
        nedelja,

        prvaSedmica,
        prvaSedmicaSledecegMjeseca,
        handleNextMonth,
        handleSelectDay,
        handlePrevMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
