//odraditi ovako isto css za sve ostale user fajlove a i za admin nesto skontati pa zapamtiti u bazi json varijablu za svaku stranicu pa je ucitati
// i na kraju napraviti modifikovanje klasa
import Link from "next/link";
import { twj } from "tw-to-css";


import { getServerSession } from "next-auth";
import NewUserDashboard from "@/app/_components/NewUserDashboard";



import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Restoran, Rezervacija, Sajt, Sala, User } from "@/app/_lib/Interfaces";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import { getUserReservations } from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { _json, convertJSON, getDefaultGlobalStyles } from "@/app/[restaurantSlug]/(user)/_json";

async function Homepage({ slug }: { slug:string } ) {
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

 
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);

  return (
    <div
      style={twj(`bg-${globalStyles.bg} text-${globalStyles.text} max-w-6xl mx-auto px-4 py-8`||"")}
    >
      {/* Restoran header */}
      <div
        id="homepage-header"
        style={twj(json["homepage-header"].css||"")}
      >
        <div className=" flex items-start justify-between">
          <div>
            <h1
              id="homepage-header-naslov"
              style={twj(
                json["homepage-header-naslov"].css||"")
                
              }
            >
              {json["homepage-header-naslov"].text}
            </h1>
            <p
              id="homepage-header-text"
              style={twj(json["homepage-header-text"].css||"")}
            >
              {json["homepage-header-text"].text}
            </p>
            <div
              id="homepage-header-information"
              style={twj(`flex gap-6 ${json["homepage-header-information"].css }`||"")}
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
          style={twj(json["homepage-brzeAkcije"].css||"") }
        >
          <h2
            id="homepage-brzeAkcije-naslov"
            style={twj(
              json["homepage-brzeAkcije-naslov"].css||"")
              
            }
          >
            {json["homepage-brzeAkcije-naslov"].text}
          </h2>
          <p
            id="homepage-brzeAkcije-text"
            style={twj(
              json["homepage-brzeAkcije-text"].css||"")
              
            }
          >
            {json["homepage-brzeAkcije-text"].text}
          </p>
          <Link
            id="homepage-brzeAkcije-link"
            href={`${slug}/reservation`}
            style={twj(`inline-block ${json["homepage-brzeAkcije-link"].css }`||"")}
          >
            {json["homepage-brzeAkcije-link"].text}
          </Link>
        </div>
      </div>

      {/* Lista rezervacija */}
      <div
        id="homepage-rezervacije"
        style={twj(json["homepage-rezervacije"].css ||"")}
      >
        <h2
          id="homepage-rezervacije-naslov"
          style={twj(
            json["homepage-rezervacije-naslov"].css||"")
            
          }
        >
          {json["homepage-rezervacije-naslov"].text}
        </h2>

        {/* Aktivne */}

        {!activeReservations.length ? (
          <div
            id="homepage-rezervacije-nema"
            style={twj(
              json["homepage-rezervacije-nema"].css||"")
              
            }
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
                style={twj(
                  json["homepage-rezervacije-rezervacija"].css||"")
                
                }
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        id="homepage-rezervacije-datum"
                        style={twj(
                          json["homepage-rezervacije-datum"].css||"")
                          
                        }
                      >
                        {datum}
                      </span>
                      <span
                        id="homepage-rezervacije-tacka"
                        style={twj(
                          json["homepage-rezervacije-tacka"].css||"")
                          
                        }
                      >
                        {json["homepage-rezervacije-tacka"].text}
                      </span>
                      <span
                        id="homepage-rezervacije-start"
                        style={twj(
                          json["homepage-rezervacije-start"].css||"")
                          
                        }
                      >
                        {start}
                      </span>
                      <span
                        id="homepage-rezervacije-tacka"
                        style={twj(
                          json["homepage-rezervacije-tacka"].css||"")
                          
                        }
                      >
                        {json["homepage-rezervacije-tacka"].text}
                      </span>
                      <span
                        id="homepage-rezervacije-gost"
                        style={twj(
                          json["homepage-rezervacije-gost"].css||"")
                          
                        }
                      >
                        {res.numberOfPeople}{" "}
                        {res.numberOfPeople > 1 ? "gosta" : "gost"}
                      </span>
                    </div>
                    <div
                      id="homepage-rezervacije-sto"
                      style={twj(
                        json["homepage-rezervacije-sto"].css||"")
                        
                      }
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
                      style={twj(
                        json["homepage-rezervacije-izmjeni"].css||"")
                        
                      }
                    >
                      {json["homepage-rezervacije-izmjeni"].text}
                    </button>
                    <button
                      id="homepage-rezervacije-otkazi"
                      style={twj(
                        json["homepage-rezervacije-otkazi"].css||"")
                        
                      }
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

export default Homepage;
