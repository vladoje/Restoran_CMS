import { useContext, useState, type JSX } from "react";
import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { ModalContext, ModalContextType } from "../_context/ModalContext";
import useOutsideClick from "../_hooks/useModal";

// Props tipovi
interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactNode;
  opens: string;
}

interface WindowProps {
  name: string;
  children: ReactNode;
}

// Tip za Modal sa subkomponentama
interface ModalComponentType {
  ({ children }: ModalProps): JSX.Element;
  Open: typeof Open;
  Window: typeof Window;
}

// Main Modal komponenta
const Modal: ModalComponentType = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  const contextValue: ModalContextType = {
    openName,
    close,
    open,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

// Komponenta za otvaranje modala
function Open({ children, opens }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal");

  const { open } = context;

  return (
    <span onClick={() => open(opens)} className="block w-full cursor-pointer">
      {children}
    </span>
  );
}

// Modal window komponenta
function Window({ name, children }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a Modal");

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);
  const isDarkMode = true;
  if (name !== openName) return null;

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-screen ${!isDarkMode ? "text-text" : "text-text-dark"} bg-black/30 backdrop-blur-sm z-1000 transition-all duration-500`}
    >
      <div
        ref={ref}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${!isDarkMode ? "bg-background" : "bg-background-dark"} rounded-2xl shadow-xl p-8 transition-all duration-500 w-[95%] max-w-lg`}
      >
        <button
          onClick={close}
          className={`absolute top-4 right-4 p-1 rounded-md  hover:bg-gray-100 hover:text-gray-600 transition-all `}
        >
          <HiXMark className="w-6 h-6" />
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

// Attach subkomponente
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
