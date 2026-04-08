import { useActionState, useEffect, useState } from "react";

import { CloseButton } from "./DateTable";
import Input from "./Input";

import { H1Datum } from "./SelectedDate";
import SelectWorkingHours from "./SelectWorkingHours";
import { Toggle } from "./Toggle";
import { useCalendar } from "../_hooks/useCalendar";
import { createSpecialDate } from "../_context/specialDatesStore";
import { useActiveDays } from "../_context/store";
import { updateSpecialDates } from "../_lib/updateSlobodniDani";
import toast from "react-hot-toast";
import { SlobodanDan } from "../_lib/Interfaces";

const formatToLocalTime = (timetz: string) => {
  if (!timetz) return "";

  // timetz je npr. "10:00:00+02"
  // Uzimamo samo dio prije prvog i drugog ":"
  const parts = timetz.split(":");
  const hours = parts[0]; // "10"
  const minutes = parts[1]; // "00"

  return `${hours}:${minutes}`;
};
export function WorkingHoursForm({
  isSelectDate,
  restoranId,
  specialDates,
}: {
  isSelectDate: boolean | string;
  restoranId: number;
  specialDates: SlobodanDan[];
}) {
  const { day, month, year } = useCalendar();
  const izabraniDatum = `${day! < 10 ? `0${day}` : day}-${month! + 1 < 10 ? `0${month! + 1}` : month! + 1}-${year}`;
  const izabraniDatum2 = `${year}-${month! + 1 < 10 ? `0${month! + 1}` : month! + 1}-${day! < 10 ? `0${day}` : day}`;

  let specialDate = specialDates.find((d) => d.date === izabraniDatum2);
  const activeDays = useActiveDays((state) => state.activeDays);
  if (!specialDate) {
    specialDate = createSpecialDate(izabraniDatum2, activeDays);
  }

  const isOpen2 = specialDate?.isOpen;
  const start = formatToLocalTime(specialDate?.start || "");
  const end = formatToLocalTime(specialDate?.end || "");
  const notee = specialDate?.note;

  const [isOpen, setIsOpen] = useState(!!isOpen2);
  const [otvaranje, setOtvaranje] = useState(start);
  const [zatvaranje, setZatvaranje] = useState(end);
  const [note, setNote] = useState(notee);

  const [state, formAction] = useActionState(
    async () =>
      updateSpecialDates(
        [
          {
            ...specialDate,
            start: otvaranje,
            end: zatvaranje,
            note,
            isOpen,
          },
        ],
        restoranId,
      ),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      toast.success("Uspješno sačuvano");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const hasChanges =
    otvaranje !== start ||
    zatvaranje !== end ||
    note !== notee ||
    isOpen !== isOpen2;

  if (day === 99) return null; //dan nikad nece manuelno od strane korisnika biti 99, u 1 slucaju kada ne treba renderovati formu sam ja rucno stavio da dan bude 99
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-6 text-gray-700 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 pb-4">
          <H1Datum />
          <p className="text-sm text-gray-500 mt-1">
            Postavite specifično radno vrijeme ili označite neradni dan.
          </p>
        </div>

        {isSelectDate === "admin" && <SelectWorkingHours />}
        {/* Toggle */}
        <Toggle state={isOpen} setState={setIsOpen} />
        {/* Dijelovi koji posive kada je salon zatvoren za taj dan */}
        <div
          className={`space-y-5 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-50 pointer-events-none grayscale"
          }`}
        >
          <div className="grid grid-cols-2 gap-4" key={`${izabraniDatum}`}>
            {/* Input za vrijeme otvaranja */}
            <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-3">
              <span className="absolute -top-2 left-3 px-2 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                Otvaranje
              </span>
              <Input
                state={otvaranje}
                setState={setOtvaranje}
                defaultValue={isOpen ? start : "07:00"}
                type="time"
              />
            </div>
            {/* Input za vrijeme zatvaranja */}
            <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-3">
              <span className="absolute -top-2 left-3 px-2 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                Zatvaranje
              </span>
              <Input
                state={zatvaranje}
                setState={setZatvaranje}
                defaultValue={isOpen ? end : "15:00"}
                type="time"
              />
            </div>
          </div>

          {/* Bilješke */}
          <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-3">
            <span className="absolute -top-2 left-3 px-2 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              Povod / Bilješka
            </span>
            <Input
              state={note}
              setState={setNote}
              type="text"
              placeholder="npr. Nova Godina, Slava, Privatne obaveze..."
              defaultValue={isOpen ? note : ""}
            />
          </div>
        </div>
        {/* Dugmad */}
        <div className="flex gap-3 mt-4">
          <CloseButton />
          <button
            type="submit"
            disabled={!hasChanges}
            className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md transition-all active:scale-95
             hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Sačuvaj izmjene
          </button>
        </div>
      </div>
    </form>
  );
}
