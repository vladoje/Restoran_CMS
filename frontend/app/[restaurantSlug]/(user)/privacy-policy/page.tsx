import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";

import { Restoran } from "@/app/_lib/Interfaces";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FaRegCircleDot, FaEnvelope } from "react-icons/fa6";
import { _json } from "../_json";

export async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;

  const restoran: Restoran = await getRestoranWithSlug(slug);
  const json = _json(restoran);
  return (
    <div className={`min-h-screen max-w-2xl ${json["privacy"].css}`}>
      {/* HEADER */}
      <div className={`flex flex-col ${json["privacy-header"].css}`}>
        <h1 className={json["privacy-header-naslov"].css}>
          {json["privacy-header-naslov"].text}
        </h1>
        <p className={json["privacy-header-paragraf"].css}>
          {json["privacy-header-paragraf"].text}
          <span className="font-semibold text-slate-900">{restoran.name}</span>
        </p>
      </div>

      {/* SADRŽAJ DOKUMENTA */}
      <div className={json["privacy-body"].css}>
        {/* Default sekcija 1 */}
        <section className={json["privacy-body-section"].css}>
          <div className={`flex ${json["privacy-body-section-header"].css}`}>
            <FaRegCircleDot
              className={json["privacy-body-section-header-circle"].css}
            />
            <h2 className={json["privacy-body-section-header-naslov"].css}>
              {json["privacy-body-section-header-naslov"].text}
            </h2>
          </div>
          <p className={json["privacy-body-section-body"].css}>
            {json["privacy-body-section-body"].text}
          </p>
        </section>

        {/* Default sekcija 2 */}
        <section className={json["privacy-body-section"].css}>
          <div className={`flex ${json["privacy-body-section-header"].css}`}>
            <FaRegCircleDot
              className={json["privacy-body-section-header-circle"].css}
            />
            <h2 className={json["privacy-body-section-header-naslov2"].css}>
              {json["privacy-body-section-header-naslov2"].text}
            </h2>
          </div>
          <p className={json["privacy-body-section-body2"].css}>
            {json["privacy-body-section-body2"].text}
          </p>
        </section>

        {/* INFO BOX / KONTAKT */}
        <div className={json["privacy-info"].css}>
          <FaEnvelope className={json["privacy-info-koverta"].css} />
          <div className={json["privacy-info-div"].css}>
            <p>
              {json["privacy-info-div-paragraf"].text}
              <span className={json["privacy-info-div-paragraf-span"].css}>
                {json["privacy-info-div-paragraf-span"].text}
              </span>
            </p>
            <p>
              {json["privacy-info-div-paragraf2"].text}
              <a
                href={`mailto:${restoran.email}`}
                className={json["privacy-info-div-paragraf2-anchor"].css}
              >
                {json["privacy-info-div-paragraf2-anchor"].text}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p className={json["privacy-footer"].css}>
        {json["privacy-footer"].text}
      </p>
    </div>
  );
}

export default Page;
