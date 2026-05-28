"use client";
//  return import { Link } from "react-router";
// import Input, { InputDark } from "./Input";
// import { useLogin } from "~/hooks/useLogin";
// import { MdErrorOutline } from "react-icons/md";
// import { FaMoon } from "react-icons/fa6";
// import { IoSunny } from "react-icons/io5";
// import { useDarkMode } from "~/context/DarkModeContext";
// import useMounted from "~/hooks/useMounted";

import Input from "@/app/_components/Input";
import { useState } from "react";

// import Spinner from "./Spinner";
function Page() {
  // const { email, setEmail, password, setPassword, err, handleClick } =
  //   useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDarkMode = true;
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  // const mounted = useMounted();
  // if (!mounted) return <Spinner />;
  return (
    <div
      className={`border-gray-700 text-gray-700 min-h-screen ${!isDarkMode ? " bg-background text-text border-border" : "bg-background-dark text-text-dark border-border-dark"} relative `}
    >
      <div className="flex flex-col justify-center px-6 pb-12 pt-16 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-extrabold  text-center tracking-tight">
            Dobrodošli nazad
          </h2>

          <p className="mt-2 text-center text-sm italic">
            Ulogujte se na vaš nalog
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            className={`${!isDarkMode ? "bg-secondary" : "bg-secondary-dark"} py-10 px-8 shadow-lg rounded-3xl border-2  space-y-6`}
          >
            <div>
              <Input
                label="E-mail"
                value={email}
                setValue={setEmail}
                type="email"
              />
            </div>
            <div>
              <Input
                label="Lozinka"
                value={password}
                setValue={setPassword}
                type="password"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center text-sm  font-medium">
                <input
                  type="checkbox"
                  className="h-4 w-4  focus:ring-indigo-500  rounded"
                />
                <span className="ml-2">Zapamti me</span>
              </label>
              <button
                // to="/forgot-password"
                className={`text-sm underline decoration-2 font-bold ${!isDarkMode ? " text-secondary-dark hover:text-border-dark " : " text-secondary hover:text-border "}`}
              >
                Zaboravili ste šifru?
              </button>
            </div>

            <button
              className={`w-full py-4 rounded-2xl border-2 ${!isDarkMode ? " bg-primary border-border " : "bg-primary-dark  border-border"} text-text-dark font-bold shadow-md transition-transform active:scale-95`}
            >
              Uloguj se
            </button>
            <button
              className={`w-full py-4 mt-4 rounded-2xl border-2   text-text-dark ${!isDarkMode ? " bg-primary border-border " : "bg-primary-dark  border-border"} font-bold shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-95`}
            >
              {/* <img
                src="/google-logo.svg"
                alt="Google logo"
                className="w-5 h-5"
              /> */}
              <span>Login with Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm ">
            Još nemate nalog?{" "}
            <button
              // to="/register"
              className={`font-bold underline decoration-2 ${!isDarkMode ? " text-secondary-dark hover:text-border-dark " : " text-secondary hover:text-border "} `}
            >
              Napravite nalog
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
// login username password email
// restoran ime adresa telefon bufer slug trajanje_rezervacije
// logo i tema
// header i footer i admin header i footer
// linkovi za sad uvijek isti
// dimenzije sale
// raspored stolova i izgled sale
// standardno radno vrijeme
export default Page;
