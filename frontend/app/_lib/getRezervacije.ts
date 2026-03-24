import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getAllUserReservations(userId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Resezervacije")
    .select("*")
    .eq("userId", userId);
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getUserReservations(userId: number) {
  const now = new Date().toISOString();

  const { data, error } = await createClient(await cookies())
    .from("Resezervacije")
    .select("*")
    .eq("userId", userId)
    .gt("dateTime", now);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
export async function getOldUserReservations(userId: number) {
  const now = new Date().toISOString();

  const { data, error } = await createClient(await cookies())
    .from("Resezervacije")
    .select("*")
    .eq("userId", userId)
    .lt("dateTime", now);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
