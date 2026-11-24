import PrezentacijaSale from '@/app/_components/PrezentacijaSale/PrezentacijaSale';
import { MojJSON, Rezervacija, Sala, Sto } from '@/app/_lib/Interfaces';

export default function ReservationsReservationCard({
  json,
  i,
  datum,
  start,
  res,
  isPast,
  table,
  allTables,
  sala,
}: {
  json: Record<string, MojJSON>;
  i: number;
  datum: string;
  start: string;
  res: Rezervacija;
  isPast: boolean;
  table?: Sto;
  allTables: Sto[];
  sala: Sala;
}) {
  return (
    <div

      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div
        id="reservationList-res-information-poravnanje"
        style={json['reservationList-res-information-poravnanje']?.css || {}}
      >
        {/* LEFT */}
        <div>
          <div
            id="reservationList-res-datum-start"
            style={json['reservationList-res-datum-start']?.css || {}}
          >
            <span
              id="reservationList-res-datum"
              style={json['reservationList-res-datum']?.css || {}}
            >
              {datum}
            </span>

            <span
              id="reservationList-res-tacka"
              style={json['reservationList-res-tacka']?.css || {}}
            >
              {json['reservationList-res-tacka']?.text}
            </span>

            <span
              id="reservationList-res-start"
              style={json['reservationList-res-start']?.css || {}}
            >
              {start}
            </span>

            <span
              id="reservationList-res-tacka"
              style={json['reservationList-res-tacka']?.css || {}}
            >
              {json['reservationList-res-tacka']?.text}
            </span>

            <span id="reservationList-res-gost" style={json['reservationList-res-gost']?.css || {}}>
              {res.numberOfPeople} {res.numberOfPeople > 1 ? 'gosta' : 'gost'}
            </span>

            {/* STATUS */}
            <span
              id={isPast ? 'reservationList-res-status-past' : 'reservationList-res-status-new'}
              style={{
                ...(isPast
                  ? json['reservationList-res-status-past']?.css || {}
                  : json['reservationList-res-status-new']?.css || {}),
              }}
            >
              {isPast
                ? json['reservationList-res-status-past']?.text
                : json['reservationList-res-status-new']?.text}
            </span>
          </div>

          <div id="reservationList-res-sto" style={json['reservationList-res-sto']?.css || {}}>
            Sto {table?.tableNumber ?? '—'}
          </div>
        </div>

        {/* ACTIONS */}
        {!isPast && (
          <div
            id="reservationList-brzeAkcije"
            style={json['reservationList-brzeAkcije']?.css || {}}
          >
            <button
              id="reservationList-res-izmjeni"
              style={json['reservationList-res-izmjeni']?.css || {}}
            >
              {json['reservationList-res-izmjeni']?.text}
            </button>
            <button
              id="reservationList-res-otkazi"
              style={json['reservationList-res-otkazi']?.css || {}}
            >
              {json['reservationList-res-otkazi']?.text}
            </button>
          </div>
        )}
      </div>

      <PrezentacijaSale
        stolovi={allTables}
        sala={sala}
        json={json}
        x={60}
        y={60}
        i={i}
        tId={res.tableId}
      />
    </div>
  );
}
