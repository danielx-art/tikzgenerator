import { LATEX_COLOR, LATEX_COLORS } from "public/generalConfigs";
import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../micro/ui/select";

const DicionarioCor = {
  red: "vermelho",
  green: "verde",
  blue: "azul",
  cyan: "ciano",
  magenta: "magenta",
  yellow: "amarelo",
  black: "preto",
  gray: "cinza",
  white: "branco",
};

type PropsType = {
  id: string;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<LATEX_COLOR>>;
  disabled: boolean;
};

const ColorSelect: React.FC<PropsType> = ({
  id,
  selectedColor,
  setSelectedColor,
  disabled,
}) => {
  return (
    <Select
      value={selectedColor}
      onValueChange={(value) => setSelectedColor(value as LATEX_COLOR)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue aria-valuetext={selectedColor}>
          <span className="flex flex-row flex-nowrap justify-center py-1">
            <div
              className="mr-2 h-5 w-5 rounded-full border-2 border-border"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="">
              {DicionarioCor[selectedColor as LATEX_COLOR]}
            </div>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(DicionarioCor).map((color) => (
          <SelectItem value={color} key={`${id}_${color}`}>
            <span className="flex flex-row flex-nowrap justify-center py-1">
              <div
                className="mr-2 h-5 w-5 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
              />
              <div className="">{DicionarioCor[color as LATEX_COLOR]}</div>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ColorSelect;
