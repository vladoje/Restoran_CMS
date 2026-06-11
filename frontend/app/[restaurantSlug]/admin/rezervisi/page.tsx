import ReserveTable from "@/app/_components/ReserveTable/ReserveTable";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { get30dayReservationsForTables } from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { getUser } from "@/app/_lib/getUser";
import {
  getAllSpecialDates,
  getOpeningHours,
} from "@/app/_lib/getWorkingHours";
import {
  OpeningHour,
  Restoran,
  SlobodanDan,
  User,
} from "@/app/_lib/Interfaces";

export default async function Page({
  params,
}: {
  params: { restaurantSlug: string };
}) {
  const slug = (await params).restaurantSlug;

  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(2),
  ]);
  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId);

  const tableIds = allTables.map((t) => t.tableId);

  const rezervacije = await get30dayReservationsForTables(tableIds);
  const specialDates: SlobodanDan[] = await getAllSpecialDates(
    restoran.restoranId,
  );
  const openingHours: OpeningHour[] = await getOpeningHours(
    restoran.restoranId,
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mt-6">Napravite rezervaciju stola</h1>
      <ReserveTable
        specialDates={specialDates}
        openingHours={openingHours}
        isAdmin={true}
        user={user}
        restoran={restoran}
        sala={sala}
        rezervacije={rezervacije}
        allTables={allTables}
      />
    </div>
  );
}
