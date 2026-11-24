import ClientLogin from "@/app/_components/User/UserLogin/ClientLogin";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { Restoran } from "@/app/_lib/Interfaces";
import { _json, convertJSON, getDefaultGlobalStyles } from '@/app/[restaurantSlug]/(user)/_json';
import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import {getSite} from "@/app/_lib/getSite";

async function Page({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;
  const restoran: Restoran = await getRestoranWithSlug(restaurantSlug);
    const site = await getSite(restoran.siteId);
  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();

  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);
  return (
    <div>
      <ClientLogin restaurantSlug={restaurantSlug} restoranId={restoran.restoranId} json={json} />
    </div>
  );
}

export default Page;
