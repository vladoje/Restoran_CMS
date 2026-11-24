import type { MouseEventHandler } from 'react';
import { FaShieldHalved } from 'react-icons/fa6';
import Modal from './Modal';
import { useModal } from '../_hooks/useModal';
import Link from 'next/link';

import { twj } from 'tw-to-css';
import { MojJSON } from '@/app/_lib/Interfaces';
const closeButtonJSON = {
  'close-button': {
    css: {
      flex: '1 1 0%',
      borderRadius: '0.75rem',
      borderWidth: '2px',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '700',
      color: 'rgb(55,65,81)',
      transitionProperty: 'color, backgroundColor, borderColor, text-decorationColor, fill, stroke',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
      backgroundColor: 'rgb(243,244,246)',
    },
    text: 'Odustani',
  },
};

export function CloseButton(clientJSON?: Record<string, MojJSON>) {
  const { close } = useModal();
  const json = clientJSON?.['close-button'] ? clientJSON : closeButtonJSON;

  return (
    <button id="close-button" onClick={close} style={json['close-button']?.css || {}}>
      {json['close-button']?.text}
    </button>
  );
}
export function ProfileActions({
  slug,
  json,
  isEditing = false,
}: {
  slug: string;
  json: Record<string, MojJSON>;
  isEditing?: boolean;
}) {
  return (
    <div id="profile-actions" style={json['profile-actions']?.css || {}}>
      <Modal.Open opens="odjavi">
        <button
          id="profile-actions-odjavi-button"
          style={json['profile-actions-odjavi-button']?.css || {}}
        >
          {json['profile-actions-odjavi-button']?.text}
        </button>
      </Modal.Open>
      <Modal.Open opens="obrisi">
        <button
          id="profile-actions-obrisi-button"
          style={json['profile-actions-obrisi-button']?.css || {}}
        >
          {json['profile-actions-obrisi-button']?.text}
        </button>
      </Modal.Open>
      <Link
        id="profile-actions-privacy-policy-link"
        href={isEditing ? `/${slug}/admin/edit/privacy-policy` : `/${slug}/privacy-policy`}
        style={json['profile-actions-privacy-policy-link']?.css || {}}
      >
        {json['profile-actions-privacy-policy-link'].icon === 'FaShieldHalved' && (
          <FaShieldHalved size={12} />
        )}{' '}
        {json['profile-actions-privacy-policy-link']?.text}
      </Link>
    </div>
  );
}
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
        <CloseButton clientJSON={json} />

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
