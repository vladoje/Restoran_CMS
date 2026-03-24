import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getUser(userId: number) {
  const { data, error } = await createClient(await cookies())
    .from("Users")
    .select("*")
    .eq("userId", userId)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
