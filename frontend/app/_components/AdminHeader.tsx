/*
KASNIJE IMLEMENTIRATI DA LINKOVI MOGU BITI IKONICE SA SLICICAMA, KADA BUDEM RADIO SA UPLOADOM SLIKA PREKO BUCKETA...
KASNIJE IMPLEMENTIRATI LIGHT I DARK MODE

*/

export const links = [
  {
    text: "Pocetna",
    url: "/test/admin",
  },
  {
    text: "Politika privatnosti",
    url: "/test/admin/privacy-policy",
  },
  {
    text: "Radno vrijeme",
    url: "/test/admin/working-hours",
  },
  {
    text: "Raspored stolova",
    url: "/test/admin/layout",
  },
  {
    text: "Rezervacije",
    url: "/test/admin/reservations",
  },
  {
    text: "Podesavanja",
    url: "/test/admin/settings",
  },
  {
    text: "Rezervisi",
    url: "/test/admin/rezervisi",
  },
];

import Link from "next/link";
import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getSite } from "../_lib/getSite";

import Image from "next/image";
import { Sajt } from "../_lib/Interfaces";

async function Header({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const header = {
    classname:
      "bg-white text-black shadow-md p-4 h-16 flex items-center justify-between",
    text: "TEST-RESTORAN",
  };

  return (
    // "sticky" drži header na vrhu dok skroluješ, "backdrop-blur" pravi onaj Apple-ov efekat stakla
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}

        <Link href={`/${slug}`} className="flex items-center gap-2">
          <Image
            src={site?.logoUrl || "https://picsum.photos/200"}
            alt="logo"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg">{header.text}</span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="text-sm font-medium hover:opacity-70 transition"
            >
              {link.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
