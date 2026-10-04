import { useEffect, useState } from 'react';

export function useCanvasSize(parentRef: React.RefObject<HTMLElement | null>) {
  const [canvasSize, setCanvasSize] = useState(350);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const update = () => {
      const width = parent.clientWidth;

      if (width < 350) {
        setCanvasSize(width - 40);
      } else if (width < 640) {
        setCanvasSize(260);
      } else if (width < 1024) {
        setCanvasSize(350);
      } else {
        setCanvasSize(500);
      }
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(parent);

    return () => observer.disconnect();
  }, [parentRef]);

  return canvasSize;
}
