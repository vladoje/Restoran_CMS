import { Bold, Italic } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import FontPicker from 'react-fontpicker-ts';

export function Text({
  text,
  setText,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      <textarea
        rows={2}
        placeholder="Unesi tekst..."
        value={text}
        className="w-full border rounded-md p-2 text-sm resize-none"
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
export function MojFontPicker({ setFont1 }: { setFont1: Dispatch<SetStateAction<string>> }) {
  return (
    <div>
      <FontPicker
        autoLoad={true}
        defaultValue="Roboto"
        mode="combo"
        value={(font: string) => {

          setFont1(font);
        }}
      />
    </div>
  );
}
export function FontStyle({
  isCheckedBold,
  setIsCheckedBold,
  isCheckedItalic,
  setIsCheckedItalic,
}: {
  isCheckedBold: boolean;
  setIsCheckedBold: Dispatch<SetStateAction<boolean>>;
  isCheckedItalic: boolean;
  setIsCheckedItalic: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex gap-2">
      {' '}
      {[
        { key: 'bold' as const, Icon: Bold, label: 'B' },
        { key: 'italic' as const, Icon: Italic, label: 'I' },
      ].map(({ key, Icon }) => {
        //   const active = key === "bold" ? state.bold : state.italic;
        const active = key === 'bold' ? isCheckedBold : isCheckedItalic;
        return (
          <button
            key={key}
            onClick={() =>
              key === 'bold'
                ? setIsCheckedBold(!isCheckedBold)
                : setIsCheckedItalic(!isCheckedItalic)
            }
            className={`flex items-center justify-center w-10 h-9 rounded-md border text-sm font-medium transition-all ${
              active
                ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-inner'
                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}

export function FontSize({
  size,
  setSize,
}: {
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <label className="text-xs text-gray-500 flex justify-between">
        Veličina fonta
        <span>{size}px</span>
      </label>
      <input
      value={size}
        onChange={(e) => setSize(e.target.value)}
        step={4}
        type="range"
        min="12"
        max="72"
        className="w-full"
      />
    </>
  );
}
