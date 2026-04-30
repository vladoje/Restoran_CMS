import TwoButtons from "@/app/_components/AdminAddReservation/TwoButtons";
import AdminSveRezervacije from "@/app/_components/AdminSveRezervacije";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import {
  get30dayReservationsForRestoran,
  get7dayReservationsForRestoran,
  getReservationsInProgressForRestoran,
  getTodayReservationsForRestoran,
} from "@/app/_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { getOpeningHours } from "@/app/_lib/getWorkingHours";
import { OpeningHour, Restoran } from "@/app/_lib/Interfaces";

async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  const restoran: Restoran = await getRestoranWithSlug(restaurantSlug);
  const rezervacije = await get30dayReservationsForRestoran(
    restoran.restoranId,
  );
  const sala = await getSala(restoran.restoranId);
  const stolovi = await getAllTablesFromSala(sala.salaId);
  const radnoVrijemee: OpeningHour[] = await getOpeningHours(
    restoran.restoranId,
  );
  const radnoVrijeme = [...radnoVrijemee].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek,
  );
  const [rezervacijeZaDanas, rezervacijeZaOvuSedmicu, rezervacijeUToku] =
    await Promise.all([
      getTodayReservationsForRestoran(restoran.restoranId),
      get7dayReservationsForRestoran(restoran.restoranId),
      getReservationsInProgressForRestoran(
        restoran.restoranId,
        restoran.trajanjeRezervacije,
      ),
    ]);

  const zauzetiStolovi: number[] = [];
  rezervacijeUToku?.map((rez) => {
    if (!zauzetiStolovi.includes(rez.tableId)) zauzetiStolovi.push(rez.tableId);
  });
  return (
    <div className="m-8">
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kontrolna tabla</h1>
          <p className="text-gray-500 mt-1">
            Pregled rezervacija i stanja u restoranu
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DANAS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Rezervacija danas</p>
            <h2 className="text-3xl font-semibold mt-2">
              {rezervacijeZaDanas.length}
            </h2>
          </div>

          {/* SEDMICA */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Ove sedmice</p>
            <h2 className="text-3xl font-semibold mt-2">
              {rezervacijeZaOvuSedmicu.length}
            </h2>
          </div>

          {/* STOLOVI */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Zauzeti stolovi</p>
            <h2 className="text-3xl font-semibold mt-2">
              {zauzetiStolovi.length}
              <span className="text-base text-gray-400 ml-1">
                / {stolovi.length}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <TwoButtons stolovi={stolovi} sala={sala} restoran={restoran} />
      <div>
        <AdminSveRezervacije
          stolovi={stolovi}
          radnoVrijeme={radnoVrijeme}
          sortedRezervacija={rezervacije}
        />
      </div>
    </div>
  );
}

export default Page;
