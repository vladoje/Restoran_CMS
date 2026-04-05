"use client";
import { ChevronDown, ChevronUp, Save, Settings2 } from "lucide-react";

import { useActionState, useEffect, useState } from "react";
import { WorkingDay } from "./WorkingDay";

import { OpeningHour } from "../_lib/Interfaces";
import { ActiveDays, useActiveDays } from "../_context/store";
import { updateWorkingHours } from "../_lib/updateWorkingHours";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";

export function convertToAciveHours(openingHours: OpeningHour[]): ActiveDays {
  return {
    0: {
      isOpen: openingHours[0].isOpen,
      startTime: openingHours[0].startTime,
      endTime: openingHours[0].endTime,
      id: openingHours[0].id,
      restoranId: openingHours[0].restoranId,
      dayOfWeek: openingHours[0].dayOfWeek,
    },
    1: {
      isOpen: openingHours[1].isOpen,
      startTime: openingHours[1].startTime,
      endTime: openingHours[1].endTime,
      id: openingHours[1].id,
      restoranId: openingHours[1].restoranId,
      dayOfWeek: openingHours[1].dayOfWeek,
    },
    2: {
      isOpen: openingHours[2].isOpen,
      startTime: openingHours[2].startTime,
      endTime: openingHours[2].endTime,
      id: openingHours[2].id,
      restoranId: openingHours[2].restoranId,
      dayOfWeek: openingHours[2].dayOfWeek,
    },
    3: {
      isOpen: openingHours[3].isOpen,
      startTime: openingHours[3].startTime,
      endTime: openingHours[3].endTime,
      id: openingHours[3].id,
      restoranId: openingHours[3].restoranId,
      dayOfWeek: openingHours[3].dayOfWeek,
    },
    4: {
      isOpen: openingHours[4].isOpen,
      startTime: openingHours[4].startTime,
      endTime: openingHours[4].endTime,
      id: openingHours[4].id,
      restoranId: openingHours[4].restoranId,
      dayOfWeek: openingHours[4].dayOfWeek,
    },
    5: {
      isOpen: openingHours[5].isOpen,
      startTime: openingHours[5].startTime,
      endTime: openingHours[5].endTime,
      id: openingHours[5].id,
      restoranId: openingHours[5].restoranId,
      dayOfWeek: openingHours[5].dayOfWeek,
    },
    6: {
      isOpen: openingHours[6].isOpen,
      startTime: openingHours[6].startTime,
      endTime: openingHours[6].endTime,
      id: openingHours[6].id,
      restoranId: openingHours[6].restoranId,
      dayOfWeek: openingHours[6].dayOfWeek,
    },
  };
}
function StandardWorkTime({ openingHours }: { openingHours: OpeningHour[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeDays = useActiveDays((state) => state.activeDays);
  const initialize = useActiveDays((state) => state.initialize);

  useEffect(() => {
    initialize(convertToAciveHours(openingHours));
  }, [openingHours, initialize]);

  const updateWithData = updateWorkingHours.bind(null, activeDays);
  const [state, formAction] = useActionState(updateWithData, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Uspješno sačuvano");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-gray-50/50 border-b border-gray-100"
      >
        <div className="flex items-center gap-3 font-bold text-gray-700">
          <Settings2 className="w-5 h-5 text-indigo-600" />
          Standardno radno vrijeme
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <form action={formAction}>
          <div className="p-2">
            <ul className="divide-y divide-gray-100">
              {Object.values(activeDays).map((dan, i) => {
                return (
                  <div key={`${dan.id}-${i}`}>
                    <WorkingDay dan={dan} i={i} />
                    <input
                      key={`${dan.id}-${i + 10}`}
                      type="hidden"
                      value={dan.dayOfWeek}
                      name={`dayOfWeek-${i}`}
                    />
                    <input
                      key={`${dan.id}-${i + 20}`}
                      type="hidden"
                      value={dan.endTime}
                      name={`endTime-${i}`}
                    />
                    <input
                      key={`${dan.id}-${i + 30}`}
                      type="hidden"
                      value={dan.id}
                      name={`id-${i}`}
                    />
                    <input
                      key={`${dan.id}-${i + 40}`}
                      type="hidden"
                      value={Number(dan.isOpen)}
                      name={`isOpen-${i}`}
                    />
                    <input
                      key={`${dan.id}-${i + 50}`}
                      type="hidden"
                      value={dan.restoranId}
                      name={`restoranId-${i}`}
                    />
                    <input
                      key={`${dan.id}-${i + 60}`}
                      type="hidden"
                      value={dan.startTime}
                      name={`startTime-${i}`}
                    />
                  </div>
                );
              })}
            </ul>

            <div className="p-3">
              <SubmitButton />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
// Posebna komponenta za dugme (unutar istog fajla ili drugog)
function SubmitButton() {
  const { pending } = useFormStatus(); // Ovo sada radi!

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all 
        ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"}`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          SPREMANJE...
        </span>
      ) : (
        <>
          <Save className="w-5 h-5" />
          SAČUVAJ PROMJENE
        </>
      )}
    </button>
  );
}
export default StandardWorkTime;
