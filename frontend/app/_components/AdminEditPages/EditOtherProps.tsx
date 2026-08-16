import { Dispatch, SetStateAction } from "react";


export function Shadow({ setShadow }: { setShadow: Dispatch<SetStateAction<string>> }) {
  
  return (
    <select onChange={(e)=>setShadow(e.target.value)} className="w-full border rounded-md p-2 text-sm">
      <option value="None">None</option>
      <option value="2xl">2xl</option>
      <option value="xl">xl</option>
      <option value="lg">lg</option>
      <option value="md">md</option>
      <option value="sm">sm</option>
      <option value="xs">xs</option>
      <option value="2xs">2xs</option>
    </select>
  );
}

export function Poravnanje({ setPoravnanje }: { setPoravnanje: Dispatch<SetStateAction<string>> }) {
  return (
    <select onChange={(e)=>setPoravnanje(e.target.value)} className="w-full border rounded-md p-2 text-sm">
      <option value="Lijevo">Lijevo</option>
      <option value="Centar">Centar</option>
      <option value="Desno">Desno</option>
    </select>
  );
}

export function Margin({
  margin,
  setMargin,
}: {
  margin: string;
  setMargin: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 flex justify-between">
        Margin
        <span>{margin}px</span>
      </label>
      <input value={margin} onChange={(e) => setMargin(e.target.value)} type="range" min="0" max="48" className="w-full" />
    </div>
  );
}

export function Padding({
  padding,
  setPadding,
}: {
  padding: string;
  setPadding: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      {' '}
      <label className="text-xs text-gray-500 flex justify-between">
        Padding
        <span>{padding}px</span>
      </label>
      <input value={padding} onChange={(e) => setPadding(e.target.value)} type="range" min="0" max="48" className="w-full" />
    </div>
  );
}

export function Border({
  border,
  setBorder,
}: {
  border: string;
  setBorder: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      {' '}
      <label className="text-xs text-gray-500 flex justify-between">
        Border
        <span>{border}px</span>
      </label>
      <input value={border} onChange={(e) => setBorder(e.target.value)} type="range" min="0" max="10" className="w-full" />
    </div>
  );
}
export function BorderRadius({
  borderRadius,
  setBorderRadius,
}: {
  borderRadius: string;
  setBorderRadius: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 flex justify-between">
        Border radius
        <span>{borderRadius}px</span>
      </label>
      <input value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} type="range" min="0" max="30" className="w-full" />
    </div>
  );
}