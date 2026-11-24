import { Session } from 'next-auth';
import { MojJSON } from '@/app/_lib/Interfaces';
import { SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { clientLoginAPI } from '@/app/_lib/userLoginAPI';
import Image from 'next/image';

interface LoginTwoButtonsProps {
  json: Record<string, MojJSON>;
  isLoading: boolean;
  setIsLoading: (value: SetStateAction<boolean>) => void;
  setError: (value: SetStateAction<string>) => void;
  email: string;
  password: string;
  restaurantSlug: string;
  session: {
    data: Session;
    status: 'authenticated';
  };

  restoranId: number;
  isEditing: boolean;
}
export function LoginTwoButtons({
  json,
  isLoading,
  setIsLoading,
  setError,
  email,
  password,
  restaurantSlug,
  session,
  restoranId,
  isEditing
}: LoginTwoButtonsProps) {
  const router = useRouter();
  return (
    <div id="login-buttons" style={json['login-buttons'].css}>
      <button
        id="login-submit"
        type="button"
        disabled={isLoading||isEditing}
        onClick={async () => {
          setIsLoading(true);

          try {
            const res = await signIn('credentials', {
              email,
              password,
              url: restaurantSlug,
              redirect: false,
            });

            if (!res?.ok) {
              console.log('Greška pri prijavi:', res?.error);
              setError('Neispravan e-mail ili lozinka.');
            } else {
              setError('Uspjesno ste se ulogovali na vas nalog!');

              if (session?.data?.user?.role === 'admin') {
                router.push(`/${restaurantSlug}/admin`);
              } else {
                router.push(`/${restaurantSlug}`);
              }
            }
          } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
          } finally {
            setIsLoading(false);
          }
        }}
        style={{
          ...json['login-submit'].css,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? '0.5' : '1',
        }}
      >
        {isLoading ? (
          <span id="login-loading" style={json['login-loading'].css}>
            <span id="login-spinner" style={json['login-spinner'].css} />
            {json['login-loading'].text}
          </span>
        ) : (
          json['login-submit'].text
        )}
      </button>

      <button
        id="login-google-button"
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
            setError(e instanceof Error ? e.message : String(e));
            setIsLoading(false);
          }
        }}
        style={{
          ...json['login-google-button'].css,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? '0.5' : '1',
        }}
      >
        <Image
          id="login-google-logo"
          width={20}
          height={20}
          src="/google-logo.svg"
          alt="Google logo"
          style={json['login-google-logo'].css}
        />

        <span>{json['login-google-button'].text}</span>
      </button>
    </div>
  );
}

