'use client';

import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Sala, Sto } from '../../_lib/Interfaces';
import { MojJSON } from '@/app/_components/AdminReservations/ReservationList';
import StoNaSali from '@/app/_components/PrezentacijaSale/StoNaSali';

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
export function CalculateValuesNeededForPresentation(sala: Sala, x: number, y: number) {
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
  return {
    containerWidth,
    containerHeight,
    scaleX,
    scaleY,
    usableWidth,
    usableHeight,
    tableSize,
    padding,
  };
}
function PrezentacijaSale({
  sala,
  stolovi,
  x = 90,
  y = 90,
  i,
  json,
  tId,
  setTable,
  setTableId,
  setCapacity,
  setTime,
  isEditing = false,
  preset,
}: {
  stolovi: Sto[];
  x?: number;
  y?: number;
  json?: Record<string, MojJSON>;
  isEditing?: boolean;
  sala: Sala;
  i: number;
  preset?: string;
  tId: number | null;
  setTable?: Dispatch<SetStateAction<number | null>>;
  setTableId?: Dispatch<SetStateAction<number | null>>;
  setCapacity?: Dispatch<SetStateAction<number | null>>;
  setTime?: Dispatch<SetStateAction<string | null>>;
}) {
  const newJSON = json || prezentacijaSaleJSON;

  const { containerWidth, containerHeight } = CalculateValuesNeededForPresentation(sala, x, y);

  return (
    <div
      id="prezentacija-sale-sala"
      style={{
        width: containerWidth,
        height: containerHeight,
        ...(newJSON['prezentacija-sale-sala']?.css || {}),
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {stolovi.map((table: Sto, k) => (
        <StoNaSali
          x={x}
          y={y}
          table={table}
          tId={tId}
          sala={sala}
          key={`${table.tableId}-${i}-${k}`}
          i={i}
          newJSON={newJSON}
          k={k}
          isEditing={isEditing}
          setTable={setTable}
          setTableId={setTableId}
          setTime={setTime}
          setCapacity={setCapacity}
        />
      ))}
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
      backgroundColor: 'rgb(249, 250, 251)',
      border: '1px solid rgb(229, 231, 235)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      flexShrink: '0',
      caretColor: 'transparent',
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '0.75rem',
      borderWidth: '1px',
      borderColor: 'rgb(229,231,235)',
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
