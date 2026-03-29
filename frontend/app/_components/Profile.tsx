"use client";
import { FaSave } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useProfile } from "../_hooks/useProfile";
import Modal from "@/app/_components/Modal";
import { UserAvatar } from "./UserAvatar";
import Input from "./Input";
import { ProfileActions, Window } from "./ProfileActions";

function Page({ slug }: { slug: string }) {
  const isDarkMode = true;
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
      <div
        className={`${!isDarkMode ? "bg-background text-text border-border" : "bg-background-dark text-text-dark border-border-dark"} pb-10`}
      >
        <main className="max-w-md mx-auto px-6 pt-10">
          {/* AVATAR SEKCIJA */}
          <UserAvatar username={user.name} />

          {/* FORMA ZA PODATKE */}
          <div className="space-y-4">
            {/* KORISNIČKO IME */}
            <div className={`group `}>
              <Input
                label={
                  <p className={`flex items-center gap-2`}>
                    <FaUser size={10} />
                    <span>Korisničko ime</span>
                  </p>
                }
                state={username}
                defaultValue={user.name}
                setState={setUsername}
              />
            </div>

            {/* DUGME ZA SPAŠAVANJE */}
            <button
              // onClick={handleClick}
              className={`w-full mt-4 ${!isDarkMode ? "bg-primary" : "bg-primary-dark"} text-text-dark    font-bold py-4 rounded-2xl transition-all active:scale-[0.97] flex items-center justify-center gap-3 shadow-lg cursor-pointer`}
            >
              <FaSave /> Sačuvaj izmjene
            </button>
          </div>

          <ProfileActions slug={slug} />
        </main>
      </div>
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
