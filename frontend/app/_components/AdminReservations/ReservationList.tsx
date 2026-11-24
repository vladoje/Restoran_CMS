/*
kao da json ne postoji nekad, ili ga cekati ali kolikosa obzirom da u konzoli postoji ili pronaci sta je problem
*/

'use client';

import {  useState } from 'react';
import { Rezervacija, Sala, Sto } from '@/app/_lib/Interfaces';
import ReservationsReservationCard from '@/app/_components/AdminReservations/ReservationsReservationCard';
import ShowMoreAndLessButtons from '@/app/_components/AdminReservations/ShowMoreAndLessButtons';
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
  isEditing = false,
  activeOrPast,
}: {
  activeReservations: Rezervacija[];
  json: Record<string, MojJSON>;
  allTables: Sto[];
  isEditing?: boolean;
  activeOrPast: string;
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
        <NemaRezervacija json={json} />
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
                <ReservationsReservationCard
                  isEditing={isEditing}
                  json={json}
                  start={start}
                  datum={datum}
                  sala={sala}
                  allTables={allTables}
                  table={table}
                  res={res}
                  i={i}
                  isPast={isPast}
                  key={i}
                />
              );
            })}
          </div>

          {/* SHOW MORE / LESS */}
          {activeReservations.length > 3 && (
            <ShowMoreAndLessButtons
              activeOrPast={activeOrPast}
              json={json}
              activeReservations={activeReservations}
              isExpanded={isExpanded}
              setNumShown={setNumShown}
            />
          )}
        </>
      )}
    </div>
  );
}


function NemaRezervacija({ json }: { json: Record<string, MojJSON> }) {
  return (
    <div id="reservationList-nema" style={json['reservationList-nema']?.css || {}}>
      {json['reservationList-nema']?.text}
    </div>
  );
}
export default ReservationList;
