//popraviti sta ne radi i poboljsati sigurnost posX i posY orientation i capacity <0 i ...
"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Sala, Sto } from "./Interfaces";
import { PostgrestError } from "@supabase/supabase-js";
import { margina } from "../_components/Layout/ClientLayout";
const maxCapacity = 128;
export async function updateStolovi(
  stolovi: Sto[],
  restoranId: number,
  salaId: number,
) {
  try {
    const supabase = await createClient(await cookies());

    // const postojeci = stolovi.filter((sto) => sto.salaId !== -1);
    // const novi = stolovi.filter((sto) => sto.salaId === -1);

    if (!Number.isInteger(restoranId)) {
      throw new Error("Neispravan restoranId");
    }
    if (!Number.isInteger(salaId)) {
      throw new Error("Neispravan salaId");
    }

    // 4. Provjera u bazi da li ID-ovi zaista pripadaju tom restoranu (Sigurnost)

    const {
      data: sala,
      error: fetchError,
    }: { data: Sala | null; error: PostgrestError | null } = await supabase
      .from("Sale")
      .select("*")
      .eq("restoranId", restoranId)
      .eq("salaId", salaId)
      .single();
    // console.log(existing?.length, postojeci.length);
    if (fetchError) {
      throw new Error("Restoran nije pronađen ili su podaci neispravni.");
    }

    if (!sala) {
      throw new Error("Neovlaštena izmjena");
    }

    const { data: existing, error: fetchError2 } = await supabase
      .from("Stolovi")
      .select("*")
      .eq("salaId", salaId);
    // console.log(existing?.length, postojeci.length);
    if (fetchError2) {
      throw new Error("Sala nije pronađena ili su podaci neispravni.");
    }

    const existingIdsSet = new Set(existing.map((r) => r.tableId));
    const postojeci = stolovi.filter((sto) => existingIdsSet.has(sto.tableId));
    const novi = stolovi.filter((sto) => !existingIdsSet.has(sto.tableId));
    postojeci.forEach((sto) => {
      if (sto.salaId !== salaId) {
        throw new Error("Pokušaj promjene podataka za krivi restoran.");
      }
    });
    const allValid = postojeci.every((row) => existingIdsSet.has(row.tableId));

    if (!allValid) {
      throw new Error("Neovlaštena izmjena ID-ova.");
    }

    const width = sala.width;
    const height = sala.height;
    let areValid = true;
    stolovi.forEach((sto) => {
      if (!Number.isInteger(sto.tableNumber)) areValid = false;
      if (!Number.isInteger(sto.capacity)) areValid = false;
      if (!Number.isInteger(sto.orientation)) areValid = false;
      if (!Number.isFinite(sto.positionX)) areValid = false;
      if (!Number.isFinite(sto.positionY)) areValid = false;
      if (sto.capacity < 0 || sto.capacity > maxCapacity) areValid = false;
      if (sto.orientation < 0 || sto.orientation > 360) areValid = false;
      if (
        20 / 2 + margina > sto.positionX ||
        sto.positionX > width - 20 / 2 - margina
      )
        areValid = false;
      if (
        20 / 2 + margina > sto.positionY ||
        sto.positionY > height - 20 / 2 - margina
      )
        areValid = false;
    });

    if (!areValid) {
      throw new Error("Nemoguci podaci stolova");
    }
    const zaUpdate = postojeci.filter((sto) => {
      const dbSto: Sto = existing.find((e: Sto) => e.tableId === sto.tableId);
      if (!dbSto) return false;
      return (
        dbSto.capacity !== sto.capacity ||
        dbSto.orientation !== sto.orientation ||
        Math.abs(dbSto.positionX - sto.positionX) > 0.001 ||
        Math.abs(dbSto.positionY - sto.positionY) > 0.001 ||
        dbSto.tableNumber !== sto.tableNumber
      );
    });

    // 5. Upsert podataka (pošto imamo ID-ove, Supabase će uraditi UPDATE)
    const { error: updateError } = await supabase.from("Stolovi").upsert(
      zaUpdate.map((sto) => ({
        tableId: sto.tableId,
        salaId,
        capacity: sto.capacity,
        orientation: sto.orientation,
        positionX: sto.positionX,
        positionY: sto.positionY,
        tableNumber: sto.tableNumber,
      })),
    );

    if (updateError) {
      console.error("Supabase Error:", updateError);
      throw new Error("Greška pri spremanju stola u bazu.");
    }

    const { error: updateError2 } = await supabase.from("Stolovi").insert(
      novi.map((sto) => ({
        salaId,
        capacity: sto.capacity,
        orientation: sto.orientation,
        positionX: sto.positionX,
        positionY: sto.positionY,
        tableNumber: sto.tableNumber,
      })),
    );

    if (updateError2) {
      console.error("Supabase Error:", updateError2);
      throw new Error("Greška pri spremanju stola u bazu.");
    }
    return { success: true, timestamp: Date.now() };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Greška",
      timestamp: Date.now(),
    };
  }
}
