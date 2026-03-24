import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getSite(siteId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Sajtovi")
    .select("*")
    .eq("siteId", siteId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getSiteWithHeaderId(headerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Sajtovi")
    .select("*")
    .eq("headerId", headerId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getSiteWithFooterId(footerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Sajtovi")
    .select("*")
    .eq("footerId", footerId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
