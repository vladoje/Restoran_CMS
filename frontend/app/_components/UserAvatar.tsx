import { MojJSON } from "./ReservationList";

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
      className={`flex flex-col ${json["user-avatar"].css}`}
    >
      <div
        id="user-avatar-prvo-slovo"
        className={json["user-avatar-prvo-slovo"].css}
      >
        {username.at(0)?.toUpperCase()}
      </div>
      <h1
        id="user-avatar-naslov-username"
        className={json["user-avatar-naslov-username"].css}
      >
        {json["user-avatar-naslov-username"].text}
        {username}{" "}
      </h1>
    </div>
  );
}
