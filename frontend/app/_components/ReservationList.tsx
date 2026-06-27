"use client";

import { useState } from "react";
import PrezentacijaSale from "./PrezentacijaSale";
import { Rezervacija, Sala, Sto } from "../_lib/Interfaces";
const allowedKeys = new Set(["bg", "text", "primary", "secondary"]);
export function convertCSS(
  css: string | undefined,
  globalStyles: Record<string, string>,
) {
  return css?.replace(/\{([a-zA-Z0-9_-]+)\}/g, (match, key) => {
    if (allowedKeys.has(key)) {
      return globalStyles[key];
    }
    return match;
  });
}
export interface MojJSON {
  css?: string;
  text?: string;
  icon?: string;
}

function ReservationList({
  activeReservations,
  json,
  globalStyles,
  sala,
  allTables,
}: {
  activeReservations: Rezervacija[];
  json: Record<string, MojJSON>;
  globalStyles: Record<string, string>;
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
        <div
          id="ReservationList-nema"
          className={convertCSS(json["ReservationList-nema"].css, globalStyles)}
        >
          {json["ReservationList-nema"].text}
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
                  id="ReservationList-res-card"
                  className={convertCSS(
                    json["ReservationList-res-card"].css,
                    globalStyles,
                  )}
                >
                  <div
                    id="ReservationList-res-information-poravnanje"
                    className={`flex ${convertCSS(json["ReservationList-res-information-poravnanje"].css, globalStyles)}`}
                  >
                    {/* LEFT */}
                    <div className="space-y-2">
                      <div
                        id="ReservationList-res-datum-start"
                        className={`flex ${convertCSS(json["ReservationList-res-datum-start"].css, globalStyles)}`}
                      >
                        <span
                          id="ReservationList-res-datum"
                          className={convertCSS(
                            json["ReservationList-res-datum"].css,
                            globalStyles,
                          )}
                        >
                          {datum}
                        </span>

                        <span
                          id="ReservationList-res-tacka"
                          className={convertCSS(
                            json["ReservationList-res-tacka"].css,
                            globalStyles,
                          )}
                        >
                          {json["ReservationList-res-tacka"].text}
                        </span>

                        <span
                          id="ReservationList-res-start"
                          className={convertCSS(
                            json["ReservationList-res-start"].css,
                            globalStyles,
                          )}
                        >
                          {start}
                        </span>

                        <span
                          id="ReservationList-res-tacka"
                          className={convertCSS(
                            json["ReservationList-res-tacka"].css,
                            globalStyles,
                          )}
                        >
                          {json["ReservationList-res-tacka"].text}
                        </span>

                        <span
                          id="ReservationList-res-gost"
                          className={convertCSS(
                            json["ReservationList-res-gost"].css,
                            globalStyles,
                          )}
                        >
                          {res.numberOfPeople}{" "}
                          {res.numberOfPeople > 1 ? "gosta" : "gost"}
                        </span>

                        {/* STATUS */}
                        <span
                          id="ReservationList-res-status-past"
                          className={` ${
                            isPast
                              ? convertCSS(
                                  json["ReservationList-res-status-past"].css,
                                  globalStyles,
                                )
                              : convertCSS(
                                  json["ReservationList-res-status-new"].css,
                                  globalStyles,
                                )
                          }`}
                        >
                          {isPast
                            ? json["ReservationList-res-status-past"].text
                            : json["ReservationList-res-status-new"].text}
                        </span>
                      </div>

                      <div
                        id="ReservationList-res-sto"
                        className={convertCSS(
                          json["ReservationList-res-sto"].css,
                          globalStyles,
                        )}
                      >
                        Sto {table?.tableNumber ?? "—"}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {!isPast && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          id="ReservationList-res-izmjeni"
                          className={convertCSS(
                            json["ReservationList-res-izmjeni"].css,
                            globalStyles,
                          )}
                        >
                          {json["ReservationList-res-izmjeni"].text}
                        </button>
                        <button
                          id="ReservationList-res-otkazi"
                          className={convertCSS(
                            json["ReservationList-res-otkazi"].css,
                            globalStyles,
                          )}
                        >
                          {json["ReservationList-res-otkazi"].text}
                        </button>
                      </div>
                    )}
                  </div>
                  <PrezentacijaSale
                    stolovi={allTables}
                    sala={sala}
                    json={json}
                    globalStyles={globalStyles}
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
            <div
              id="ReservationList-showMore-div"
              className={`flex ${convertCSS(json["ReservationList-showMore-div"].css, globalStyles)}`}
            >
              <button
                onClick={() =>
                  setNumShown((n) =>
                    isExpanded ? 3 : Math.min(activeReservations.length, n + 3),
                  )
                }
                className={convertCSS(
                  json["ReservationList-showMore-button-manje"].css,
                  globalStyles,
                )}
                id="ReservationList-showMore-button-manje"
              >
                {isExpanded
                  ? json["ReservationList-showMore-button-manje"].text
                  : json["ReservationList-showMore-button-jos"].text}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationList;
