"use client";
import { Restoran, Sala, Sto } from "@/app/_lib/Interfaces";
import PrezentacijaSale from "../PrezentacijaSale";
import { useEffect, useState } from "react";

function ClientLayout({
  restoran,
  stolovi,
  sala,
}: {
  restoran: Restoran;
  stolovi: Sto[];
  sala: Sala;
}) {
  const [tableId, setTableId] = useState<number | null>(null);
  const [canvasSize, setCanvasSize] = useState(350);

  // simple responsive logic

  useEffect(() => {
    const update = () => {
      // Dodajemo proveru za ekrane manje od 350px
      const width = window.innerWidth;
      const height = window.innerHeight;
      console.log(width, height);
      setCanvasSize(Math.min(height, width) * 0.75);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div>
      <PrezentacijaSale
        x={canvasSize}
        y={canvasSize}
        tId={tableId}
        setTableId={setTableId}
        sala={sala}
        stolovi={stolovi}
        i={1}
      />
    </div>
  );
}

export default ClientLayout;
