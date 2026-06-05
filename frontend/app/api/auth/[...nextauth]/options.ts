//Prvo zavrsiti login za Admin-e pa onda napraviti i login za USER-e pa tek onda napraviti kredencijalni register za user-e
//napraviti pocetni register i restoran ime slug templejt i redirect na novonapravljeni templejt, popup ili ceklista sta nedostaje
//podesavanja, dodavanje podataka i
//site buider i preview

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
        const email = profile.email;
        const name = profile.name;
        const provider = "google";
        const role = "user";

        if (!email || !name) throw new Error("Google profile error");

        const cookieStore = await cookies();
        const supabase = await createClient(cookieStore); // Proslijedi već dovaćeni cookieStore

        const restoranId = cookieStore.get("restoranId")?.value;
        const slug = cookieStore.get("slug")?.value;
        if (!restoranId || isNaN(Number(restoranId)) || !slug)
          throw new Error("Cookie error");

        const {
          data: restoran,
          error: restoranError,
        }: { data: Restoran | null; error: PostgrestError | null } =
          await supabase
            .from("Restorani")
            .select("*")
            .eq("restoranId", Number(restoranId))
            .single();

        if (restoranError || !restoran) throw new Error("Database error1");

        const {
          data: dataUser,
          error: userError,
        }: { data: User | null; error: PostgrestError | null } = await supabase
          .from("Users")
          .select("*")
          .eq("email", email)
          .single();

        if (userError && userError.code !== "PGRST116")
          throw new Error("Database error2");

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

          if (error || !newUser) throw new Error("Database error3");

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

          if (error2 || !newUserRestoran) {
            console.log(error2);
            throw new Error("Database error4");
          }
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

            if (error || !updatedUser) throw new Error("Database error5");
            user = updatedUser;
          }

          // 2. OVDJE TREBA STAJAO BLOK: Provjera veze sa restoranom za SVE postojeće korisnike
          const { data: existingRelation } = await supabase
            .from("RestaurantUsers")
            .select("*")
            .eq("userId", user.userId)
            .eq("restoranId", Number(restoranId))
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
        cookieStore.delete("slug");

        return {
          id: user.userId,
          email,
          role: user.role,
          name,
          provider,
          restoranId: Number(restoranId),
          slug,
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
        url: {
          label: "Lozinka:",
          type: "text",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        //LOGIN
        const supabase = await createClient(await cookies());
        if (!credentials) {
          console.log("1");
          return null;
        }
        const { email, password, url } = credentials;
        if (!email || !password) {
          console.log("2");
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
        if (userError || !user) {
          console.log("3");
          return null;
        }
        if (!user.passwordHash) {
          console.log("4");
          return null;
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          console.log("4");
          return null;
        }

        const {
          data: UserRestoran,
          error: error2,
        }: { data: UserRestoran[] | null; error: PostgrestError | null } =
          await supabase
            .from("RestaurantUsers")
            .select("*")
            .eq("userId", user.userId);
        ////////// PREPRAVITI KADA BUDE POTREBA ZA 1 ADMIN VISE RESTORANA

        if (error2 || !UserRestoran) throw new Error("Database error7");

        let restoran: Restoran | null = null;
        if (!url) {
          const {
            data: restoran1,
            error: error3,
          }: { data: Restoran | null; error: PostgrestError | null } =
            await supabase
              .from("Restorani")
              .select("*")
              .eq("restoranId", UserRestoran[0].restoranId) //1 admin 1 restoran
              .single();

          if (error3 || !restoran1) throw new Error("Database error8");
          restoran = restoran1;
        } else {
          const {
            data: restoran2,
            error: error4,
          }: { data: Restoran | null; error: PostgrestError | null } =
            await supabase
              .from("Restorani")
              .select("*")
              .eq("slug", url)
              .single();

          if (error4 || !restoran2) throw new Error("Database error9");
          restoran = restoran2;
        }
        return {
          id: user.userId,
          email: user.email,
          role: user.role,
          name: user.name,
          restoranId: restoran.restoranId,
          slug: restoran.slug,
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
        token.restoranId = user.restoranId;
        token.slug = user.slug;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.userId as number;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.slug = token.slug as string;
        session.user.restoranId = token.restoranId as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
};
