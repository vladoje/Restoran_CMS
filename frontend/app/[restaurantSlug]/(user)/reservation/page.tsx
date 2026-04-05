import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import ReserveTable from "@/app/_components/ReserveTable";
import { Restoran, User } from "@/app/_lib/Interfaces";
import { get30dayReservationsForTables } from "@/app/_lib/getRezervacije";

export default async function Page({
  params,
}: {
  params: { restaurantSlug: string };
}) {
  const slug = (await params).restaurantSlug;

  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(1),
  ]);
  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId);

  const tableIds = allTables.map((t) => t.tableId);

  const rezervacije = await get30dayReservationsForTables(tableIds);
  return (
    <ReserveTable
      user={user}
      restoran={restoran}
      sala={sala}
      rezervacije={rezervacije}
      allTables={allTables}
    />
  );
}
