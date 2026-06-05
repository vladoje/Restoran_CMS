"use client";

import Input from "@/app/_components/Input";
// import Image from "next/image";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 text-slate-800 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Naslovni dio */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-black tracking-tight text-center text-slate-900">
            Dobrodošli nazad
          </h2>
          <p className="mt-2 text-sm font-medium text-center text-slate-500 italic">
            Ulogujte se na vaš nalog
          </p>
        </div>

        {/* Glavna Kartica */}
        <div className="p-8 bg-white/90 backdrop-blur-md shadow-xl shadow-slate-200/80 rounded-3xl border border-slate-200/60 space-y-6">
          {/* Input polja */}
          <div className="space-y-4">
            <Input
              name="email"
              label="E-mail"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <Input
              label="Lozinka"
              value={password}
              setValue={setPassword}
              type="password"
              name="password"
            />
          </div>

          {/* Opcije (Zapamti me i Zaboravljena šifra) */}
          <div className="flex items-center justify-between px-0.5 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
              <span className="font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                Zapamti me
              </span>
            </label>
            <button
              type="button"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Zaboravili ste šifru?
            </button>
          </div>

          {/* Dugmići za akciju */}
          <div className="space-y-3 pt-2">
            <button
              onClick={async () => {
                const res = await signIn("credentials", {
                  email,
                  password,

                  redirect: false,
                });

                if (!res?.ok) {
                  console.log("Greška pri prijavi:", res?.error);
                  // Ovdje možeš setovati neki error state da klijent vidi poruku
                } else {
                  if (session.data?.user.role === "admin") {
                    router.push(`${session.data?.user.slug}/admin` || "");
                  } else {
                    router.push(`${session.data?.user.slug}` || "");
                  }
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold tracking-wide bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
            >
              Uloguj se
            </button>

            {/* <button
              onClick={() => signIn("google")}
              className="w-full py-3.5 px-4 rounded-xl font-semibold tracking-wide border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-3"
            >
              <Image
                width={20}
                height={20}
                src="/google-logo.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Nastavi putem Google-a</span>
            </button> */}
          </div>
        </div>

        {/* Footer kartice */}
        <p className="text-center text-sm text-slate-500">
          Još nemate nalog?{" "}
          <button
            type="button"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Napravite nalog
          </button>
        </p>
      </div>
    </div>
  );
}

export default Page;
// login username password email
// restoran ime adresa telefon bufer slug trajanje_rezervacije
// logo i tema
// header i footer i admin header i footer
// linkovi za sad uvijek isti
// dimenzije sale
// raspored stolova i izgled sale
// standardno radno vrijeme
