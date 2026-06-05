"use client";

import Input from "@/app/_components/Input";
// import Image from "next/image";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { adminRegisterAPI } from "@/app/_lib/adminRegisterAPI";
function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [restoranName, setRestoranName] = useState("");
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      if (error === "Uspjesno ste napravili svoj nalog!") {
        toast.success(error);
      } else {
        toast.error(error);
      }
    }
  }, [error]);
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
              disabled={isLoading}
              name="email"
              label="E-mail"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <Input
              disabled={isLoading}
              name="name"
              label="Vase ime"
              value={name}
              setValue={setName}
              type="text"
            />
            <Input
              disabled={isLoading}
              name="restoranName"
              label="Naziv restorana"
              value={restoranName}
              setValue={setRestoranName}
              type="text"
            />
            <Input
              disabled={isLoading}
              name="slug"
              label="Jedinstveni dio linka / Deo URL adrese (nrp. http://localhost:3000/vasRestoran/)"
              value={slug}
              setValue={setSlug}
              type="text"
            />
            <Input
              disabled={isLoading}
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
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  await adminRegisterAPI({
                    email,
                    name,
                    password,
                    slug,
                    restoranName,
                  });
                  const res = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                  });

                  if (!res?.ok) {
                    
                    
                    console.log("Greška pri prijavi:", res?.error);
                    // Ovdje možeš setovati neki error state da klijent vidi poruku
                  } else {
                    console.log("Uspješno prijavljeni:", session);
                    router.push(`/${session.data?.user.slug}/admin` );
                    
                  }
                    
                    setError("Uspjesno ste napravili svoj nalog!");
                  }
                 catch (e: unknown) {
                  // Normalize error to a string
                  const errMsg = e instanceof Error ? e.message : String(e);
                  setError(errMsg);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold tracking-wide bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150"
            >
              Kreirajte restoran
            </button>
          </div>
        </div>

        {/* Footer kartice */}
        <p className="text-center text-sm text-slate-500">
          Vec imate nalog?{" "}
          <Link
            href="/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Ulogujte se
          </Link>
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
