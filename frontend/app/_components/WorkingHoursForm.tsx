import { useState } from "react";

import { CloseButton } from "./DateTable";
import Input from "./Input";

import { H1Datum } from "./SelectedDate";
import SelectWorkingHours from "./SelectWorkingHours";
import { Toggle } from "./Toggle";
import { useCalendar } from "../_hooks/useCalendar";

function getData(/*employeeId izabraniDatum*/) {
  return {
    isOpen: true,
    start: "07:00",
    end: "15:00",
    reason: "",
  };
}

export function WorkingHoursForm({
  isSelectDate,
}: {
  isSelectDate: boolean | string;
}) {
  const { day, month, year } = useCalendar();
  const izabraniDatum = `${day! < 10 ? `0${day}` : day}-${month! + 1 < 10 ? `0${month! + 1}` : month! + 1}-${year}`;

  const { isOpen, start, end, reason } = getData(); //employeeId, izabraniDatum
  const [isOpen2, setIsOpen2] = useState(isOpen);

  const [otvaranje, setOtvaranje] = useState("07:00");
  const [zatvaranje, setZatvaranje] = useState("22:00");
  const [note, setNote] = useState("");

  if (day === 99) return null; //dan nikad nece manuelno od strane korisnika biti 99, u 1 slucaju kada ne treba renderovati formu sam ja rucno stavio da dan bude 99
  return (
    <form action={() => {}}>
      <div className="flex flex-col gap-6 text-gray-700 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 pb-4">
          <H1Datum />
          <p className="text-sm text-gray-500 mt-1">
            Postavite specifično radno vrijeme ili označite neradni dan.
          </p>
        </div>

        {isSelectDate === "admin" && <SelectWorkingHours />}
        {/* Toggle */}
        <Toggle state={isOpen2} setState={setIsOpen2} />
        {/* Dijelovi koji posive kada je salon zatvoren za taj dan */}
        <div
          className={`space-y-5 transition-all duration-300 ${
            isOpen2 ? "opacity-100" : "opacity-50 pointer-events-none grayscale"
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
              defaultValue={isOpen ? reason : ""}
            />
          </div>
        </div>
        {/* Dugmad */}
        <div className="flex gap-3 mt-4">
          <CloseButton />
          <button
            onClick={() => {}}
            className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95"
          >
            Sačuvaj izmjene
          </button>
        </div>
        <input type="hidden" name="otvaranje" value={otvaranje} />
        <input type="hidden" name="zatvaranje" value={zatvaranje} />
        <input type="hidden" name="note" value={note} />
      </div>
    </form>
  );
}

/**
  const [employeeId, setEmployeeId] = useState("all");
  const activeDays = useActiveDays((state) => state.activeDays);

  //mock data
  const employees = [
    {
      id: 100,
      name: "Marko Marković",
      title: "Glavni berber",
      email: "marko@salon.com",
      phone: "065 123 456",
      services: [1],
    },
  ];
  let specificDates = [];
  if (isSelectDate === "admin") {
    specificDates = [
      {
        date: "07-01-2026",
        start: "",
        end: "",
        isOpen: false,
        reason: "Bozic",
        employees: [100],
      },
      {
        date: "27-01-2026",
        start: "10:00",
        end: "14:00",
        isOpen: true,
        reason: "Sveti Sava",
        employees: [100],
      },
    ];
  } else if (isSelectDate === "employee") {
    specificDates = [
      {
        date: "07-01-2026",
        start: "",
        end: "",
        isOpen: false,
        reason: "Bozic",
      },
      {
        date: "27-01-2026",
        start: "10:00",
        end: "14:00",
        isOpen: true,
        reason: "Sveti Sava",
      },
    ];
  }

  const izabraniDatum = `${day < 10 ? `0${day}` : day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`;

  let isSpecial = specificDates.find((date) => date.date === izabraniDatum);
  let isOpen = activeDays[dayOfWeek - 1 === -1 ? 6 : dayOfWeek - 1];
  if (isSpecial) {
    isOpen =
      isOpen &&
      specificDates.find((date) =>
        date.date === izabraniDatum && date.isOpen ? isSpecial?.isOpen : true
      );
  }
  console.log(isSpecial);
  if (onSelectDate === "admin" && employeeId !== "all" && isSpecial) {
    if (!isSpecial.employees?.includes(employeeId)) {
      isSpecial = { isOpen: true, start: "08:00", end: "20:00", reason: "" };
      isOpen = true;
    } else {
      isOpen = isSpecial.isOpen;
    }
  }
  if (onSelectDate === "admin" && employeeId === "all" && isSpecial) {
    if (isSpecial.employees.length === employees.length) {
      isOpen = isSpecial.isOpen;
    } else {
      isSpecial = { isOpen: true, start: "08:00", end: "20:00", reason: "" };
      isOpen = true;
    }
  } */
