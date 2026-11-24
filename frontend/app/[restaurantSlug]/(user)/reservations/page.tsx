import UserReservations from '@/app/_components/User/UserReservations/UserReservations';

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;

  return (
    <UserReservations
slug={slug}
    />
  );
}

export default Page;
