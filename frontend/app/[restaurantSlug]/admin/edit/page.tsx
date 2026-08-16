/*
font rijesen
linijice koje razdvajaju polja
range-ovi sa state-om
preload state
*/



import { Sidebar } from '@/app/_components/AdminEditPages/Sidebar';

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Sidebar />
      <Main />
    </div>
  );
}

export function Main() {
  return (
    <main className="min-w-0 flex-1 overflow-auto bg-white">
      Main
    </main>
  );
}