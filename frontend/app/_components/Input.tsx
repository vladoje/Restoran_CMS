import { Dispatch, SetStateAction, ReactNode } from "react";
import { convertCSS, globalStyles, MojJSON } from "./ReservationList";
const adminJSON = {
  "input-label": {
    css: "text-xs font-semibold uppercase tracking-wide ml-1 mb-2",
  },
  input: {
    css: `w-full text-base font-medium border-2 border-slate-200 rounded-2xl py-3.5 px-5 outline-none transition-all placeholder:text-gray-300 
disabled:opacity-60 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200`,
  },
};
function Input({
  type = "text",
  label,
  value,
  defaultValue,
  placeholder,
  setValue,
  name,
  clientJSON,
  disabled,
}: {
  type?: string;
  label?: ReactNode;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  clientJSON?: Record<string, MojJSON>;
  defaultValue?: string | number;
  placeholder?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}) {
  const json = clientJSON || adminJSON;
  return (
    <div>
      {label && (
        <label
          id="input-label"
          className={`block ${convertCSS(json["input-label"].css, globalStyles)}`}
        >
          {label}
        </label>
      )}

      <input
        id="input"
        disabled={disabled}
        name={name}
        type={type}
        className={`w-full ${convertCSS(json.input.css, globalStyles)}`}
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
  clientJSON,
  defaultValue,
  setValue,
}: {
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  clientJSON?: Record<string, MojJSON>;
  setValue?: Dispatch<SetStateAction<number>>;
}) {
  const json = clientJSON || adminJSON;
  return (
    <div>
      {label && (
        <label
          id="input-label"
          className={`block ${convertCSS(json["input-label"].css, globalStyles)}`}
        >
          {label}
        </label>
      )}

      <input
        id="input"
        type="number"
        className={`w-full ${convertCSS(json.input.css, globalStyles)}`}
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
