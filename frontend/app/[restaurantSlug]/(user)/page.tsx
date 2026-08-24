import Homepage from "@/app/_components/User/Homepage";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;

  return (
    <div
     
    >
     <Homepage slug={slug}/>
    </div>
  );
}

export default Page;
