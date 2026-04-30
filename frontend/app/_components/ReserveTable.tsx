"use client";

import dayjs from "dayjs";
import "dayjs/locale/sr";

dayjs.locale("sr");

import { DatePickerInput, getTimeRange, TimeGrid } from "@mantine/dates";

import PrezentacijaSale from "./PrezentacijaSale";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import { createRezervacija } from "../_lib/createRezervacija";
import { Restoran, Rezervacija, Sala, Sto, User } from "../_lib/Interfaces";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ReserveTable({
  sala,
  allTables,
  user,
  restoran,
  rezervacije,
}: {
  sala: Sala;
  allTables: Sto[];
  user: User;
  rezervacije: Rezervacija[];
  restoran: Restoran;
}) {
  const router = useRouter();
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [table, setTable] = useState<number | null>(null);
  const [tableId, setTableId] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  const todayLocal = new Date();
  const year = todayLocal.getFullYear();
  const month = (todayLocal.getMonth() + 1).toString().padStart(2, "0");
  const day = todayLocal.getDate().toString().padStart(2, "0");
  const formattedDateManual = `${year}-${month}-${day}`;

  const selectedTable = allTables.find((t) => t.tableId === tableId);

  // responsive size for sala
  const [canvasSize, setCanvasSize] = useState(350);

  // simple responsive logic

  useEffect(() => {
    const update = () => {
      // Dodajemo proveru za ekrane manje od 350px
      const width = window.innerWidth;
      if (width < 350) {
        setCanvasSize(width - 40); // Oduzimamo padding roditelja (20px sa svake strane)
      } else if (width < 640) {
        setCanvasSize(260);
      } else if (width < 1024) {
        setCanvasSize(350);
      } else {
        setCanvasSize(500);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const disableTime = useMemo(() => {
    return rezervacije
      .filter((rez) => rez.tableId === tableId)
      .filter((rez) => {
        const localDate = new Date(rez.dateTime);
        return localDate.toISOString().slice(0, 10) === date;
      })
      .map((rez) => {
        const localDate = new Date(rez.dateTime);

        let startMinutes =
          localDate.getMinutes() -
          restoran.buffer -
          restoran.trajanjeRezervacije;
        let startHours = localDate.getHours();
        while (startMinutes < 0) {
          startMinutes += 60;
          startHours -= 1;
        }

        let endMinutes =
          localDate.getMinutes() +
          restoran.buffer +
          restoran.trajanjeRezervacije;
        let endHours = localDate.getHours();
        while (endMinutes >= 60) {
          endMinutes -= 60;
          endHours += 1;
        }

        const startTime = `${String(startHours).padStart(2, "0")}:${String(startMinutes).padStart(2, "0")}`;
        const endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
        return getTimeRange({
          startTime,
          endTime,
          interval: "00:05",
        });
      })
      .flat();
  }, [
    rezervacije,
    tableId,
    date,
    restoran.buffer,
    restoran.trajanjeRezervacije,
  ]);

  return (
    <form
      onSubmit={async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
          await createRezervacija(formData);
          toast.success("Uspjesno rezervisan termin");
          router.push(`/${restoran.slug}`);
        } catch (e) {
          if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("Greška");
          }
        }
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="bg-white rounded-2xl shadow p-4 lg:p-6 overflow-hidden">
              {" "}
              {/* Dodat overflow-hidden */}
              <h2 className="text-lg lg:text-xl font-semibold mb-4">
                Odaberi sto
              </h2>
              <input type="hidden" value={tableId || ""} name="tableId" />
              <div className="w-full flex justify-center">
                {" "}
                {/* Izbačen min-w-75 */}
                <PrezentacijaSale
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
            <div className="bg-white rounded-2xl shadow p-4 lg:p-6 flex flex-col gap-5">
              <h2 className="text-lg lg:text-xl font-semibold">
                Detalji rezervacije
              </h2>

              <div className="p-3 bg-gray-100 rounded-lg text-sm">
                {table
                  ? `Sto ${table} (kapacitet ${selectedTable?.capacity})`
                  : "Niste izabrali sto"}
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
                <p className="text-sm text-gray-600 mb-2">Vrijeme</p>
                <div className="w-full max-w-[calc(100vw-48px)] overflow-x-auto">
                  {" "}
                  {/* Dodato ograničenje širine */}
                  <TimeGrid
                    data={getTimeRange({
                      startTime: "10:00",
                      endTime: "21:00",
                      interval: "00:30",
                    })}
                    value={time}
                    onChange={setTime}
                    disableTime={disableTime}
                    allowDeselect
                  />
                </div>
              </div>

              {table && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Broj gostiju</p>
                  <SelectBrojGostiju
                    tableCapacity={selectedTable?.capacity || 4}
                    state={capacity || selectedTable?.capacity || 4}
                    setState={setCapacity}
                  />
                </div>
              )}
              <input
                type="hidden"
                value={capacity || ""}
                name="numberOfPeople"
              />

              <div>
                <p className="text-sm text-gray-600 mb-1">Poruka restoranu</p>
                <textarea
                  className="w-full border rounded-lg p-2 resize-none"
                  rows={3}
                  placeholder="Specijalni zahtjevi..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <input type="hidden" value={note || ""} name="note" />
              </div>

              <button
                disabled={!table || !date || !time}
                className="mt-2 bg-black text-white py-3 rounded-xl disabled:opacity-40 w-full"
              >
                Potvrdite rezervaciju
              </button>
            </div>
          </div>
        </div>
        <input type="hidden" value={user.userId || ""} name="userId" />
        <input type="hidden" value={sala.restoranId || ""} name="restoranId" />
        <input type="hidden" value={date || ""} name="date" />
        <input type="hidden" value={time || ""} name="time" />
        <input type="hidden" value={restoran.buffer || ""} name="buffer" />
        <input
          type="hidden"
          value={restoran.trajanjeRezervacije}
          name="durration"
        />
      </div>
    </form>
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

  return (
    <select
      value={state}
      onChange={(e) => setState?.(Number(e.target.value))}
      className="w-full border rounded-xl p-3 bg-white 
focus:ring-2 focus:ring-black/20 focus:outline-none"
    >
      {lista.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}

export default ReserveTable;
