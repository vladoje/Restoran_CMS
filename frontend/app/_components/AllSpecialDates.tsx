"use client";
import { useState } from "react";
import { SlobodanDan } from "../_lib/Interfaces";
import { daysOfWeek2 } from "../_context/CalendarContext";

interface SpecialDatesListProps {
  specialDates: SlobodanDan[];
}

export default function SpecialDatesList({
  specialDates,
}: SpecialDatesListProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 3;

  if (!specialDates || specialDates.length === 0) {
    return <p className="text-gray-500">Nema specijalnih datuma.</p>;
  }

  const sortedDates = [...specialDates].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  const visibleDates = showAll
    ? sortedDates
    : sortedDates.slice(0, visibleCount);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 mb-12">
      <h2 className="text-lg font-semibold mb-3">Specijalni datumi</h2>
      <ul className="divide-y divide-gray-200">
        {visibleDates.map((d) => {
          const dayOfWeek = new Date(d.date).getDay();
          return (
            <li
              key={d.slobodanDanId}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {d.date} ({daysOfWeek2[dayOfWeek as keyof typeof daysOfWeek2]}
                  )
                </p>
                <p className="text-sm text-gray-500">
                  {d.note || "Nema bilješke"}
                </p>
              </div>
              <div className="text-sm font-semibold">
                {d.isOpen ? `${d.start} - ${d.end}` : "Zatvoreno"}
              </div>
            </li>
          );
        })}
      </ul>

      {specialDates.length > visibleCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-indigo-600 font-medium hover:underline text-sm"
        >
          {showAll
            ? "Show less"
            : `Show more (${specialDates.length - visibleCount})`}
        </button>
      )}
    </div>
  );
}
