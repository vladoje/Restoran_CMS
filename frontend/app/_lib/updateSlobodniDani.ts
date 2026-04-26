"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { SlobodanDan } from "./Interfaces";

export async function updateSpecialDates(
  slobodniDani: SlobodanDan[],
  restoranId: number,
) {
  try {
    const supabase = await createClient(await cookies());
    console.log(slobodniDani);
    const postojeci = slobodniDani.filter((dan) => dan.slobodanDanId !== -1);
    const novi = slobodniDani.filter((dan) => dan.slobodanDanId === -1);
    if (!Number.isInteger(restoranId)) {
      throw new Error("Neispravan restoranId");
    }
    // // 3. Provjera logike vremena i integriteta restorana
    slobodniDani.forEach((dan) => {
      if (dan.isOpen) {
        // Pretvaramo "HH:mm" u minute radi lakšeg poređenja
        const [startH, startM] = dan.start.split(":").map(Number);
        const [endH, endM] = dan.end.split(":").map(Number);

        const totalStart = startH * 60 + startM;
        const totalEnd = endH * 60 + endM;

        if (totalEnd <= totalStart) {
          throw new Error(
            `Radno vrijeme za dan ${dan.date} mora završiti nakon početka.`,
          );
        }
      }
    });
    postojeci.forEach((dan) => {
      if (dan.restoranId !== restoranId) {
        throw new Error("Pokušaj promjene podataka za krivi restoran.");
      }
    });

    // 4. Provjera u bazi da li ID-ovi zaista pripadaju tom restoranu (Sigurnost)
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const { data: existing, error: fetchError } = await supabase
      .from("SlobodniDani")
      .select("*")
      .gte("date", start.toISOString())
      .eq("restoranId", restoranId);
    // console.log(existing?.length, postojeci.length);
    if (fetchError) {
      throw new Error("Restoran nije pronađen ili su podaci neispravni.");
    }

    const existingIdsSet = new Set(existing.map((r) => r.slobodanDanId));

    const allValid = postojeci.every((row) =>
      existingIdsSet.has(row.slobodanDanId),
    );

    if (!allValid) {
      throw new Error("Neovlaštena izmjena ID-ova.");
    }
    const zaUpdate = postojeci.filter((dan) => {
      const dbDan: SlobodanDan = existing.find(
        (e: SlobodanDan) => e.slobodanDanId === dan.slobodanDanId,
      );
      //   console.log(dbDan.start, dan.start);
      return (
        dbDan.note !== dan.note ||
        dbDan.date !== dan.date ||
        dbDan.isOpen !== dan.isOpen ||
        dbDan.start !== dan.start ||
        dbDan.end !== dan.end
      );
    });
    // console.log(postojeci);
    // 5. Upsert podataka (pošto imamo ID-ove, Supabase će uraditi UPDATE)
    const { error: updateError } = await supabase.from("SlobodniDani").upsert(
      zaUpdate.map((dan) => ({
        slobodanDanId: dan.slobodanDanId,
        restoranId,
        note: dan.note,
        date: dan.date,
        isOpen: dan.isOpen,
        start: dan.start,
        end: dan.end,
      })),
    );

    if (updateError) {
      console.error("Supabase Error:", updateError);
      throw new Error(
        "Greška pri spremanju specijalnog radnog vremena u bazu.",
      );
    }

    const { error: updateError2 } = await supabase.from("SlobodniDani").insert(
      novi.map((dan) => ({
        restoranId,
        note: dan.note,
        date: dan.date,
        isOpen: dan.isOpen,
        start: dan.start,
        end: dan.end,
      })),
    );

    if (updateError2) {
      console.error("Supabase Error:", updateError2);
      throw new Error(
        "Greška pri spremanju specijalnog radnog vremena u bazu.",
      );
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
