"use client";
import { FaSave } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useProfile } from "../_hooks/useProfile";
import Modal from "@/app/_components/Modal";
import { UserAvatar } from "./UserAvatar";
import Input from "./Input";
import { ProfileActions, Window } from "./ProfileActions";
import { convertCSS, MojJSON } from "./ReservationList";

function Page({
  slug,
  json,
  globalStyles,
}: {
  slug: string;
  json: Record<string, MojJSON>;
  globalStyles: Record<string, string>;
}) {
  const {
    username,
    setUsername,
    user,
    // handleClick,
    // handleDelete,
    handleLogout,
  } = useProfile();

  return (
    <Modal>
      <main
        id="profile"
        className={`max-w-md ${convertCSS(json["profile"].css, globalStyles)}`}
      >
        {/* AVATAR SEKCIJA */}
        <UserAvatar json={json} username={user.name} />

        {/* FORMA ZA PODATKE */}
        <div
          id="profile-inputs"
          className={convertCSS(json["profile-inputs"].css, globalStyles)}
        >
          {/* KORISNIČKO IME */}
          <div className={`group `}>
            <Input
              clientJSON={json}
              label={
                <p
                  id="profile-input-username"
                  className={`flex ${convertCSS(json["profile-input-username"].css, globalStyles)}`}
                >
                  {json["profile-input-username"].icon === "FaUser" && (
                    <FaUser size={10} />
                  )}
                  <span>{json["profile-input-username"].text}</span>
                </p>
              }
              value={username}
              setValue={setUsername}
            />
          </div>

          {/* DUGME ZA SPAŠAVANJE */}
          <button
            // onClick={handleClick}
            id="profile-save-button"
            className={`w-full flex ${convertCSS(json["profile-save-button"].css, globalStyles)}`}
          >
            {json["profile-save-button"].icon === "FaSave" && <FaSave />}{" "}
            {json["profile-save-button"].text}
          </button>
        </div>

        <ProfileActions slug={slug} json={json} />
      </main>

      {/* <Modal.Window name="obrisi"> */}
      {/* <Window handle={handleDelete} odjavi={false} /> */}
      {/* </Modal.Window> */}

      <Modal.Window name="odjavi">
        <Window handle={handleLogout} href="/login" odjavi={true} json={json} />
      </Modal.Window>
    </Modal>
  );
}

export default Page;
