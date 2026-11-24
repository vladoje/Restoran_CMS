import { Sala, Sto } from '@/app/_lib/Interfaces';
import { Dispatch, SetStateAction } from 'react';
import {
  CalculateValuesNeededForPresentation,
  renderTemplate,
  tip,
} from '@/app/_components/PrezentacijaSale/PrezentacijaSale';

interface StoNaSaliProps {
  table: Sto;
  newJSON: Record<string, tip>;
  sala: Sala;
  x: number;
  y: number;
  isEditing: boolean;
  setTable?: Dispatch<SetStateAction<number | null>>;
  setTableId?: Dispatch<SetStateAction<number | null>>;
  setCapacity?: Dispatch<SetStateAction<number | null>>;
  setTime?: Dispatch<SetStateAction<string | null>>;
  tId: number | null;
  i: number;
  k: number;
}
export default function StoNaSali({
  table,
  newJSON,
  sala,
  x,
  y,
  isEditing,
  setTime,
  setCapacity,
  setTable,
  setTableId,
  tId,
  i,
  k,
}: StoNaSaliProps) {
  const isReserved = table.tableId === tId;
  const padding = 0.5;
  const { scaleX, scaleY, usableWidth, usableHeight, tableSize } =
    CalculateValuesNeededForPresentation(sala, x, y);
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
      // key={`${table.tableId}-${i}-${k}`}
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
        caretColor: 'transparent',
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
}