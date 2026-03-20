"use client";
import Header from "@/app/_components/Header";
import Input from "@/app/_components/Input";
import Modal from "@/app/_components/Modal";
import { ProfileActions, Window } from "@/app/_components/ProfileActions";
import { UserAvatar } from "@/app/_components/UserAvatar";
import { useProfile } from "@/app/_hooks/useProfile";
import { FaSave } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

function Page() {
  const isDarkMode = true;
  const {
    username,
    setUsername,
    user,
    handleClick,
    handleDelete,
    handleLogout,
  } = useProfile();
  return (
    <Modal>
      <div
        className={`min-h-screen ${!isDarkMode ? "bg-background text-text border-border" : "bg-background-dark text-text-dark border-border-dark"} pb-10`}
      >
        <Header />

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
              onClick={handleClick}
              className={`w-full mt-4 ${!isDarkMode ? "bg-primary" : "bg-primary-dark"} text-text-dark  hover:bg-slate-800  font-bold py-4 rounded-2xl transition-all active:scale-[0.97] flex items-center justify-center gap-3 shadow-lg cursor-pointer`}
            >
              <FaSave /> Sačuvaj izmjene
            </button>
          </div>

          <ProfileActions />
        </main>
      </div>
      <Modal.Window name="obrisi">
        <Window handle={handleDelete} odjavi={false} />
      </Modal.Window>

      <Modal.Window name="odjavi">
        <Window handle={handleLogout} href="/login" odjavi={true} />
      </Modal.Window>
    </Modal>
  );
}

export default Page;
