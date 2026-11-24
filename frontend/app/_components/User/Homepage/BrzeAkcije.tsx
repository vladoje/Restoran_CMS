import { MojJSON } from '@/app/_lib/Interfaces';
import Link from 'next/link';

export default function BrzeAkcije({
  json,
  isEditing,
  slug,
}: {
  json: Record<string, MojJSON>;
  isEditing: boolean;
  slug: string;
}) {
  return (
    <div className="grid grid-cols-1 max-w-64 gap-6">
      <div id="homepage-brzeAkcije" style={json['homepage-brzeAkcije'].css || {}}>
        <h2 id="homepage-brzeAkcije-naslov" style={json['homepage-brzeAkcije-naslov'].css || {}}>
          {json['homepage-brzeAkcije-naslov'].text}
        </h2>
        <p id="homepage-brzeAkcije-text" style={json['homepage-brzeAkcije-text'].css || {}}>
          {json['homepage-brzeAkcije-text'].text}
        </p>
        {isEditing ? (
          <button id="homepage-brzeAkcije-link" style={json['homepage-brzeAkcije-link'].css || {}}>
            {json['homepage-brzeAkcije-link'].text}
          </button>
        ) : (
          <Link
            id="homepage-brzeAkcije-link"
            style={json['homepage-brzeAkcije-link'].css || {}}
            href={!isEditing ? `${slug}/reservation` : `/${slug}/admin/edit/reservation`}
          >
            {json['homepage-brzeAkcije-link'].text}
          </Link>
        )}
      </div>
    </div>
  );
}
