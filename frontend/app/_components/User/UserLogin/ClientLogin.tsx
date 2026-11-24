'use client';

import Input from '@/app/_components/Input';
import {  useEffect, useState } from 'react';
import {  useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {MojJSON} from "@/app/_lib/Interfaces";
import { Session } from 'next-auth';
import {
  LoginRememberMeAndForgotPassword,
  UserLoginFooter,
} from '@/app/_components/User/UserLogin/LoginHelpers';
import { LoginTwoButtons } from '@/app/_components/User/UserLogin/LoginTwoButtons';


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
              disabled={isLoading||isEditing}
              name="email"
              label="E-mail"
              value={email}
              setValue={setEmail}
              type="email"
            />

            <Input
              disabled={isLoading||isEditing}
              name="password"
              label="Lozinka"
              value={password}
              setValue={setPassword}
              type="password"
            />
          </div>
          <LoginRememberMeAndForgotPassword isEditing={isEditing} json={json} />

          <LoginTwoButtons
            isEditing={isEditing}
            json={json}
            restaurantSlug={restaurantSlug}
            restoranId={restoranId}
            password={password}
            email={email}
            setError={setError}
            isLoading={isLoading}
            session={session as { data: Session; status: 'authenticated' }}
            setIsLoading={setIsLoading}
          />
        </div>
        <UserLoginFooter json={json} isEditing={isEditing} restaurantSlug={restaurantSlug} />
      </div>
    </div>
  );
}


export default Page;
