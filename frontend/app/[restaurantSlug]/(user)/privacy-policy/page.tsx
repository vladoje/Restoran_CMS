import PrivacyPolicy from "@/app/_components/User/PrivacyPolicy/PrivacyPolicy";

export async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  
  return (
   <PrivacyPolicy slug={slug}/>
  );
}

export default Page;
