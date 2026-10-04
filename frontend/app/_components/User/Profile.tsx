"use client";
import { FaSave } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useProfile } from "../../_hooks/useProfile";
import Modal from "@/app/_components/Modal";
import { UserAvatar } from "../UserAvatar";
import Input from "../Input";
import { ProfileActions, Window } from "../ProfileActions";
import { twj } from "tw-to-css";
import { MojJSON } from '@/app/_lib/Interfaces';

function Page({
  slug,
  json,
isEditing=false,
}: {
  slug: string;
  json: Record<string, MojJSON>;
  isEditing?: boolean;

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
      <main id="profile" style={json['profile'].css || {}}>
        {/* AVATAR SEKCIJA */}
        <UserAvatar json={json} username={user.name} />

        {/* FORMA ZA PODATKE */}
        <div id="profile-inputs" style={json['profile-inputs'].css || {}}>
          {/* KORISNIČKO IME */}
          <div className={`group `}>
            <Input
              disabled={isEditing}
              clientJSON={json}
              label={
                <p id="profile-input-username" style={json['profile-input-username'].css || {}}>
                  {json['profile-input-username'].icon === 'FaUser' && <FaUser size={10} />}
                  <span>{json['profile-input-username'].text}</span>
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
            style={json['profile-save-button'].css || {}}
          >
            {json['profile-save-button'].icon === 'FaSave' && <FaSave />}{' '}
            {json['profile-save-button'].text}
          </button>
        </div>

        <ProfileActions isEditing={isEditing} slug={slug} json={json} />
      </main>

      {/* <Modal.Window name="obrisi"> */}
      {/* <Window handle={handleDelete} odjavi={false} /> */}
      {/* </Modal.Window> */}

      <Modal.Window isEditing={isEditing} name="odjavi">
        <Window
          handle={handleLogout}
          isEditing={isEditing}
          href="/login"
          odjavi={true}
          json={json}
        />
      </Modal.Window>
    </Modal>
  );
}

export default Page;
