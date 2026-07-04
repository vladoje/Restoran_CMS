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
  convertJSON,
  getDefaultGlobalStyles,
} from "../[restaurantSlug]/(user)/_json";
import createGlobalStylesObject from "../_lib/CMS/createGlobalStylesObject";
import { twj } from "tw-to-css";

async function Footer({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const session = await getServerSession(options);
  const site: Sajt = await getSite(restoran.siteId);

  const [footer, links]: [Foooter, Linkk[]] = await Promise.all([
    getFooter(site.footerId),
    getLinkWithFooterId(site.footerId),
  ] as const);

  
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);
  return (
    <footer
      id="footer"
      style={twj(`w-full ${json["footer"].css}`||"")}
    >
      <div
        style={twj(`max-w-7xl flex flex-col ${json["footer-body"].css}`||"")}
      >
        {/* LOGO + TEXT */}
        <div
          id="footer-body-logo"
          style={twj(`flex flex-col  max-w-sm ${json["footer-body-logo"].css}`||"")}
        >
          {footer.hasLogo && (
            <div
              id="footer-body-logo-image"
              style={twj(`flex ${json["footer-body-logo-image"].css}`||"")}
            >
              <Image src={site.logoUrl} alt="logo" width={32} height={32} />
              <span
                id="footer-body-logo-image-text"
                style={twj(
                  json["footer-body-logo-image-text"].css
                  
                ||"")}
              >
                {json["footer-body-logo-image-text"].text}
              </span>
            </div>
          )}

          <p
            id="footer-body-logo-text"
            style={twj(
              json["footer-body-logo-text"].css
             ||""
            )}
          >
            {json["footer-body-logo-text"].text}
          </p>
        </div>

        {/* LINKOVI */}
        <div
          id="footer-body-links"
          style={twj(`flex flex-col ${json["footer-body-links"].css}`||"")}
        >
          <span
            id="footer-body-links-naslov"
            style={twj(
              json["footer-body-links-naslov"].css
             ||""
            )}
          >
            {json["footer-body-links-naslov"].text}
          </span>

          {links.map((link) => (
            <Link
              key={link.linkId}
              href={link.url}
              id="footer-body-links-link"
              style={twj(`${json["footer-body-links-link"].css} ${!session?.user ? "aria-disabled:pointer-events-none" : ""}`||"")}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* KONTAKT (placeholder za kasnije CMS) */}
        {footer.hasContactInfo && (
          <div
            id="footer-body-contact"
            style={twj(`flex flex-col ${json["footer-body-contact"].css}`||"")}
          >
            <span
              id="footer-body-contact-naslov"
              style={twj(
                json["footer-body-contact-naslov"].css
               ||""
              )}
            >
              {json["footer-body-contact-naslov"].text}
            </span>

            <p
              id="footer-body-contact-adresa"
              style={twj(
                json["footer-body-contact-adresa"].css
               ||""
              )}
            >
              {json["footer-body-contact-adresa"].text}
            </p>
            <p
              id="footer-body-contact-adresa"
              style={twj(
                json["footer-body-contact-telefon"].css
               ||""
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
        style={twj(json["footer-reserved"].css||"")}
      >
        {json["footer-reserved"].text}
      </div>
    </footer>
  );
}

export default Footer;
