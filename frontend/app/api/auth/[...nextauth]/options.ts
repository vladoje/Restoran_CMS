import { User, UserRestoran } from "@/app/_lib/Interfaces";
import { createClient } from "@/utils/supabase/server";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { PostgrestError } from "@supabase/supabase-js";

import { Restoran } from "../../../_lib/Interfaces";

export const options: NextAuthOptions = {
  providers: [
    Google({
      async profile(profile: GoogleProfile) {
        console.log(profile);
        const email = profile.email;
        const name = profile.name;
        const provider = "google";
        const role = "user";

        if (!email || !name) throw new Error("Google profile error");

        const cookieStore = await cookies();
        const supabase = await createClient(cookieStore); // Proslijedi već dovaćeni cookieStore

        const restoranId = cookieStore.get("restoranId")?.value;
        if (!restoranId || isNaN(Number(restoranId)))
          throw new Error("Cookie error");

        const {
          data: restoran,
          error: restoranError,
        }: { data: Restoran | null; error: PostgrestError | null } =
          await supabase
            .from("Restorani")
            .select("*")
            .eq("restoranId", restoranId)
            .single();

        if (restoranError || !restoran) throw new Error("Database error");

        const {
          data: dataUser,
          error: userError,
        }: { data: User | null; error: PostgrestError | null } = await supabase
          .from("Users")
          .select("*")
          .eq("email", email)
          .single();

        if (userError && userError.code !== "PGRST116")
          throw new Error("Database error");

        let user = dataUser;

        if (!user) {
          // ---- REGISTRACIJA NOVOG KORISNIKA ----
          const {
            data: newUser,
            error,
          }: { data: User | null; error: PostgrestError | null } =
            await supabase
              .from("Users")
              .insert({ name, email, role, provider, passwordHash: null })
              .select("*")
              .single();

          if (error || !newUser) throw new Error("Database error");

          const {
            data: newUserRestoran,
            error: error2,
          }: { data: UserRestoran | null; error: PostgrestError | null } =
            await supabase
              .from("RestaurantUsers")
              .insert({
                userId: newUser.userId,
                restoranId: Number(restoranId),
                role,
              })
              .select("*")
              .single();

          if (error2 || !newUserRestoran) throw new Error("Database error");
          user = newUser;
        } else {
          // ---- POSTOJEĆI KORISNIK ----

          // 1. Ako se prvi put loguje preko Google-a (a imao je običan nalog)
          if (!user.provider) {
            const {
              data: updatedUser,
              error,
            }: { data: User | null; error: PostgrestError | null } =
              await supabase
                .from("Users")
                .update({ provider: "google" })
                .eq("email", email)
                .select("*")
                .single();

            if (error || !updatedUser) throw new Error("Database error");
            user = updatedUser;
          }

          // 2. OVDJE TREBA STAJAO BLOK: Provjera veze sa restoranom za SVE postojeće korisnike
          const { data: existingRelation } = await supabase
            .from("RestaurantUsers")
            .select("*")
            .eq("userId", user.userId)
            .eq("restoranId", restoranId)
            .maybeSingle();

          // Ako postojeći korisnik nije povezan sa ovim restoranom, poveži ga
          if (!existingRelation) {
            const { error: linkError } = await supabase
              .from("RestaurantUsers")
              .insert({
                userId: user.userId,
                restoranId: Number(restoranId),
                role: "user",
              });

            if (linkError)
              throw new Error(
                "Database error linking existing user to new restaurant",
              );
          }
        }

        // Čistimo kolačić nakon uspješne operacije
        cookieStore.delete("restoranId");

        return {
          id: user.userId,
          email,
          role: user.role,
          name,
          provider,
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "someone@example.com",
        },
        password: {
          label: "Lozinka:",
          type: "text",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        //LOGIN
        const supabase = await createClient(await cookies());
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const {
          data: user,
          error: userError,
        }: { data: User | null; error: PostgrestError | null } = await supabase
          .from("Users")
          .select("*")
          .eq("email", email)
          .single();
        if (userError || !user) return null;
        if (!user.passwordHash) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return {
          id: user.userId,
          email: user.email,
          role: user.role,
          name: user.name,
          provider: user.provider,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as number;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};
