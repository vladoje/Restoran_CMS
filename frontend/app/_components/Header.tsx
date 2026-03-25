import { FaAppleWhole, FaMoon } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import Link from "next/link";
import { Restoran } from "../[restaurantSlug]/page";
import { User } from "./RegisterHelpers";
import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getUser } from "../_lib/getUser";
import { getSite } from "../_lib/getSite";
import { getHeader, getLinkWithHeaderId } from "../_lib/getLinks";
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
export interface Link {
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
  const [header, links]: [Header, Link[]] = await Promise.all([
    getHeader(site.headerId),
    getLinkWithHeaderId(site.headerId),
  ] as const);
  const isDarkMode = true;

  return (
    // "sticky" drži header na vrhu dok skroluješ, "backdrop-blur" pravi onaj Apple-ov efekat stakla
    <header
      className={`sticky top-0 z-50 w-full px-6 py-4  backdrop-blur-md border-b ${!isDarkMode ? " bg-primary border-border" : " bg-primary-dark border-border-dark"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO SEKCIJA */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <div
            className={`p-2 ${!isDarkMode ? "bg-secondary" : "bg-secondary-dark"} rounded-xl shadow-lg shadow-red-200 dark:shadow-none`}
          >
            <FaAppleWhole className="text-white text-2xl group-hover:rotate-12 transition-transform" />
          </div>
          <span
            className={`font-black text-xl tracking-tight ${!isDarkMode ? "text-surface" : "text-surface-dark"} dark:text-white uppercase`}
          >
            Driver
            <span
              className={!isDarkMode ? `text-secondary` : `text-secondary-dark`}
            >
              App
            </span>
          </span>
        </Link>

        {/* DESNA SEKCIJA - NAVIGACIJA I ALATI */}
        <div className="flex items-center gap-3 pl-4">
          <Link
            href="/profile"
            className={`p-2.5 ${!isDarkMode ? "text-surface" : "text-text-dark"} hover:bg-[#81A6C6]/20 rounded-full transition-colors`}
          >
            <CgProfile className="text-2xl" />
          </Link>
          <Link
            href="/napredak"
            className={`p-2.5 ${!isDarkMode ? "text-surface" : "text-text-dark"} hover:bg-[#81A6C6]/20 rounded-full transition-colors`}
          >
            <GiStairsGoal className="text-2xl" />
          </Link>
          <button className="p-2.5 cursor-pointer text-amber-500 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:rotate-45">
            {isDarkMode ? (
              <FaMoon className="text-xl" />
            ) : (
              <IoSunny className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
