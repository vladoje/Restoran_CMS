import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { Restoran } from "@/app/_lib/Interfaces";

async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  const restoran: Restoran = await getRestoranWithSlug(restaurantSlug);
  return <div></div>;
}

export default Page;
