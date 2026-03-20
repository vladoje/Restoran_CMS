import Header from "@/app/_components/Header";
import { FaShieldHalved, FaLock, FaEnvelope } from "react-icons/fa6";
function Page() {
  const isDarkMode = true;
  return (
    <div
      className={`min-h-screen  ${!isDarkMode ? " bg-background text-text border-border" : "bg-background-dark text-text-dark border-border-dark"} pb-16`}
    >
      <Header />

      <main className="max-w-md mx-auto px-6 pt-10">
        {/* HEADER SEKCIJA */}
        <div className="flex flex-col items-center mb-10">
          <div
            className={`w-16 h-16 ${!isDarkMode ? "bg-secondary" : "bg-secondary-dark"} rounded-2xl flex items-center justify-center text-3xl mb-2`}
          >
            <FaShieldHalved />
          </div>
          <h1 className="text-2xl font-black  tracking-tight">
            Politika Privatnosti
          </h1>
          <p className=" text-xs mt-2 uppercase tracking-widest font-bold">
            Vaša privatnost je prioritet
          </p>
        </div>

        {/* SADRŽAJ */}
        <div className="space-y-6 animate-fadeIn">
          <section
            className={`${!isDarkMode ? "bg-surface" : "bg-surface-dark"} p-6 rounded-3xl border  shadow-sm`}
          >
            <div className="flex items-center gap-3 mb-4 ">
              <FaLock size={18} />
              <h3 className="text-sm font-black uppercase tracking-wider">
                1. Prikupljanje podataka
              </h3>
            </div>
            <p className="text-sm   leading-relaxed">
              Prikupljamo vaše ime, prezime, email adresu isključivo u svrhu
              poboljšanja vašeg iskustva
            </p>
          </section>

          <section
            className={` ${!isDarkMode ? "bg-surface" : "bg-surface-dark"} p-6 rounded-3xl border  shadow-sm`}
          >
            <div className="flex items-center gap-3 mb-4 ">
              <FaShieldHalved size={18} />
              <h3 className="text-sm font-black uppercase tracking-wider">
                2. Upotreba podataka
              </h3>
            </div>
            <p className="text-sm   leading-relaxed">
              Vaši podaci se koriste isključivo unutar našeg sistema. Nikada ih
              ne dijelimo sa trećim stranama niti ih koristimo za neželjeni
              marketing (SPAM).
            </p>
          </section>
          {/* KONTAKT BOX */}
          <section
            className={` p-5 rounded-2xl border ${!isDarkMode ? "bg-surface" : "bg-surface-dark"}`}
          >
            <div className="flex items-start gap-4">
              <div className=" mt-1">
                <FaEnvelope size={20} />
              </div>
              <div
                className={`${!isDarkMode ? "bg-surface" : "bg-surface-dark"}`}
              >
                <p className="text-xs  leading-relaxed italic font-medium">
                  Zadnja izmjena: 17.12.2025. <br />
                  Ukoliko imate pitanja, kontaktirajte nas na: <br />
                  <span className="font-bold not-italic">
                    support@restorancms.ba
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* MALI FOOTER ZA STRANICU */}
        <p className="pt-12 text-center text-[10px]">
          Korištenjem aplikacije pristajete na gore navedene uslove.
        </p>
      </main>
    </div>
  );
}

export default Page;
