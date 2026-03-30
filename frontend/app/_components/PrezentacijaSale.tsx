"use client";
import { Dispatch, SetStateAction } from "react";
import { Sto } from "../[restaurantSlug]/page";
import { Sala } from "../_lib/getTables";

function PrezentacijaSale({
  sala,
  stolovi,
  x,
  y,
  i,
  tId,
  setTable,
  setTableId,
  setCapacity,
}: {
  stolovi: Sto[];
  x: number;
  y: number;
  sala: Sala;
  i: number;
  tId: number | null;
  setTable?: Dispatch<SetStateAction<number | null>>;
  setTableId?: Dispatch<SetStateAction<number | null>>;
  setCapacity?: Dispatch<SetStateAction<number | null>>;
}) {
  const scale = x / sala.width;

  return (
    <div
      className="relative border rounded-xl bg-gray-100"
      style={{
        width: x,
        height: y,
        maxWidth: "100%", // Dodato da spreči prelivanje
      }}
    >
      {stolovi.map((table: Sto, k) => {
        const size = scale * 20;

        const left = Math.min(
          Math.max(0, table.positionX * scale - size / 2),
          x - size,
        );

        const top = Math.min(
          Math.max(0, table.positionY * scale - size / 2),
          y - size,
        );

        const width = scale * 20;
        const height = scale * 20;
        const isReserved = table.tableId === tId;
        return (
          <div
            onClick={() => {
              setTable?.(table.tableNumber);
              setTableId?.(table.tableId);
              setCapacity?.(table.capacity);
            }}
            key={`${table.tableId}-${i}-${k}`}
            className={`absolute rounded-md flex items-center justify-center text-white text-xs
  ${isReserved ? "bg-green-500" : "bg-gray-300"}
`}
            style={{
              left,
              top,
              width,
              height,
            }}
          >
            {table.tableNumber}
          </div>
        );
      })}
    </div>
  );
}

export default PrezentacijaSale;
