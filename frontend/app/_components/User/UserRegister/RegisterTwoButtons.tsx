
import { useRouter } from 'next/navigation';
import { MojJSON } from '@/app/_lib/Interfaces';
import { SetStateAction } from 'react';
import { clientRegisterAPI } from '@/app/_lib/userRegisterAPI';
import { signIn } from 'next-auth/react';
import { clientLoginAPI } from '@/app/_lib/userLoginAPI';
import Image from 'next/image';
interface RegisterTwoButtonsProps {
  json: Record<string, MojJSON>;
  isLoading: boolean;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  restoranId: number;
  restaurantSlug: string;
  name: string;
  email: string;
  password: string;
  setError: (value: SetStateAction<string>) => void;
  isEditing: boolean;
}
export function RegisterTwoButtons({
  json,
  isLoading,
  isEditing,
  setIsLoading,
  restoranId,
  restaurantSlug,
  name,
  email,
  password,
  setError,
}: RegisterTwoButtonsProps) {
  const router = useRouter();
  return (
    <div id="register-buttons" style={json['register-buttons'].css}>
      <button
        id="register-submit"
        type="button"
        disabled={isLoading||isEditing}
        onClick={async () => {
          setIsLoading(true);

          try {
            await clientRegisterAPI({
              restoranId,
              restaurantSlug,
              name,
              email,
              password,
            });

            const res = await signIn('credentials', {
              email,
              password,
              url: restaurantSlug,
              redirect: false,
            });

            if (!res?.ok) {
              console.log('Greška pri prijavi:', res?.error);
              setError('Prijava nije uspjela nakon registracije.');
            } else {
              setError('Uspjesno ste napravili svoj nalog!');
              router.push(`/${restaurantSlug}`);
              router.refresh();
            }
          } catch (e: unknown) {
            const errMsg = e instanceof Error ? e.message : String(e);
            setError(errMsg);
          } finally {
            setIsLoading(false);
          }
        }}
        style={{
          ...json['register-submit'].css,
          ...(isLoading ? json['register-submit-disable'].css : {}),
        }}
      >
        {isLoading ? (
          <span id="register-loading" style={json['register-loading'].css}>
            <span id="register-spinner" style={json['register-spinner'].css} />
            {json['register-loading'].text}
          </span>
        ) : (
          json['register-submit'].text
        )}
      </button>

      <button
        id="register-google-button"
        type="button"
        disabled={isLoading||isEditing}
        onClick={async () => {
          setIsLoading(true);

          try {
            await clientLoginAPI(restoranId, restaurantSlug);

            await signIn('google', {
              callbackUrl: `/${restaurantSlug}`,
            });
          } catch (e: unknown) {
            const errMsg = e instanceof Error ? e.message : String(e);
            setError(errMsg);
            setIsLoading(false);
          }
        }}
        style={{
          ...json['register-google-button'].css,
          ...(isLoading ? json['register-google-button-disabled'].css : {}),
        }}
      >
        <Image
          id="register-google-logo"
          width={20}
          height={20}
          src="/google-logo.svg"
          alt="Google logo"
          style={json['register-google-logo'].css}

        />

        <span>{json['register-google-button'].text}</span>
      </button>
    </div>
  );
}