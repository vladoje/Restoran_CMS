import { twj } from "tw-to-css";

import { getServerSession } from "next-auth";
import NewUserDashboard from "@/app/_components/NewUserDashboard";

import { getSite } from "@/app/_lib/getSite";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Restoran, Rezervacija, Sajt, Sala, User } from '@/app/_lib/Interfaces';
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import { getUserReservations } from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { _json, convertJSON, getDefaultGlobalStyles } from "@/app/[restaurantSlug]/(user)/_json";

import BrzeAkcije from '@/app/_components/User/Homepage/BrzeAkcije';
import RestaurantHeader from '@/app/_components/User/Homepage/RestaurantHeader';
import HomepageReservationList from '@/app/_components/User/Homepage/HomepageReservationList';
async function Homepage({
  slug,
  preset,
  isEditing = false,
}: {
  slug: string;
  isEditing?: boolean;
  preset?:string;
}) {
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(session.user.id),
  ]);

  const [activeReservations, site, sala]: [Rezervacija[], Sajt, Sala] = await Promise.all([
    getUserReservations(user.userId),
    getSite(restoran.siteId),
    getSala(restoran.restoranId),
  ]);

  const allTables = await getAllTablesFromSala(sala.salaId);

  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);
  console.log((preset));
  return (
    <div
      style={twj(
        `bg-${globalStyles.bg} text-${globalStyles.text} max-w-6xl mx-auto px-4 py-8` || '',
      )}
    >
      <RestaurantHeader json={json} />

      <BrzeAkcije json={json} isEditing={isEditing} slug={slug} />

      <HomepageReservationList
        json={json}
        activeReservations={
          preset
            ? Number(preset) === 0
              ? []
              : Number(preset) === 1
                ? sampleReservations
                : activeReservations
            : activeReservations
        }
        allTables={allTables}
      />
    </div>
  );
}
const sampleReservations = [
  {
    reservationId: 1,
    restoranId: 1,
    userId: 101,
    tableId: 3,
    dateTime: new Date('2026-10-21T12:00:00'),
    durration: '1h 30min',
    numberOfPeople: 2,
    note: 'Miza ob oknu, prosim.',
    status: 'Potrjena',
  },
  {
    reservationId: 2,
    restoranId: 1,
    userId: 102,
    tableId: 5,
    dateTime: new Date('2026-10-21T13:30:00'),
    durration: '2h',
    numberOfPeople: 4,
    note: 'Rojstnodnevno kosilo.',
    status: 'Potrjena',
  },
  {
    reservationId: 3,
    restoranId: 1,
    userId: 103,
    tableId: 2,
    dateTime: new Date('2026-10-21T18:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Brez posebnih želja.',
    status: 'Na čakanju',
  },
  {
    reservationId: 4,
    restoranId: 1,
    userId: 104,
    tableId: 7,
    dateTime: new Date('2026-10-22T19:00:00'),
    durration: '2h',
    numberOfPeople: 6,
    note: 'Potrebujemo otroški stol.',
    status: 'Potrjena',
  },
  {
    reservationId: 5,
    restoranId: 1,
    userId: 105,
    tableId: 1,
    dateTime: new Date('2026-10-22T20:30:00'),
    durration: '1h 30min',
    numberOfPeople: 3,
    note: 'Ena oseba je vegetarijanka.',
    status: 'Preklicana',
  },
] as Rezervacija[];

export default Homepage;
