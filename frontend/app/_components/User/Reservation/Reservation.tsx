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

import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { _json, convertJSON, getDefaultGlobalStyles } from "@/app/[restaurantSlug]/(user)/_json";
import NewUserDashboard from '@/app/_components/NewUserDashboard';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Reservation({ slug,preset, isEditing=false }: {preset?:string; slug: string; isEditing?: boolean }) {
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(session.user.id),
  ]);

  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId);

  const tableIds = allTables.map((t) => t.tableId);

  const rezervacije = await get30dayReservationsForTables(tableIds);
  const specialDates: SlobodanDan[] = await getAllSpecialDates(restoran.restoranId);
  const openingHours: OpeningHour[] = await getOpeningHours(restoran.restoranId);

  const site = await getSite(restoran.siteId);

  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);

  return (
    <ReserveTable
      preset={preset}
      json={json}
      isEditing={isEditing}
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
