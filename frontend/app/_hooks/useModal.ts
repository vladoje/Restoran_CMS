import { useContext, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { ModalContext, ModalContextType } from "../_context/ModalContext";

// Custom hook za pristup modal context-u
export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalContext.Provider");
  }
  return context;
}

// Hook za detekciju klika izvan elementa
export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  handler: () => void,
  listenCapturing = true,
): RefObject<T> {
  const ref = useRef<T>(null); // TS zna da je tip T | null

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref as RefObject<T>;
}

export default useOutsideClick;
