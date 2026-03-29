import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Rezervacija } from "../[restaurantSlug]/page";
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
function mapRezervacija(data: DBRezervacija): Rezervacija {
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
