"use client";
import { FaSave } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useProfile } from "../_hooks/useProfile";
import Modal from "@/app/_components/Modal";
import { UserAvatar } from "./UserAvatar";
import Input from "./Input";
import { ProfileActions, Window } from "./ProfileActions";

function Page({ slug }: { slug: string }) {
  const {
    username,
    setUsername,
    user,
    // handleClick,
    // handleDelete,
    handleLogout,
  } = useProfile();
  const json = {
    profile: {
      css: "mx-auto px-6 pt-10",
    },
    inputs: {
      css: "space-y-4",
    },
    "input-username": {
      css: "items-center gap-2",
      text: "Korisničko ime",
      icon: "FaUser",
    },
    "save-button": {
      css: "mt-4 font-bold py-4 rounded-2xl transition-all active:scale-[0.97]  items-center justify-center gap-3 shadow-lg cursor-pointer",
      text: "Sacuvaj promjene",
      icon: "FaSave",
    },
  };
  return (
    <Modal>
      <main className={`max-w-md ${json["profile"].css}`}>
        {/* AVATAR SEKCIJA */}
        <UserAvatar username={user.name} />

        {/* FORMA ZA PODATKE */}
        <div className={json["inputs"].css}>
          {/* KORISNIČKO IME */}
          <div className={`group `}>
            <Input
              label={
                <p className={`flex ${json["input-username"].css}`}>
                  {json["input-username"].icon === "FaUser" && (
                    <FaUser size={10} />
                  )}
                  <span>{json["input-username"].text}</span>
                </p>
              }
              value={username}
              setValue={setUsername}
            />
          </div>

          {/* DUGME ZA SPAŠAVANJE */}
          <button
            // onClick={handleClick}
            className={`w-full flex ${json["save-button"].css}`}
          >
            {json["save-button"].icon === "FaSave" && <FaSave />}{" "}
            {json["save-button"].text}
          </button>
        </div>

        <ProfileActions slug={slug} />
      </main>

      {/* <Modal.Window name="obrisi"> */}
      {/* <Window handle={handleDelete} odjavi={false} /> */}
      {/* </Modal.Window> */}

      <Modal.Window name="odjavi">
        <Window handle={handleLogout} href="/login" odjavi={true} />
      </Modal.Window>
    </Modal>
  );
}

export default Page;
