import { getUser } from "@/app/_lib/getUser";

import {
  getOldUserReservations,
  getUserReservations,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";

import ReservationList from "@/app/_components/ReservationList";
import { Rezervacija, User } from "@/app/_lib/Interfaces";
import { _json, convertCSS, getDefaultGlobalStyles } from "../_json";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const user: User = await getUser(1);
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);
  const restoranId =
    activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;
  const slug = (await params).restaurantSlug;
  const restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);

  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = site.jsonCSS || _json(restoran);
  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 ">
        <div
          className={convertCSS(json["reservations-nema"].css, globalStyles)}
        >
          {json["reservations-nema"].text}
        </div>
      </div>
    );
  }

  const sala = await getSala(restoranId);

  const allTables = await getAllTablesFromSala(sala.salaId);
  return (
    <div>
      <div
        id="reservations-active"
        className={convertCSS(json["reservations-active"].css, globalStyles)}
      >
        <h2
          id="reservations-active-naslov"
          className={convertCSS(
            json["reservations-active-naslov"].css,
            globalStyles,
          )}
        >
          {json["reservations-active-naslov"].text}
        </h2>
        <p
          id="reservations-active-ukupno"
          className={convertCSS(
            json["reservations-active-ukupno"].css,
            globalStyles,
          )}
        >
          {activeReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          globalStyles={globalStyles}
          json={json}
          activeReservations={activeReservations}
          allTables={allTables}
        />
      </div>
      <div
        id="reservations-inactive"
        className={convertCSS(json["reservations-inactive"].css, globalStyles)}
      >
        <h2
          id="reservations-inactive-naslov"
          className={convertCSS(
            json["reservations-inactive-naslov"].css,
            globalStyles,
          )}
        >
          {json["reservations-inactive-naslov"].text}
        </h2>
        <p
          id="reservations-inactive-ukupno"
          className={convertCSS(
            json["reservations-inactive-ukupno"].css,
            globalStyles,
          )}
        >
          {pastReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          globalStyles={globalStyles}
          json={json}
          activeReservations={pastReservations}
          allTables={allTables}
        />
      </div>
    </div>
  );
}

export default Page;
