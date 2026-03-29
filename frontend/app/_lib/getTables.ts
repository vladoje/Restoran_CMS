import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Sto } from "../[restaurantSlug]/page";
export interface Sala {
  salaId: number;
  restoranId: number;
  width: number;
  height: number;
}
export async function getTable(tableId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Stolovi")
    .select("*")
    .eq("tableId", tableId)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data as Sto;
}
export async function getAllTablesFromSala(salaId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Stolovi")
    .select("*")
    .eq("salaId", salaId);

  if (error) {
    console.error(error);
    notFound();
  }
  return data as Sto[];
}
export async function getSala(restoranId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Sale")
    .select("*")
    .eq("restoranId", restoranId)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data as Sala;
}
