"use client";
import { Dispatch, SetStateAction } from "react";
import { Sala, Sto } from "../_lib/Interfaces";

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
  setTime,
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
  setTime?: Dispatch<SetStateAction<string | null>>;
}) {
  const scale = x / sala.width;

  return (
    <div
      className="mx-auto relative border border-gray-200 rounded-xl bg-gray-100"
      style={{
        width: x + 4,
        height: y + 4,
        maxWidth: "100%",
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
              setTime?.(null);
            }}
            key={`${table.tableId}-${i}-${k}`}
            title={`Sto ${table.tableNumber} (${table.capacity} mjesta)`}
            className={`absolute rounded-lg flex items-center justify-center 
  text-xs font-medium cursor-pointer transition-all 
  ${
    isReserved
      ? "bg-green-500 text-white shadow-md scale-105"
      : "bg-white text-gray-700 border hover:bg-gray-100 hover:scale-105"
  }
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
