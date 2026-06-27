//odraditi ovako isto css za sve ostale user fajlove a i za admin nesto skontati pa zapamtiti u bazi json varijablu za svaku stranicu pa je ucitati
// i na kraju napraviti modifikovanje klasa
import Link from "next/link";

import { getRestoranWithSlug } from "../../_lib/getRestoran";
import { getUser } from "../../_lib/getUser";
import { getUserReservations } from "../../_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "../../_lib/getTables";
import { Restoran, Rezervacija, Sajt, Sala, User } from "../../_lib/Interfaces";
import { getServerSession } from "next-auth";
import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { _json, convertCSS, getDefaultGlobalStyles } from "./_json";
import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(session.user.id),
  ]);

  const [activeReservations, site, sala]: [Rezervacija[], Sajt, Sala] =
    await Promise.all([
      getUserReservations(user.userId),
      getSite(restoran.siteId),
      getSala(restoran.restoranId),
    ]);

  const allTables = await getAllTablesFromSala(sala.salaId);

  console.log(site.jsonCSS);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = site.jsonCSS || _json(restoran);

  return (
    <div
      className={`bg-${globalStyles.bg} text-${globalStyles.text} max-w-6xl mx-auto px-4 py-8`}
    >
      {/* Restoran header */}
      <div
        id="homepage-header"
        className={convertCSS(json["homepage-header"].css, globalStyles)}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1
              id="homepage-header-naslov"
              className={convertCSS(
                json["homepage-header-naslov"].css,
                globalStyles,
              )}
            >
              {json["homepage-header-naslov"].text}
            </h1>
            <p
              id="homepage-header-text"
              className={json["homepage-header-text"].text}
            >
              {json["homepage-header-text"].text}
            </p>
            <div
              id="homepage-header-information"
              className={`flex gap-6 ${convertCSS(json["homepage-header-information"].css, globalStyles)}`}
            >
              <div id="homepage-header-information-address">
                {json["homepage-header-information-address"].text}
              </div>
              <div id="homepage-header-information-phone">
                {json["homepage-header-information-phone"].text}
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
          {/* Ovo leti kada skontam kako logo-i rade */}
        </div>
      </div>

      {/* Brze akcije */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          id="homepage-brzeAkcije"
          className={convertCSS(json["homepage-brzeAkcije"].css, globalStyles)}
        >
          <h2
            id="homepage-brzeAkcije-naslov"
            className={convertCSS(
              json["homepage-brzeAkcije-naslov"].css,
              globalStyles,
            )}
          >
            {json["homepage-brzeAkcije-naslov"].text}
          </h2>
          <p
            id="homepage-brzeAkcije-text"
            className={convertCSS(
              json["homepage-brzeAkcije-text"].css,
              globalStyles,
            )}
          >
            {json["homepage-brzeAkcije-text"].text}
          </p>
          <Link
            id="homepage-brzeAkcije-link"
            href={`${slug}/reservation`}
            className={`inline-block ${convertCSS(json["homepage-brzeAkcije-link"].css, globalStyles)}`}
          >
            {json["homepage-brzeAkcije-link"].text}
          </Link>
        </div>
      </div>

      {/* Lista rezervacija */}
      <div
        id="homepage-rezervacije"
        className={convertCSS(json["homepage-rezervacije"].css, globalStyles)}
      >
        <h2
          id="homepage-rezervacije-naslov"
          className={convertCSS(
            json["homepage-rezervacije-naslov"].css,
            globalStyles,
          )}
        >
          {json["homepage-rezervacije-naslov"].text}
        </h2>

        {/* Aktivne */}

        {!activeReservations.length ? (
          <div
            id="homepage-rezervacije-nema"
            className={convertCSS(
              json["homepage-rezervacije-nema"].css,
              globalStyles,
            )}
          >
            {json["homepage-rezervacije-nema"].text}
          </div>
        ) : (
          activeReservations.map((res: Rezervacija, i) => {
            const datum = `${res.dateTime.getDate()}.${res.dateTime.getMonth() + 1}.${res.dateTime.getFullYear()}.`;
            const sati =
              res.dateTime.getHours() < 10
                ? `0${res.dateTime.getHours()}`
                : res.dateTime.getHours();
            const minuta =
              res.dateTime.getMinutes() < 10
                ? `0${res.dateTime.getMinutes()}`
                : res.dateTime.getMinutes();
            const start = `${sati}:${minuta}`;

            return (
              <div
                key={i}
                id="homepage-rezervacije-rezervacija"
                className={convertCSS(
                  json["homepage-rezervacije-rezervacija"].css,
                  globalStyles,
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        id="homepage-rezervacije-datum"
                        className={convertCSS(
                          json["homepage-rezervacije-datum"].css,
                          globalStyles,
                        )}
                      >
                        {datum}
                      </span>
                      <span
                        id="homepage-rezervacije-tacka"
                        className={convertCSS(
                          json["homepage-rezervacije-tacka"].css,
                          globalStyles,
                        )}
                      >
                        {json["homepage-rezervacije-tacka"].text}
                      </span>
                      <span
                        id="homepage-rezervacije-start"
                        className={convertCSS(
                          json["homepage-rezervacije-start"].css,
                          globalStyles,
                        )}
                      >
                        {start}
                      </span>
                      <span
                        id="homepage-rezervacije-tacka"
                        className={convertCSS(
                          json["homepage-rezervacije-tacka"].css,
                          globalStyles,
                        )}
                      >
                        {json["homepage-rezervacije-tacka"].text}
                      </span>
                      <span
                        id="homepage-rezervacije-gost"
                        className={convertCSS(
                          json["homepage-rezervacije-gost"].css,
                          globalStyles,
                        )}
                      >
                        {res.numberOfPeople}{" "}
                        {res.numberOfPeople > 1 ? "gosta" : "gost"}
                      </span>
                    </div>
                    <div
                      id="homepage-rezervacije-sto"
                      className={convertCSS(
                        json["homepage-rezervacije-sto"].css,
                        globalStyles,
                      )}
                    >
                      Sto{" "}
                      {
                        allTables.find((t) => t.tableId === res.tableId)
                          ?.tableNumber
                      }
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="homepage-rezervacije-izmjeni"
                      className={convertCSS(
                        json["homepage-rezervacije-izmjeni"].css,
                        globalStyles,
                      )}
                    >
                      {json["homepage-rezervacije-izmjeni"].text}
                    </button>
                    <button
                      id="homepage-rezervacije-otkazi"
                      className={convertCSS(
                        json["homepage-rezervacije-otkazi"].css,
                        globalStyles,
                      )}
                    >
                      {json["homepage-rezervacije-otkazi"].text}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Page;
