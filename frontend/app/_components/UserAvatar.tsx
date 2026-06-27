import { convertCSS, globalStyles, MojJSON } from "./ReservationList";

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
      className={`flex flex-col ${convertCSS(json["user-avatar"].css, globalStyles)}`}
    >
      <div
        id="user-avatar-prvo-slovo"
        className={convertCSS(json["user-avatar-prvo-slovo"].css, globalStyles)}
      >
        {username.at(0)?.toUpperCase()}
      </div>
      <h1
        id="user-avatar-naslov-username"
        className={convertCSS(
          json["user-avatar-naslov-username"].css,
          globalStyles,
        )}
      >
        {json["user-avatar-naslov-username"].text}
        {username}{" "}
      </h1>
    </div>
  );
}
