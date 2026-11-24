'use client';

import Input from '@/app/_components/Input';
import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clientLoginAPI } from '@/app/_lib/userLoginAPI';
import { clientRegisterAPI } from '@/app/_lib/userRegisterAPI';
import toast from 'react-hot-toast';
import { MojJSON } from '@/app/_lib/Interfaces';
import { Props } from 'next/script';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type RegisterElement = {
  css?: Record<string, string>;
  text?: string;
  hover?: Record<string, string>;
  active?: Record<string, string>;
  disabled?: Record<string, string>;
  animation?: {
    name: string;
    duration: string;
    timingFunction: string;
    iterationCount: string;
    keyframes: Record<string, Record<string, string>>;
  };
};

function Page({
  restaurantSlug,
  restoranId,
  isEditing = false,
  json,
}: {
  restaurantSlug: string;
  restoranId: number;
  isEditing?: boolean;
  json: Record<string, MojJSON>;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      if (error === 'Uspjesno ste napravili svoj nalog!') {
        toast.success(error);
      } else {
        toast.error(error);
      }
    }
  }, [error]);

  return (
    <div id="register-container" style={json['register-container'].css}>
      <div id="register-content" style={json['register-content'].css}>
        {/* Naslovni dio */}
        <div id="register-header" style={json['register-header'].css}>
          <h2 id="register-title" style={json['register-title'].css}>
            {json['register-title'].text}
          </h2>

          <p id="register-subtitle" style={json['register-subtitle'].css}>
            {json['register-subtitle'].text}
          </p>
        </div>

        {/* Glavna kartica */}
        <div id="register-card" style={json['register-card'].css}>
          {/* Input polja */}
          <div id="register-inputs" style={json['register-inputs'].css}>
            <Input
              disabled={isLoading}
              name="email"
              label="E-mail"
              value={email}
              setValue={setEmail}
              type="email"
            />

            <Input
              disabled={isLoading}
              name="name"
              label="Korisnicko ime"
              value={name}
              setValue={setName}
              type="text"
            />

            <Input
              disabled={isLoading}
              name="password"
              label="Lozinka"
              value={password}
              setValue={setPassword}
              type="password"
            />
          </div>

          {/* Opcije */}
          <div id="register-options" style={json['register-options'].css}>
            <label id="register-remember-label" style={json['register-remember-label'].css}>
              <input
                id="register-remember-checkbox"
                type="checkbox"
                style={json['register-remember-checkbox'].css}
              />

              <span id="register-remember-text" style={json['register-remember-text'].css}>
                {json['register-remember-text'].text}
              </span>
            </label>
          </div>

          {/* Dugmići za akciju */}
          <RegisterTwoButtons
            json={json}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            name={name}
            email={email}
            password={password}
            restaurantSlug={restaurantSlug}
            restoranId={restoranId}
          />
        </div>

        {/* Footer kartice */}
        <p id="register-footer" style={json['register-footer'].css}>
          {json['register-footer'].text}{' '}
          {isEditing ? (
            <button
              id="register-login-link"
              disabled={true}
              style={json['register-login-link'].css}
            >
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
      </div>
    </div>
  );
}
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
}
function RegisterTwoButtons({
  json,
  isLoading,
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
        disabled={isLoading}
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
        disabled={isLoading}
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
export default Page;
