"use client";
import { useState } from "react";
import PrezentacijaSale from "./PrezentacijaSale";
import { Rezervacija, Sala, Sto } from "../_lib/Interfaces";
export const globalStyles = {
  bg: "white",
  primary: "gray-900",
  secondary: "gray-200",
  surface: "gray-50",
  text: "gray-600",
};

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

  const json = {
    nema: {
      css: "mt-16 text-sm text-gray-500 border border-dashed rounded-xl p-6 text-center",
      text: "Nema rezervacija",
    },
    "res-card": {
      css: "border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm hover:border-gray-300 transition-all",
    },
    "res-information-poravnanje": {
      css: "justify-between items-start gap-4",
    },
    "res-datum-start": {
      css: "flex-wrap items-center gap-2 text-sm",
    },
    "res-datum": {
      css: "font-medium text-gray-900",
    },
    "res-tacka": {
      css: "text-gray-400",
      text: "•",
    },
    "res-start": {
      css: "text-gray-900",
    },
    "res-gost": {
      css: "",
    },
    "res-status-past": {
      css: "bg-gray-100 text-gray-500 ml-1 px-2 py-0.5 rounded-full text-xs font-medium",
      text: "Završena",
    },
    "res-status-new": {
      css: "bg-green-100 text-green-700 ml-1 px-2 py-0.5 rounded-full text-xs font-medium",
      text: "Aktivna",
    },
    "res-sto": {
      css: "text-sm ",
    },
    brzeAkcije: {
      css: "gap-2 opacity-0 group-hover:opacity-100 transition",
    },
    "res-izmjeni": {
      css: "text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition",
      text: "Izmeni",
    },
    "res-otkazi": {
      css: "text-sm px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition",
      text: "Otkazi",
    },
    "showMore-div": {
      css: "justify-center pt-2",
    },
    "showMore-button": {
      css: "text-sm font-medium text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition",
      text: (bool: boolean) => (bool ? "Prikazi manje" : "Prikazi jos"),
    },
  };

  return (
    <div className="space-y-4">
      {!activeReservations.length ? (
        <div className={json.nema.css}>{json.nema.text}</div>
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
                <div key={i} className={json["res-card"].css}>
                  <div
                    className={`flex ${json["res-information-poravnanje"].css}`}
                  >
                    {/* LEFT */}
                    <div className="space-y-2">
                      <div className={`flex ${json["res-datum-start"].css}`}>
                        <span className={json["res-datum"].css}>{datum}</span>

                        <span className={json["res-tacka"].css}>
                          {json["res-tacka"].text}
                        </span>

                        <span className={json["res-start"].css}>{start}</span>

                        <span className={json["res-tacka"].css}>
                          {json["res-tacka"].text}
                        </span>

                        <span className={json["res-gost"].css}>
                          {res.numberOfPeople}{" "}
                          {res.numberOfPeople > 1 ? "gosta" : "gost"}
                        </span>

                        {/* STATUS */}
                        <span
                          className={` ${
                            isPast
                              ? json["res-status-past"].css
                              : json["res-status-new"].css
                          }`}
                        >
                          {isPast
                            ? json["res-status-past"].text
                            : json["res-status-new"].text}
                        </span>
                      </div>

                      <div className={json["res-sto"].css}>
                        Sto {table?.tableNumber ?? "—"}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {!isPast && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className={json["res-izmjeni"].css}>
                          {json["res-izmjeni"].text}
                        </button>
                        <button className={json["res-otkazi"].css}>
                          {json["res-otkazi"].text}
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
          </div>

          {/* SHOW MORE / LESS */}
          {activeReservations.length > 3 && (
            <div className={`flex ${json["showMore-div"].css}`}>
              <button
                onClick={() =>
                  setNumShown((n) =>
                    isExpanded ? 3 : Math.min(activeReservations.length, n + 3),
                  )
                }
                className={json["showMore-button"].css}
              >
                {json["showMore-button"].text(isExpanded)}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationList;
