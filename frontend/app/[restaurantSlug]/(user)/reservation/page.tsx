
import Reservation from "@/app/_components/User/Reservation/Reservation";

export default async function Page({
  params,
}: {
  params: { restaurantSlug: string };
}) {
  const slug = (await params).restaurantSlug;


  return (
   <Reservation slug={slug}/>
  );
}
