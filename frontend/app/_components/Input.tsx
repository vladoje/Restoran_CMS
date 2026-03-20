import { type ReactNode } from "react";

function Input({
  type = "text",
  label,
  defaultValue,
  placeholder,
  state,
  setState,
}: {
  type?: string;
  label?: ReactNode;
  defaultValue?: string;
  placeholder?: string;
  state?: string;
  setState?: (state: string) => void;
}) {
  const isDarkMode = true;
  const stil = `w-full text-base font-medium  border-2 ${isDarkMode ? "text-text bg-surface" : "text-text-dark bg-surface-dark"}  rounded-2xl py-3.5 px-5  outline-none transition-all placeholder:text-gray-300`;
  if (state !== undefined && setState) {
    return (
      <div>
        <label className="block text-xs font-semibold  uppercase tracking-wide ml-1 mb-2">
          {label}
        </label>
        <input
          type={type}
          className={stil}
          value={state || defaultValue || ""}
          onChange={(e) => {
            setState?.(e.target.value);
          }}
        />
      </div>
    );
  }
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={stil}
    />
  );
}

export default Input;
function InputDark({
  type = "text",
  label,
  state,
  setState,
}: {
  type?: string;
  label?: ReactNode;
  state: string;
  setState: (state: string) => void;
}) {
  const isDarkMode = true;
  const stil = `w-full text-base font-medium  border-2 ${!isDarkMode ? "border-border text-text bg-surface" : " border-border-dark text-text-dark bg-surface-dark"}  rounded-2xl py-3.5 px-5  outline-none transition-all placeholder:text-gray-300`;
  return (
    <div>
      <label className="block text-xs font-semibold  uppercase tracking-wide ml-1 mb-2">
        {label}
      </label>
      <input
        type={type}
        className={stil}
        value={state || ""}
        onChange={(e) => {
          setState?.(e.target.value);
        }}
      />
    </div>
  );
}

export { InputDark };
