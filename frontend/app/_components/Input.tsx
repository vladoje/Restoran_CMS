import { Dispatch, SetStateAction, ReactNode } from "react";

function Input({
  type = "text",
  label,
  value,
  defaultValue,
  placeholder,
  setValue,
  name,
  disabled,
}: {
  type?: string;
  label?: ReactNode;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}) {
  const isDarkMode = true;

  const style = `w-full text-base font-medium border-2 ${
    isDarkMode
      ? "text-text bg-surface border-slate-200"
      : "text-text-dark bg-surface-dark border-slate-700"
  } rounded-2xl py-3.5 px-5 outline-none transition-all placeholder:text-gray-300 
disabled:opacity-60 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200`;

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide ml-1 mb-2">
          {label}
        </label>
      )}

      <input
        disabled={disabled}
        name={name}
        type={type}
        className={style}
        value={value ?? ""}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => setValue?.(e.target.value)}
      />
    </div>
  );
}

export default Input;
export function InputNumber({
  label,
  value,
  defaultValue,
  setValue,
}: {
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  setValue?: Dispatch<SetStateAction<number>>;
}) {
  const isDarkMode = true;

  const style = `w-full text-base font-medium border-2 ${
    isDarkMode
      ? "text-text bg-surface border-slate-200"
      : "text-text-dark bg-surface-dark border-slate-700"
  } rounded-2xl py-3.5 px-5 outline-none transition-all placeholder:text-gray-300 
disabled:opacity-60 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200`;

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide ml-1 mb-2">
          {label}
        </label>
      )}

      <input
        type="number"
        className={style}
        value={value ?? ""}
        defaultValue={defaultValue}
        onChange={(e) => {
          const val = e.target.value;

          if (val === "") {
            setValue?.(0); // ili undefined ako želiš
            return;
          }

          const num = Number(val);
          if (!isNaN(num)) setValue?.(num);
        }}
      />
    </div>
  );
}
