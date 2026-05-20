"use client";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Sto } from "@/app/_lib/Interfaces";

interface Props {
  table: Sto;
  scale: number;
  disab: boolean;
}
export function PropTable({ table, scale, disab }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${table.tableId.toString()}-new`,
    });
  const { setNodeRef: ref2 } = useDroppable({
    id: `${table.tableId.toString()}-new`,
  });
  const setCombinedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    ref2(node);
  };
  const size = scale * 20;
  const style = {
    // Kombinujemo inicijalnu poziciju sa dnd-kit transformacijom
    width: `${size}px`,
    height: `${size}px`,
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
    zIndex: isDragging ? 10000 : 10,
  };
  return (
    <div
      ref={disab ? setCombinedRef : null}
      style={style}
      {...(disab ? { ...listeners } : {})}
      {...attributes}
      className={`absolute m-auto rounded-lg flex border items-center justify-center text-xs font-medium ${disab ? "cursor-move" : "cursor-not-allowed"}
        ${isDragging ? " opacity-80" : ""}
       bg-white text-gray-700  hover:bg-gray-50
      `}
    >
      {table.tableNumber}
    </div>
  );
}
export function DraggableTable({ table, scale }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: table.tableId.toString(),
    });
  const { setNodeRef: ref2 } = useDroppable({
    id: `${table.tableId.toString()}-droppable`,
  });
  const setCombinedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    ref2(node);
  };
  const size = scale * 20;

  // Izračunavamo bazičnu poziciju
  const left = table.positionX * scale - size / 2;
  const top = table.positionY * scale - size / 2;

  const style = {
    // Kombinujemo inicijalnu poziciju sa dnd-kit transformacijom
    transform: CSS.Translate.toString(transform),
    left: `${left}px`,
    top: `${top}px`,
    width: `${size}px`,
    height: `${size}px`,
    touchAction: "none",
    zIndex: isDragging ? 1000 : 10,
  };

  return (
    <div
      ref={setCombinedRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`absolute rounded-lg flex items-center justify-center text-xs font-medium cursor-move 
        ${isDragging ? " opacity-80" : ""}
       bg-white text-gray-700 border hover:bg-gray-50
      `}
    >
      {table.tableNumber}
    </div>
  );
}
