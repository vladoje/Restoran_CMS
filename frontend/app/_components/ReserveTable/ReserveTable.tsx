"use client";

import PrezentacijaSale from "../PrezentacijaSale";
import { useState } from "react";
import { createRezervacija } from "../../_lib/createRezervacija";
import {
  OpeningHour,
  Restoran,
  Rezervacija,
  Sala,
  SlobodanDan,
  Sto,
  User,
} from "../../_lib/Interfaces";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCanvasSize } from "./useCanvasSize";
import { useDisableTime, useOpeningHour } from "./useDisableTime";
import ReservationDetails from "./ReservationDetails";
import { convertCSS, MojJSON } from "../ReservationList";

function ReserveTable({
  sala,
  json,
  globalStyles,
  allTables,
  user,
  restoran,
  rezervacije,
  isAdmin = false,
  specialDates,
  openingHours,
}: {
  sala: Sala;
  json: Record<string, MojJSON>;
  globalStyles: Record<string, string>;
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
  const [note, setNote] = useState<string>("");

  const selectedTable = allTables.find((t) => t.tableId === tableId);

  // responsive size for sala
  const canvasSize = useCanvasSize();

  const disableTime = useDisableTime(rezervacije, restoran, date, tableId);

  const { specijalniDan, openingHour } = useOpeningHour(
    specialDates,
    openingHours,
    date,
  );

  return (
    <form
      onSubmit={async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
          await createRezervacija(formData);
          toast.success("Uspjesno rezervisan termin");
          if (!isAdmin) {
            router.push(`/${restoran.slug}`);
          } else {
            router.refresh();
            setDate(null);
            setTime(null);
            setTable(null);
            setTableId(null);
            setCapacity(null);
            setNote("");
          }
        } catch (e) {
          if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("Greška");
          }
        }
      }}
    >
      <div
        id="reserve-table"
        className={`min-h-screen max-w-7xl  ${convertCSS(json["reserve-table"].css, globalStyles)}`}
      >
        {/* GRID */}
        <div
          id="reserve-table-grid"
          className={`grid grid-cols-1 lg:grid-cols-2 ${convertCSS(json["reserve-table-grid"].css, globalStyles)}`}
        >
          {/* LEFT */}
          <div
            className={convertCSS(
              json["reserve-table-odaberi-sto"].css,
              globalStyles,
            )}
          >
            {" "}
            {/* Dodat overflow-hidden */}
            <h2
              id="reserve-table-odaberi-sto-naslov"
              className={convertCSS(
                json["reserve-table-odaberi-sto-naslov"].css,
                globalStyles,
              )}
            >
              {json["reserve-table-odaberi-sto-naslov"].text}
            </h2>
            <input type="hidden" value={tableId || ""} name="tableId" />
            <div className="w-full flex justify-center">
              {" "}
              {/* Izbačen min-w-75 */}
              <PrezentacijaSale
                sala={sala}
                json={json}
                globalStyles={globalStyles}
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
            {ReservationDetails(
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
            )}
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

export default ReserveTable;
