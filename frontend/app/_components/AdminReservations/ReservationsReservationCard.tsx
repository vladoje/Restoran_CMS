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
  isEditing = false,
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
  isEditing: boolean;
}) {
  return (
    <div
      id="reservationList-res-card"
      style={{
        ...(json['reservationList-res-card']?.css || {}),
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      }}
    >
      <div
        id="reservationList-res-information-poravnanje"
        style={{
          ...(json['reservationList-res-information-poravnanje']?.css || {}),
          minWidth: 0,
          maxWidth: '100%',
          flex: '1 1 auto',
        }}
      >
        <div
          id="reservationList-res-datum-start"
          style={{
            ...(json['reservationList-res-datum-start']?.css || {}),
            minWidth: 0,
            maxWidth: '100%',
          }}
        >
          <span id="reservationList-res-datum" style={json['reservationList-res-datum']?.css || {}}>
            {datum}
          </span>

          <span id="reservationList-res-tacka" style={json['reservationList-res-tacka']?.css || {}}>
            {json['reservationList-res-tacka']?.text}
          </span>

          <span id="reservationList-res-start" style={json['reservationList-res-start']?.css || {}}>
            {start}
          </span>

          <span id="reservationList-res-tacka" style={json['reservationList-res-tacka']?.css || {}}>
            {json['reservationList-res-tacka']?.text}
          </span>

          <span id="reservationList-res-gost" style={json['reservationList-res-gost']?.css || {}}>
            {res.numberOfPeople} {res.numberOfPeople > 1 ? 'gosta' : 'gost'}
          </span>

          <span
            id={isPast ? 'reservationList-res-status-past' : 'reservationList-res-status-new'}
            style={
              isPast
                ? json['reservationList-res-status-past']?.css || {}
                : json['reservationList-res-status-new']?.css || {}
            }
          >
            {isPast
              ? json['reservationList-res-status-past']?.text
              : json['reservationList-res-status-new']?.text}
          </span>
        </div>

        <div id="reservationList-res-sto" style={json['reservationList-res-sto']?.css || {}}>
          Sto {table?.tableNumber ?? '—'}
        </div>

        {!isPast && (
          <div
            id="reservationList-brzeAkcije"
            style={json['reservationList-brzeAkcije']?.css || {}}
          >
            <button
              disabled={isEditing}
              id="reservationList-res-izmjeni"
              style={json['reservationList-res-izmjeni']?.css || {}}
              className={isEditing ? `cursor-default` : `cursor-pointer`}
            >
              {json['reservationList-res-izmjeni']?.text}
            </button>

            <button
              disabled={isEditing}
              id="reservationList-res-otkazi"
              style={json['reservationList-res-otkazi']?.css || {}}
              className={isEditing ? `cursor-default` : `cursor-pointer`}
            >
              {json['reservationList-res-otkazi']?.text}
            </button>
          </div>
        )}
      </div>

      <div
        id="reservationList-res-sala"
        style={{
          ...(json['reservationList-res-sala']?.css || {}),
          flexShrink: 0,
        }}
      >
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
    </div>
  );
}
