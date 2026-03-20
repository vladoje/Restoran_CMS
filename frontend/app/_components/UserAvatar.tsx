export function UserAvatar({ username }: { username: string }) {
  const isDarkMode = true;
  return (
    <div className="flex flex-col items-center mb-10">
      <div
        className={`w-24 h-24 ${!isDarkMode ? "bg-primary" : "bg-primary-dark"}  rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 dark:shadow-none mb-4`}
      >
        {username.at(0)?.toUpperCase()}
      </div>
      <h1 className="text-2xl font-bold ">{username}</h1>
    </div>
  );
}
