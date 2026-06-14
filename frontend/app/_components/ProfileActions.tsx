import type { MouseEventHandler } from "react";
import { FaShieldHalved } from "react-icons/fa6";
import Modal from "./Modal";
import { useModal } from "../_hooks/useModal";
import Link from "next/link";
import { MojJSON } from "./ReservationList";
const closeButtonJSON = {
  "close-button": {
    css: "flex-1 px-4 py-3 text-sm font-bold  rounded-xl hover:bg-gray-100 transition-colors border-2 text-gray-700",
    text: "Odustani",
  },
};

export function CloseButton(clientJSON: Record<string, MojJSON>) {
  const { close } = useModal();
  const json = clientJSON || closeButtonJSON;
  return (
    <button
      id="close-button"
      onClick={close}
      className={json["close-button"].css}
    >
      {json["close-button"].text}
    </button>
  );
}
export function ProfileActions({
  slug,
  json,
}: {
  slug: string;
  json: Record<string, MojJSON>;
}) {
  return (
    <div
      id="profile-actions"
      className={`flex  flex-col ${json["profile-actions"].css}`}
    >
      <Modal.Open opens="odjavi">
        <button
          id="profile-actions-odjavi-button"
          className={json["profile-actions-odjavi-button"].css}
        >
          {json["profile-actions-odjavi-button"].text}
        </button>
      </Modal.Open>
      <Modal.Open opens="obrisi">
        <button
          id="profile-actions-obrisi-button"
          className={json["profile-actions-obrisi-button"].css}
        >
          {json["profile-actions-obrisi-button"].text}
        </button>
      </Modal.Open>
      <Link
        id="profile-actions-privacy-policy-link"
        href={`/${slug}/privacy-policy`}
        className={`flex ${json["profile-actions-privacy-policy-link"].css}`}
      >
        {json["profile-actions-privacy-policy-link"].icon ===
          "FaShieldHalved" && <FaShieldHalved size={12} />}{" "}
        {json["profile-actions-privacy-policy-link"].text}
      </Link>
    </div>
  );
}
export function Window({
  handle,
  odjavi = false,
  href,
  json,
}: {
  handle: MouseEventHandler<HTMLButtonElement>;
  odjavi?: boolean;
  href?: string;
  json: Record<string, MojJSON>;
}) {
  return (
    <div id="window" className={`flex flex-col ${json["window"].css}  `}>
      <h2
        id="window-naslov-odjavi"
        className={json["window-naslov-odjavi"].css}
      >
        {odjavi
          ? json["window-naslov-odjavi"].text
          : json["window-naslov-obrisi"].text}
      </h2>
      <p
        id="window-paragraf-odjavi"
        className={json["window-paragraf-odjavi"].css}
      >
        {odjavi
          ? json["window-paragraf-odjavi"].text
          : json["window-paragraf-obrisi"].text}
      </p>
      <div id="window-buttons" className={`flex ${json["window-buttons"].css}`}>
        <CloseButton />
        {href ? (
          <Link href={href}>
            <button
              id="window-button-odjavi"
              onClick={handle}
              className={json["window-button-odjavi"].css}
            >
              {odjavi
                ? json["window-button-odjavi"].text
                : json["window-button-obrisi"].text}
            </button>
          </Link>
        ) : (
          <button
            id="window-button-odjavi"
            onClick={handle}
            className={json["window-button-odjavi"].css}
          >
            {odjavi
              ? json["window-button-odjavi"].text
              : json["window-button-obrisi"].text}
          </button>
        )}
      </div>
    </div>
  );
}
