"use client";

import Input from "@/app/_components/Input";
import Image from "next/image";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { clientLoginAPI } from "@/app/_lib/userLoginAPI";
import Link from "next/link";
import toast from "react-hot-toast";
function Page({
  restaurantSlug,
  restoranId,
}: {
  restaurantSlug: string;
  restoranId: number;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      if (error === "Uspjesno ste se ulogovali na vas nalog!") {
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
                  const res = await signIn("credentials", {
                    email,
                    password,
                    url: restaurantSlug,
                    redirect: false,
                  });

                  if (!res?.ok) {
                    console.log("Greška pri prijavi:", res?.error);
                    // Ovdje možeš setovati neki error state da klijent vidi poruku
                  } else {
                    setError("Uspjesno ste se ulogovali na vas nalog!");
                    if (session.data?.user.role === "admin") {
                      router.push(`${restaurantSlug}/admin` || "");
                    } else {
                      router.push(`/${restaurantSlug}` || "");
                    }
                  }
                } catch (e: unknown) {
                  // Normalize error to a string
                  const errMsg = e instanceof Error ? e.message : String(e);
                  setError(errMsg);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold tracking-wide bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 
hover:enabled:bg-indigo-700 active:enabled:scale-[0.98] transition-all duration-150 
disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Provjera podataka...</span>
                </div>
              ) : (
                "Uloguj se"
              )}
            </button>

            <button
              disabled={isLoading}
              onClick={async () => {
                await clientLoginAPI(restoranId, restaurantSlug);
                const res = await signIn("google", {
                  callbackUrl: `/${restaurantSlug}`,
                });
                if (!res?.ok) {
                  console.log("Greška pri prijavi:", res?.error);
                  // Ovdje možeš setovati neki error state da klijent vidi poruku
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl font-semibold tracking-wide border border-slate-200 bg-white text-slate-700 shadow-sm 
hover:enabled:bg-slate-100 hover:enabled:text-slate-900 active:enabled:scale-[0.98] transition-all duration-150 
flex items-center justify-center space-x-3 
disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                width={20}
                height={20}
                src="/google-logo.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Nastavi putem Google-a</span>
            </button>
          </div>
        </div>

        {/* Footer kartice */}
        <p className="text-center text-sm text-slate-500">
          Još nemate nalog?{" "}
          <Link
            href={`/${restaurantSlug}/register`}
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Napravite nalog
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
