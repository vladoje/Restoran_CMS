'use client';

import { useState } from 'react';

import MojColorPicker from './MojColorPicker';

import 'react-fontpicker-ts/dist/index.css';
import './fontPicker.css';
import { FontSize, FontStyle, MojFontPicker, Text } from './EditText';
import { Border, BorderRadius, Margin, Padding, Poravnanje, Shadow } from './EditOtherProps';
import { parseColor } from '@heroui/react';

export function Sidebar() {
  const [font1, setFont1] = useState('');
  const [size, setSize] = useState('12');
  const [text, setText] = useState('');
  const [isCheckedBold, setIsCheckedBold] = useState(true);
  const [isCheckedItalic, setIsCheckedItalic] = useState(false);
  const [textColor, setTextColor] = useState(parseColor("#ff0000"));
  const [borderColor, setBorderColor] = useState(parseColor("#ff0000"));
  const [shadowColor, setShadowColor] = useState(parseColor("#ff0000"));
  const [shadow, setShadow] = useState("None");
  const [margin, setMargin] = useState("0");
  const [padding, setPadding] = useState("0");
  const [border, setBorder] = useState("0");
  const [borderRadius, setBorderRadius] = useState("0");
  const [poravnanje, setPoravnanje] = useState("Centar");


  return (
    <aside className="w-75 shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50 px-4 py-5">
      <div className="space-y-4">
        {/* TEKST */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Tekst</h2>
            <span className="text-xs text-gray-400">Tipografija</span>
          </div>

          <div className="space-y-4">
            <Text text={text} setText={setText} />

            <MojFontPicker setFont1={setFont1} />

            <FontSize size={size} setSize={setSize} />

            <FontStyle
              isCheckedBold={isCheckedBold}
              isCheckedItalic={isCheckedItalic}
              setIsCheckedBold={setIsCheckedBold}
              setIsCheckedItalic={setIsCheckedItalic}
            />

            <div className="border-t border-gray-100 pt-4">
              <MojColorPicker color={textColor} setColor={setTextColor} label="Boja teksta" />
            </div>
          </div>
        </section>

        {/* OKVIR */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Okvir</h2>
            <p className="mt-0.5 text-xs text-gray-400">Obrub i zaobljenje</p>
          </div>

          <div className="space-y-4">
            <Border border={border} setBorder={setBorder}/>

            <BorderRadius borderRadius={borderRadius} setBorderRadius={setBorderRadius}/>

            <div className="border-t border-gray-100 pt-4">
              <MojColorPicker color={borderColor} setColor={setBorderColor} label="Boja okvira" />
            </div>
          </div>
        </section>

        {/* RAZMAK */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Razmak</h2>
            <p className="mt-0.5 text-xs text-gray-400">Unutrašnji i spoljašnji razmak</p>
          </div>

          <div className="space-y-4">
            <Padding padding={padding} setPadding={setPadding} />
            <Margin margin={margin} setMargin={setMargin}/>
          </div>
        </section>

        {/* PORAVNANJE */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Poravnanje</h2>
          </div>

          <Poravnanje setPoravnanje={setPoravnanje} />
        </section>

        {/* SJENKE */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Sjenke</h2>
            <p className="mt-0.5 text-xs text-gray-400">Dubina i boja sjenke</p>
          </div>

          <div className="space-y-4">
            <Shadow setShadow={setShadow} />

            <div className="border-t border-gray-100 pt-4">
              <MojColorPicker color={shadowColor} setColor={setShadowColor} label="Boja sjenke" />
            </div>
          </div>
        </section>

        <div className="h-4" />
      </div>
    </aside>
  );
}
