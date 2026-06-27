import Profile from "@/app/_components/Profile";
import { _json, getDefaultGlobalStyles } from "../_json";
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getSite } from "@/app/_lib/getSite";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = site.jsonCSS || _json(restoran);
  return <Profile json={json} slug={slug} globalStyles={globalStyles} />;
}

export default Page;
