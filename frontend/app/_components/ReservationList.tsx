/*
kao da json ne postoji nekad, ili ga cekati ali kolikosa obzirom da u konzoli postoji ili pronaci sta je problem
*/

'use client';

import { useState } from 'react';
import PrezentacijaSale from './PrezentacijaSale';
import { Rezervacija, Sala, Sto } from '../_lib/Interfaces';
import { twj } from 'tw-to-css';
const allowedKeys = new Set(['bg', 'text', 'primary', 'secondary']);
export function convertCSS(css: string | undefined, globalStyles: Record<string, string>) {
  return css?.replace(/\{([a-zA-Z0-9_-]+)\}/g, (match, key) => {
    if (allowedKeys.has(key)) {
      return globalStyles[key];
    }
    return match;
  });
}


export interface MojJSON {
  css?: Record<string, string>;
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
    return <div style={{ textAlign: 'center', padding: '1rem' }}>Učitavanje stilova...</div>;
  }

  return (
    <div>
      {!activeReservations.length ? (
        <div id="reservationList-nema" style={json['reservationList-nema']?.css || {}}>
          {json['reservationList-nema']?.text}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visibleReservations.map((res: Rezervacija, i: number) => {
              const resDate = new Date(res.dateTime);
              const isPast = resDate < now;

              const datum = `${resDate.getDate()}.${resDate.getMonth() + 1}.${resDate.getFullYear()}.`;
              const sati = resDate.getHours().toString().padStart(2, '0');
              const minuta = resDate.getMinutes().toString().padStart(2, '0');
              const start = `${sati}:${minuta}`;

              const table = allTables.find((t) => t.tableId === res.tableId);

              return (
                // <div
                //   key={i}
                //   id="reservationList-res-card"
                //   style={json['reservationList-res-card']?.css || {}}
                // >
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div
                    id="reservationList-res-information-poravnanje"
                    style={json['reservationList-res-information-poravnanje']?.css || {}}
                  >
                    {/* LEFT */}
                    <div>
                      <div
                        id="reservationList-res-datum-start"
                        style={json['reservationList-res-datum-start']?.css || {}}
                      >
                        <span
                          id="reservationList-res-datum"
                          style={json['reservationList-res-datum']?.css || {}}
                        >
                          {datum}
                        </span>

                        <span
                          id="reservationList-res-tacka"
                          style={json['reservationList-res-tacka']?.css || {}}
                        >
                          {json['reservationList-res-tacka']?.text}
                        </span>

                        <span
                          id="reservationList-res-start"
                          style={json['reservationList-res-start']?.css || {}}
                        >
                          {start}
                        </span>

                        <span
                          id="reservationList-res-tacka"
                          style={json['reservationList-res-tacka']?.css || {}}
                        >
                          {json['reservationList-res-tacka']?.text}
                        </span>

                        <span
                          id="reservationList-res-gost"
                          style={json['reservationList-res-gost']?.css || {}}
                        >
                          {res.numberOfPeople} {res.numberOfPeople > 1 ? 'gosta' : 'gost'}
                        </span>

                        {/* STATUS */}
                        <span
                          id={
                            isPast
                              ? 'reservationList-res-status-past'
                              : 'reservationList-res-status-new'
                          }
                          style={{
                            ...(isPast
                              ? json['reservationList-res-status-past']?.css || {}
                              : json['reservationList-res-status-new']?.css || {}),
                          }}
                        >
                          {isPast
                            ? json['reservationList-res-status-past']?.text
                            : json['reservationList-res-status-new']?.text}
                        </span>
                      </div>

                      <div
                        id="reservationList-res-sto"
                        style={json['reservationList-res-sto']?.css || {}}
                      >
                        Sto {table?.tableNumber ?? '—'}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {!isPast && (
                      <div
                        id="reservationList-brzeAkcije"
                        style={json['reservationList-brzeAkcije']?.css || {}}
                      >
                        <button
                          id="reservationList-res-izmjeni"
                          style={json['reservationList-res-izmjeni']?.css || {}}
                        >
                          {json['reservationList-res-izmjeni']?.text}
                        </button>
                        <button
                          id="reservationList-res-otkazi"
                          style={json['reservationList-res-otkazi']?.css || {}}
                        >
                          {json['reservationList-res-otkazi']?.text}
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
              id="reservationList-showMore-div"
              style={json['reservationList-showMore-div']?.css || {}}
            >
              <button
                onClick={() =>
                  setNumShown((n) => (isExpanded ? 3 : Math.min(activeReservations.length, n + 3)))
                }
                style={{
                  ...(isExpanded
                    ? json['reservationList-showMore-button-manje']?.css || {}
                    : json['reservationList-showMore-button-jos']?.css || {}),
                }}
                id={
                  isExpanded
                    ? 'reservationList-showMore-button-manje'
                    : 'reservationList-showMore-button-jos'
                }
              >
                {isExpanded
                  ? json['reservationList-showMore-button-manje']?.text
                  : json['reservationList-showMore-button-jos']?.text}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReservationList;