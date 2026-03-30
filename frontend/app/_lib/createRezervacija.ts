import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export interface DBRezervacija {
  reservationId: number;
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: string;
  durration: string;
  numberOfPeople: number;
  note: string;
  status: string;
}

export async function createRezervacija({
  restoranId,
  userId,
  tableId,
  dateTime,
  durration,
  numberOfPeople,
  note,
}: {
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: string;
  durration: string;
  numberOfPeople: number;
  note: string;
}) {
  const status = "Pending";
  if (!restoranId || !userId || !tableId) {
    throw new Error("Nedostaju podaci");
  }

  if (numberOfPeople <= 0) {
    throw new Error("Broj gostiju mora biti veći od 0");
  }

  if (!dateTime) {
    throw new Error("Datum je obavezan");
  }
  const { data: existing } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .eq("tableId", tableId)
    .eq("dateTime", dateTime);

  if (existing && existing.length > 0) {
    throw new Error("Sto je već rezervisan");
  }
  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .insert([
      {
        restoranId,
        userId,
        tableId,
        dateTime,
        durration,
        numberOfPeople,
        note,
        status,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Greška pri kreiranju rezervacije");
  }

  return data;
}
