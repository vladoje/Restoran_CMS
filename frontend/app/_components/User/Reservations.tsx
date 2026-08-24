import { getUser } from "@/app/_lib/getUser";

import {
  getOldUserReservations,
  getUserReservations,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";

import ReservationList from "@/app/_components/ReservationList";
import { Rezervacija, User } from "@/app/_lib/Interfaces";
// import { _json, convertJSON, getDefaultGlobalStyles } from "../_json";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { twj } from "tw-to-css";
import { _json, convertJSON, getDefaultGlobalStyles } from "@/app/[restaurantSlug]/(user)/_json";

async function Reservations({ slug }: { slug: string } ) {
  const user: User = await getUser(1);
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);
  const restoranId =
    activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;
  
  const restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);

  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
    const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);
  

  
  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 ">
        <div
          style={twj(json["reservations-nema"]?.css||"")}
        >
          {json["reservations-nema"]?.text}
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
        style={twj(json["reservations-active"].css||"")}
      >
        <h2
          id="reservations-active-naslov"
          style={twj(
            json["reservations-active-naslov"].css||""
          
          )}
        >
          {json["reservations-active-naslov"].text}
        </h2>
        <p
          id="reservations-active-ukupno"
          style={twj(
            json["reservations-active-ukupno"].css||""
          
          )}
        >
          {activeReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          
          json={json}
          activeReservations={activeReservations}
          allTables={allTables}
        />
      </div>
      <div
        id="reservations-inactive"
        style={twj(json["reservations-inactive"].css||"")}
      >
        <h2
          id="reservations-inactive-naslov"
          style={twj(
            json["reservations-inactive-naslov"].css||""
          
          )}
        >
          {json["reservations-inactive-naslov"].text}
        </h2>
        <p
          id="reservations-inactive-ukupno"
          style={twj(
            json["reservations-inactive-ukupno"].css||""
          
          )}
        >
          {pastReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          
          json={json}
          activeReservations={pastReservations}
          allTables={allTables}
        />
      </div>
    </div>
  );
}

export default Reservations;
