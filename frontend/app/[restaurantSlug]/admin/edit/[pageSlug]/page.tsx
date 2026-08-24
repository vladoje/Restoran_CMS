interface Props {
  params: Promise<{
    pageSlug: string;
    restaurantSlug: string
  }>;
}


import { _json, convertJSON, getDefaultGlobalStyles } from '@/app/[restaurantSlug]/(user)/_json';
import { Sidebar } from '@/app/_components/AdminEditPages/Sidebar';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import Homepage from '@/app/_components/User/Homepage';
import PrivacyPolicy from '@/app/_components/User/PrivacyPolicy';
import Profile from '@/app/_components/User/Profile';
import Reservation from '@/app/_components/User/Reservation';
import Reservations from '@/app/_components/User/Reservations';
import createGlobalStylesObject from '@/app/_lib/CMS/createGlobalStylesObject';
import { getRestoranWithSlug } from '@/app/_lib/getRestoran';
import { getSite } from '@/app/_lib/getSite';

export default async function Page({ params }: Props) {
  const slug = (await params).restaurantSlug;
const  pageSlug  = (await params).pageSlug;
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar />
      <Main pageSlug={pageSlug} slug={slug} />
    </div>
  );
}

export async function Main({ slug,pageSlug }: { slug: string,pageSlug?:string }) {
    const restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);
  const globalStyles =
    createGlobalStylesObject(site) || getDefaultGlobalStyles();
  const json = convertJSON(site.jsonCSS || _json(restoran),globalStyles);
  return (
    /* overflow-x-hidden ubija horizontalni skrol, a overflow-y-auto ostavlja samo vertikalni */
    <main className="min-w-0 flex-1 bg-gray-100 overflow-y-auto overflow-x-hidden h-full">
      
      {/* Kontejner sa w-full i box-sizing zaštitom */}
      <div className="flex justify-center py-12 px-4 min-h-full items-center w-full box-border">
        
        {/* Telefon sa fiksnim dimenzijama */}
        <div className="w-93.75 h-187.5 shrink-0 border-10 border-slate-900 rounded-[40px] shadow-2xl bg-white flex flex-col overflow-hidden relative">
          
          {/* Unutrašnji skrol za sadržaj sajta */}

<div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
  <Header slug={slug} />
 {!pageSlug&& <Homepage slug={slug} />}
 {pageSlug==="profile"&& <Profile json={json} slug={slug} />}
 {pageSlug==="privacy-policy"&& <PrivacyPolicy  slug={slug} />}
 {pageSlug==="reservation"&& <Reservation  slug={slug} />}
 {pageSlug==="reservations"&& <Reservations  slug={slug} />}
  <Footer slug={slug} />
</div>

        </div>

      </div>
    </main>
  );
}