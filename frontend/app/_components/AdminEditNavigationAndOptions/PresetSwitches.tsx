
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  pageSlug?: string;
};

export default function PresetSwitches({ pageSlug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPreset = searchParams.get("preset");
  const preset = currentPreset === null ? null : Number(currentPreset);

  function updatePreset(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete("preset");
    } else {
      params.set("preset", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  // Homepage: jedan switch, 0 ili 1, ili bez preseta
  if (!pageSlug) {
    const enabled = preset === 1;

    return (
      <div className="mb-5 w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <Switch
          label="Prikaži varijantu 1"
          checked={enabled}
          onChange={(checked) => updatePreset(checked ? "1" : "0")}
        />
      </div>
    );
  }

  // Reservation: OFF uklanja preset, ON postavlja 1
  if (pageSlug === "reservation") {
    const enabled = preset === 1;

    return (
      <div className="mb-5 w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <Switch
          label="Prikaži varijantu 1"
          checked={enabled}
          onChange={(checked) => updatePreset(checked ? "1" : null)}
        />
      </div>
    );
  }

  // Ostale stranice: dva switcha
  const active = preset === 1 || preset === 3;
  const inactive = preset === 2 || preset === 3;

  function updateReservations(showActive: boolean, showInactive: boolean) {
    const nextPreset =
      showActive && showInactive ? "3" :
        showActive ? "1" :
          showInactive ? "2" : "0";

    updatePreset(nextPreset);
  }

  return (
    <div className="mb-5 w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-gray-800">
        Nastavitve prikaza rezervacij
      </p>

      <div className="flex flex-col gap-4">
        <Switch
          label="Aktivne rezervacije"
          checked={active}
          onChange={(checked) => updateReservations(checked, inactive)}
        />

        <Switch
          label="Neaktivne rezervacije"
          checked={inactive}
          onChange={(checked) => updateReservations(active, checked)}
        />
      </div>
    </div>
  );
}

function Switch({
                  label,
                  checked,
                  onChange,
                }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span className="text-sm text-gray-700">{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </label>
  );
}
