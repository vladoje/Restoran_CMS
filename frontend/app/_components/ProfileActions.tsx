import type { MouseEventHandler } from "react";
import { FaShieldHalved } from "react-icons/fa6";
import Modal from "./Modal";
import { useModal } from "../_hooks/useModal";
import Link from "next/link";

export function CloseButton() {
  const isDarkMode = true;
  const { close } = useModal();
  return (
    <button
      onClick={close}
      className={`flex-1 px-4 py-3 text-sm font-bold  rounded-xl hover:bg-gray-100 transition-colors border-2 text-text-dark ${!isDarkMode ? "bg-primary border-border" : "bg-primary-dark border-background-dark"}`}
    >
      Odustani
    </button>
  );
}
export function ProfileActions({ slug }: { slug: string }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <Modal.Open opens="odjavi">
        <button className="text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer">
          Odjavi se sa profila
        </button>
      </Modal.Open>
      <Modal.Open opens="obrisi">
        <button className="text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer">
          Obrisi profil
        </button>
      </Modal.Open>
      <Link
        href={`/${slug}/privacy-policy`}
        className="flex items-center gap-2  hover:text-indigo-500 text-[10px] font-bold uppercase tracking-widest transition-colors"
      >
        <FaShieldHalved size={12} /> Politika Privatnosti
      </Link>
    </div>
  );
}
export function Window({
  handle,
  odjavi = false,
  href,
}: {
  handle: MouseEventHandler<HTMLButtonElement>;
  odjavi?: boolean;
  href?: string;
}) {
  return (
    <div className={`flex flex-col gap-6  `}>
      <h2 className="text-xl font-bold ">
        {odjavi
          ? " Da li ste sigurni da želite da se odjavite?"
          : " Da li ste sigurni da želite trajno obrisati svoj profil?"}
      </h2>
      <p className=" text-sm">
        {odjavi
          ? " Nakon odjave, moraćete ponovo da se ulogujete da biste pristupili svom nalogu."
          : " Ova akcija se ne može poništiti."}
      </p>
      <div className="flex justify-end gap-3">
        <CloseButton />
        {href ? (
          <Link href={href}>
            <button
              onClick={handle}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              {odjavi ? " Odjavi se" : "Obriši"}
            </button>
          </Link>
        ) : (
          <button
            onClick={handle}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            {odjavi ? " Odjavi se" : "Obriši"}
          </button>
        )}
      </div>
    </div>
  );
}
