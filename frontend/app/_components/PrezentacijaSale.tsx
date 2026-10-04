'use client';

import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Sala, Sto } from '../_lib/Interfaces';
import { MojJSON } from './ReservationList';

export function renderTemplate(
  template: string,
  data: {
    tableNumber: number;
    capacity: number;
  },
) {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key: 'tableNumber' | 'capacity') => `${data[key] ?? ''}`,
  );
}

function PrezentacijaSale({
  sala,
  stolovi,
  x = 90,
  y,
  i,
  json,
  tId,
  setTable,
  setTableId,
  setCapacity,
  setTime,
  isEditing = false,
}: {
  stolovi: Sto[];
  x?: number;
  y?: number;
  json?: Record<string, MojJSON>;
  isEditing?: boolean;
  sala: Sala;
  i: number;
  tId: number | null;
  setTable?: Dispatch<SetStateAction<number | null>>;
  setTableId?: Dispatch<SetStateAction<number | null>>;
  setCapacity?: Dispatch<SetStateAction<number | null>>;
  setTime?: Dispatch<SetStateAction<string | null>>;
}) {
  const newJSON = json || prezentacijaSaleJSON;

  // Izračunaj proporcije sale
  const aspectRatio = sala.height && sala.width ? sala.height / sala.width : 1;
  const containerWidth = x;
  const containerHeight = y || Math.round(x * aspectRatio);

  // Unutrašnji padding u pikselima (da sto uz samu ivicu ne lepi za ram)
  const padding = 0.5;

  // Korisna površina unutar kojo se iscrtavaju stolovi
  const usableWidth = containerWidth - padding * 2;
  const usableHeight = containerHeight - padding * 2;

  // Faktor skale na osnovu korisne površine
  const scaleX = usableWidth / (sala.width || 100);
  const scaleY = usableHeight / (sala.height || 100);

  // Dinamička dimenzija stola
  const tableSize = Math.max(10, Math.round(usableWidth * 0.16));

  return (
    <div
      id="prezentacija-sale-sala"
      style={{
        width: containerWidth,
        height: containerHeight,
        position: 'relative',
        borderRadius: '0.625rem',
        backgroundColor: 'rgb(249, 250, 251)',
        border: '1px solid rgb(229, 231, 235)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexShrink: 0,
        ...(newJSON['prezentacija-sale-sala']?.css || {}),
      }}
    >
      {stolovi.map((table: Sto, k) => {
        const isReserved = table.tableId === tId;

        // Pozicioniranje sa uračunatim padding-om od ivica
        const left =
          padding +
          Math.min(Math.max(0, table.positionX * scaleX - tableSize / 2), usableWidth - tableSize);

        const top =
          padding +
          Math.min(Math.max(0, table.positionY * scaleY - tableSize / 2), usableHeight - tableSize);

        const tooltipText = renderTemplate(
          newJSON['prezentacija-sale-sto-reserved']?.text || 'Sto {tableNumber} ({capacity} mesta)',
          {
            tableNumber: table.tableNumber,
            capacity: table.capacity,
          },
        );

        return (
          <div
            key={`${table.tableId}-${i}-${k}`}
            onClick={() => {
              if (isEditing) return;
              setTable?.(table.tableNumber);
              setTableId?.(table.tableId);
              setCapacity?.(table.capacity);
              setTime?.(null);
            }}
            title={tooltipText}
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${tableSize}px`,
              height: `${tableSize}px`,
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: tableSize < 16 ? '9px' : '11px',
              fontWeight: 600,
              lineHeight: 1,
              caretColor: "transparent",
              boxSizing: 'border-box',
              cursor: isEditing ? 'default' : 'pointer',
              zIndex: isReserved ? 10 : 1,
              ...(isReserved
                ? {
                    backgroundColor: 'rgb(16, 185, 129)',
                    color: '#ffffff',
                    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)',
                    ...(newJSON['prezentacija-sale-sto-reserved']?.css || {}),
                  }
                : {
                    backgroundColor: 'rgb(229, 231, 235)',
                    color: 'rgb(107, 114, 128)',
                    opacity: 0.6,
                    ...(newJSON['prezentacija-sale-sto-not-reserved']?.css || {}),
                  }),
            }}
          >
            {tableSize >= 14 ? table.tableNumber : null}
          </div>
        );
      })}
    </div>
  );
}

export interface tip {
  css?: CSSProperties;
  text?: string;
}

const prezentacijaSaleJSON: Record<string, tip> = {
  'prezentacija-sale-sala': {
    css: {
      position: 'relative',
      borderRadius: '0.625rem',
      backgroundColor: 'rgb(249, 250, 251)',
      borderWidth: '1px',
      borderColor: 'rgb(229, 231, 235)',
    },
  },
  'prezentacija-sale-sto-reserved': {
    text: 'Sto {tableNumber} ({capacity} mesta)',
    css: {
      backgroundColor: 'rgb(16, 185, 129)',
      color: '#ffffff',
      fontWeight: '600',
    },
  },
  'prezentacija-sale-sto-not-reserved': {
    css: {
      backgroundColor: 'rgb(229, 231, 235)',
      color: 'rgb(107, 114, 128)',
    },
  },
};

export default PrezentacijaSale;
