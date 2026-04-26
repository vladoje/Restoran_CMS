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
