import AdminEditNavigation from '@/app/_components/AdminEditNavigationAndOptions/AdminEditNavigation';
import { _json, convertJSON, getDefaultGlobalStyles } from '@/app/[restaurantSlug]/(user)/_json';
import { Sidebar } from '@/app/_components/AdminEditPages/Sidebar';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import Homepage from '@/app/_components/User/Homepage/Homepage';
import PrivacyPolicy from '@/app/_components/User/PrivacyPolicy/PrivacyPolicy';
import Profile from '@/app/_components/User/Profile/Profile';
import Reservation from '@/app/_components/User/Reservation/Reservation';
import createGlobalStylesObject from '@/app/_lib/CMS/createGlobalStylesObject';
import { getRestoranWithSlug } from '@/app/_lib/getRestoran';
import { getSite } from '@/app/_lib/getSite';
import UserReservations from '@/app/_components/User/UserReservations/UserReservations';
import ClientLogin from '@/app/_components/User/UserLogin/ClientLogin';
import ClientRegister from '@/app/_components/User/UserRegister/ClientRegister';
import PresetSwitches from "@/app/_components/AdminEditNavigationAndOptions/PresetSwitches";


export interface CMSEditProps {
  params: Promise<{
    pageSlug: string;
    restaurantSlug: string;
  }>;
  searchParams: Promise<{
    preset?: string;
  }>;
}
export default async function Page({ params, searchParams }: CMSEditProps) {
  const { restaurantSlug: slug, pageSlug } = await params;
  const { preset } = await searchParams;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar />
      <Main preset={preset} pageSlug={pageSlug} slug={slug} />
    </div>
  );
}
export async function Main({ slug, pageSlug, preset }: { slug: string; pageSlug?: string; preset?: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const site = await getSite(restoran.siteId);

  const globalStyles = createGlobalStylesObject(site) || getDefaultGlobalStyles();

  const json = convertJSON(site.jsonCSS || _json(restoran), globalStyles);

  return (
    <main className="min-w-0 flex-1 bg-gray-100 overflow-y-auto overflow-x-hidden h-full">
      <div className="flex min-h-full w-full flex-col items-center px-4 py-8 box-border">
        {/* Editor navigation */}
        <div className="mb-5 w-full max-w-3xl">
          <AdminEditNavigation slug={slug} />
        </div>
        <PresetSwitches pageSlug={pageSlug}  />
        {/* Phone */}
        <div className="w-93.75 h-187.5 shrink-0 border-10 border-slate-900 rounded-[40px] shadow-2xl bg-white flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
            <Header slug={slug} isEditing={true} />

            <div className="m-2">
              {!pageSlug && <Homepage isEditing={true} preset={preset} slug={slug} />}

              {pageSlug === 'profile' && <Profile isEditing={true} json={json} slug={slug} />}

              {pageSlug === 'privacy-policy' && <PrivacyPolicy isEditing={true} slug={slug} />}

              {pageSlug === 'reservation' && (
                <Reservation preset={preset} isEditing={true} slug={slug} />
              )}

              {pageSlug === 'reservations' && (
                <UserReservations preset={preset} isEditing={true} slug={slug} />
              )}

              {pageSlug === 'login' && (
                <ClientLogin
                  json={json}
                  isEditing={true}
                  restoranId={restoran.restoranId}
                  restaurantSlug={slug}
                />
              )}
              {pageSlug === 'register' && (
                <ClientRegister
                  restoranId={restoran.restoranId}
                  isEditing={true}
                  restaurantSlug={slug}
                  json={json}
                />
              )}
            </div>

            <Footer isEditing={true} slug={slug} />
          </div>
        </div>
      </div>
    </main>
  );
}