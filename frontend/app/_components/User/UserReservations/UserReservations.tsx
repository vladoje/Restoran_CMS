import ReservationList from '@/app/_components/AdminReservations/ReservationList';
import {  Restoran, Rezervacija, Sajt,  User } from '@/app/_lib/Interfaces';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import NewUserDashboard from '@/app/_components/NewUserDashboard';
import { getRestoranWithSlug } from '@/app/_lib/getRestoran';
import { getUser } from '@/app/_lib/getUser';
import { getOldUserReservations, getUserReservations } from '@/app/_lib/getRezervacije';
import { getSite } from '@/app/_lib/getSite';
import createGlobalStylesObject from '@/app/_lib/CMS/createGlobalStylesObject';
import { _json, convertJSON, getDefaultGlobalStyles } from '@/app/[restaurantSlug]/(user)/_json';
import { getAllTablesFromSala, getSala } from '@/app/_lib/getTables';

export default async function UserReservations({
 slug,
  preset,
  isEditing=false
}: {
 slug: string;
 preset?: string;
 isEditing?: boolean;
}) {
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(session.user.id),
  ]);

  const [activeReservations, pastReservations, site]: [Rezervacija[], Rezervacija[], Sajt] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
      getSite(restoran.siteId),
    ]);

  const restoranId = activeReservations.at(0)?.restoranId ?? pastReservations.at(0)?.restoranId;
  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);
  if (!restoranId) {
    // nema ništa → render empty state
    return (
      <div className="space-y-4 ">
        <div style={json['reservations-nema']?.css || {}}>{json['reservations-nema']?.text}</div>
      </div>
    );
  }
  const sala = await getSala(restoranId);

  const allTables = await getAllTablesFromSala(sala.salaId);
  let activeReservationsBasedOnPreset = [...activeReservations];
  let inactiveReservationsBasedOnPreset = [...pastReservations];

  if(preset){

  activeReservationsBasedOnPreset = preset
    ? Number(preset) === 0
      ? presetZeroActiveReservations
      : Number(preset) === 1
        ? presetOneActiveReservations
        : Number(preset) === 2
          ? presetTwoActiveReservations
          : Number(preset) === 3
            ? presetThreeActiveReservations
            : activeReservations
    : activeReservations;
    inactiveReservationsBasedOnPreset = preset
      ? Number(preset) === 0
        ? presetZeroInactiveReservations
        : Number(preset) === 1
          ? presetOneInactiveReservations
          : Number(preset) === 2
            ? presetTwoInactiveReservations
            : Number(preset) === 3
              ? presetThreeInactiveReservations
              : pastReservations
      : pastReservations;

  }

  return (
    <div>
      <div id="reservations-active" style={json['reservations-active'].css || {}}>
        <h2 id="reservations-active-naslov" style={json['reservations-active-naslov'].css || {}}>
          {json['reservations-active-naslov'].text}
        </h2>
        <p id="reservations-active-ukupno" style={json['reservations-active-ukupno'].css || {}}>
          {activeReservationsBasedOnPreset.length} Ukupno
        </p>
        <ReservationList
          activeOrPast="active"
          isEditing={isEditing}
          sala={sala}
          json={json}
          activeReservations={activeReservationsBasedOnPreset}
          allTables={allTables}
        />
      </div>
      <div id="reservations-inactive" style={json['reservations-inactive'].css || {}}>
        <h2
          id="reservations-inactive-naslov"
          style={json['reservations-inactive-naslov'].css || {}}
        >
          {json['reservations-inactive-naslov'].text}
        </h2>
        <p id="reservations-inactive-ukupno" style={json['reservations-inactive-ukupno'].css || {}}>
          {inactiveReservationsBasedOnPreset.length} Ukupno
        </p>
        <ReservationList
          activeOrPast="past"
          isEditing={isEditing}
          sala={sala}
          json={json}
          activeReservations={inactiveReservationsBasedOnPreset}
          allTables={allTables}
        />
      </div>
    </div>
  );
}
const presetZeroActiveReservations = [] as Rezervacija[];
const presetZeroInactiveReservations = [] as Rezervacija[];

