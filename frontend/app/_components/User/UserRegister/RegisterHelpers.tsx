import { MojJSON } from '@/app/_lib/Interfaces';
import Link from 'next/link';


export function RegisterFooter({
  isEditing,
  json,
  restaurantSlug,
}: {
  json: Record<string, MojJSON>;
  isEditing: boolean;
  restaurantSlug: string;
}) {
  return (
    <p id="register-footer" style={json['register-footer'].css}>
      {json['register-footer'].text}{' '}
      {isEditing ? (
        <button id="register-login-link" disabled={true} style={json['register-login-link'].css}>
          {json['register-login-link'].text}
        </button>
      ) : (
        <Link
          id="register-login-link"
          href={`/${restaurantSlug}/login`}
          style={json['register-login-link'].css}
        >
          {json['register-login-link'].text}
        </Link>
      )}
    </p>
  );
}
export  function RememberMe({ json ,isEditing}: { isEditing:boolean;json: Record<string, MojJSON> }) {
  return (
    <div id="register-options" style={json['register-options'].css}>
      <label id="register-remember-label" style={json['register-remember-label'].css}>
        <input
          disabled={isEditing}
          id="register-remember-checkbox"
          type="checkbox"
          style={json['register-remember-checkbox'].css}
        />

        <span id="register-remember-text" style={json['register-remember-text'].css}>
          {json['register-remember-text'].text}
        </span>
      </label>
    </div>
  );
}
