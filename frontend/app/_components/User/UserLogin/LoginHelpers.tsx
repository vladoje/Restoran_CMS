import { MojJSON } from '@/app/_lib/Interfaces';
import Link from 'next/link';

export function UserLoginFooter({
  json,
  isEditing,
  restaurantSlug,
}: {
  isEditing: boolean;
  restaurantSlug: string;
  json: Record<string, MojJSON>;
}) {
  return (
    <p id="login-footer" style={json['login-footer'].css}>
      {json['login-footer'].text}{' '}
      {isEditing ? (
        <button  id="login-register-link" disabled={true} style={json['login-register-link'].css}>
          {json['login-register-link'].text}
        </button>
      ) : (
        <Link
          id="login-register-link"
          href={`/${restaurantSlug}/register`}
          style={json['login-register-link'].css}
        >
          {json['login-register-link'].text}
        </Link>
      )}
    </p>
  );
}
export function LoginRememberMeAndForgotPassword({ json,isEditing }: { isEditing:boolean;json: Record<string, MojJSON> }) {
  return (
    <div id="login-options" style={json['login-options'].css}>
      <label id="login-remember-label" style={json['login-remember-label'].css}>
        <input
          id="login-remember-checkbox"
          type="checkbox"
          disabled={isEditing}
          style={json['login-remember-checkbox'].css}
        />

        <span id="login-remember-text" style={json['login-remember-text'].css}>
          {json['login-remember-text'].text}
        </span>
      </label>

      <button id="login-forgot-password" type="button" style={json['login-forgot-password'].css}>
        {json['login-forgot-password'].text}
      </button>
    </div>
  );
}
