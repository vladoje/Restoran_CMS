/*
KASNIJE IMLEMENTIRATI DA LINKOVI MOGU BITI IKONICE SA SLICICAMA, KADA BUDEM RADIO SA UPLOADOM SLIKA PREKO BUCKETA...
KASNIJE IMPLEMENTIRATI LIGHT I DARK MODE

*/

import { FaMoon } from "react-icons/fa6";
import Link from "next/link";
import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getSite } from "../_lib/getSite";
import { getHeader, getLinkWithHeaderId } from "../_lib/getLinks";
import Image from "next/image";

export interface Sajt {
  siteId: number;
  headerId: number;
  footerId: number;
  primaryColor: string;
  secondaryColor: string;
  surfaceColor: string;
  backgroundColor: string;
  logoUrl: string;
}
export interface Header {
  headerId: number;
  hasLightModeSwitch: boolean;
  hasLogo: boolean;
  classname: string;
  text: string;
}
export interface Linkk {
  linkId: number;
  text: string;
  url: string;
  icon: string;
  headerId?: number;
  footerId?: number;
}
async function Header({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const [header, links]: [Header, Linkk[]] = await Promise.all([
    getHeader(site.headerId),
    getLinkWithHeaderId(site.headerId),
  ] as const);

  return (
    // "sticky" drži header na vrhu dok skroluješ, "backdrop-blur" pravi onaj Apple-ov efekat stakla
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        {header.hasLogo && (
          <Link href={`/${slug}`} className="flex items-center gap-2">
            <Image src={site.logoUrl} alt="logo" width={32} height={32} />
            <span className="font-semibold text-lg">{header.text}</span>
          </Link>
        )}

        {/* NAV */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.linkId}
              href={link.url}
              className="text-sm font-medium hover:opacity-70 transition"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* TOGGLE (kasnije) */}
        {header.hasLightModeSwitch && (
          <button>
            <FaMoon />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
