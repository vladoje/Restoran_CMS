import Link from "next/link";
import Image from "next/image";

import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getSite } from "../_lib/getSite";

import { Sajt } from "../_lib/Interfaces";
import { links } from "./AdminHeader";

async function Footer({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const footer = {
    text: "TEST-RESTORAN",

    classname:
      "bg-gray-800 text-gray-100 p-6 h-32 flex flex-col justify-between",
  };

  return (
    <footer className="w-full border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8 md:flex-row md:justify-between">
        {/* LOGO + TEXT */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-2">
            <Image
              src={site?.logoUrl || "https://picsum.photos/200"}
              alt="logo"
              width={32}
              height={32}
            />
            <span className="font-semibold text-lg">{footer.text}</span>
          </div>

          <p className="text-sm opacity-70">{footer.text}</p>
        </div>

        {/* LINKOVI */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm mb-2">Navigacija</span>

          {links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="text-sm opacity-80 hover:opacity-100 transition"
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* KONTAKT (placeholder za kasnije CMS) */}

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm mb-2">Kontakt</span>

          <p className="text-sm opacity-80">Adresa: Nije postavljena</p>
          <p className="text-sm opacity-80">Telefon: Nije postavljen</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {footer.text}. Sva prava zadržana.
      </div>
    </footer>
  );
}

export default Footer;
