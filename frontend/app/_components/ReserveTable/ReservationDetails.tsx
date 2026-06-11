import dayjs from "dayjs";
import "dayjs/locale/sr";

dayjs.locale("sr");
import { OpeningHour, SlobodanDan, Sto } from "@/app/_lib/Interfaces";
import { DatePickerInput, getTimeRange, TimeGrid } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";
import { renderTemplate } from "../PrezentacijaSale";

function ReservationDetails(
  date: string | null,
  note: string,
  time: string | null,
  table: number | null,
  capacity: number | null,
  setDate: Dispatch<SetStateAction<string | null>>,
  setNote: Dispatch<SetStateAction<string>>,
  setTime: Dispatch<SetStateAction<string | null>>,
  setCapacity: Dispatch<SetStateAction<number | null>>,
  selectedTable: Sto | undefined,
  openingHour: OpeningHour | undefined,
  specijalniDan: SlobodanDan | undefined,
  disableTime: string[],
) {
  const todayLocal = new Date();
  const year = todayLocal.getFullYear();
  const month = (todayLocal.getMonth() + 1).toString().padStart(2, "0");
  const day = todayLocal.getDate().toString().padStart(2, "0");
  const formattedDateManual = `${year}-${month}-${day}`;

  const json = {
    "res-detalji": {
      css: "bg-white rounded-2xl shadow p-4 lg:p-6  gap-5",
    },
    "naslov-detalji": {
      css: "text-lg lg:text-xl font-semibold",
      text: "Detalji rezervacije",
    },
    "izabrani-sto": {
      css: "p-3 bg-gray-100 rounded-lg text-sm",
      text: "Sto {tableNumber} (kapacitet {capacity})",
    },
    "bez-stola": {
      text: "Niste izabrali sto",
    },
    "vrijeme-label": {
      css: "text-sm text-gray-600 mb-2",
      text: "Vrijeme",
    },
    "restoran-zatvoren": {
      css: "items-center justify-center rounded-xl border border-gray-200 bg-gray-50 py-10 text-center",
    },
    "restoran-zatvoren-label1": {
      css: "text-sm font-medium text-gray-600",
      text: "Nije dostupno za rezervacije",
    },
    "restoran-zatvoren-label2": {
      css: "mt-1 text-xs text-gray-400",
      text: "Restoran je zatvoren ovaj dan",
    },
    "broj-gostiju-label": {
      css: "text-sm text-gray-600 mb-2",
      text: "Broj gostiju",
    },
    "poruka-label": {
      css: "text-sm text-gray-600 mb-2",
      text: "Poruka restoranu",
    },
    "poruka-text": {
      css: "border rounded-lg p-2",
      text: "Specijalni zahtjevi...",
    },
    potvrdi: {
      css: "mt-2 bg-black text-white py-3 rounded-xl disabled:opacity-40",
      text: "Potvrdite rezervaciju",
    },
  };

  return (
    <div className={`flex flex-col ${json["res-detalji"].css}`}>
      <h2 className={json["naslov-detalji"].css}>
        {json["naslov-detalji"].text}
      </h2>

      <div className={json["izabrani-sto"].css}>
        {table
          ? renderTemplate(json["izabrani-sto"].text, {
              tableNumber: table,
              capacity: selectedTable?.capacity || 0,
            })
          : json["bez-stola"].text}
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
        <p className={json["vrijeme-label"].css}>
          {json["vrijeme-label"].text}
        </p>
        <div className="w-full max-w-[calc(100vw-48px)] overflow-x-auto">
          {" "}
          {/* Dodato ograničenje širine */}
          {openingHour?.isOpen === false || specijalniDan?.isOpen === false ? (
            <div className={`flex flex-col ${json["restoran-zatvoren"].css}`}>
              <span className={json["restoran-zatvoren-label1"].css}>
                {json["restoran-zatvoren-label1"].text}
              </span>
              <span className={json["restoran-zatvoren-label2"].css}>
                {json["restoran-zatvoren-label2"].text}
              </span>
            </div>
          ) : (
            <TimeGrid
              data={getTimeRange({
                startTime: `${specijalniDan ? specijalniDan.start.slice(0, 4) : openingHour?.startTime}`,
                endTime: `${specijalniDan ? specijalniDan.end.slice(0, 4) : openingHour?.endTime}`,
                interval: "00:30",
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
          <p className={json["broj-gostiju-label"].css}>
            {json["broj-gostiju-label"].text}
          </p>
          <SelectBrojGostiju
            tableCapacity={selectedTable?.capacity || 4}
            state={capacity || selectedTable?.capacity || 4}
            setState={setCapacity}
          />
        </div>
      )}
      <input type="hidden" value={capacity || ""} name="numberOfPeople" />

      <div>
        <p className={json["poruka-label"].css}>{json["poruka-label"].text}</p>
        <textarea
          className={`w-full resize-none ${json["poruka-text"].css}`}
          rows={3}
          placeholder={json["poruka-text"].text}
          value={note || ""}
          onChange={(e) => setNote(e.target.value)}
        />
        <input type="hidden" value={note || ""} name="note" />
      </div>

      <button
        disabled={!table || !date || !time}
        className={`w-full  ${json["potvrdi"].css}`}
      >
        {json["potvrdi"].text}
      </button>
    </div>
  );
}
export function SelectBrojGostiju({
  tableCapacity,
  state,
  setState,
}: {
  tableCapacity: number;
  state: number;
  setState: Dispatch<SetStateAction<number | null>>;
}) {
  const lista = Array.from({ length: tableCapacity }, (_, i) => i + 1);
  const json = {
    "select-broj-gostiju": {
      css: "border rounded-xl p-3 bg-white focus:ring-2 focus:ring-black/20 focus:outline-none",
    },
  };
  return (
    <select
      value={state}
      onChange={(e) => setState?.(Number(e.target.value))}
      className={`w-full ${json["select-broj-gostiju"].css}`}
    >
      {lista.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}

export default ReservationDetails;
