import { getUser } from "@/app/_lib/getUser";

import {
  getOldUserReservations,
  getUserReservations,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";

import ReservationList from "@/app/_components/ReservationList";
import { Rezervacija, User } from "@/app/_lib/Interfaces";

async function Page() {
  const user: User = await getUser(1);
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);
  const restoranId =
    activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;
  const json = {
    nema: {
      css: "mt-16 text-sm text-gray-500 border border-dashed rounded-xl p-6 text-center",
      text: "Nema rezervacija",
    },
    active: {
      css: "",
    },
    "active-naslov": {
      css: "",
      text: "Aktivni termini",
    },
    "active-ukupno": {
      css: "",
    },
    inactive: {
      css: "",
    },
    "inactive-naslov": {
      css: "",
      text: "Prosli termini",
    },
    "inactive-ukupno": {
      css: "",
    },
  };
  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 ">
        <div className={json.nema.css}>{json.nema.text}</div>
      </div>
    );
  }

  const sala = await getSala(restoranId);

  const allTables = await getAllTablesFromSala(sala.salaId);
  return (
    <div>
      <div className={json.active.css}>
        <h2 className={json["active-naslov"].css}>
          {json["active-naslov"].text}
        </h2>
        <p className={json["active-ukupno"].css}>
          {activeReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          activeReservations={activeReservations}
          allTables={allTables}
        />
      </div>
      <div className={json.inactive.css}>
        <h2 className={json["inactive-naslov"].css}>
          {json["inactive-naslov"].text}
        </h2>
        <p className={json["inactive-ukupno"].css}>
          {pastReservations.length} Ukupno
        </p>
        <ReservationList
          sala={sala}
          activeReservations={pastReservations}
          allTables={allTables}
        />
      </div>
    </div>
  );
}

export default Page;
