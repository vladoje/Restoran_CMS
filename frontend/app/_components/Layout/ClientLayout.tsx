//dodati mijenjanje velicine stolova
// tekst i ljepsi UI za dodavanje stola
// i promjenu oblika stola i mozda prop objekte (cappacity=0)

"use client";
import { useState, useEffect, useRef, useActionState } from "react";
import { TbZoomReset } from "react-icons/tb";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  rectIntersection,
} from "@dnd-kit/core";
import { Restoran, Sala, Sto } from "@/app/_lib/Interfaces";
import { FloorPlan } from "./FloorPlan";

import toast from "react-hot-toast";
import { PropTable } from "./DraggableTable";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { updateStolovi } from "@/app/_lib/updateStolovi";
export const margina = 1;
export default function ClientLayout({
  restoran,
  stolovi: inicijalniStolovi,
  sala,
}: {
  restoran: Restoran;
  stolovi: Sto[];
  sala: Sala;
}) {
  const [stolovi, setStolovi] = useState(inicijalniStolovi);

  const router = useRouter();

  const [canvasSizeX, setCanvasSizeX] = useState<number | null>(null);
  const [canvasSizeY, setCanvasSizeY] = useState<number | null>(null);
  const isReady = canvasSizeX && canvasSizeY;

  const zoomRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  // console.log(zoom);

  const [width, setWidth] = useState<number>(sala.width);
  const [height, setHeight] = useState<number>(sala.height);

  const floorRef = useRef<null | HTMLDivElement>(null);
  const sizeRef = useRef({ width, height });

  useEffect(() => {
    const update = () => {
      setCanvasSizeX(window.innerWidth * 0.75);
      setCanvasSizeY(window.innerHeight * 0.75);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = Math.min(canvasSizeX! / width, canvasSizeY! / height);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, collisions } = event;
    if (!active) return;

    const planColl = collisions?.find(
      (coll) => coll.id === "floor-plan-droppable",
    );
    if (!planColl) return toast.error("Stavite sto unutar sale");
    const validColl = collisions?.filter(
      (coll) =>
        coll.id !== "floor-plan-droppable" &&
        coll.id !== `${active.id}-droppable`,
    );

    if (validColl?.length) return toast.error("Ne mozete staviti sto na sto");

    if (!String(active.id).endsWith("-new")) {
      setStolovi((prev) =>
        prev.map((sto) => {
          if (sto.tableId.toString() === active.id) {
            return {
              ...sto,
              positionX: minAndMax(
                sto.positionX + delta.x / scale,
                20 / 2 + margina,
                width - 20 / 2 - margina,
              ),
              positionY: minAndMax(
                sto.positionY + delta.y / scale,
                20 / 2 + margina,
                height - 20 / 2 - margina,
              ),
            };
          }
          return sto;
        }),
      );
    } else {
      setStolovi((prev) => {
        const rect = floorRef.current!.getBoundingClientRect();

        const dropX = active.rect.current?.translated?.left ?? 0;
        const dropY = active.rect.current?.translated?.top ?? 0;

        const posX = dropX - rect.left;
        const posY = dropY - rect.top;
        const size = scale * 20;

        nextTable.positionX = minAndMax(
          (posX + size / 2) / scale,
          20 / 2 + margina,
          width - 20 / 2 - margina,
        ); //20 je zasad magican broj trebam dodati table.sizeX i Y
        nextTable.positionY = minAndMax(
          (posY + size / 2) / scale,
          20 / 2 + margina,
          height - 20 / 2 - margina,
        );
        return [...prev, nextTable];
      });
    }
  };

  const nextTable: Sto = {
    ...stolovi.sort((a, b) => a.tableNumber - b.tableNumber).at(-1),
  } as Sto;
  nextTable.tableNumber = nextTable.tableNumber + 1;
  nextTable.tableId = nextTable.tableId + 1;
  nextTable.salaId = -1;

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const el = zoomRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      // const mouseX = ((e.clientX - rect.left) / width) * 100;
      // const mouseY = ((e.clientY - rect.top) / height) * 100;
      setOffsetX(((e.clientX - rect.left) / (width * scale)) * 100);
      setOffsetY(((e.clientY - rect.top) / (height * scale)) * 100);
      const factor = 1.1;
      const delta = Math.sign(e.deltaY);

      setZoom((prevZoom) => {
        const newZoom = delta > 0 ? prevZoom / factor : prevZoom * factor;
        return newZoom <= 1 ? 1 : newZoom;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isReady]);

  const [state, formAction, isPending] = useActionState(
    async () => updateStolovi(stolovi, restoran.restoranId, sala.salaId),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      toast.success("Uspješno sačuvano");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  // Senzori
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isPending ? { distance: 999999 } : { distance: 5 },
    }),
  );
  if (!isReady) return null;

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="ml-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold  hover:bg-blue-700 active:scale-[0.97] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sacuvaj promjene u izgledu sale
      </button>
      <DndContext
        collisionDetection={rectIntersection}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={() => (sizeRef.current = { width, height })}
      >
        <div className="p-8">
          <div
            className="mx-auto overscroll-none relative border border-gray-200 rounded-xl bg-gray-100  "
            style={{
              width: width * scale,
              height: height * scale,
              overflow: "hidden",
            }}
            ref={zoomRef}
          >
            <div
              style={{
                transform: ` scale(${zoom})`,
                transformOrigin: `${offsetX}% ${offsetY}%`, // OVO JE KLJUČNO
              }}
            >
              <Modal>
                <FloorPlan
                  salaId={sala.salaId}
                  restoranId={restoran.restoranId}
                  ref={floorRef}
                  setStolovi={setStolovi}
                  stolovi={stolovi}
                  canvasSizeX={canvasSizeX}
                  canvasSizeY={canvasSizeY}
                  setWidth={setWidth}
                  setHeight={setHeight}
                  width={width}
                  height={height}
                  scale={scale}
                />{" "}
              </Modal>
            </div>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="absolute bottom-1 left-1 cursor-zoom-out opacity-60 hover:opacity-100"
            >
              <TbZoomReset size={16} />
            </button>
          </div>
        </div>
        <div onDoubleClick={() => console.log("a")}>
          <div
            className="mx-auto p-1  relative border border-gray-200 rounded-xl bg-gray-100  "
            style={{
              width: canvasSizeX + 8,
              height: scale * 20 + 8,
            }}
          >
            <PropTable disab={zoom === 1} scale={scale} table={nextTable} />
          </div>
        </div>
      </DndContext>
    </form>
  );
}
export function minAndMax(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
