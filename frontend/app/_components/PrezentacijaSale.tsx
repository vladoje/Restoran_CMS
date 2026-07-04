"use client";
import { Dispatch, SetStateAction } from "react";
import { Sala, Sto } from "../_lib/Interfaces";
import {  MojJSON } from "./ReservationList";
import { twj } from "tw-to-css";
export function renderTemplate(
  template: string,
  data: {
    tableNumber: number;
    capacity: number;
  },
) {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key: "tableNumber" | "capacity") => `${data[key] ?? ""}`,
  );
}
function PrezentacijaSale({
  sala,
  stolovi,
  x,
  y,
  i,
  json,
  tId,
  setTable,
  setTableId,
  setCapacity,
  setTime,
}: {
  stolovi: Sto[];
  x: number;
  y: number;
  json: Record<string, MojJSON>;
  
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
      id="prezentacija-sale-sala"
    
      style={{
        width: x + 4,
        height: y + 4,
        maxWidth: "100%",
        ...twj(json["prezentacija-sale-sala"].css||"" )
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
            title={renderTemplate(
              json["prezentacija-sale-sto-reserved"].text || "",
              {
                tableNumber: table.tableNumber,
                capacity: table.capacity,
              },
            )}
            id="prezentacija-sale-sto-reserved"
          
            style={{
              left,
              top,
              width,
              height,
              ...twj(`absolute flex ${
              isReserved
                ? 
                    json["prezentacija-sale-sto-reserved"].css
                    
                  
                : 
                    json["prezentacija-sale-sto-not-reserved"].css
                    
                  
            }`)
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
