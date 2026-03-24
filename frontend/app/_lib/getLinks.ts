import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
export async function getLink(linkId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Links")
    .select("*")
    .eq("linkId", linkId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getLinkWithHeaderId(headerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Links")
    .select("*")
    .eq("headerId", headerId);

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getLinkWithFooterId(footerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Links")
    .select("*")
    .eq("footerId", footerId);

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getHeader(headerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Headers")
    .select("*")
    .eq("headerId", headerId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
export async function getFooter(footerId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Footers")
    .select("*")
    .eq("footerId", footerId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
