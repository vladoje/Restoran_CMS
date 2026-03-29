"use client";
import { useState } from "react";
import { Rezervacija, Sto } from "../[restaurantSlug]/page";
import PrezentacijaSale from "./PrezentacijaSale";
import { Sala } from "../_lib/getTables";

function ReservationList({
  activeReservations,

  sala,
  allTables,
}: {
  activeReservations: Rezervacija[];

  allTables: Sto[];
  sala: Sala;
}) {
  const now = new Date();
  const [numShown, setNumShown] = useState(3);

  const visibleReservations = activeReservations.slice(0, numShown);
  const isExpanded = numShown >= activeReservations.length;

  return (
    <div className="space-y-4">
      {!activeReservations.length ? (
        <div className="text-sm text-gray-500 border border-dashed rounded-xl p-6 text-center">
          Nema rezervacija
        </div>
      ) : (
        <>
          <div className="relative space-y-4">
            {visibleReservations.map((res: Rezervacija, i: number) => {
              const isPast = res.dateTime < now;

              const datum = `${res.dateTime.getDate()}.${
                res.dateTime.getMonth() + 1
              }.${res.dateTime.getFullYear()}.`;

              const sati = res.dateTime.getHours().toString().padStart(2, "0");

              const minuta = res.dateTime
                .getMinutes()
                .toString()
                .padStart(2, "0");

              const start = `${sati}:${minuta}`;

              const table = allTables.find((t) => t.tableId === res.tableId);

              return (
                <div
                  key={i}
                  className="group border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm hover:border-gray-300 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* LEFT */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="font-medium text-gray-900">
                          {datum}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span className="text-gray-800">{start}</span>

                        <span className="text-gray-300">•</span>

                        <span className="text-gray-600">
                          {res.numberOfPeople}{" "}
                          {res.numberOfPeople > 1 ? "gosta" : "gost"}
                        </span>

                        {/* STATUS */}
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            isPast
                              ? "bg-gray-100 text-gray-500"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isPast ? "Završena" : "Aktivna"}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">
                        Sto{" "}
                        <span className="font-medium text-gray-800">
                          {table?.tableNumber ?? "—"}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {!isPast && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          Izmeni
                        </button>
                        <button className="text-sm px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
                          Otkaži
                        </button>
                      </div>
                    )}
                  </div>
                  <PrezentacijaSale
                    stolovi={allTables}
                    sala={sala}
                    x={60}
                    y={60}
                    i={i}
                    tId={res.tableId}
                  />
                </div>
              );
            })}

            {/* FADE EFFECT */}
            {!isExpanded && (
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-white to-transparent rounded-xl" />
            )}
          </div>

          {/* SHOW MORE / LESS */}
          {activeReservations.length > 3 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() =>
                  setNumShown((n) =>
                    isExpanded ? 3 : Math.min(activeReservations.length, n + 3),
                  )
                }
                className="text-sm font-medium text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                {isExpanded ? "Prikaži manje" : "Prikaži još"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationList;
