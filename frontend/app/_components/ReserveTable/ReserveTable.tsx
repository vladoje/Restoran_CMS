'use client';

import PrezentacijaSale from '../PrezentacijaSale';
import { useRef, useState } from 'react';
import { createRezervacija } from '../../_lib/createRezervacija';
import {
  OpeningHour,
  Restoran,
  Rezervacija,
  Sala,
  SlobodanDan,
  Sto,
  User,
} from '../../_lib/Interfaces';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCanvasSize } from './useCanvasSize';
import { useDisableTime, useOpeningHour } from './useDisableTime';
import ReservationDetails from './ReservationDetails';
import { MojJSON } from '../ReservationList';
import { twj } from 'tw-to-css';

function ReserveTable({
  sala,
  json,
  isEditing,
  allTables,
  user,
  restoran,
  rezervacije,
  isAdmin = false,
  specialDates,
  openingHours,
}: {
  sala: Sala;
  json?: Record<string, MojJSON>;
  isEditing: boolean;
  allTables: Sto[];
  user: User;
  rezervacije: Rezervacija[];
  restoran: Restoran;
  isAdmin?: boolean;
  specialDates: SlobodanDan[];
  openingHours: OpeningHour[];
}) {
  const router = useRouter();
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [table, setTable] = useState<number | null>(null);
  const [tableId, setTableId] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');

  const selectedTable = allTables.find((t) => t.tableId === tableId);

  // responsive size for sala
  const parentRef = useRef<HTMLDivElement>(null);

  const canvasSize = useCanvasSize(parentRef);

  const disableTime = useDisableTime(rezervacije, restoran, date, tableId);

  const { specijalniDan, openingHour } = useOpeningHour(specialDates, openingHours, date);
    const newJSON=json||reserveTableJSON
  return (
    <form
      onSubmit={async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
          await createRezervacija(formData);
          toast.success('Uspjesno rezervisan termin');
          if (!isAdmin) {
            router.push(`/${restoran.slug}`);
          } else {
            router.refresh();
            setDate(null);
            setTime(null);
            setTable(null);
            setTableId(null);
            setCapacity(null);
            setNote('');
          }
        } catch (e) {
          if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error('Greška');
          }
        }
      }}
    >
      <div id="reserve-table" style={newJSON['reserve-table'].css || {}}>
        {/* GRID */}
        <div id="reserve-table-grid" style={newJSON['reserve-table-grid'].css || {}}>
          {/* LEFT */}
          <div style={newJSON['reserve-table-odaberi-sto'].css || {}}>
            {' '}
            {/* Dodat overflow-hidden */}
            <h2
              id="reserve-table-odaberi-sto-naslov"
              style={newJSON['reserve-table-odaberi-sto-naslov'].css || {}}
            >
              {newJSON['reserve-table-odaberi-sto-naslov'].text}
            </h2>
            <input type="hidden" value={tableId || ''} name="tableId" />
            <div className="w-full flex justify-center" ref={parentRef}>
              {' '}
              {/* Izbačen min-w-75 */}
              <PrezentacijaSale
                isEditing={isEditing}
                sala={sala}

                stolovi={allTables}
                x={canvasSize}
                y={canvasSize}
                i={1}
                tId={tableId}
                setTable={setTable}
                setTableId={setTableId}
                setCapacity={setCapacity}
                setTime={setTime}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <ReservationDetails
              date={date}
              note={note}
              time={time}
              table={table}
              capacity={capacity}
              setDate={setDate}
              setNote={setNote}
              setTime={setTime}
              setCapacity={setCapacity}
              selectedTable={selectedTable}
              openingHour={openingHour}
              specijalniDan={specijalniDan}
              disableTime={disableTime}

            />
          </div>
        </div>

        <input type="hidden" value={user.userId || ''} name="userId" />
        <input type="hidden" value={sala.restoranId || ''} name="restoranId" />
        <input type="hidden" value={date || ''} name="date" />
        <input type="hidden" value={time || ''} name="time" />
        <input type="hidden" value={restoran.buffer || ''} name="buffer" />
        <input type="hidden" value={restoran.trajanjeRezervacije} name="durration" />
      </div>
    </form>
  );
}
const reserveTableJSON = {
  'reserve-table': {
    css: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      minHeight: '100vh',
      maxWidth: '80rem',
    },
  },
  'reserve-table-grid': {
    css: {
      gap: '1.5rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    },
  },
  'reserve-table-odaberi-sto': {
    css: {
      overflow: 'hidden',
      borderRadius: '1rem',
      padding: '1rem',
    },
  },
  'reserve-table-odaberi-sto-naslov': {
    text: 'Odaberi sto',
    css: {
      marginBottom: '1rem',
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: '600',
    },
  },
};
export default ReserveTable;
