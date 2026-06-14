import { getUser } from "@/app/_lib/getUser";

import {
  getOldUserReservations,
  getUserReservations,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";

import ReservationList from "@/app/_components/ReservationList";
import { Rezervacija, User } from "@/app/_lib/Interfaces";
import { _json } from "../_json";

async function Page() {
  const user: User = await getUser(1);
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);
  const restoranId =
    activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;
  const json = _json();
  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 ">
        <div className={json["reservations-nema"].css}>
          {json["reservations-nema"].text}
        </div>
      </div>
    );
  }

  const sala = await getSala(restoranId);

  const allTables = await getAllTablesFromSala(sala.salaId);
  return (
    <div>
      <div id="reservations-active" className={json["reservations-active"].css}>
        <h2
          id="reservations-active-naslov"
          className={json["reservations-active-naslov"].css}
        >
          {json["reservations-active-naslov"].text}
        </h2>
        <p
          id="reservations-active-ukupno"
          className={json["reservations-active-ukupno"].css}
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
        className={json["reservations-inactive"].css}
      >
        <h2
          id="reservations-inactive-naslov"
          className={json["reservations-inactive-naslov"].css}
        >
          {json["reservations-inactive-naslov"].text}
        </h2>
        <p
          id="reservations-inactive-ukupno"
          className={json["reservations-inactive-ukupno"].css}
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

export default Page;
