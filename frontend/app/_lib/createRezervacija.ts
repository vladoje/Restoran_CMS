"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function createRezervacija(formData: FormData) {
  const restoranId = Number(formData.get("restoranId"));
  const userId = Number(formData.get("userId"));
  const tableId = Number(formData.get("tableId"));
  const date = formData.get("date");
  const time = formData.get("time");
  const buffer = Number(formData.get("buffer"));
  const durration = Number(formData.get("durration"));
  const numberOfPeople = Number(formData.get("numberOfPeople"));
  const note = formData.get("note");

  const dt = new Date(`${date}T${time}`);
  if (isNaN(dt.getTime())) throw new Error("Datum i vrijeme nisu validni");
  const dateTime = dt.toISOString();
  const minuta = dt.getHours() * 60 + dt.getMinutes();

  const status = "Pending";

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 30);

  if (dt > maxDate) {
    throw new Error("Možeš rezervisati najviše 30 dana unaprijed");
  }
  if (!date || typeof date !== "string") throw new Error("Datum je obavezan");
  if (!time || typeof time !== "string") throw new Error("Vrijeme je obavezno");
  if (isNaN(durration) || durration <= 0)
    throw new Error("Trajanje nije validno");

  if (isNaN(buffer) || buffer < 0) throw new Error("Buffer nije validan");
  if (note && typeof note !== "string")
    throw new Error("Napomena nije validna");
  if (!restoranId || !userId || !tableId) {
    throw new Error("Nedostaju podaci");
  }

  if (numberOfPeople <= 0) {
    throw new Error("Broj gostiju mora biti veći od 0");
  }

  if (!dateTime) {
    throw new Error("Datum je obavezan");
  }
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data: existing } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .eq("tableId", tableId)
    .gte("dateTime", startOfDay.toISOString())
    .lte("dateTime", endOfDay.toISOString());

  let zauzet = false;

  for (const rez of existing || []) {
    const rezDate = new Date(rez.dateTime);

    const startZauzeteMin = rezDate.getHours() * 60 + rezDate.getMinutes();

    const endZauzeteMin = startZauzeteMin + Number(rez.durration);

    if (
      startZauzeteMin < minuta + durration + buffer &&
      endZauzeteMin > minuta - buffer
    ) {
      zauzet = true;
      break;
    }
  }
  if (zauzet) {
    throw new Error("Rezervacija se preklapa sa drugom rezervacijom");
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
export async function changeReservationStatus(
  reservationId: number,
  status: string,
) {
  if (status !== "Cancelled" && status !== "Confirmed") {
    throw new Error("Pogrešan status");
  }

  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("Rezervacije")
    .update({ status })
    .eq("reservationId", reservationId)
    .select("*");

  if (error) {
    throw new Error("Greška pri update-u statusa");
  }

  if (!data || data.length === 0) {
    throw new Error("Rezervacija ne postoji");
  }
  return data;
}

// await new Promise((resolve) => setTimeout(resolve, 1000));
