import createGlobalStylesObject from "@/app/_lib/CMS/createGlobalStylesObject";
import Footer from "../../_components/Footer";
import Header from "../../_components/Header";
import { getDefaultGlobalStyles } from "./_json";
import { getRestoranWithSlug } from "@/app/_lib/getRestoran";
import { getSite } from "@/app/_lib/getSite";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ restaurantSlug: string }>;
}) {
  // console.log(await params);
  const { restaurantSlug } = await params;
  const restoran = await getRestoranWithSlug(restaurantSlug);
  const site = await getSite(restoran.siteId);

  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();

  return (
    <div
      className={`min-h-screen text-${globalStyles.text} flex flex-col bg-${globalStyles.bg}`}
    >
      <Header slug={restaurantSlug} />

      <main className="flex-1">{children}</main>

      <Footer slug={restaurantSlug} />
    </div>
  );
}
