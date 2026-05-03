"use client";
import { useState } from "react";
import Input, { InputNumber } from "./Input";
import { Restoran } from "../_lib/Interfaces";
import { updateSettings } from "../_lib/updateSettings";
import toast from "react-hot-toast";

function SettingsInputs({ restoran }: { restoran: Restoran }) {
  const [name, setName] = useState(restoran.name || "");
  const [address, setAddress] = useState(restoran.address || "");
  const [phone, setPhone] = useState(restoran.phone || "");
  const [buffer, setBuffer] = useState(restoran.buffer || 0);
  const [trajanjeRezervacije, setTrajanjeRezervacije] = useState(
    restoran.trajanjeRezervacije || 0,
  );
  const [slug, setSlug] = useState(restoran.slug || "");

  return (
    <form
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6"
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
          await updateSettings(formData);
          toast.success("Uspješno ažurirani podaci");
        } catch (e) {
          if (e instanceof Error) toast.error(e.message);
          else toast.error("Greška");
        }
      }}
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Podešavanja restorana
      </h2>

      <div className="grid gap-4">
        <Input
          label="Naziv restorana"
          value={name}
          // defaultValue={name}
          setValue={setName}
        />

        <Input
          label="Adresa restorana"
          value={address}
          // defaultValue={address}
          setValue={setAddress}
        />

        <Input
          label="Broj telefona"
          value={phone}
          // defaultValue={phone}
          setValue={setPhone}
        />

        <InputNumber
          label="Razmak između rezervacija (min)"
          value={buffer}
          // defaultValue={buffer}
          setValue={setBuffer}
        />

        <Input
          label="Slug (URL ime restorana)"
          value={slug}
          // defaultValue={slug}
          setValue={setSlug}
        />

        <p className="text-sm text-gray-500 -mt-2">
          Koristi se u linku:{" "}
          <span className="font-medium">/ime-restorana</span>
        </p>

        <InputNumber
          label="Trajanje rezervacije (min)"
          value={trajanjeRezervacije}
          // defaultValue={trajanjeRezervacije}
          setValue={setTrajanjeRezervacije}
        />
      </div>

      {/* hidden inputs */}
      <input type="hidden" value={restoran.restoranId} name="restoranId" />

      <input
        type="hidden"
        value={name !== restoran.name ? name : ""}
        name="name"
      />
      <input
        type="hidden"
        value={phone !== restoran.phone ? phone : ""}
        name="phone"
      />
      <input
        type="hidden"
        value={address !== restoran.address ? address : ""}
        name="address"
      />
      <input
        type="hidden"
        value={slug !== restoran.slug ? slug : ""}
        name="slug"
      />
      <input
        type="hidden"
        value={buffer !== restoran.buffer ? buffer : ""}
        name="buffer"
      />
      <input
        type="hidden"
        value={
          trajanjeRezervacije !== restoran.trajanjeRezervacije
            ? trajanjeRezervacije
            : ""
        }
        name="trajanjeRezervacije"
      />

      <button
        className="w-full bg-black text-white py-3 rounded-xl font-medium
                   hover:bg-gray-800 transition active:scale-[0.99]"
      >
        Sačuvaj promjene
      </button>
    </form>
  );
}

export default SettingsInputs;
