import SettingsInputs from "@/app/_components/SettingsInputs";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
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
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold m-6">
        Osnovni podaci o vasem restoranu
      </h1>
      <SettingsInputs restoran={restoran} />
    </div>
  );
}

export default Page;
