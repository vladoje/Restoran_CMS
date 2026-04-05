export function Toggle({
  state,
  setState,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <div>
        <p className="font-bold text-sm text-gray-800">Status salona</p>
        <p className="text-xs text-gray-500">
          {state ? "Salon radi po planu" : "Salon je zatvoren cijeli dan"}
        </p>
      </div>
      <div
        onClick={() => {
          setState((s) => !s);
        }}
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
          state ? "bg-emerald-500 shadow-inner" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300 ${
            state ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}
