import Link from "next/link";
import Image from "next/image";

import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getSite } from "../_lib/getSite";
import { getFooter, getLinkWithFooterId } from "../_lib/getLinks";
import { Foooter, Linkk, Sajt } from "../_lib/Interfaces";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import {
  _json,
  convertCSS,
  getDefaultGlobalStyles,
} from "../[restaurantSlug]/(user)/_json";
import createGlobalStylesObject from "../_lib/CMS/createGlobalStylesObject";

async function Footer({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const session = await getServerSession(options);
  const site: Sajt = await getSite(restoran.siteId);

  const [footer, links]: [Foooter, Linkk[]] = await Promise.all([
    getFooter(site.footerId),
    getLinkWithFooterId(site.footerId),
  ] as const);

  const json = site.jsonCSS || _json(restoran, undefined, footer);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();

  return (
    <footer
      id="footer"
      className={`w-full ${convertCSS(json["footer"].css, globalStyles)}`}
    >
      <div
        className={`max-w-7xl flex flex-col ${convertCSS(json["footer-body"].css, globalStyles)}`}
      >
        {/* LOGO + TEXT */}
        <div
          id="footer-body-logo"
          className={`flex flex-col  max-w-sm ${convertCSS(json["footer-body-logo"].css, globalStyles)}`}
        >
          {footer.hasLogo && (
            <div
              id="footer-body-logo-image"
              className={`flex ${convertCSS(json["footer-body-logo-image"].css, globalStyles)}`}
            >
              <Image src={site.logoUrl} alt="logo" width={32} height={32} />
              <span
                id="footer-body-logo-image-text"
                className={convertCSS(
                  json["footer-body-logo-image-text"].css,
                  globalStyles,
                )}
              >
                {json["footer-body-logo-image-text"].text}
              </span>
            </div>
          )}

          <p
            id="footer-body-logo-text"
            className={convertCSS(
              json["footer-body-logo-text"].css,
              globalStyles,
            )}
          >
            {json["footer-body-logo-text"].text}
          </p>
        </div>

        {/* LINKOVI */}
        <div
          id="footer-body-links"
          className={`flex flex-col ${convertCSS(json["footer-body-links"].css, globalStyles)}`}
        >
          <span
            id="footer-body-links-naslov"
            className={convertCSS(
              json["footer-body-links-naslov"].css,
              globalStyles,
            )}
          >
            {json["footer-body-links-naslov"].text}
          </span>

          {links.map((link) => (
            <Link
              key={link.linkId}
              href={link.url}
              id="footer-body-links-link"
              className={`${convertCSS(json["footer-body-links-link"].css, globalStyles)} ${!session?.user ? "aria-disabled:pointer-events-none" : ""}`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* KONTAKT (placeholder za kasnije CMS) */}
        {footer.hasContactInfo && (
          <div
            id="footer-body-contact"
            className={`flex flex-col ${convertCSS(json["footer-body-contact"].css, globalStyles)}`}
          >
            <span
              id="footer-body-contact-naslov"
              className={convertCSS(
                json["footer-body-contact-naslov"].css,
                globalStyles,
              )}
            >
              {json["footer-body-contact-naslov"].text}
            </span>

            <p
              id="footer-body-contact-adresa"
              className={convertCSS(
                json["footer-body-contact-adresa"].css,
                globalStyles,
              )}
            >
              {json["footer-body-contact-adresa"].text}
            </p>
            <p
              id="footer-body-contact-adresa"
              className={convertCSS(
                json["footer-body-contact-telefon"].css,
                globalStyles,
              )}
            >
              {json["footer-body-contact-telefon"].text}
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM BAR */}
      <div
        id="footer-reserved"
        className={convertCSS(json["footer-reserved"].css, globalStyles)}
      >
        {json["footer-reserved"].text}
      </div>
    </footer>
  );
}

export default Footer;
