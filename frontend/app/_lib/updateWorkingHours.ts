"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { ActiveDays } from "../_context/store";

export async function updateWorkingHours(activeDays: ActiveDays) {
  try {
    const supabase = await createClient(await cookies());

    // 1. Pretvaramo Record/Object u niz radi lakše validacije i slanja
    const hoursArray = Object.values(activeDays);
    const length = 7;

    // 2. Osnovne validacije podataka
    if (hoursArray.length !== length) {
      throw new Error("Nedostaju podaci za sve dane u sedmici.");
    }

    const firstRestoranId = hoursArray[0].restoranId;

    // 3. Provjera logike vremena i integriteta restorana
    hoursArray.forEach((dan) => {
      if (dan.restoranId !== firstRestoranId) {
        throw new Error("Pokušaj promjene podataka za krivi restoran.");
      }

      if (dan.isOpen) {
        // Pretvaramo "HH:mm" u minute radi lakšeg poređenja
        const [startH, startM] = dan.startTime.split(":").map(Number);
        const [endH, endM] = dan.endTime.split(":").map(Number);

        const totalStart = startH * 60 + startM;
        const totalEnd = endH * 60 + endM;

        if (totalEnd <= totalStart) {
          throw new Error(
            `Radno vrijeme za dan ${dan.dayOfWeek} mora završiti nakon početka.`,
          );
        }
      }
    });

    // 4. Provjera u bazi da li ID-ovi zaista pripadaju tom restoranu (Sigurnost)
    const { data: existing, error: fetchError } = await supabase
      .from("OpeningHours")
      .select("id")
      .eq("restoranId", firstRestoranId);

    if (fetchError || !existing || existing.length !== length) {
      throw new Error("Restoran nije pronađen ili su podaci neispravni.");
    }

    const existingIds = existing.map((row) => row.id).sort();
    const incomingIds = hoursArray.map((row) => row.id).sort();

    if (JSON.stringify(existingIds) !== JSON.stringify(incomingIds)) {
      throw new Error("Neovlaštena izmjena ID-ova radnog vremena.");
    }

    // 5. Upsert podataka (pošto imamo ID-ove, Supabase će uraditi UPDATE)
    const { error: updateError } = await supabase.from("OpeningHours").upsert(
      hoursArray.map((dan) => ({
        id: dan.id,
        restoranId: dan.restoranId,
        dayOfWeek: dan.dayOfWeek,
        isOpen: dan.isOpen,
        startTime: dan.startTime,
        endTime: dan.endTime,
      })),
    );

    if (updateError) {
      console.error("Supabase Error:", updateError);
      throw new Error("Greška pri spremanju radnog vremena u bazu.");
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
