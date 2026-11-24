import { MojJSON } from '@/app/_lib/Interfaces';
import { MouseEventHandler } from 'react';
import { CloseButton } from '@/app/_components/User/Profile/ProfileActions';
import Link from 'next/link';

export function Window({
  handle,
  odjavi = false,
  href,
  json,
  isEditing = false,
}: {
  handle: MouseEventHandler<HTMLButtonElement>;
  odjavi?: boolean;
  isEditing?: boolean;
  href?: string;
  json: Record<string, MojJSON>;
}) {
  const currentButtonKey = odjavi ? 'window-button-odjavi' : 'window-button-obrisi';

  return (
    <div id="window" style={json['window']?.css || {}}>
      <h2 id="window-naslov-odjavi" style={json['window-naslov-odjavi']?.css || {}}>
        {odjavi ? json['window-naslov-odjavi']?.text : json['window-naslov-obrisi']?.text}
      </h2>
      <p id="window-paragraf-odjavi" style={json['window-paragraf-odjavi']?.css || {}}>
        {odjavi ? json['window-paragraf-odjavi']?.text : json['window-paragraf-obrisi']?.text}
      </p>

      {/* Ovde se koristi u potpunosti tvoj 'window-buttons' iz JSON-a */}
      <div id="window-buttons" style={json['window-buttons']?.css || {}}>
        <CloseButton isEditing={isEditing} clientJSON={json} />

        {href ? (
          href && !isEditing ? (
            <Link
              href={href}
              style={{ display: 'flex', flex: json['close-button']?.css?.flex || '1 1 0%' }}
            >
              <button
                id="window-button-odjavi"
                onClick={handle}
                style={{
                  width: '100%',
                  ...(json[currentButtonKey]?.css || {}),
                }}
              >
                {json[currentButtonKey]?.text}
              </button>
            </Link>
          ) : (
            <div style={{ display: 'flex', flex: json['close-button']?.css?.flex || '1 1 0%' }}>
              <button
                disabled={isEditing}
                id="window-button-odjavi"
                onClick={handle}
                style={{
                  width: '100%',
                  ...(json[currentButtonKey]?.css || {}),
                  cursor: isEditing ? 'not-allowed' : 'pointer', // Opcionalno za vizuelni pokazatelj
                }}
              >
                {json[currentButtonKey]?.text}
              </button>
            </div>
          )
        ) : (
          <button
            id="window-button-odjavi"
            disabled={isEditing}
            onClick={handle}
            style={json[currentButtonKey]?.css || {}}
          >
            {json[currentButtonKey]?.text}
          </button>
        )}
      </div>
    </div>
  );
}
