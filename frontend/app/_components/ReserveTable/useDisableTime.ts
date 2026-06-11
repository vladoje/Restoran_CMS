import {
  OpeningHour,
  Restoran,
  Rezervacija,
  SlobodanDan,
} from "@/app/_lib/Interfaces";
import { getTimeRange } from "@mantine/dates";
import { useMemo } from "react";

export function useDisableTime(
  rezervacije: Rezervacija[],
  restoran: Restoran,
  date: string | null,
  tableId: number | null,
) {
  return useMemo(() => {
    return rezervacije
      .filter((rez) => rez.tableId === tableId)
      .filter((rez) => {
        const localDate = new Date(rez.dateTime);
        return localDate.toISOString().slice(0, 10) === date;
      })
      .map((rez) => {
        const localDate = new Date(rez.dateTime);

        let startMinutes =
          localDate.getMinutes() -
          restoran.buffer -
          restoran.trajanjeRezervacije;
        let startHours = localDate.getHours();
        while (startMinutes < 0) {
          startMinutes += 60;
          startHours -= 1;
        }

        let endMinutes =
          localDate.getMinutes() +
          restoran.buffer +
          restoran.trajanjeRezervacije;
        let endHours = localDate.getHours();
        while (endMinutes >= 60) {
          endMinutes -= 60;
          endHours += 1;
        }

        const startTime = `${String(startHours).padStart(2, "0")}:${String(startMinutes).padStart(2, "0")}`;
        const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
        return getTimeRange({
          startTime,
          endTime,
          interval: "00:05",
        });
      })
      .flat();
  }, [
    rezervacije,
    tableId,
    date,
    restoran.buffer,
    restoran.trajanjeRezervacije,
  ]);
}
export function useOpeningHour(
  specialDates: SlobodanDan[],
  openingHours: OpeningHour[],
  date: string | null,
) {
  const specijalniDan = specialDates.find((datum) => datum.date === date);
  let danasnjiDan = new Date(date || "").getDay() - 1;

  if (danasnjiDan === -1) danasnjiDan = 6;
  if (danasnjiDan === 0) danasnjiDan = 0;
  const openingHour: OpeningHour | undefined = openingHours.find(
    (dan) => dan.dayOfWeek === danasnjiDan,
  );
  return { specijalniDan, openingHour };
}
