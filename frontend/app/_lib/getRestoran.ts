import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getRestoran(restoranId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Restorani")
    .select("*")
    .eq("restoranId", restoranId)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getRestoranWithSlug(slug: string) {
  const { data, error } = await createClient(await cookies())
    .from("Restorani")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getRestoranWithOwnerId(ownerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Restorani")
    .select("*")
    .eq("ownerId", ownerId)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
