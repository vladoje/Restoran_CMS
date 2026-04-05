export const daysOfWeek2 = {
  0: "Ponedjeljak",
  1: "Utorak",
  2: "Srijeda",
  3: "Četvrtak",
  4: "Petak",
  5: "Subota",
  6: "Nedjelja",
};

import DateTable from "@/app/_components/DateTable";
import StandardWorkTime from "@/app/_components/StandardWorkTime";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import {
  getAllSpecialDates,
  getOpeningHours,
} from "@/app/_lib/getWorkingHours";
import { Restoran, User } from "@/app/_lib/Interfaces";

async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(restaurantSlug),
    getUser(1),
  ]);
  const specialDate = await getAllSpecialDates(restoran.restoranId);
  const openingHours = await getOpeningHours(restoran.restoranId);
  return (
    <main className="flex-1 p-5 max-w-xl mx-auto w-full pb-24 text-gray-800">
      {/* Sekcija za specifične datume */}
      <DateTable />

      {/* Standardno radno vrijeme */}
      <StandardWorkTime openingHours={openingHours} />
    </main>
  );
}

export default Page;
