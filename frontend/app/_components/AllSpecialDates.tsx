"use client";
import { useState } from "react";
import { SlobodanDan } from "../_lib/Interfaces";
import { daysOfWeek } from "../_context/CalendarContext";
import { formatToLocalTime } from "./WorkingHoursForm";

interface SpecialDatesListProps {
  specialDates: SlobodanDan[];
}

export default function SpecialDatesList({
  specialDates,
}: SpecialDatesListProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!specialDates || specialDates.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">Nema specijalnih datuma.</p>
    );
  }

  const sortedDates = [...specialDates].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  const visibleDates = sortedDates.slice(0, visibleCount);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mb-12">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Specijalni datumi
      </h2>

      <ul className="divide-y divide-gray-100">
        {visibleDates.map((d) => {
          const dayOfWeek = new Date(d.date).getDay();
          // if (dayOfWeek === 0) dayOfWeek = 6;
          // if (dayOfWeek === 1) dayOfWeek = 0;
          return (
            <li
              key={d.slobodanDanId}
              className="py-4 flex justify-between items-center gap-4"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium text-gray-800">
                  {d.date} ({daysOfWeek[dayOfWeek as keyof typeof daysOfWeek]})
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {d.note || "Nema bilješke"}
                </p>
              </div>

              {/* RIGHT */}
              <div
                className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                  d.isOpen
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {d.isOpen
                  ? `${formatToLocalTime(d.start)} - ${formatToLocalTime(d.end)}`
                  : "Zatvoreno"}
              </div>
            </li>
          );
        })}
      </ul>

      {/* BUTTONS */}
      {specialDates.length > 3 && (
        <div className="flex gap-3 mt-5">
          <button
            disabled={visibleCount === specialDates.length}
            onClick={() =>
              setVisibleCount((vc) => Math.min(specialDates.length, vc + 3))
            }
            className={`px-4 py-2 text-sm font-medium rounded-lg transition
              ${
                visibleCount === specialDates.length
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
          >
            Show more
          </button>

          <button
            disabled={visibleCount === 3}
            onClick={() => setVisibleCount((vc) => Math.max(3, vc - 3))}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition
              ${
                visibleCount === 3
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}
