/*
convert css server ne radi client netestiran
*/

/*
KASNIJE IMLEMENTIRATI DA LINKOVI MOGU BITI IKONICE SA SLICICAMA, KADA BUDEM RADIO SA UPLOADOM SLIKA PREKO BUCKETA...
KASNIJE IMPLEMENTIRATI LIGHT I DARK MODE

*/

// import { FaMoon } from "react-icons/fa6";
import Link from "next/link";
import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getSite } from "../_lib/getSite";
import { getHeader, getLinkWithHeaderId } from "../_lib/getLinks";
import Image from "next/image";
import { Headerr, Linkk, Sajt } from "../_lib/Interfaces";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import {
  _json,
  
  convertJSON,
  
  getDefaultGlobalStyles,
} from "../[restaurantSlug]/(user)/_json";
import createGlobalStylesObject from "../_lib/CMS/createGlobalStylesObject";
import { twj } from "tw-to-css";

async function Header({ slug }: { slug: string }) {
  const session = await getServerSession(options);
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const [header, links]: [Headerr, Linkk[]] = await Promise.all([
    getHeader(site.headerId),
    getLinkWithHeaderId(site.headerId),
  ] as const);

  const globalStyles =
  createGlobalStylesObject(site) || getDefaultGlobalStyles();
    const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);
  
  return (
    // "sticky" drži header na vrhu dok skroluješ, "backdrop-blur" pravi onaj Apple-ov efekat stakla
    <header
      id="header"
      style={twj(`sticky top-0 z-50 w-full ${json["header"].css||""} max-w-7xl flex `)}
    >
      
      {/* LOGO */}
      {header.hasLogo && (
        <Link
          href={`/${slug}`}
          id="header-logo"
          style={twj(`flex ${json["header-logo"].css||""}`)}
        >
          <Image src={site.logoUrl} alt="logo" width={32} height={32} />
          <span
            id="header-logo-naslov"
            style={twj(json["header-logo-naslov"].css||"")}
          >
            {json["header-logo-naslov"].text}
          </span>
        </Link>
      )}

      {/* NAV */}
      <nav
        id="header-navigation"
        style={twj(`flex ${json["header-navigation"].css||""}`)}
      >
        {links.map((link) => (
          <Link
            key={link.linkId}
            href={link.url}
            id="header-navigation-link"
            style={twj(`${json["header-navigation-link"].css||""} ${!session?.user ? "aria-disabled:pointer-events-none" : ""}`)}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* TOGGLE (kasnije)
        {header.hasLightModeSwitch && (
          <button>
            <FaMoon />
          </button>
        )} */}
    </header>
  );
}

export default Header;
