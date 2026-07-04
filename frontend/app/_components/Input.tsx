import { Dispatch, SetStateAction, ReactNode } from "react";
import {  MojJSON } from "./ReservationList";
import { twj } from "tw-to-css";
const adminJSON = {
  "input-label": {
    css: "text-xs font-semibold uppercase tracking-wide ml-1 mb-2",
  },
  input: {
    css: `w-full text-base font-medium border-2 border-slate-200 rounded-2xl py-3.5 px-5 outline-none transition-all placeholder:text-gray-300 
disabled:opacity-60 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200`,
  },
};
export const adminGlobalStyles={
    bg: "white",
    primary: "gray-900",
    secondary: "gray-200",
    surface: "gray-50",
    text: "gray-600",
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
          style={twj(`block ${(json["input-label"].css)}`)}
        >
          {label}
        </label>
      )}

      <input
        id="input"
        disabled={disabled}
        name={name}
        type={type}
        style={twj(`w-full ${(json.input.css)}`)}
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
          style={twj(`block ${(json["input-label"].css)}`)}
        >
          {label}
        </label>
      )}

      <input
        id="input"
        type="number"
        style={twj(`w-full ${(json.input.css)}`)}
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
