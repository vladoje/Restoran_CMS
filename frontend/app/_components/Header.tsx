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

export default async function Header({ slug }: { slug: string }) {
  const session = await getServerSession(options);
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const [header, links]: [Headerr, Linkk[]] = await Promise.all([
    getHeader(site.headerId),
    getLinkWithHeaderId(site.headerId),
  ] as const);

  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);

  return (
    <header
      id="header"
      style={twj(
        `sticky top-0 z-50 w-full max-w-full flex items-center justify-between p-3 gap-3 box-border bg-white ${
          json["header"].css || ""
        }`
      )}
    >
      {/* LOGO - Lijevo (fleksibilna širina, ne skuplja se ispod veličine sadržaja) */}
      {header.hasLogo && (
        <Link
          href={`/${slug}`}
          id="header-logo"
          style={twj(
            `flex items-center gap-2 shrink-0 max-w-[50%] min-w-0 ${
              json["header-logo"].css || ""
            }`
          )}
        >
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={site.logoUrl}
              alt="logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>

          <span
            id="header-logo-naslov"
            className="truncate font-bold text-base leading-tight"
            style={twj(json["header-logo-naslov"].css || "")}
          >
            {json["header-logo-naslov"].text}
          </span>
        </Link>
      )}

      {/* NAV - Slaže linkove u red (jedan pored drugog) i prelama tek kad popuni red */}
      <nav
        id="header-navigation"
        style={twj(
          `flex flex-row flex-wrap justify-end items-center gap-x-3 gap-y-1 flex-1 min-w-0 ${
            json["header-navigation"].css || ""
          }`
        )}
      >
        {links.map((link) => (
          <Link
            key={link.linkId}
            href={link.url}
            className="header-navigation-link text-xs font-medium whitespace-nowrap"
            style={twj(
              `${json["header-navigation-link"].css || ""} ${
                !session?.user ? "aria-disabled:pointer-events-none" : ""
              }`
            )}
          >
            {link.text}
          </Link>
        ))}

        {session?.user?.role === "admin" && (
          <Link
            href={`/${slug}/admin`}
            className="header-navigation-link text-xs font-semibold text-blue-600 whitespace-nowrap"
            style={twj(`${json["header-navigation-link"].css || ""}`)}
          >
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
}