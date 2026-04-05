import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getAllSpecialDates(restoranId: number) {
  const { data, error } = await createClient(await cookies())
    .from("SlobodniDani")
    .select("*")
    .eq("restoranId", restoranId);

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getOpeningHours(restoranId: number) {
  const { data, error } = await createClient(await cookies())
    .from("OpeningHours")
    .select("*")
    .eq("restoranId", restoranId);

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
