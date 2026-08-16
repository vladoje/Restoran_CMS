"use client"
import { Dispatch, SetStateAction } from "react";
const colorPresets = [
  "#000000",

  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
];

import {
    Button,
  Color,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
   parseColor,
} from "@heroui/react";
import {Icon} from "@iconify/react";
export default function MojColorPicker({label,color,setColor}:{label:string,color:Color,setColor:Dispatch<SetStateAction<Color>>}){
    
 

  function shuffleColor() {
    const random =
      colorPresets[Math.floor(Math.random() * colorPresets.length)];

    setColor(parseColor(random));
  }
    return  <div className="flex flex-col gap-2">
    <p className="text-xs text-gray-500 flex justify-between">{label}</p>
      <ColorPicker value={color} onChange={setColor}>
        <ColorPicker.Trigger>
          <ColorSwatch color={color} size="lg" />
          
        </ColorPicker.Trigger>

        <ColorPicker.Popover className="gap-2">
          <ColorSwatchPicker className="justify-center pt-2" size="xs">
            {colorPresets.map((preset) => (
              <ColorSwatchPicker.Item
                key={preset}
                color={preset}
              >
                <ColorSwatchPicker.Swatch />
              
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>

          <ColorArea
            aria-label="Color area"
            className="max-w-full"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>

<div className="flex items-center gap-2 px-1">
  <ColorSlider
    aria-label="Hue slider"
    channel="hue"
    className="flex-1"
    colorSpace="hsb"
  >
    <ColorSlider.Track>
      <ColorSlider.Thumb />
    </ColorSlider.Track>
  </ColorSlider>

  <Button
    isIconOnly
    aria-label="Shuffle color"
    size="sm"
    variant="tertiary"
    onPress={shuffleColor}
  >
    <Icon
      className="size-4"
      icon="gravity-ui:shuffle"
    />
  </Button>
</div>

<div className="flex items-center gap-2 px-1">
  <ColorSlider
    aria-label="Transparency"
    channel="alpha"
    className="flex-1"
  >
    <ColorSlider.Track>
      <ColorSlider.Thumb />
    </ColorSlider.Track>
  </ColorSlider>
</div>

          <ColorField aria-label="Color field">
            <ColorField.Group variant="secondary">
              <ColorField.Prefix>
                <ColorSwatch color={color} size="xs" />
              </ColorField.Prefix>

              <ColorField.Input />
            </ColorField.Group>
          </ColorField>
        </ColorPicker.Popover>
      </ColorPicker>

    </div>

}