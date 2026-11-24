import { Dispatch, SetStateAction, ReactNode } from "react";
import { twj } from "tw-to-css";
import { MojJSON } from '@/app/_lib/Interfaces';
const adminJSON = {
  "input-label": {
    css: {
      marginBottom: "0.5rem",
marginLeft:" 0.25rem",
fontSize:" 0.75rem",
lineHeight: "1rem",
fontWeight: "600",
textTransform: "uppercase",
letterSpacing: "0.025em",
      display: "block",
    },
  },
  input: {
    css: {
      width: "100%",
      borderRadius: "1rem",
borderWidth: "2px",
borderColor: "rgb(226,232,240)",
paddingLeft: "1.25rem",
paddingRight: "1.25rem",
paddingTop: "0.875rem",
paddingBottom: "0.875rem",
fontSize: "1rem",
lineHeight: "1.5rem",
fontWeight: "500",
outline: "2px solid transparent",
outlineOffset: "2px",
transitionProperty: "all",
transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
transitionDuration: "150ms",
color: "rgb(148,163,184)",

backgroundColor: "rgb(241,245,249)",
opacity: "0.6",
    },
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
        <label id="input-label" style={json['input-label'].css || {}}>
          {label}
        </label>
      )}

      <input
        id="input"
        disabled={disabled}
        name={name}
        type={type}
        style={{
          ...json.input.css,
          ...(disabled ? { caretColor: 'transparent' } : {}),
        }}
        value={value ?? ''}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => !disabled && setValue?.(e.target.value)}
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
          style={json["input-label"].css||{}}
        >
          {label}
        </label>
      )}

      <input
        id="input"
        type="number"
        style={json.input.css||{}}
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
