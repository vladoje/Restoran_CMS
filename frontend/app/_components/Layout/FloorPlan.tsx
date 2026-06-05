"use client";
import { useDroppable } from "@dnd-kit/core";
import { Sto } from "@/app/_lib/Interfaces";
import { DraggableTable } from "./DraggableTable";
import { Dispatch, Ref, SetStateAction, useContext, useState } from "react";
import { IoMdResize } from "react-icons/io";
import Modal from "../Modal";
import { InputNumber } from "../Input";
import toast from "react-hot-toast";
import { ModalContext } from "@/app/_context/ModalContext";
import { useRouter } from "next/navigation";

import { updateSala } from "@/app/_lib/updateSala";

interface Props {
  stolovi: Sto[];
  restoranId: number;
  salaId: number;
  canvasSizeX: number;
  canvasSizeY: number;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  setStolovi: Dispatch<SetStateAction<Sto[]>>;

  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
  scale: number;
  ref: Ref<HTMLDivElement>;
}

export function FloorPlan({
  stolovi,
  // canvasSizeX,
  // canvasSizeY,
  setStolovi,
  setWidth,
  setHeight,
  width,
  height,
  scale,
  ref,
  restoranId,
  salaId,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: "floor-plan-droppable",
  });
  const [width2, setWidth2] = useState<number>(width);
  const [height2, setHeight2] = useState<number>(height);
  const [selectedSto, setSelectedSto] = useState<Sto | null>(null);
  const [capacity, setCapacity] = useState<number>(0);
  const [orderNumber, setOrderNumber] = useState<number>(0);
  // console.log(selectedSto);
  const context = useContext(ModalContext);
  const router = useRouter();
  if (!context) throw new Error("Open must be used within a Modal");
  const { open, close } = context;

  return (
    <div ref={ref}>
      <div
        ref={setNodeRef}
        style={{
          width: width * scale,
          height: height * scale,
        }}
      >
        {stolovi.length? stolovi.map((table) => (
          <div
            key={table.tableId}
            onDoubleClick={() => {
              setSelectedSto(table);
              setCapacity(table.capacity);
              setOrderNumber(table.tableNumber)
              open("tableForm");
            }}
          >
            <DraggableTable disab={true} table={table} scale={scale} />
          </div>
        )):null}

        <div
          onClick={() => open("resize")}
          className="absolute bottom-1 right-1 cursor-se-resize opacity-60 hover:opacity-100"
        >
          <IoMdResize size={16} />
        </div>

        <Modal.Window name="tableForm">
          <div className="text-gray-900 bg-white">
            <p>Sto broj {selectedSto?.tableNumber}</p>
            <br />
            <InputNumber
              label="Podesite broj gostiju koji mogu stati za sto"
              value={capacity}
              setValue={setCapacity}
            />
            <div className="mt-4">

             <InputNumber
              label="Podesite redni broj stola"
              value={orderNumber}
              setValue={setOrderNumber}
              />
              </div>
            <button
              onClick={() => {
                setStolovi((stolovi) => {
                  return [
                    ...stolovi.filter(
                      (sto) => sto.tableId !== selectedSto!.tableId,
                    ),
                    { ...selectedSto!, capacity,tableNumber:orderNumber },
                  ];
                });
                toast.success("Uspješno sačuvano");
                close();
              }}
              className="mt-2 w-full rounded-lg bg-gray-900 text-white py-2 text-sm font-medium 
             hover:bg-gray-800 transition active:scale-[0.98]"
            >
              Sačuvaj promjene
            </button>
            <button
            onClick={() => {
                setStolovi((stolovi) => {
                  return [
                    ...stolovi.filter(
                      (sto) => sto.tableId !== selectedSto!.tableId,
                    ),
                  ];
                });
                toast.success("Uspjesno obrisan sto");
                close();
              }}
              className="mt-4 w-full rounded-lg bg-red-800 text-white py-2 text-sm font-medium 
             hover:bg-red-600 transition active:scale-[0.98]"
            >Obrisi sto</button>
          </div>
        </Modal.Window>
        <Modal.Window name="resize">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!validNewDimensions(stolovi, width2, height2)) {
                setHeight2(height);
                setWidth2(width);
                toast.error(
                  "Ne mozete promijeniti velicinu tako da izostavite sto izvan sale",
                );
                return;
              }

              setHeight(height2);
              setWidth(width2);

              const res = await updateSala(width2, height2, restoranId, salaId);

              if (res.success) {
                toast.success("Uspjesno promjenjene dimenzije sale");
                close();
                router.refresh();
              } else {
                toast.error(res?.error || "");
              }
            }}
            className="text-gray-900 bg-white"
          >
            <InputNumber
              label="Podesite sirinu sale"
              value={width2}
              setValue={setWidth2}
            />
            <InputNumber
              label="Podesite duzinu sale"
              value={height2}
              setValue={setHeight2}
            />
            <button
              className="mt-4 w-full rounded-lg bg-gray-900 text-white py-2 text-sm font-medium 
             hover:bg-gray-800 transition active:scale-[0.98]"
            >
              Sačuvaj promjene
            </button>
          </form>
        </Modal.Window>
      </div>
    </div>
  );
}
export function validNewDimensions(
  stolovi: Sto[],
  width: number,
  height: number,
): boolean {
  let isValid = true;
  const margina = 1;
  stolovi.forEach((sto) => {
    if (
      sto.positionX < 20 / 2 + margina ||
      sto.positionX > width - 20 / 2 - margina
    )
      isValid = false;
    if (
      sto.positionY < 20 / 2 + margina ||
      sto.positionY > height - 20 / 2 - margina
    )
      isValid = false;
  });
  return isValid;
}
//  20 / 2 + margina,
//   sala.height - 20 / 2 - margina,
