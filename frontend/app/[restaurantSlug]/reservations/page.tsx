import { getUser } from "@/app/_lib/getUser";
import { Rezervacija } from "../page";

import {
  getOldUserReservations,
  getUserReservations,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { User } from "@/app/_components/RegisterHelpers";
import ReservationList from "@/app/_components/ReservationList";

async function Page() {
  const user: User = await getUser(1);
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);
  const restoranId =
    activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;

  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 mt-16">
        <div className="text-sm text-gray-500 border border-dashed rounded-xl p-6 text-center">
          Nema rezervacija
        </div>
      </div>
    );
  }

  const sala = await getSala(restoranId);

  const allTables = await getAllTablesFromSala(sala.salaId);
  return (
    <div>
      <div>
        <h2>Aktivni termini</h2>
        <p>{activeReservations.length} Ukupno</p>
        <ReservationList
          sala={sala}
          activeReservations={activeReservations}
          allTables={allTables}
        />
      </div>
      <div>
        <h2>Prosli termini</h2>
        <p>{pastReservations.length} Ukupno</p>
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
