import { MojJSON } from '@/app/_lib/Interfaces';

export function UserAvatar({
  username,
  json,
 
}: {
  username: string;
  json: Record<string, MojJSON>;
  
}) {
  return (
    <div
      id="user-avatar"
      style={json["user-avatar"].css||{}}
    >
      <div
        id="user-avatar-prvo-slovo"
        style={json["user-avatar-prvo-slovo"].css||{}}
      >
        {username.at(0)?.toUpperCase()}
      </div>
      <h1
        id="user-avatar-naslov-username"
        style={
          json["user-avatar-naslov-username"].css||{}}
      >
        {json["user-avatar-naslov-username"].text}
        {username}{" "}
      </h1>
    </div>
  );
}
