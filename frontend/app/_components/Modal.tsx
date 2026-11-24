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
  isEditing?: boolean;
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
  if (!context) throw new Error('Open must be used within a Modal');

  const { open } = context;

  return (
    <span onClick={() => open(opens)} className="block w-full ">
      {children}
    </span>
  );
}

function Window({ name, children, isEditing = false }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Window must be used within a Modal');

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  const modalContent = (
    <div
      className={
        isEditing
          ? 'absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-3' // p-3 daje lagan razmak od samih ivica telefona
          : 'fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-1000 transition-all duration-500'
      }
    >
      <div
        ref={ref}
        className={`bg-white rounded-2xl shadow-xl transition-all duration-300 relative ${
          isEditing
            ? 'w-full p-5' // w-full popunjava širinu telefona, sklonjen max-w i scale-90
            : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 w-[95%] max-w-lg'
        }`}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 hover:text-gray-600 transition-all"
        >
          <HiXMark className="w-5 h-5" />
        </button>
        <div className={isEditing ? 'mt-1' : 'mt-4'}>{children}</div>
      </div>
    </div>
  );

  if (isEditing) {
    return modalContent;
  }

  return createPortal(modalContent, document.body);
}
// Attach subkomponente
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
