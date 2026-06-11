import { useEffect, useState } from "react";

export function useCanvasSize() {
  const [canvasSize, setCanvasSize] = useState(350);

  // simple responsive logic

  useEffect(() => {
    const update = () => {
      // Dodajemo proveru za ekrane manje od 350px
      const width = window.innerWidth;
      if (width < 350) {
        setCanvasSize(width - 40); // Oduzimamo padding roditelja (20px sa svake strane)
      } else if (width < 640) {
        setCanvasSize(260);
      } else if (width < 1024) {
        setCanvasSize(350);
      } else {
        setCanvasSize(500);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return canvasSize;
}
