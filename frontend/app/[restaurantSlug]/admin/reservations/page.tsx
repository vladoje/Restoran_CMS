import AdminSveRezervacije from "@/app/_components/AdminSveRezervacije";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { get30dayReservationsForRestoran } from "@/app/_lib/getRezervacije";
import { Restoran } from "@/app/_lib/Interfaces";

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
  // [...rezervacije] da ne bi mjenjali rezervacije niz
  const sortedRezervacija = [...rezervacije].sort((a, b) => {
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });
  return (
    <div>
      <AdminSveRezervacije sortedRezervacija={sortedRezervacija} />
    </div>
  );
}

export default Page;
