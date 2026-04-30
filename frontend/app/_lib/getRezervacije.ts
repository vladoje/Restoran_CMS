import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Sto, User } from "./Interfaces";

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
  user?: User;
  table?: Sto;
}
export interface RezervacijaPopunjena {
  reservationId: number;
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: Date;
  durration: string;
  numberOfPeople: number;
  note: string;
  status: string;
  user?: User;
  table?: Sto;
}
function mapRezervacija(data: DBRezervacija): RezervacijaPopunjena {
  return {
    ...data,
    dateTime: new Date(data.dateTime),
  };
}
export async function getAllUserReservations(userId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function getUserReservations(userId: number) {
  const now = new Date().toISOString();

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .eq("userId", userId)
    .gt("dateTime", now);

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function getOldUserReservations(userId: number) {
  const now = new Date().toISOString();

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .eq("userId", userId)
    .lt("dateTime", now);

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}

export async function get30dayReservationsForTables(tableIds: number[]) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 30);

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select("*")
    .in("tableId", tableIds) // ✅ KLJUČ
    .gte("dateTime", start.toISOString())
    .lt("dateTime", end.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function get30dayReservationsForRestoran(restoranId: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 30);

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select(
      `    *,
    user:Users(*),
    table:Stolovi(*)`,
    )
    .eq("restoranId", restoranId)
    .gte("dateTime", start.toISOString())
    .lt("dateTime", end.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}

export async function getOldReservationsForRestoran(restoranId: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select(
      `    *,
    user:Users(*),
    table:Stolovi(*)`,
    )
    .eq("restoranId", restoranId)
    .lt("dateTime", start.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function get7dayReservationsForRestoran(restoranId: number) {
  const now = new Date();
  // const danas = now.toISOString().slice(0, 10);

  let day = now.getDay();
  if (day === 0) day = 7;

  const diff = day - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);

  // const defaultDate = monday.toISOString().slice(0, 10);
  // const start = new Date();

  const end = new Date(monday);
  end.setDate(end.getDate() + 7);
  end.setHours(0, 0, 0, 0);
  // console.log(monday, end);

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select(
      `    *,
    user:Users(*),
    table:Stolovi(*)`,
    )
    .eq("restoranId", restoranId)
    .gte("dateTime", monday.toISOString())
    .lt("dateTime", end.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function getTodayReservationsForRestoran(restoranId: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select(
      `    *,
    user:Users(*),
    table:Stolovi(*)`,
    )
    .eq("restoranId", restoranId)
    .gte("dateTime", start.toISOString())
    .lt("dateTime", end.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
export async function getReservationsInProgressForRestoran(
  restoranId: number,
  trajanjeRezervacije: number,
) {
  const start = new Date();
  start.setMinutes(start.getMinutes() - trajanjeRezervacije);

  const end = new Date();
  end.setMinutes(end.getMinutes() + trajanjeRezervacije); //nisam siguran za dodavanje minuta na kraj, definitivno treba dodati
  //ako je neko dosao prije rezervacije ali da li to treba biti cijela rezervacija poslije,
  //ne moze niko biti potvrdjen da je dosao ako mu rezervacija krece tek za 2h npr

  const { data, error } = await createClient(await cookies())
    .from("Rezervacije")
    .select(
      `    *,
    user:Users(*),
    table:Stolovi(*)`,
    )
    .eq("restoranId", restoranId)
    .eq("status", "Confirmed")
    .gte("dateTime", start.toISOString())
    .lt("dateTime", end.toISOString());

  if (error) {
    console.error(error);
    notFound();
  }

  return data?.map(mapRezervacija) ?? [];
}
