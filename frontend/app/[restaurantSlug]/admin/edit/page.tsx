/*
siderbar
  preload state
main 
  napraviti izgled telefona u stvarnim velicinama i ucitati pocentu stranicu URADJENO
  izdvojiti user komponente da se mogu pozvati umjesto homepage URADJENO
  
  napraviti novi/prepraviti header i footer i iskljuciti sve linkove u komponentama da samo mjenjaju edit/pageSlug
  napraviti funkcionalnu navigaciju 
  napraviti moguce izabrati elemente i dobiti infomracije o elementu
negdje napraviti sacuvaj button i cuvati promjene izgleda sajta
*/



import { Sidebar } from '@/app/_components/AdminEditPages/Sidebar';

import { Main } from './[pageSlug]/page';

export default async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar />
      <Main slug={slug} />
    </div>
  );
}

