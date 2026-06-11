import type { MouseEventHandler } from "react";
import { FaShieldHalved } from "react-icons/fa6";
import Modal from "./Modal";
import { useModal } from "../_hooks/useModal";
import Link from "next/link";

const json = {
  "close-button": {
    css: "flex-1 px-4 py-3 text-sm font-bold  rounded-xl hover:bg-gray-100 transition-colors border-2 text-gray-700",
    text: "Odustani",
  },
  "profile-actions": {
    css: " mt-8  items-center gap-4",
  },
  "odjavi-button": {
    css: "text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer",
    text: " Odjavi se sa profila",
  },
  "obrisi-button": {
    css: "text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer",
    text: " Obrisi profil",
  },
  "privacy-policy-link": {
    css: " items-center gap-2  hover:text-indigo-500 text-[10px] font-bold uppercase tracking-widest transition-colors",
    text: "Politika Privatnosti",
    icon: "FaShieldHalved",
  },
  window: {
    css: "gap-6",
  },
  "window-naslov-odjavi": {
    css: "text-xl font-bold",
    text: "Da li ste sigurni da želite da se odjavite?",
  },
  "window-naslov-obrisi": {
    text: "Da li ste sigurni da želite trajno obrisati svoj profil?",
  },
  "window-paragraf-odjavi": {
    css: "text-sm",
    text: "Nakon odjave, moraćete ponovo da se ulogujete da biste pristupili svom nalogu.",
  },
  "window-paragraf-obrisi": {
    text: "Ova akcija se ne može poništiti.",
  },
  "window-buttons": { css: "justify-end gap-3" },
  "window-button-odjavi": {
    css: "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
    text: "Odjavi se",
  },
  "window-button-obrisi": { text: "Obriši" },
};

export function CloseButton() {
  const { close } = useModal();
  return (
    <button onClick={close} className={json["close-button"].css}>
      {json["close-button"].text}
    </button>
  );
}
export function ProfileActions({ slug }: { slug: string }) {
  return (
    <div className={`flex  flex-col ${json["profile-actions"].css}`}>
      <Modal.Open opens="odjavi">
        <button className={json["odjavi-button"].css}>
          {json["odjavi-button"].text}
        </button>
      </Modal.Open>
      <Modal.Open opens="obrisi">
        <button className={json["obrisi-button"].css}>
          {json["obrisi-button"].text}
        </button>
      </Modal.Open>
      <Link
        href={`/${slug}/privacy-policy`}
        className={`flex ${json["privacy-policy-link"].css}`}
      >
        {json["privacy-policy-link"].icon === "FaShieldHalved" && (
          <FaShieldHalved size={12} />
        )}{" "}
        {json["privacy-policy-link"].text}
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
    <div className={`flex flex-col ${json["window"].css}  `}>
      <h2 className={json["window-naslov-odjavi"].css}>
        {odjavi
          ? json["window-naslov-odjavi"].text
          : json["window-naslov-obrisi"].text}
      </h2>
      <p className={json["window-paragraf-odjavi"].css}>
        {odjavi
          ? json["window-paragraf-odjavi"].text
          : json["window-paragraf-obrisi"].text}
      </p>
      <div className={`flex ${json["window-buttons"].css}`}>
        <CloseButton />
        {href ? (
          <Link href={href}>
            <button
              onClick={handle}
              className={json["window-button-odjavi"].css}
            >
              {odjavi
                ? json["window-button-odjavi"].text
                : json["window-button-obrisi"].text}
            </button>
          </Link>
        ) : (
          <button onClick={handle} className={json["window-button-odjavi"].css}>
            {odjavi
              ? json["window-button-odjavi"].text
              : json["window-button-obrisi"].text}
          </button>
        )}
      </div>
    </div>
  );
}
