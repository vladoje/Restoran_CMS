import { getRestoranWithSlug } from '@/app/_lib/getRestoran';
import { Linkk, Sajt } from '@/app/_lib/Interfaces';
import { getSite } from '@/app/_lib/getSite';
import { getLinkWithHeaderId } from '@/app/_lib/getLinks';
import Link from 'next/link';

export default async function AdminEditNavigation({ slug }: { slug: string }) {
  const restoran = await getRestoranWithSlug(slug);
  const site: Sajt = await getSite(restoran.siteId);
  const links: Linkk[] = await getLinkWithHeaderId(site.headerId);
const linksWithAuthRoutes = [
  ...links,
  { text: 'Rezervisi', url: `/${slug}/reservation`, linkId: 'rezervisi' },
  { text: 'Login', url: `/${slug}/login`, linkId: 'login' },
  { text: 'Register', url: `/${slug}/register`, linkId: 'register' },
];
  return (
    <nav
      id="header-navigation"
      className="w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <div className="flex w-full items-center gap-1">
        {linksWithAuthRoutes.map((link) => (
          <Link
            key={link?.linkId }
            href={`/${slug}/admin/edit/${link.url
              .replace(/^\/+/, '')
              .replace(new RegExp(`^${slug}/?`), '')}`}
            className="
              flex-1
              rounded-xl
              px-4
              py-2
              text-center
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-slate-100
              hover:text-slate-900
            "
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}