import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";

import { Restoran } from "@/app/_lib/Interfaces";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FaRegCircleDot, FaEnvelope } from "react-icons/fa6";
import { _json, getDefaultGlobalStyles, convertJSON } from "../_json";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { getSite } from "@/app/_lib/getSite";
import { twj } from "tw-to-css";

export async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;

  const restoran: Restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
    const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);
  
  return (
    <div
      style={twj(`min-h-screen max-w-2xl ${(json["privacy"].css||"")}`)}
    >
      {/* HEADER */}
      <div
        style={twj(`flex flex-col ${(json["privacy-header"].css||"")}`)}
      >
        <h1
          style={twj(
            json["privacy-header-naslov"].css||""
            
          )}
        >
          {json["privacy-header-naslov"].text}
        </h1>
        <p
          style={twj(
            json["privacy-header-paragraf"].css||""
            
          )}
        >
          {json["privacy-header-paragraf"].text}
          <span className="font-semibold text-slate-900">{restoran.name}</span>
        </p>
      </div>

      {/* SADRŽAJ DOKUMENTA */}
      <div style={twj(json["privacy-body"].css||"")}>
        {/* Default sekcija 1 */}
        <section
          style={twj(json["privacy-body-section"].css||"")}
        >
          <div
            style={twj(`flex ${(json["privacy-body-section-header"].css||"")}`)}
          >
            <FaRegCircleDot
              style={twj(
                json["privacy-body-section-header-circle"].css||""
                
              )}
            />
            <h2
              style={twj(
                json["privacy-body-section-header-naslov"].css||""
                
              )}
            >
              {json["privacy-body-section-header-naslov"].text}
            </h2>
          </div>
          <p
            style={twj(
              json["privacy-body-section-body"].css||""
              
            )}
          >
            {json["privacy-body-section-body"].text}
          </p>
        </section>

        {/* Default sekcija 2 */}
        <section
          style={twj(json["privacy-body-section"].css||"")}
        >
          <div
            style={twj(`flex ${(json["privacy-body-section-header"].css||"")}`)}
          >
            <FaRegCircleDot
              style={twj(
                json["privacy-body-section-header-circle"].css||""
                
              )}
            />
            <h2
              style={twj(
                json["privacy-body-section-header-naslov2"].css||""
                
              )}
            >
              {json["privacy-body-section-header-naslov2"].text}
            </h2>
          </div>
          <p
            style={twj(
              json["privacy-body-section-body2"].css||""
              
            )}
          >
            {json["privacy-body-section-body2"].text}
          </p>
        </section>

        {/* INFO BOX / KONTAKT */}
        <div style={twj(json["privacy-info"].css||"")}>
          <FaEnvelope
            style={twj(
              json["privacy-info-koverta"].css||""
              
            )}
          />
          <div
            style={twj(json["privacy-info-div"].css||"")}
          >
            <p>
              {json["privacy-info-div-paragraf"].text}
              <span
                style={twj(
                  json["privacy-info-div-paragraf-span"].css||""
                  
                )}
              >
                {json["privacy-info-div-paragraf-span"].text}
              </span>
            </p>
            <p>
              {json["privacy-info-div-paragraf2"].text}
              <a
                href={`mailto:${restoran.email}`}
                style={twj(
                  json["privacy-info-div-paragraf2-anchor"].css||""
                  
                )}
              >
                {json["privacy-info-div-paragraf2-anchor"].text}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p style={twj(json["privacy-footer"].css||"")}>
        {json["privacy-footer"].text}
      </p>
    </div>
  );
}

export default Page;
