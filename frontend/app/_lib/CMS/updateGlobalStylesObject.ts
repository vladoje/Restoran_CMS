"use server";

import {
  globalStylesObj,
  isTailwindColor,
} from "@/app/_context/CMSContext/colorPaletteStore";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function updateGlobalStylesObject(
  globalStyles: globalStylesObj,
  restoranId: number,
  siteId: number,
  userId: number,
) {
  try {
    const supabase = await createClient(await cookies());

    if (!Number.isInteger(restoranId)) {
      throw new Error("Neispravan restoranId");
    }
    if (!Number.isInteger(userId)) {
      throw new Error("Neispravan userId");
    }

    const { error: fetchError2 } = await supabase
      .from("Restorani")
      .select("*")
      .eq("restoranId", restoranId)
      .eq("ownerId", userId)
      .eq("siteId", siteId)
      .single();

    if (fetchError2) {
      throw new Error("Restoran nije pronađena ili su podaci neispravni.");
    }

    const bojeZaValidaciju = [
      globalStyles.bg,
      globalStyles.primary,
      globalStyles.secondary,
      globalStyles.surface,
      globalStyles.text,
    ];

    // .every() vraća true samo ako sve boje prođu isTailwindColor
    const sveBojeValidne = bojeZaValidaciju.every((boja) =>
      isTailwindColor(boja),
    );

    if (!sveBojeValidne) {
      throw new Error("Jedna ili više izabranih boja nisu podržane.");
    }

    const { error: updateError } = await supabase
      .from("Sajtovi")
      .update({
        backgroundColor: globalStyles.bg,
        primaryColor: globalStyles.primary,
        secondaryColor: globalStyles.secondary,
        surfaceColor: globalStyles.surface,
        textColor: globalStyles.text,
      })
      .eq("siteId", siteId);

    if (updateError) {
      console.error("Supabase Error:", updateError);
      throw new Error("Greška pri spremanju promjena u bazu.");
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
