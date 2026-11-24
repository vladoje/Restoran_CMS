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
import { Headerr, Linkk, MojJSON, Sajt } from "../_lib/Interfaces";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import {
  _json,
  
  convertJSON,
  
  getDefaultGlobalStyles,
} from "../[restaurantSlug]/(user)/_json";
import createGlobalStylesObject from "../_lib/CMS/createGlobalStylesObject";



export default async function Header({ slug,isEditing=false }: { slug: string,isEditing?:boolean }) {
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
  // createCompiledJsonFile(_json())
  return (
    <header
      id="header"
      className="@container flex flex-row items-center gap-3"
      style={json['header'].css || {}}
    >
      {header.hasLogo && isEditing ? (
        <button id="header-logo" style={json['header-logo'].css || {}}>
          <HeaderLogoInsides site={site} json={json} />
        </button>
      ) : (
        <Link
          href={isEditing ? `/${slug}/admin/edit` : `/${slug}`}
          id="header-logo"
          style={json['header-logo'].css || {}}
        >
          <HeaderLogoInsides site={site} json={json} />
        </Link>
      )}

      <nav
        id="header-navigation"
        className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2"
        style={json['header-navigation'].css || {}}
      >
        {links.map((link) =>
          isEditing ? (
            <button
              className="text-xs font-medium whitespace-nowrap"
              style={{
                ...json['header-navigation-link'].css,
                ...(!session?.user ? { pointerEvents: 'none' } : {}),
              }}
              key={link.linkId}
            >
              {' '}
              {link.text}
            </button>
          ) : (
            <Link
              key={link.linkId}
              href={
                isEditing
                  ? `/${slug}/admin/edit/${link.url
                      .replace(/^\/+/, '')
                      .replace(new RegExp(`^${slug}/?`), '')}`
                  : link.url
              }
              className="text-xs font-medium whitespace-nowrap"
              style={{
                ...json['header-navigation-link'].css,
                ...(!session?.user ? { pointerEvents: 'none' } : {}),
              }}
            >
              {link.text}
            </Link>
          ),
        )}

        {session?.user?.role === 'admin' && !isEditing && (
          <Link
            href={`/${slug}/admin`}
            className="text-xs font-semibold text-blue-600 whitespace-nowrap"
            style={json['header-navigation-link'].css || {}}
          >
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
}
function HeaderLogoInsides({json,site} :{json:Record<string, MojJSON>,site:Sajt}){
  return( <>
  <div id="header-logo-logo" style={json['header-logo-logo'].css || {}}>
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
    style={json['header-logo-naslov'].css || {}}
  >
            {json['header-logo-naslov'].text}
          </span>
  </>)
}
