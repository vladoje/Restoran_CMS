"use client";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import PrezentacijaSale from "../PrezentacijaSale";
import { Sala, Sto } from "@/app/_lib/Interfaces";
import { SelectBrojGostiju } from "../ReserveTable";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createRezervacija } from "@/app/_lib/createRezervacija";
import { Restoran } from "../../_lib/Interfaces";
import Link from "next/link";

function TwoButtons({
  sala,
  stolovi,
  restoran,
}: {
  sala: Sala;
  stolovi: Sto[];
  restoran: Restoran;
}) {
  const [tableId, setTableId] = useState<null | number>(null);
  const [capacity, setCapacity] = useState<null | number>(null);
  const [note, setNote] = useState<string>("");
  const [canvasSize, setCanvasSize] = useState(512);
  const selectedTable = stolovi.find((t) => t.tableId === tableId);
  // simple responsive logic
  const router = useRouter();
  useEffect(() => {
    const update = () => {
      // Dodajemo proveru za ekrane manje od 350px
      const width = window.innerWidth;
      if (width > 538) {
        setCanvasSize(512 - 32); // Oduzimamo padding roditelja (20px sa svake strane)
      } else {
        setCanvasSize(Math.round(width * 0.95) - 32);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  console.log(canvasSize);
  return (
    <Modal>
      <div className="flex gap-4 my-6 ">
        {/* QUICK: odmah rezervacija */}
        <Modal.Open opens="smjesti">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition-all duration-200 active:scale-95">
            🔀 Smjesti goste
          </button>
        </Modal.Open>

        {/* NORMAL: otvara formu */}

        <Link
          href={`/${restoran.slug}/admin/rezervisi`}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-xl shadow-sm transition-all duration-200 active:scale-95"
        >
          ➕ Nova rezervacija
        </Link>
      </div>
      <Modal.Window name="smjesti">
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
          <div className="space-y-6 text-black overflow-y-auto max-h-[60vh] my-auto">
            {/* MAPA SALE */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Odaberite sto</p>

              <div className="rounded-xl overflow-hidden border border-gray-300">
                <PrezentacijaSale
                  sala={sala}
                  stolovi={stolovi}
                  x={canvasSize}
                  y={canvasSize}
                  i={1}
                  tId={tableId}
                  setTableId={setTableId}
                  setCapacity={setCapacity}
                />
              </div>
            </div>

            {/* BROJ GOSTIJU */}
            {tableId && (
              <div className=" space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Broj gostiju
                </p>

                <SelectBrojGostiju
                  tableCapacity={selectedTable?.capacity || 4}
                  state={capacity || selectedTable?.capacity || 4}
                  setState={setCapacity}
                />
              </div>
            )}

            {/* PORUKA */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Poruka restoranu
              </p>

              <textarea
                className="w-full border rounded-xl p-3 resize-none 
        focus:ring-2 focus:ring-black/20 focus:outline-none"
                rows={3}
                placeholder="Specijalna poruka..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              {/* <input type="hidden" value={note || ""} name="note" /> */}
            </div>

            {/* CTA */}
            <button
              disabled={!tableId}
              className="w-full mt-2 bg-black text-white py-3 rounded-xl 
      hover:bg-gray-900 transition 
      disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Potvrdite rezervaciju
            </button>
          </div>
          <input type="hidden" value={note || ""} name="note" />
          <input
            type="hidden"
            value={restoran.restoranId || ""}
            name="restoranId"
          />
          <input type="hidden" value={restoran.buffer || ""} name="buffer" />
          <input
            type="hidden"
            value={restoran.trajanjeRezervacije || ""}
            name="durration"
          />
          <input type="hidden" value={capacity || 0} name="numberOfPeople" />
          <input type="hidden" value={tableId || ""} name="tableId" />
          <input type="hidden" value={2} name="userId" />
          <input
            type="hidden"
            value={new Date().toISOString().slice(0, 10)}
            name="date"
          />
          <input type="hidden" value={getTimeSlotForNow()} name="time" />
        </form>
      </Modal.Window>
    </Modal>
  );
}
export function getTimeSlotForNow() {
  const sati = new Date().getHours();
  const sati2 = new Date();
  sati2.setHours(sati + 1);

  const minuta = new Date().getMinutes();
  if (minuta < 5) return `${sati < 10 ? "0" : ""}${sati}:00:00`;
  if (minuta < 35) return `${sati < 10 ? "0" : ""}${sati}:30:00`;
  return `${sati2.getHours() < 10 ? "0" : ""}${sati2.getHours()}:00:00`;
}
export default TwoButtons;
