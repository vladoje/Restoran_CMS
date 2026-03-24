import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Sto } from "../[restaurantSlug]/page";

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