const presetOneActiveReservations = [
  {
    reservationId: 1,
    restoranId: 1,
    userId: 101,
    tableId: 1,
    dateTime: new Date('2026-10-21T12:00:00'),
    durration: '1h 30min',
    numberOfPeople: 2,
    note: 'Miza ob oknu.',
    status: 'Potrjena',
  },
  {
    reservationId: 2,
    restoranId: 1,
    userId: 102,
    tableId: 2,
    dateTime: new Date('2026-10-21T13:00:00'),
    durration: '2h',
    numberOfPeople: 4,
    note: 'Rojstnodnevno kosilo.',
    status: 'Potrjena',
  },
  {
    reservationId: 3,
    restoranId: 1,
    userId: 103,
    tableId: 3,
    dateTime: new Date('2026-10-21T18:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Brez posebnih želja.',
    status: 'Potrjena',
  },
  {
    reservationId: 4,
    restoranId: 1,
    userId: 104,
    tableId: 4,
    dateTime: new Date('2026-10-21T19:00:00'),
    durration: '2h',
    numberOfPeople: 6,
    note: 'Otroški stol.',
    status: 'Potrjena',
  },
] as Rezervacija[];
const presetOneInactiveReservations = [] as Rezervacija[];

const presetTwoActiveReservations = [] as Rezervacija[];
const presetTwoInactiveReservations = [
  {
    reservationId: 5,
    restoranId: 1,
    userId: 105,
    tableId: 1,
    dateTime: new Date('2026-10-18T12:00:00'),
    durration: '1h 30min',
    numberOfPeople: 2,
    note: 'Kosilo.',
    status: 'Zaključena',
  },
  {
    reservationId: 6,
    restoranId: 1,
    userId: 106,
    tableId: 2,
    dateTime: new Date('2026-10-18T14:00:00'),
    durration: '2h',
    numberOfPeople: 4,
    note: 'Družinsko kosilo.',
    status: 'Zaključena',
  },
  {
    reservationId: 7,
    restoranId: 1,
    userId: 107,
    tableId: 3,
    dateTime: new Date('2026-10-19T18:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Brez posebnih želja.',
    status: 'Preklicana',
  },
  {
    reservationId: 8,
    restoranId: 1,
    userId: 108,
    tableId: 4,
    dateTime: new Date('2026-10-19T20:00:00'),
    durration: '2h',
    numberOfPeople: 5,
    note: 'Večerja s prijatelji.',
    status: 'Zaključena',
  },
] as Rezervacija[];

const presetThreeActiveReservations = [
  {
    reservationId: 9,
    restoranId: 1,
    userId: 109,
    tableId: 1,
    dateTime: new Date('2026-10-22T12:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Miza ob oknu.',
    status: 'Potrjena',
  },
  {
    reservationId: 10,
    restoranId: 1,
    userId: 110,
    tableId: 2,
    dateTime: new Date('2026-10-22T13:00:00'),
    durration: '1h 30min',
    numberOfPeople: 3,
    note: 'Kosilo.',
    status: 'Potrjena',
  },
  {
    reservationId: 11,
    restoranId: 1,
    userId: 111,
    tableId: 3,
    dateTime: new Date('2026-10-22T18:00:00'),
    durration: '2h',
    numberOfPeople: 4,
    note: 'Rojstni dan.',
    status: 'Potrjena',
  },
  {
    reservationId: 12,
    restoranId: 1,
    userId: 112,
    tableId: 4,
    dateTime: new Date('2026-10-22T19:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Brez posebnih želja.',
    status: 'Potrjena',
  },
] as Rezervacija[];
const presetThreeInactiveReservations = [
  {
    reservationId: 13,
    restoranId: 1,
    userId: 113,
    tableId: 1,
    dateTime: new Date('2026-10-16T12:00:00'),
    durration: '1h',
    numberOfPeople: 2,
    note: 'Kosilo.',
    status: 'Zaključena',
  },
  {
    reservationId: 14,
    restoranId: 1,
    userId: 114,
    tableId: 2,
    dateTime: new Date('2026-10-16T14:00:00'),
    durration: '2h',
    numberOfPeople: 4,
    note: 'Družinsko kosilo.',
    status: 'Zaključena',
  },
  {
    reservationId: 15,
    restoranId: 1,
    userId: 115,
    tableId: 3,
    dateTime: new Date('2026-10-17T18:00:00'),
    durration: '1h 30min',
    numberOfPeople: 3,
    note: 'Večerja.',
    status: 'Preklicana',
  },
  {
    reservationId: 16,
    restoranId: 1,
    userId: 116,
    tableId: 4,
    dateTime: new Date('2026-10-17T20:00:00'),
    durration: '2h',
    numberOfPeople: 6,
    note: 'Večerja s prijatelji.',
    status: 'Zaključena',
  },
] as Rezervacija[];