'use client';

import Input from '@/app/_components/Input';
import {  useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MojJSON } from '@/app/_lib/Interfaces';
import { RegisterFooter, RememberMe } from '@/app/_components/User/UserRegister/RegisterHelpers';
import { RegisterTwoButtons } from '@/app/_components/User/UserRegister/RegisterTwoButtons';


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
              disabled={isLoading||isEditing}
              name="email"
              label="E-mail"
              value={email}
              setValue={setEmail}
              type="email"
            />

            <Input
              disabled={isLoading||isEditing}
              name="name"
              label="Korisnicko ime"
              value={name}
              setValue={setName}
              type="text"
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

          {/* Opcije */}
          <RememberMe json={json} isEditing={isEditing} />

          {/* Dugmići za akciju */}
          <RegisterTwoButtons
            isEditing={isEditing}
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
        <RegisterFooter json={json} restaurantSlug={restaurantSlug} isEditing={isEditing} />
      </div>
    </div>
  );
}



export default Page;
