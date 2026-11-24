'use client';

import Input from '@/app/_components/Input';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { clientLoginAPI } from '@/app/_lib/userLoginAPI';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {MojJSON} from "@/app/_lib/Interfaces";

type LoginStyle = Record<
  string,
  {
    css?: Record<string, string>;
    text?: string;
  }
>;

function Page({
  restaurantSlug,
  restoranId,
  isEditing = false,
  json,
}: {
  restaurantSlug: string;
  restoranId: number;
  isEditing?: boolean;
  json:Record<string, MojJSON>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const session = useSession();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      if (error === 'Uspjesno ste se ulogovali na vas nalog!') {
        toast.success(error);
      } else {
        toast.error(error);
      }
    }
  }, [error]);

  const router = useRouter();



  return (
    <div id="login-container" style={json['login-container'].css}>
      <div id="login-content" style={json['login-content'].css}>
        <div id="login-header" style={json['login-header'].css}>
          <h2 id="login-title" style={json['login-title'].css}>
            {json['login-title'].text}
          </h2>

          <p id="login-subtitle" style={json['login-subtitle'].css}>
            {json['login-subtitle'].text}
          </p>
        </div>

        <div id="login-card" style={json['login-card'].css}>
          <div id="login-inputs" style={json['login-inputs'].css}>
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
              name="password"
              label="Lozinka"
              value={password}
              setValue={setPassword}
              type="password"
            />
          </div>

          <div id="login-options" style={json['login-options'].css}>
            <label id="login-remember-label" style={json['login-remember-label'].css}>
              <input
                id="login-remember-checkbox"
                type="checkbox"
                style={json['login-remember-checkbox'].css}
              />

              <span id="login-remember-text" style={json['login-remember-text'].css}>
                {json['login-remember-text'].text}
              </span>
            </label>

            <button
              id="login-forgot-password"
              type="button"
              style={json['login-forgot-password'].css}
            >
              {json['login-forgot-password'].text}
            </button>
          </div>

          <div id="login-buttons" style={json['login-buttons'].css}>
            <button
              id="login-submit"
              type="button"
              disabled={isLoading}
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

                    if (session.data?.user?.role === 'admin') {
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
              disabled={isLoading}
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
        </div>

        <p id="login-footer" style={json['login-footer'].css}>
          {json['login-footer'].text}{' '}
          <Link
            id="login-register-link"
            href={`/${restaurantSlug}/register`}
            style={json['login-register-link'].css}
          >
            {json['login-register-link'].text}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
