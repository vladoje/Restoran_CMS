import AdminSveRezervacije from "@/app/_components/AdminSveRezervacije";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import {
  get30dayReservationsForRestoran,
  getOldReservationsForRestoran,
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
  const stareRezervacije = await getOldReservationsForRestoran(
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

  return (
    <div>
      <AdminSveRezervacije
        stolovi={stolovi}
        radnoVrijeme={radnoVrijeme}
        sortedRezervacija={rezervacije}
      />
      <AdminSveRezervacije
        stolovi={stolovi}
        radnoVrijeme={radnoVrijeme}
        label="Stare rezervacije"
        sortedRezervacija={stareRezervacije}
      />
    </div>
  );
}

export default Page;
