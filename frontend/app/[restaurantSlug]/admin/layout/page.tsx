import ClientLayout from "@/app/_components/Layout/ClientLayout";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import { getUser } from "@/app/_lib/getUser";
import { Restoran, User } from "@/app/_lib/Interfaces";

async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(restaurantSlug),
    getUser(2),
  ]);
  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId)||[];

  // const tableIds = allTables.map((t) => t.tableId);
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold m-6">
        Korisnicima vidljiv izgled vase sale
      </h1>
      <ClientLayout restoran={restoran} sala={sala} stolovi={allTables} />
      {/* <ClientLayout restoran={restoran} sala={sala} stolovi={allTables} /> */}
    </div>
  );
}

export default Page;
