"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { validNewDimensions } from "../_components/Layout/FloorPlan";

export async function updateSala(
  width: number,
  height: number,
  restoranId: number,
  salaId: number,
) {
  try {
    const supabase = await createClient(await cookies());

    if (!Number.isInteger(restoranId)) {
      throw new Error("Neispravan restoranId");
    }
    if (!Number.isInteger(salaId)) {
      throw new Error("Neispravan salaId");
    }
    if (!Number.isInteger(width) || width < 0) {
      throw new Error("Neispravan width");
    }
    if (!Number.isInteger(height) || height < 0) {
      throw new Error("Neispravan height");
    }
    const { data: existing, error: fetchError2 } = await supabase
      .from("Stolovi")
      .select("*")
      .eq("salaId", salaId);
    // console.log(existing?.length, postojeci.length);
    if (fetchError2) {
      throw new Error("Sala nije pronađena ili su podaci neispravni.");
    }
    if (!validNewDimensions(existing, width, height)) {
      throw new Error(
        "Ne mozete promijeniti velicinu tako da izostavite sto izvan sale",
      );
    }
    // 4. Provjera u bazi da li ID-ovi zaista pripadaju tom restoranu (Sigurnost)

    const { data: sala, error: fetchError } = await supabase
      .from("Sale")
      .select("*")
      .eq("salaId", salaId)
      .eq("restoranId", restoranId)
      .single();
    // console.log(existing?.length, postojeci.length);
    if (fetchError) {
      throw new Error("Restoran nije pronađen ili su podaci neispravni.");
    }

    if (!sala) {
      throw new Error("Neovlaštena izmjena");
    }

    // 5. Upsert podataka (pošto imamo ID-ove, Supabase će uraditi UPDATE)
    const { error: updateError } = await supabase
      .from("Sale")
      .update({
        salaId,
        restoranId,
        width,
        height,
      })
      .eq("salaId", salaId);

    if (updateError) {
      console.error("Supabase Error:", updateError);
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
