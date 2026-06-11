export function UserAvatar({ username }: { username: string }) {
  const json = {
    "user-avatar": {
      css: "items-center mb-10",
    },
    "prvo-slovo": {
      css: "w-24 h-24 bg-gray-500   rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 dark:shadow-none mb-4",
    },
    "naslov-username": {
      css: "text-2xl font-bold ",
      text: "",
    },
  };
  return (
    <div className={`flex flex-col ${json["user-avatar"].css}`}>
      <div className={json["prvo-slovo"].css}>
        {username.at(0)?.toUpperCase()}
      </div>
      <h1 className={json["naslov-username"].css}>
        {json["naslov-username"].text}
        {username}{" "}
      </h1>
    </div>
  );
}
