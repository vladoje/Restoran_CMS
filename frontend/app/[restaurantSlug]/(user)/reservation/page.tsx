import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import ReserveTable from "@/app/_components/ReserveTable/ReserveTable";
import {
  OpeningHour,
  Restoran,
  SlobodanDan,
  User,
} from "@/app/_lib/Interfaces";
import { get30dayReservationsForTables } from "@/app/_lib/getRezervacije";
import {
  getAllSpecialDates,
  getOpeningHours,
} from "@/app/_lib/getWorkingHours";
import { _json, getDefaultGlobalStyles } from "../_json";
import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";

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
  const specialDates: SlobodanDan[] = await getAllSpecialDates(
    restoran.restoranId,
  );
  const openingHours: OpeningHour[] = await getOpeningHours(
    restoran.restoranId,
  );

  const site = await getSite(restoran.siteId);

  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = site.jsonCSS || _json(restoran);

  return (
    <ReserveTable
      json={json}
      globalStyles={globalStyles}
      specialDates={specialDates}
      openingHours={openingHours}
      user={user}
      restoran={restoran}
      sala={sala}
      rezervacije={rezervacije}
      allTables={allTables}
    />
  );
}
