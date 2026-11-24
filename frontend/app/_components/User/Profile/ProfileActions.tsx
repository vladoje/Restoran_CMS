import { FaShieldHalved } from 'react-icons/fa6';
import Modal from '../../Modal';
import { useModal } from '@/app/_hooks/useModal';
import Link from 'next/link';

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

export function CloseButton({
  clientJSON,
  isEditing,
}: {
  clientJSON: Record<string, MojJSON>;
  isEditing: boolean;
}) {
  const { close } = useModal();
  const json = clientJSON?.['close-button'] ? clientJSON : closeButtonJSON;

  return (
    <button
      disabled={isEditing}
      id="close-button"
      onClick={close}
      style={json['close-button']?.css || {}}
    >
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
          disabled={isEditing}
          id="profile-actions-odjavi-button"
          style={json['profile-actions-odjavi-button']?.css || {}}
          className={isEditing ? `cursor-default` : `cursor-pointer`}
        >
          {json['profile-actions-odjavi-button']?.text}
        </button>
      </Modal.Open>
      <Modal.Open opens="obrisi">
        <button
          disabled={isEditing}
          id="profile-actions-obrisi-button"
          style={json['profile-actions-obrisi-button']?.css || {}}
          className={isEditing ? `cursor-default` : `cursor-pointer`}
        >
          {json['profile-actions-obrisi-button']?.text}
        </button>
      </Modal.Open>
      {isEditing ? (
        <button
          disabled={isEditing}
          id="profile-actions-privacy-policy-link"
          style={json['profile-actions-privacy-policy-link']?.css || {}}
        >
          {' '}
          {json['profile-actions-privacy-policy-link'].icon === 'FaShieldHalved' && (
            <FaShieldHalved size={12} />
          )}{' '}
          {json['profile-actions-privacy-policy-link']?.text}
        </button>
      ) : (
        <Link
          id="profile-actions-privacy-policy-link"
          style={json['profile-actions-privacy-policy-link']?.css || {}}
          href={isEditing ? `/${slug}/admin/edit/privacy-policy` : `/${slug}/privacy-policy`}
        >
          {json['profile-actions-privacy-policy-link'].icon === 'FaShieldHalved' && (
            <FaShieldHalved size={12} />
          )}{' '}
          {json['profile-actions-privacy-policy-link']?.text}
        </Link>
      )}
    </div>
  );
}
