import Link from "next/link";
// import Image from "next/image";

// Definisanje strukture podataka koje Admin može mijenjati u bazi
interface LandingPageData {
  title?: string;
  description?: string;
  ctaRegisterText?: string;
  ctaLoginText?: string;
  heroImage?: string;
}

interface NewUserDashboardProps {
  restaurantSlug: string;
  // Sutra ćeš ovaj objekat samo proslijediti iz Supabase-a
  cmsData?: LandingPageData;
}

function NewUserDashboard({ restaurantSlug, cmsData }: NewUserDashboardProps) {
  // "Fallback" vrijednosti: Ako admin još ništa nije unio u CMS, prikaži ovaj podrazumijevani tekst
  const title = cmsData?.title || "Rezervišite Vaš sto u par klikova";
  const description =
    cmsData?.description ||
    "Dobrodošli! Pregledajte naš meni, izaberite savršen sto u sali i osigurajte svoje mjesto na vrijeme. Brzo, jednostavno i bez poziva.";
  const ctaRegisterText =
    cmsData?.ctaRegisterText || "Registruj se i rezerviši";
  const ctaLoginText = cmsData?.ctaLoginText || "Već imate nalog? Ulogujte se";
  //const heroImage = cmsData?.heroImage || "/default-restaurant-hero.jpg";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* 2. MAIN HERO SECTION (PITCH) */}
      <main className="max-w-7xl w-full mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center grow">
        {/* Lijeva strana: Tekst i CTA akcije */}
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {description}
          </p>

          {/* Akciono dugme i login link */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href={`/${restaurantSlug}/register`}
              className="px-8 py-4 bg-indigo-600 text-white font-bold tracking-wide rounded-2xl  hover:bg-indigo-700 active:scale-[0.98] transition-all duration-150 text-center"
            >
              {ctaRegisterText}
            </Link>

            <Link
              href={`/${restaurantSlug}/login`}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors text-center py-2"
            >
              {ctaLoginText}
            </Link>
          </div>
        </div>

        {/* Desna strana: Vizuelni dio (Slika restorana) */}
        <div className="relative w-full h-75 md:h-112.5 bg-slate-200 rounded-3xl overflow-hidden  border-slate-200/50">
          {/* Privremeni placeholder dok ne spojiš storage za slike */}
          <div className="absolute inset-0 bg-linear-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 italic text-sm">
            [ Ovdje se prikazuje slika restorana koju admin postavi ]
          </div>
          {/* <Image src={heroImage} fill alt="Restaurant Hero" className="object-cover" /> */}
        </div>
      </main>
    </div>
  );
}

export default NewUserDashboard;
