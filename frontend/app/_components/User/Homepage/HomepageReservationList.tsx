import { MojJSON, Rezervacija, Sto } from '@/app/_lib/Interfaces';

export  default function HomepageReservationList({
  json,
  activeReservations,
  allTables,
}: {
  json: Record<string, MojJSON>;
  activeReservations: Rezervacija[];
  allTables: Sto[];
}) {

  return (
    <div id="homepage-rezervacije" style={json['homepage-rezervacije'].css || {}}>
      <h2 id="homepage-rezervacije-naslov" style={json['homepage-rezervacije-naslov'].css || {}}>
        {json['homepage-rezervacije-naslov'].text}
      </h2>

      {!activeReservations.length ? (
        <NemaRezervacija json={json} />
      ) : (
        activeReservations.map((res: Rezervacija, i) => {
          const datum = `${res.dateTime.getDate()}.${res.dateTime.getMonth() + 1}.${res.dateTime.getFullYear()}.`;
          const sati =
            res.dateTime.getHours() < 10 ? `0${res.dateTime.getHours()}` : res.dateTime.getHours();
          const minuta =
            res.dateTime.getMinutes() < 10
              ? `0${res.dateTime.getMinutes()}`
              : res.dateTime.getMinutes();
          const start = `${sati}:${minuta}`;

          return <ReservationCard key={i} json={ json} i={i} datum={datum} start={start} res={res} allTables={allTables} />
        })
      )}
    </div>
  );
}
function ReservationCard({
  json,
  i,
  datum,
  start,
  res,allTables,
}: {
  json: Record<string, MojJSON>;
  i: number;
  datum: string;
  start: string;
  res:Rezervacija,
  allTables: Sto[],
}) {
  return (
    <div
      key={i}
      id="homepage-rezervacije-rezervacija"
      className="@container"
      style={json['homepage-rezervacije-rezervacija'].css || {}}
    >
      <div className="flex flex-col gap-3 @min-[600px]:flex-row @min-[600px]:justify-between @min-[600px]:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              id="homepage-rezervacije-datum"
              style={json['homepage-rezervacije-datum'].css || {}}
            >
              {datum}
            </span>
            <span
              id="homepage-rezervacije-tacka"
              style={json['homepage-rezervacije-tacka'].css || {}}
            >
              {json['homepage-rezervacije-tacka'].text}
            </span>
            <span
              id="homepage-rezervacije-start"
              style={json['homepage-rezervacije-start'].css || {}}
            >
              {start}
            </span>
            <span
              id="homepage-rezervacije-tacka"
              style={json['homepage-rezervacije-tacka'].css || {}}
            >
              {json['homepage-rezervacije-tacka'].text}
            </span>
            <span
              id="homepage-rezervacije-gost"
              style={json['homepage-rezervacije-gost'].css || {}}
            >
              {res.numberOfPeople} {res.numberOfPeople > 1 ? 'gosta' : 'gost'}
            </span>
          </div>
          <div id="homepage-rezervacije-sto" style={json['homepage-rezervacije-sto'].css || {}}>
            Sto {allTables.find((t) => t.tableId === res.tableId)?.tableNumber}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            id="homepage-rezervacije-izmjeni"
            style={json['homepage-rezervacije-izmjeni'].css || {}}
          >
            {json['homepage-rezervacije-izmjeni'].text}
          </button>
          <button
            id="homepage-rezervacije-otkazi"
            style={json['homepage-rezervacije-otkazi'].css || {}}
          >
            {json['homepage-rezervacije-otkazi'].text}
          </button>
        </div>
      </div>
    </div>
  );
}
function NemaRezervacija({ json }: {json:Record<string, MojJSON>}) {
  return (
    <div id="homepage-rezervacije-nema" style={json['homepage-rezervacije-nema'].css || {}}>
      {json['homepage-rezervacije-nema'].text}
    </div>
  );
}