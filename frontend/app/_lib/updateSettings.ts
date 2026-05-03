"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
export async function updateSettings(formData: FormData) {
  const restoranId = Number(formData.get("restoranId"));
  const userId = 2;
  const buffer = Number(formData.get("buffer"));
  const trajanjeRezervacije = Number(formData.get("trajanjeRezervacije"));

  if (buffer && (buffer < 0 || buffer > 120))
    throw new Error("Buffer nije validan");
  if (
    trajanjeRezervacije &&
    (trajanjeRezervacije < 0 || trajanjeRezervacije > 720)
  )
    throw new Error("Trajanje rezervacije nije validano");

  const rawName = formData.get("name");
  const rawAddress = formData.get("address");
  const rawPhone = formData.get("phone");
  const rawSlug = formData.get("slug");

  const name = typeof rawName === "string" ? rawName : undefined;
  const address = typeof rawAddress === "string" ? rawAddress : undefined;
  const phone = typeof rawPhone === "string" ? rawPhone : undefined;
  const slug = typeof rawSlug === "string" ? rawSlug : undefined;

  if (name && (typeof name !== "string" || name.slice(0, 64) !== name))
    throw new Error("Napomena nije validna");
  if (phone && (typeof phone !== "string" || phone.slice(0, 64) !== phone))
    throw new Error("Napomena nije validna");
  if (
    address &&
    (typeof address !== "string" || address.slice(0, 128) !== address)
  )
    throw new Error("Napomena nije validna");
  if (slug && (typeof slug !== "string" || slug.slice(0, 32) !== slug))
    throw new Error("Napomena nije validna");

  if (!restoranId || !userId) {
    throw new Error("Nedostaju podaci");
  }

  const supabase = createClient(await cookies());
  const { data: existing } = await supabase
    .from("Restorani")
    .select("*")
    .eq("ownerId", userId)
    .eq("restoranId", restoranId)
    .single();
  if (!existing || existing.length === 0) {
    throw new Error("Ne postoji restoran ili nije tvoj");
  }

  const insertData: Settings = {};

  if (buffer) insertData.buffer = buffer;
  if (trajanjeRezervacije) insertData.trajanjeRezervacije = trajanjeRezervacije;
  if (name) insertData.name = name;
  if (phone) insertData.phone = phone;
  if (address) insertData.address = address;
  if (slug) insertData.slug = slug;

  const { data, error } = await supabase
    .from("Restorani")
    .update(insertData)
    .eq("ownerId", userId)
    .eq("restoranId", restoranId)
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Greška pri kreiranju rezervacije");
  }

  return data;
}
interface Settings {
  buffer?: number;
  trajanjeRezervacije?: number;
  name?: string;
  phone?: string;
  address?: string;
  slug?: string;
}
