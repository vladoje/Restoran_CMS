import Profile from "@/app/_components/Profile";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  return <Profile slug={slug} />;
}

export default Page;
