import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";

import { Restoran } from "@/app/_lib/Interfaces";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FaRegCircleDot, FaEnvelope } from "react-icons/fa6";
import { _json, convertCSS, getDefaultGlobalStyles } from "../_json";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { getSite } from "@/app/_lib/getSite";

export async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;

  const restoran: Restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = site.jsonCSS || _json(restoran);
  return (
    <div
      className={`min-h-screen max-w-2xl ${convertCSS(json["privacy"].css, globalStyles)}`}
    >
      {/* HEADER */}
      <div
        className={`flex flex-col ${convertCSS(json["privacy-header"].css, globalStyles)}`}
      >
        <h1
          className={convertCSS(
            json["privacy-header-naslov"].css,
            globalStyles,
          )}
        >
          {json["privacy-header-naslov"].text}
        </h1>
        <p
          className={convertCSS(
            json["privacy-header-paragraf"].css,
            globalStyles,
          )}
        >
          {json["privacy-header-paragraf"].text}
          <span className="font-semibold text-slate-900">{restoran.name}</span>
        </p>
      </div>

      {/* SADRŽAJ DOKUMENTA */}
      <div className={convertCSS(json["privacy-body"].css, globalStyles)}>
        {/* Default sekcija 1 */}
        <section
          className={convertCSS(json["privacy-body-section"].css, globalStyles)}
        >
          <div
            className={`flex ${convertCSS(json["privacy-body-section-header"].css, globalStyles)}`}
          >
            <FaRegCircleDot
              className={convertCSS(
                json["privacy-body-section-header-circle"].css,
                globalStyles,
              )}
            />
            <h2
              className={convertCSS(
                json["privacy-body-section-header-naslov"].css,
                globalStyles,
              )}
            >
              {json["privacy-body-section-header-naslov"].text}
            </h2>
          </div>
          <p
            className={convertCSS(
              json["privacy-body-section-body"].css,
              globalStyles,
            )}
          >
            {json["privacy-body-section-body"].text}
          </p>
        </section>

        {/* Default sekcija 2 */}
        <section
          className={convertCSS(json["privacy-body-section"].css, globalStyles)}
        >
          <div
            className={`flex ${convertCSS(json["privacy-body-section-header"].css, globalStyles)}`}
          >
            <FaRegCircleDot
              className={convertCSS(
                json["privacy-body-section-header-circle"].css,
                globalStyles,
              )}
            />
            <h2
              className={convertCSS(
                json["privacy-body-section-header-naslov2"].css,
                globalStyles,
              )}
            >
              {json["privacy-body-section-header-naslov2"].text}
            </h2>
          </div>
          <p
            className={convertCSS(
              json["privacy-body-section-body2"].css,
              globalStyles,
            )}
          >
            {json["privacy-body-section-body2"].text}
          </p>
        </section>

        {/* INFO BOX / KONTAKT */}
        <div className={convertCSS(json["privacy-info"].css, globalStyles)}>
          <FaEnvelope
            className={convertCSS(
              json["privacy-info-koverta"].css,
              globalStyles,
            )}
          />
          <div
            className={convertCSS(json["privacy-info-div"].css, globalStyles)}
          >
            <p>
              {json["privacy-info-div-paragraf"].text}
              <span
                className={convertCSS(
                  json["privacy-info-div-paragraf-span"].css,
                  globalStyles,
                )}
              >
                {json["privacy-info-div-paragraf-span"].text}
              </span>
            </p>
            <p>
              {json["privacy-info-div-paragraf2"].text}
              <a
                href={`mailto:${restoran.email}`}
                className={convertCSS(
                  json["privacy-info-div-paragraf2-anchor"].css,
                  globalStyles,
                )}
              >
                {json["privacy-info-div-paragraf2-anchor"].text}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p className={convertCSS(json["privacy-footer"].css, globalStyles)}>
        {json["privacy-footer"].text}
      </p>
    </div>
  );
}

export default Page;
