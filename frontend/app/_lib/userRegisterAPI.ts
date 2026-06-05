"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { User, UserRestoran } from "./Interfaces";
import { PostgrestError } from "@supabase/supabase-js";
export async function clientRegisterAPI({
  restoranId,
  restaurantSlug,
  name,
  email,
  password,
}: {
  restoranId: number;
  restaurantSlug: string;
  name: string;
  email: string;
  password: string;
}) {
  if (!restoranId || !restaurantSlug || !name || !password || !email)
    throw new Error("403 neispravan unos");
  if (password.length < 8) throw new Error("Password too short");
  if (password.length > 64 || email.length > 64 || name.length > 64)
    throw new Error("Kraci unos molim");
  if (!isEmail(email)) throw new Error("Invalid email");
  const supabase = await createClient(await cookies());
  const { data: existing } = await supabase
    .from("Users")
    .select("email") // Dovoljno je uzeti samo email, štediš mrežni saobraćaj
    .eq("email", email)
    .maybeSingle(); // Vraća null ako ne postoji, bez bacanja greške u bazi

  if (existing) throw new Error("User with that email already exist");
  const passwordHash = await bcrypt.hash(password, 10);
  const {
    data: user,
    error,
  }: { data: User | null; error: PostgrestError | null } = await supabase
    .from("Users")
    .insert({ email, passwordHash, name, role: "user" })
    .select("*")
    .single();
  if (!user || error) throw new Error("DB didnt create a new user");

  const {
    data: newUserRestoran,
    error: error2,
  }: { data: UserRestoran | null; error: PostgrestError | null } =
    await supabase
      .from("RestaurantUsers")
      .insert({
        userId: user.userId,
        restoranId: Number(restoranId),
        role: "user",
      })
      .select("*")
      .single();

  if (error2 || !newUserRestoran) {
    console.log(error2);
    throw new Error("Database error4");
  }
}
