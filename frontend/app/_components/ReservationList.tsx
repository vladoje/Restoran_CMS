/*
kao da json ne postoji nekad, ili ga cekati ali kolikosa obzirom da u konzoli postoji ili pronaci sta je problem
*/


"use client";

import { useState } from "react";
import PrezentacijaSale from "./PrezentacijaSale";
import { Rezervacija, Sala, Sto } from "../_lib/Interfaces";
import { twj } from "tw-to-css";
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
  
  sala,
  allTables,
}: {
  activeReservations: Rezervacija[];
  json: Record<string, MojJSON>;

  allTables: Sto[];
  sala: Sala;
}) {





  const now = new Date();
  const [numShown, setNumShown] = useState(3);


  const visibleReservations = activeReservations.slice(0, numShown);
  const isExpanded = numShown >= activeReservations.length;
if (!json || Object.keys(json).length === 0) {
    return <div className="text-center p-4">Učitavanje stilova i podataka...</div>; 
    // Ili jednostavno vrati: return null; ako želiš tišinu na ekranu
  }
  return (
    <div className="space-y-4">
      {!activeReservations.length ? (
        <div
          id="ReservationList-nema"
          style={twj(json["ReservationList-nema"]?.css||"")}
        >
          {json["ReservationList-nema"]?.text}
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
                  style={twj(
                    json["ReservationList-res-card"]?.css||""
                   
                  )}
                >
                  <div
                    id="ReservationList-res-information-poravnanje"
                    style={twj(`flex ${(json["ReservationList-res-information-poravnanje"]?.css||"")}`)}
                  >
                    {/* LEFT */}
                    <div className="space-y-2">
                      <div
                        id="ReservationList-res-datum-start"
                        style={twj(`flex ${(json["ReservationList-res-datum-start"]?.css||"")}`)}
                      >
                        <span
                          id="ReservationList-res-datum"
                          style={twj(
                            json["ReservationList-res-datum"]?.css||""
                            
                          )}
                        >
                          {datum}
                        </span>

                        <span
                          id="ReservationList-res-tacka"
                          style={twj(
                            json["ReservationList-res-tacka"]?.css||""
                            
                          )}
                        >
                          {json["ReservationList-res-tacka"]?.text}
                        </span>

                        <span
                          id="ReservationList-res-start"
                          style={twj(
                            json["ReservationList-res-start"]?.css||""
                            
                          )}
                        >
                          {start}
                        </span>

                        <span
                          id="ReservationList-res-tacka"
                          style={twj(
                            json["ReservationList-res-tacka"]?.css||""
                            
                          )}
                        >
                          {json["ReservationList-res-tacka"]?.text}
                        </span>

                        <span
                          id="ReservationList-res-gost"
                          style={twj(
                            json["ReservationList-res-gost"]?.css||""
                            
                          )}
                        >
                          {res.numberOfPeople}{" "}
                          {res.numberOfPeople > 1 ? "gosta" : "gost"}
                        </span>

                        {/* STATUS */}
                        <span
                          id="ReservationList-res-status-past"
                          style={twj(` ${
                            isPast
                              ? twj(
                                  json["ReservationList-res-status-past"]?.css||""
                                  
                                )
                              : twj(
                                  json["ReservationList-res-status-new"]?.css||""
                                  
                                )
                          }`)}
                        >
                          {isPast
                            ? json["ReservationList-res-status-past"]?.text
                            : json["ReservationList-res-status-new"]?.text}
                        </span>
                      </div>

                      <div
                        id="ReservationList-res-sto"
                        style={twj(
                          json["ReservationList-res-sto"]?.css||""
                          
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
                          style={twj(
                            json["ReservationList-res-izmjeni"]?.css||""
                            
                          )}
                        >
                          {json["ReservationList-res-izmjeni"]?.text}
                        </button>
                        <button
                          id="ReservationList-res-otkazi"
                          style={twj(
                            json["ReservationList-res-otkazi"]?.css||""
                            
                          )}
                        >
                          {json["ReservationList-res-otkazi"]?.text}
                        </button>
                      </div>
                    )}
                  </div>
                  <PrezentacijaSale
                    stolovi={allTables}
                    sala={sala}
                    json={json}
                    
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
              style={twj(`flex ${(json["ReservationList-showMore-div"]?.css||"")}`)}
            >
              <button
                onClick={() =>
                  setNumShown((n) =>
                    isExpanded ? 3 : Math.min(activeReservations.length, n + 3),
                  )
                }
                style={twj(
                  json["ReservationList-showMore-button-manje"]?.css||""
                  
                )}
                id="ReservationList-showMore-button-manje"
              >
                {isExpanded
                  ? json["ReservationList-showMore-button-manje"]?.text
                  : json["ReservationList-showMore-button-jos"]?.text}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationList;
