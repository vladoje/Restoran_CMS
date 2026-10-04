import dayjs from 'dayjs';
import 'dayjs/locale/sr';

dayjs.locale('sr');
import { MojJSON, OpeningHour, SlobodanDan, Sto } from '@/app/_lib/Interfaces';
import { DatePickerInput, getTimeRange, TimeGrid } from '@mantine/dates';
import { Dispatch, SetStateAction } from 'react';
import { renderTemplate, tip } from '../PrezentacijaSale';

export function ReservationDetails({
  date,
  note,
  time,
  table,
  capacity,
  setDate,
  setNote,
  setTime,
  setCapacity,
  selectedTable,
  openingHour,
  specijalniDan,
  disableTime,
  json,
}: {
  date: string | null;
  note: string;
  time: string | null;
  table: number | null;
  capacity: number | null;
  setDate: Dispatch<SetStateAction<string | null>>;
  setNote: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<string | null>>;
  setCapacity: Dispatch<SetStateAction<number | null>>;
  selectedTable: Sto | undefined;
  openingHour: OpeningHour | undefined;
  specijalniDan: SlobodanDan | undefined;
  disableTime: string[];
  json?: Record<string, MojJSON>;
}) {
  const todayLocal = new Date();
  const year = todayLocal.getFullYear();
  const month = (todayLocal.getMonth() + 1).toString().padStart(2, '0');
  const day = todayLocal.getDate().toString().padStart(2, '0');
  const formattedDateManual = `${year}-${month}-${day}`;
const newJSON =json|| selectBrojGostijuJSON;
  return (
    <div style={newJSON['res-detalji'].css || {}}>
      <h2 style={newJSON['naslov-detalji'].css || {}}>{newJSON['naslov-detalji'].text}</h2>

      <div style={newJSON['izabrani-sto'].css || {}}>
        {table
          ? renderTemplate(newJSON['izabrani-sto'].text || '', {
              tableNumber: table,
              capacity: selectedTable?.capacity || 0,
            })
          : newJSON['bez-stola'].text}
      </div>

      <DatePickerInput
        locale="sr"
        label="Datum"
        valueFormat="DD.MM.YYYY"
        minDate={formattedDateManual}
        placeholder="Izaberite datum"
        value={date}
        onChange={(d: string | null) => {
          if (d) {
            setDate(d);
            setTime(null);
          }
        }}
      />

      <div>
        <p style={newJSON['vrijeme-label'].css || {}}>{newJSON['vrijeme-label'].text}</p>
        <div className="w-full max-w-[calc(100vw-48px)] overflow-x-auto">
          {' '}
          {/* Dodato ograničenje širine */}
          {openingHour?.isOpen === false || specijalniDan?.isOpen === false ? (
            <div style={newJSON['restoran-zatvoren'].css || {}}>
              <span style={newJSON['restoran-zatvoren-label1'].css || {}}>
                {newJSON['restoran-zatvoren-label1'].text}
              </span>
              <span style={newJSON['restoran-zatvoren-label2'].css || {}}>
                {newJSON['restoran-zatvoren-label2'].text}
              </span>
            </div>
          ) : (
            <TimeGrid
              data={getTimeRange({
                startTime: `${specijalniDan ? specijalniDan.start.slice(0, 4) : openingHour?.startTime}`,
                endTime: `${specijalniDan ? specijalniDan.end.slice(0, 4) : openingHour?.endTime}`,
                interval: '00:30',
              })}
              value={time}
              onChange={setTime}
              disableTime={[...disableTime]}
              allowDeselect
            />
          )}
        </div>
      </div>

      {table && (
        <div>
          <p style={newJSON['broj-gostiju-label'].css || {}}>
            {newJSON['broj-gostiju-label'].text}
          </p>
          <SelectBrojGostiju
            tableCapacity={selectedTable?.capacity || 4}
            state={capacity || selectedTable?.capacity || 4}
            setState={setCapacity}
            json={newJSON}
          />
        </div>
      )}
      <input type="hidden" value={capacity || ''} name="numberOfPeople" />

      <div>
        <p style={newJSON['poruka-label'].css || {}}>{newJSON['poruka-label'].text}</p>
        <textarea
          style={newJSON['poruka-text'].css||{}}
          rows={3}
          placeholder={newJSON['poruka-text'].text}
          value={note || ''}
          onChange={(e) => setNote(e.target.value)}
        />
        <input type="hidden" value={note || ''} name="note" />
      </div>

      <button disabled={!table || !date || !time} style={newJSON['potvrdi'].css||{}}>
        {newJSON['potvrdi'].text}
      </button>
    </div>
  );
}
export function SelectBrojGostiju({
  tableCapacity,
  state,
  setState,
  json,
}: {
  tableCapacity: number;
  state: number;
  setState: Dispatch<SetStateAction<number | null>>;
  json?: Record<string, tip>;
}) {
  const lista = Array.from({ length: tableCapacity }, (_, i) => i + 1);
const newJSON = json || selectBrojGostijuJSON;
  return (
    <select
      value={state}
      onChange={(e) => setState?.(Number(e.target.value))}
      style={newJSON['select-broj-gostiju'].css || {}}
    >
      {lista.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
const selectBrojGostijuJSON :Record<string, tip> = {
  'select-broj-gostiju': {
    css: {
      width: '100%',
      borderRadius: '0.75rem',
      borderWidth: '1px',
      backgroundColor: 'rgb(255,255,255)',
      padding: '0.75rem',
      outline: '2px solid transparent',
      outlineOffset: '2px',
      boxShadow: '0 0 0 0px #fff,   0 0 0 calc(2px + 0px) rgb(59,130,246,0.5), 0 0 #0000',
    },
  },
  'res-detalji': {
    css: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      padding: '1rem',
      gap: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },

  'naslov-detalji': {
    css: {
      fontSize: '1.125rem',
      fontWeight: '600',
    },
    text: 'Detalji rezervacije',
  },

  'izabrani-sto': {
    css: {
      padding: '0.75rem',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
    },
    text: 'Sto {tableNumber} (kapacitet {capacity})',
  },

  'bez-stola': {
    text: 'Niste izabrali sto',
  },

  'vrijeme-label': {
    css: {
      fontSize: '0.875rem',
      color: '#4b5563',
      marginBottom: '0.5rem',
    },
    text: 'Vrijeme',
  },

  'restoran-zatvoren': {
    css: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
  },

  'restoran-zatvoren-label1': {
    css: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
    },
    text: 'Nije dostupno za rezervacije',
  },

  'restoran-zatvoren-label2': {
    css: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#9ca3af',
    },
    text: 'Restoran je zatvoren ovaj dan',
  },

  'broj-gostiju-label': {
    css: {
      fontSize: '0.875rem',
      color: '#4b5563',
      marginBottom: '0.5rem',
    },
    text: 'Broj gostiju',
  },

  'poruka-label': {
    css: {
      fontSize: '0.875rem',
      color: '#4b5563',
      marginBottom: '0.5rem',
    },
    text: 'Poruka restoranu',
  },

  'poruka-text': {
    css: {
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.5rem',
    },
    text: 'Specijalni zahtjevi...',
  },

  potvrdi: {
    css: {
      marginTop: '0.5rem',
      backgroundColor: 'black',
      color: 'white',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      borderRadius: '0.75rem',
    },
    text: 'Potvrdite rezervaciju',
  },
};
export default ReservationDetails;
