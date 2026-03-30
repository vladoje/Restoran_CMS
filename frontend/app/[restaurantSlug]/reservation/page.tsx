import { Restoran } from "../page";

import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getUser } from "@/app/_lib/getUser";
import { getAllTablesFromSala, getSala } from "@/app/_lib/getTables";
import ReserveTable from "@/app/_components/ReserveTable";
import { User } from "@/app/_components/RegisterHelpers";
export default async function Page({
  params,
}: {
  params: { restaurantSlug: string };
}) {
  const slug = (await params).restaurantSlug;

  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(1),
  ]);
  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId);
  return <ReserveTable user={user} sala={sala} allTables={allTables} />;
}
