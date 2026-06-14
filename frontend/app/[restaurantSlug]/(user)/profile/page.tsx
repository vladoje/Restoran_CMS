import Profile from "@/app/_components/Profile";
import { _json } from "../_json";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const json = _json();
  return <Profile json={json} slug={slug} />;
}

export default Page;
