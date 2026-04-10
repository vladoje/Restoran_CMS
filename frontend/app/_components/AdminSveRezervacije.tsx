"use client";

import { useState } from "react";
import { Rezervacija } from "../_lib/Interfaces";
import { daysOfWeek2 } from "../_context/CalendarContext";

function AdminSveRezervacije({
  sortedRezervacija,
}: {
  sortedRezervacija: Rezervacija[];
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleRezervacije = sortedRezervacija.slice(0, visibleCount);

  if (!sortedRezervacija || sortedRezervacija.length === 0) {
    return (
      <p className="text-gray-500 text-lg mt-10 ml-8">
        Nema rezervacija u narednih 30 dana.
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-4">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        Sve rezervacije
      </h2>

      <ul className="space-y-3">
        {visibleRezervacije.map((d) => {
          const dayOfWeek = new Date(d.dateTime).getDay();

          return (
            <li
              key={d.reservationId}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center gap-4"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold text-gray-800">
                  {d.dateTime.toISOString()} (
                  {daysOfWeek2[dayOfWeek as keyof typeof daysOfWeek2]})
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {d.note || "Nema bilješke"}
                </p>
              </div>

              {/* RIGHT */}
              <div
                className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm
                  ${
                    d.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {d.status}
              </div>
            </li>
          );
        })}
      </ul>

      {/* BUTTONS */}
      {sortedRezervacija.length > 3 && (
        <div className="flex gap-3 mt-6">
          <button
            disabled={visibleCount === sortedRezervacija.length}
            onClick={() =>
              setVisibleCount((vc) =>
                Math.min(sortedRezervacija.length, vc + 3),
              )
            }
            className={`px-4 py-2 text-sm font-medium rounded-lg transition shadow-sm
              ${
                visibleCount === sortedRezervacija.length
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
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
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminSveRezervacije;
