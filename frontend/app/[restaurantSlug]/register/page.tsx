import ClientRegister from "@/app/_components/User/UserRegister/ClientRegister";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { Restoran } from "@/app/_lib/Interfaces";
import {getSite} from "@/app/_lib/getSite";
import createGlobalStylesObject from '@/app/_lib/CMS/createGlobalStylesObject';
import { _json, convertJSON, getDefaultGlobalStyles } from '@/app/[restaurantSlug]/(user)/_json';

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
      <ClientRegister
          json={json}
        restaurantSlug={restaurantSlug}
        restoranId={restoran.restoranId}
      />
    </div>
  );
}

export default Page;
