"use client";

import { daysOfWeek2 } from "../_context/CalendarContext";
import { useActiveDays } from "../_context/store";
import { OpeningHour } from "../_lib/Interfaces";

export function WorkingDay({ dan, i }: { dan: OpeningHour; i: number }) {
  const toggleDay = useActiveDays((state) => state.toggleDay);
  const activeDays = useActiveDays((state) => state.activeDays);
  const ToggleHours = useActiveDays((state) => state.ToggleHours);

  return (
    <li className="py-5 px-3">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`font-bold ${activeDays[i].isOpen ? "text-gray-800" : "text-gray-400"}`}
        >
          {daysOfWeek2[dan.dayOfWeek as keyof typeof daysOfWeek2]}
        </span>

        {/* PRAVI TOGGLE ELEMENT */}
        <div
          onClick={() => toggleDay(i)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            activeDays[i].isOpen ? "bg-emerald-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              activeDays[i].isOpen ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {activeDays[i].isOpen ? (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">
              Od
            </span>
            <input
              onChange={(e) =>
                ToggleHours(e.target.value, activeDays[i].endTime, i)
              }
              defaultValue={dan.startTime}
              type="time"
              className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="relative">
            <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-gray-400 uppercase">
              Do
            </span>
            <input
              onChange={(e) =>
                ToggleHours(activeDays[i].startTime, e.target.value, i)
              }
              defaultValue={dan.endTime}
              type="time"
              className="w-full text-sm font-semibold border border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">Ovaj dan salon ne radi.</p>
      )}
    </li>
  );
}
