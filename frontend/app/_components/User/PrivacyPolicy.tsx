import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";

import { Restoran } from "@/app/_lib/Interfaces";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FaRegCircleDot, FaEnvelope } from "react-icons/fa6";
// import { _json, getDefaultGlobalStyles, convertJSON } from "../_json";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { getSite } from "@/app/_lib/getSite";
import { twj } from "tw-to-css";
import { _json, getDefaultGlobalStyles, convertJSON } from "@/app/[restaurantSlug]/(user)/_json";

export async function PrivacyPolicy({ slug, isEditing=false }: { slug: string; isEditing?: boolean }) {
  // const session = await getServerSession(options);
  console.time('SESSION');
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  console.timeEnd('SESSION');

  console.time('RESTORAN');
  const restoran: Restoran = await getRestoranWithSlug(slug);
  console.timeEnd('RESTORAN');

  console.time('SITE');
  const site = await getSite(restoran.siteId);
  console.timeEnd('SITE');

  console.time('GLOBAL');
  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();
  console.timeEnd('GLOBAL');

  console.time('CONVERT JSON');
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);
  console.timeEnd('CONVERT JSON');

  return (
    <div style={json['privacy'].css || {}}>
      {/* HEADER */}
      <div style={json['privacy-header'].css || {}}>
        <h1 style={json['privacy-header-naslov'].css || {}}>
          {json['privacy-header-naslov'].text}
        </h1>
        <p style={json['privacy-header-paragraf'].css || {}}>
          {json['privacy-header-paragraf'].text}
          <span className="font-semibold text-slate-900">{restoran.name}</span>
        </p>
      </div>

      {/* SADRŽAJ DOKUMENTA */}
      <div style={json['privacy-body'].css ||{}}>
        {/* Default sekcija 1 */}
        <section style={json['privacy-body-section'].css || {}}>
          <div style={json['privacy-body-section-header'].css || {}}>
            <FaRegCircleDot style={json['privacy-body-section-header-circle'].css || {}} />
            <h2 style={json['privacy-body-section-header-naslov'].css || {}}>
              {json['privacy-body-section-header-naslov'].text}
            </h2>
          </div>
          <p style={json['privacy-body-section-body'].css || {}}>
            {json['privacy-body-section-body'].text}
          </p>
        </section>

        {/* Default sekcija 2 */}
        <section style={json['privacy-body-section'].css || {}}>
          <div style={json['privacy-body-section-header'].css || {}}>
            <FaRegCircleDot style={json['privacy-body-section-header-circle'].css|| {}} />
            <h2 style={json['privacy-body-section-header-naslov2'].css|| {}}>
              {json['privacy-body-section-header-naslov2'].text}
            </h2>
          </div>
          <p style={json['privacy-body-section-body2'].css||{}}>
            {json['privacy-body-section-body2'].text}
          </p>
        </section>

        {/* INFO BOX / KONTAKT */}
        <div style={json['privacy-info'].css || {}}>
          <FaEnvelope style={json['privacy-info-koverta'].css || {}} />
          <div style={json['privacy-info-div'].css || {}}>
            <p>
              {json['privacy-info-div-paragraf'].text}
              <span style={json['privacy-info-div-paragraf-span'].css || {}}>
                {json['privacy-info-div-paragraf-span'].text}
              </span>
            </p>
            <p>
              {json['privacy-info-div-paragraf2'].text}
              <a
                href={`mailto:${restoran.email}`}
                style={json['privacy-info-div-paragraf2-anchor'].css || {}}
              >
                {json['privacy-info-div-paragraf2-anchor'].text}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p style={json['privacy-footer'].css || {}}>{json['privacy-footer'].text}</p>
    </div>
  );
}

export default PrivacyPolicy;
